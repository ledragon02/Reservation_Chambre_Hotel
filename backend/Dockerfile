# Utilise Node.js 18
FROM node:18

# Crée le dossier de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le code source
COPY ./src ./src

# Expose le port
EXPOSE 3000

# Commande pour lancer l'API
CMD ["node", "src/app.js"]
