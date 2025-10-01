// Configurações do site - Meus Descontos Online
// Este arquivo contém configurações técnicas e pode ser editado por desenvolvedores

export const siteConfig = {
  // Configurações básicas
  name: "Meus Descontos Online",
  description: "Todos os melhores descontos em um só lugar",
  url: "https://meusdescontosonline.com",
  
  // SEO
  keywords: [
    "descontos",
    "promoções", 
    "ofertas",
    "Amazon",
    "Mercado Livre",
    "Magazine Luiza",
    "Americanas",
    "Shopee",
    "AliExpress",
    "compras online",
    "economia"
  ],
  
  // Redes sociais
  social: {
    instagram: "https://instagram.com/meusdescontosonline",
    facebook: "https://facebook.com/meusdescontosonline",
    whatsapp: "https://wa.me/5511999999999"
  },
  
  // Configurações técnicas
  features: {
    scrollMemory: true,
    lazyLoading: true,
    adminMode: true,
    pwa: true,
    seo: true
  },
  
  // Cores do tema
  colors: {
    primary: "#0d6efd",
    secondary: "#ff7a00",
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8"
  },
  
  // Configurações de performance
  performance: {
    imageOptimization: true,
    prefetchLinks: true,
    compressionEnabled: true
  }
}

export default siteConfig