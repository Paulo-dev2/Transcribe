# Use uma imagem base Node.js adequada (use a versão LTS para maior estabilidade)
FROM node:14

# Defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo de definição de tipo do TypeScript para evitar erros
COPY tsconfig.json .

# Copie o arquivo de configuração do ambiente
#COPY .env .env

# Copie os arquivos de origem (exceto os arquivos definidos no .dockerignore)
COPY . .

# Instale as dependências (recomendado para produção)
RUN npm install 


# Inicie o aplicativo em modo de produção
CMD ["npm", "run", "dev"]
