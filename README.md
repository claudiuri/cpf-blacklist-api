<h1 align="center">Cpf-Blacklist-Api🧾</h1>

## Instalação 🔥

```bash
$ npm install
```

## Rodando a api 🚀

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rodando testes 🎮 

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Ao rotar os teste `e2e` será criando um banco de teste chamdo `db_teste.sqlite3`

## Swagger/PlayGround 
Para acessar o swagger é necessario rodar  a api
```bash
$ npm run start
```
Após rodar acesse a rota `/swagger`

Exemplo: `http://localhost:3000/swagger`

## Docker 

```bash
# criação da imagem
$ docker build -t cpf-blacklist-api .

# rodando a imagem criada
$ docker run -d -p 3000:3000 -e PORT=3000 cpf-blacklist-api 
```

## Bibliotecas 📚

- [Nestjs](https://nestjs.com/) - Framework usado para criar de fato a aplicação
- [Class-Validator](https://github.com/typestack/class-validator) - Biblioteca de validação usada para criar DTOs
- [TypeOrm](https://typeorm.io/#/) - Utilizado para fazer a gerenciar a conexão com o banco
- [Sqlite3](https://www.npmjs.com/package/sqlite3) - Banco utilizado para salvar cpfs
- [Swagger](https://swagger.io/) - Usado para documentar a api
- [Jest](https://jestjs.io/pt-BR/) - Usado para para criação dos testes

## License

Nest is [MIT licensed](LICENSE).
