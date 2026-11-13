# Novedu — pasta Prisma

Este diretório contém o schema inicial do Prisma para PostgreSQL.

## Conteúdo

- `schema.prisma`: modelos, campos, tipos, chaves e relacionamentos do Novedu.
- `migrations/`: diretório reservado às migrations geradas pelo Prisma Migrate.
- `seed/`: reservado para dados iniciais de desenvolvimento.

## Atenção à versão

Este schema usa a configuração tradicional do Prisma (datasource URL em `schema.prisma` e provider `prisma-client-js`), compatível com o fluxo do Prisma ORM 6.x. Se o projeto for iniciado com Prisma 7.x, a configuração de conexão e geração deve ser adaptada ao setup da versão 7 antes de executar os comandos.

## Antes da primeira migration

1. Corrija/valide as regras de negócio e os nomes dos enums.
2. Confira se o banco PostgreSQL está disponível.
3. Configure `DATABASE_URL` no `.env` da raiz do backend.
4. Instale a mesma versão principal do pacote `prisma` e `@prisma/client`.
5. Execute `npx prisma format`.
6. Execute `npx prisma validate`.
7. Só depois gere a migration inicial com `npx prisma migrate dev --name init`.

Exemplo de variável de ambiente (não use credenciais reais no Git):

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/novedu?schema=public"
```

## Decisões e pontos que precisam ser confirmados

- `UserRole`, status de ano letivo, período, turma, matrícula e frequência foram modelados como enums Prisma. Os valores devem ser mantidos consistentes com o backend.
- `updatedAt` usa `@updatedAt`, que o Prisma atualiza quando um registro é alterado.
- A regra da média ponderada ainda será implementada na camada de serviços. O schema guarda `maximumScore` e `weight`, mas não calcula médias.
- As validações `quarter` entre 1 e 4, datas coerentes, nota dentro da pontuação máxima, peso positivo e compatibilidade entre turma/ano/período precisam ser implementadas no backend ou com constraints SQL adicionais.
- A restrição de frequência impede mais de um registro para a mesma matrícula, atribuição e data. Se houver mais de uma aula da mesma disciplina no mesmo dia, será necessário adicionar um identificador de aula/encontro.
- A relação de `Grade` com `Enrollment` e `Assessment` não garante sozinha que a matrícula pertence à turma da atribuição da avaliação. Essa regra deve ser validada pelo serviço de notas.

## Importante

Não rode migrations em um banco com dados importantes sem backup. A primeira migration deve ser executada no banco de desenvolvimento do projeto.
