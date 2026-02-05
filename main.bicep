// Paramètres : Le nom de votre Web App existante et l'URL de votre backend
param webAppName string = "fileshare-frontend"
param backendUrl string = "fileshare-backend-ehascrbabfaqerfg.norwayeast-01.azurewebsites.net/api"

// Référence à la Web App existante
resource existingWebApp 'Microsoft.Web/sites@2022-09-01' existing = {
  name: webAppName
}

// Mise à jour de la configuration "web" (Commande de lancement & Version Node)
resource webConfig 'Microsoft.Web/sites/config@2022-09-01' = {
  parent: existingWebApp
  name: 'web'
  properties: {
    // Définit l'environnement Node 20 LTS
    linuxFxVersion: 'NODE|20-lts'
    
    // COMMANDE CRUCIALE POUR VITE :
    // - Sert le dossier 'dist' (généré par 'vite build')
    // - '--spa' gère les routes React (évite les 404 sur /login, /register, etc.)
    // - '--no-daemon' garde le conteneur actif
    appCommandLine: 'pm2 serve /home/site/wwwroot/dist --no-daemon --spa'
  }
}

// Mise à jour des App Settings (Variables d'environnement)
resource appSettings 'Microsoft.Web/sites/config@2022-09-01' = {
  parent: existingWebApp
  name: 'appsettings'
  properties: {
    // Injecte l'URL utilisée par votre client.js
    API_URL: backendUrl
    
    // Optimisation de Node pour la prod
    NODE_ENV: 'production'
  }
}