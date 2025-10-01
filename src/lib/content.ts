// Utilitários para gerenciamento de conteúdo
// Funções para carregar, salvar e manipular o content.json

export interface ContentData {
  branding: {
    siteName: string
    bgImage: string
    primary: string
    accent: string
    font: string
  }
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  marketplaces: Array<{
    name: string
    logo: string
    description: string
    affiliateUrl: string
    color: string
  }>
  categories: Array<{
    name: string
    slug: string
    icon: string
    description: string
  }>
  offers: Array<{
    id: number
    title: string
    marketplace: string
    category: string
    image: string
    originalPrice: string
    salePrice: string
    discount: string
    affiliateUrl: string
  }>
  about: {
    title: string
    text: string
  }
  contact: {
    title: string
    emailTo: string
    notice: string
    socialLinks: Array<{
      name: string
      url: string
      icon: string
    }>
  }
  admin: {
    password: string
  }
}

// Carregar conteúdo do arquivo JSON
export async function loadContent(): Promise<ContentData | null> {
  try {
    const response = await fetch('/content.json')
    if (!response.ok) {
      throw new Error('Falha ao carregar conteúdo')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao carregar conteúdo:', error)
    return null
  }
}

// Salvar conteúdo (download do arquivo)
export function saveContent(content: ContentData, filename = 'content.json') {
  const dataStr = JSON.stringify(content, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  
  URL.revokeObjectURL(url)
}

// Validar estrutura do conteúdo
export function validateContent(content: any): content is ContentData {
  return (
    content &&
    typeof content === 'object' &&
    content.branding &&
    content.hero &&
    Array.isArray(content.marketplaces) &&
    Array.isArray(content.categories) &&
    Array.isArray(content.offers) &&
    content.about &&
    content.contact &&
    content.admin
  )
}

// Atualizar propriedade aninhada no conteúdo
export function updateNestedProperty(
  content: ContentData,
  path: string[],
  value: any
): ContentData {
  const newContent = JSON.parse(JSON.stringify(content)) // Deep clone
  let current: any = newContent
  
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {}
    }
    current = current[path[i]]
  }
  
  current[path[path.length - 1]] = value
  return newContent
}

// Gerar slug a partir de texto
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
}

// Validar URL
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Formatar preço
export function formatPrice(price: string | number): string {
  const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) : price
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numPrice)
}

// Calcular desconto
export function calculateDiscount(originalPrice: string, salePrice: string): string {
  const original = parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.'))
  const sale = parseFloat(salePrice.replace(/[^\d,]/g, '').replace(',', '.'))
  
  if (original <= 0 || sale <= 0) return '0%'
  
  const discount = ((original - sale) / original) * 100
  return `${Math.round(discount)}%`
}

// Exportar configuração padrão
export const defaultContent: ContentData = {
  branding: {
    siteName: "Meus Descontos Online",
    bgImage: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/3ef1ed8d-9a71-4c7d-b7c7-6136dca16f6f.jpg",
    primary: "#0d6efd",
    accent: "#ff7a00",
    font: "font-inter"
  },
  hero: {
    title: "Todos os Melhores Descontos em um só Lugar",
    subtitle: "Acesso rápido a Mercado Livre, Amazon, Magazine Luiza, Americanas, Shopee e AliExpress",
    ctaText: "Aproveitar Agora"
  },
  marketplaces: [
    {
      name: "Amazon",
      logo: "🛒",
      description: "Milhares de produtos com entrega rápida",
      affiliateUrl: "https://SEU-LINK-AMAZON",
      color: "#FF9900"
    }
  ],
  categories: [
    {
      name: "Tecnologia",
      slug: "tecnologia",
      icon: "💻",
      description: "Smartphones, notebooks, gadgets e mais"
    }
  ],
  offers: [],
  about: {
    title: "Sobre Nós",
    text: "Organizamos as melhores promoções de forma prática e segura."
  },
  contact: {
    title: "Entre em Contato",
    emailTo: "contato@meusdescontosonline.com",
    notice: "Este site contém links de afiliados. Ao comprar por eles, você apoia nosso trabalho sem pagar nada a mais.",
    socialLinks: []
  },
  admin: {
    password: "admin123"
  }
}