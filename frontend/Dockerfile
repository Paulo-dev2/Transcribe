# Use uma imagem base Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte
COPY . .

# Construa seu aplicativo (substitua o comando pelo seu comando de construção real)
#RUN npm run build

# Exponha a porta na qual seu aplicativo será executado
EXPOSE 3000

# Inicie o aplicativo quando o contêiner for iniciado
CMD ["npm", "run","dev"]
