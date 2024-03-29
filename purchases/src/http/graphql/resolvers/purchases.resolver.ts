import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  // eslint-disable-next-line prettier/prettier
  Resolver
} from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';
import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }
    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
