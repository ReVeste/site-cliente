# # Usa a imagem oficial do Node
# FROM node:20

# # Define a pasta de trabalho
# WORKDIR /app

# # Copia os arquivos de dependência
# COPY package.json package-lock.json ./

# # Instala as dependências
# RUN npm install --force

# # Copia o restante dos arquivos
# COPY . .

# # Expõe a porta que o React usa por padrão
# EXPOSE 300080

# # Comando para iniciar o app
# CMD ["npm", "start"]
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .


RUN npm run build


FROM nginx:stable-alpine


COPY --from=builder /app/build /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]