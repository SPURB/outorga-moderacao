# Controle de CEPAC das Operação Urbanas Consorciadas
Sistema de moderação do cadastro de interessados de CEPACs - [Certificados de Potencial Adicional de Construção](https://www.prefeitura.sp.gov.br/cidade/secretarias/urbanismo/sp_urbanismo/cepac/index.php?p=19456) - das Operações Urbanas Consorciadas de São Paulo.

Este repositório refere-se à [etapa de moderação (etapa 2)](https://docs.google.com/presentation/d/14MqWfa8ezwJiAMC-37H4Fcn82UidSFu90-jMUd1Pfqc/edit?usp=sharing) do sistema de cadastro de interesse de CEPACs das Operações Urbananas gerenciadas pela São Paulo Urbanismo. Fazem parte deste sistema os seguintes repositórios:

- https://github.com/spurb/outorga-backend (api; etapas 1, 2 e 3)
- https://github.com/spurb/relatorios (frontend, etapa 3)

### Diagrama do sistema
![Outorga - Sistema de cadastro de interesse](https://user-images.githubusercontent.com/4117768/74034907-ffe04a80-4997-11ea-8d0b-084bde160ea0.jpg)

O objetivo é centralizar o cadastro de todas as manifestações de interesse, criar uma fonte oficial destes dados distribuído em uma [API pública das Operações Urbanas](https://github.com/spurb/outorga-backend).

## Características
 - A aplicação está publicada na intranet da São Paulo Urbanismo (spurbsp198)
 - O sistema de autenticação está integrado ao sistema da [PRODAM](https://www.prefeitura.sp.gov.br/cidade/secretarias/inovacao/prodam/). O endpoint é privado publicado na mesma rede da intranet
 - Os usuários que realizam a moderação são controlados pela NTI (Núcleo de Tecnologia da Informação), da São Paulo Urbanismo

## Formulário de criação de registro
> Tela de `/outorga-moderacao/cadastro/criar`:

![Screenshot_2020-02-07 SP Urbanismo Cadastro OUCs](https://user-images.githubusercontent.com/4117768/74035809-c6a8da00-4999-11ea-91b1-e535e3e3e40d.png)


## Para rodar localmente
> É necessário estar na rede da São Paulo Urbanismo para fazer a autenticação e realizar POSTs e PUTs.

``` bash
# Instale as dependências
$ npm run install

# Servir para desenvolvimento em localhost:3000/outorga-moderacao
$ npm run dev

# Gerar o projeto para produção e iniciar servidor
$ npm run build
$ npm run start

# Gerar projeto estático
$ npm run generate

```
> Atenção: Aplicação iniciará `dev` ou `start` no [localhost:3000/outorga-moderacao](http://localhost:3000/outorga-moderacao).

## Próximos passos
 - [ ] Integração com o SEI - Sistema Eletrônico de Informações da prefeitura
 - [ ] Integração o cadastro geográfico da DGO/SISOUC
