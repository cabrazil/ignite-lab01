insert into autorizacao_perfil_nivel (cod_perfil,cod_tipo_nivel,val_permitido)
select '1413' cod_nivel,cod_tipo_nivel,val_permitido from autorizacao_perfil_nivel 
where cod_perfil in 
('18.1','18.2','18.6','20','22.2.1','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1','20','8.1')
group by cod_tipo_nivel,val_permitido;

SELECT p.cod_perfil, p.nom_perfil, a.cod_nivel, a.cod_tipo_nivel, a.val_permitido
  FROM ts.perfil p
       INNER JOIN ts_autorizacao_perfil_nivel a ON p.cod_perfil = a.cod_perfil
  GROUP BY p.cod_perfil
  ORDER BY p.cod_perfil


"select distinct e.cod_perfil, e.nom_perfil, f.cod_funcao, f.txt_titulo_funcao
  from ts.usuario            u,
       ts.perfil_usuario     p,
       ts.perfil             e,
       ts.autorizacao_perfil a,
       ts.funcao             f
 where u.cod_usuario            = p.cod_usuario
   and p.cod_perfil             = a.cod_perfil
   and a.cod_funcao             = f.cod_funcao
   and p.cod_perfil             = e.cod_perfil
   and nvl(u.ind_bloqueio, 'N') = 'N'
 order by 1, 3"

 "select distinct u.cod_usuario, u.nom_usuario, e.cod_perfil, e.nom_perfil
  from ts.usuario            u,
       ts.perfil_usuario     p,
       ts.perfil             e,
       ts.autorizacao_perfil a,
       ts.funcao             f
 where u.cod_usuario            = p.cod_usuario
   and p.cod_perfil             = a.cod_perfil
   and a.cod_funcao             = f.cod_funcao
   and p.cod_perfil             = e.cod_perfil
   and nvl(u.ind_bloqueio, 'N') = 'N'
 order by 1, 3"

