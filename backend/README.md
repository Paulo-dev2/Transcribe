﻿## Getting Started

O arquivo .env, é para ser usado somente para meios acadêmicos

Primeiro baixa as depedências:

``` bash
    npm install
```
# Depois cria o arquivo .env, com as seguintes variaveis:
- PORT=8080, definina como padrão 8080, mas pode mudar para se quiser, mas depois muda no frontend.
- DEEPGRAM=key, primeiro tem criar uma conta https://deepgram.com/ e criar a key ai é so adicionar.
- DB_URI, a uri do monogdb
- DB, é a variavel do nome do banco
- HOST_VIDEO, é a variavel do caminho do vídeo

Depois só roda o sequinte comando:
```bash
npm run dev
# or
yarn dev
```
