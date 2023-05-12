# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY package*.json ./
COPY index.html ./
COPY server.js ./
COPY public ./public

# Instalar las dependencias
RUN npm install

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]
