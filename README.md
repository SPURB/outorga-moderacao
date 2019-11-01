# outorga-moderacao

> Moderação do cadatro de interessados para compra de Outorga das Operações Urbanas Consorciadas de São Paulo

## Setup

``` bash
# Instale as dependências
$ npm run install

# Servir para desenvolvimento em localhost:3000
$ npm run dev

# Gerar o projeto para produção e iniciar servidor
$ npm run build
$ npm run start

# Gerar projeto estático
$ npm run generate

```
## Para desenvolver com um mock server
Quando a API estiver fora do ambiente pode-se desenvolver criando um mock server. Veja abaixo as instruções.
1. Inicie o mock server para desenvolvimento em [localhost:5000](http://localhost:5000). Altere os dados e as endpoints do arquivo `api-mock/db.json`
``` bash
npm run mock
```
2. Inicie a aplicação em [localhost:3000](http://localhost:3000) consumindo o mock server
``` bash
$ npm run dev:mock
```

Para melhor entendimento veja a documentação do [Nuxt](https://nuxtjs.org).
