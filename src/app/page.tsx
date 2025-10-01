'use client'

import { useState, useEffect } from 'react'
import { Search, Menu, X, ShoppingBag, Star, Heart, User, Settings, Save, Upload, Download } from 'lucide-react'

interface ContentData {
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

export default function MeusDescontosOnline() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedMarketplace, setSelectedMarketplace] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Carregar conteúdo
  useEffect(() => {
    loadContent()
    
    // Configurar scroll restoration
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      
      // Restaurar posição do scroll
      const savedScroll = sessionStorage.getItem('scrollPosition')
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll))
        }, 100)
      }
      
      // Salvar posição antes de sair
      const saveScrollPosition = () => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString())
      }
      
      window.addEventListener('beforeunload', saveScrollPosition)
      return () => window.removeEventListener('beforeunload', saveScrollPosition)
    }
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/content.json')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
    }
  }

  const saveContent = () => {
    if (!content) return
    
    const dataStr = JSON.stringify(content, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'content.json'
    link.click()
    URL.revokeObjectURL(url)
    
    alert('Configuração salva! Faça upload do arquivo para o servidor.')
  }

  const handleAdminLogin = () => {
    if (content && adminPassword === content.admin.password) {
      setIsAdminMode(true)
      setShowAdminLogin(false)
      setAdminPassword('')
    } else {
      alert('Senha incorreta!')
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleCategoryClick = (slug: string) => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    setSelectedCategory(slug)
    setSelectedMarketplace(null)
  }

  const handleMarketplaceClick = (name: string) => {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    setSelectedMarketplace(name)
    setSelectedCategory(null)
  }

  const handleBackToHome = () => {
    setSelectedCategory(null)
    setSelectedMarketplace(null)
    const savedScroll = sessionStorage.getItem('scrollPosition')
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll))
      }, 100)
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) return
    
    const subject = `Contato - ${contactForm.name}`
    const body = `Nome: ${contactForm.name}%0D%0AEmail: ${contactForm.email}%0D%0A%0D%0AMensagem:%0D%0A${contactForm.message}`
    const mailtoLink = `mailto:${content.contact.emailTo}?subject=${subject}&body=${body}`
    
    window.location.href = mailtoLink
    setContactForm({ name: '', email: '', message: '' })
  }

  const updateContent = (path: string[], value: any) => {
    if (!content) return
    
    const newContent = { ...content }
    let current: any = newContent
    
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]]
    }
    
    current[path[path.length - 1]] = value
    setContent(newContent)
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Renderizar página de categoria
  if (selectedCategory) {
    const category = content.categories.find(cat => cat.slug === selectedCategory)
    const categoryOffers = content.offers.filter(offer => offer.category === category?.name)
    
    return (
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: `url(${content.branding.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToHome}
                className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
              >
                {content.branding.siteName}
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                ← Voltar
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {category?.icon} {category?.name}
            </h1>
            <p className="text-xl text-white drop-shadow-lg">{category?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryOffers.map(offer => (
              <div key={offer.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-500 line-through text-sm">{offer.originalPrice}</span>
                      <span className="text-2xl font-bold text-green-600 ml-2">{offer.salePrice}</span>
                    </div>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{offer.discount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{offer.marketplace}</span>
                    <a
                      href={offer.affiliateUrl}
                      target="_self"
                      className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold"
                    >
                      Ver Oferta
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {categoryOffers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white text-lg drop-shadow-lg">Nenhuma oferta encontrada nesta categoria.</p>
            </div>
          )}
        </main>
      </div>
    )
  }

  // Renderizar página de marketplace
  if (selectedMarketplace) {
    const marketplace = content.marketplaces.find(mp => mp.name === selectedMarketplace)
    const marketplaceOffers = content.offers.filter(offer => offer.marketplace === selectedMarketplace)
    
    return (
      <div 
        className="min-h-screen"
        style={{
          backgroundImage: `url(${content.branding.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToHome}
                className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
              >
                {content.branding.siteName}
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                ← Voltar
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {marketplace?.logo} {marketplace?.name}
            </h1>
            <p className="text-xl text-white drop-shadow-lg">{marketplace?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceOffers.map(offer => (
              <div key={offer.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-500 line-through text-sm">{offer.originalPrice}</span>
                      <span className="text-2xl font-bold text-green-600 ml-2">{offer.salePrice}</span>
                    </div>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{offer.discount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{offer.category}</span>
                    <a
                      href={offer.affiliateUrl}
                      target="_self"
                      className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors font-semibold"
                    >
                      Ver Oferta
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {marketplaceOffers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white text-lg drop-shadow-lg">Nenhuma oferta encontrada neste marketplace.</p>
            </div>
          )}
        </main>
      </div>
    )
  }

  // Página principal
  return (
    <div 
      className="min-h-screen font-inter"
      style={{
        backgroundImage: `url(${content.branding.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Login Admin</h3>
            <input
              type="password"
              placeholder="Digite a senha"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {isAdminMode && (
        <div className="fixed top-0 right-0 bg-white shadow-lg p-4 z-40 w-80 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Painel Admin</h3>
            <button
              onClick={() => setIsAdminMode(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={saveContent}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Salvar Configuração
            </button>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Site</label>
              <input
                type="text"
                value={content.branding.siteName}
                onChange={(e) => updateContent(['branding', 'siteName'], e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Título Hero</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => updateContent(['hero', 'title'], e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subtítulo Hero</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateContent(['hero', 'subtitle'], e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg h-20"
              />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              {isAdminMode ? (
                <input
                  type="text"
                  value={content.branding.siteName}
                  onChange={(e) => updateContent(['branding', 'siteName'], e.target.value)}
                  className="bg-transparent border-b-2 border-blue-600 outline-none"
                />
              ) : (
                content.branding.siteName
              )}
            </h1>
            
            <nav className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection('inicio')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection('ofertas')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Ofertas
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Contato
              </button>
              {!isAdminMode && (
                <button 
                  onClick={() => setShowAdminLogin(true)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Settings size={20} />
                </button>
              )}
            </nav>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('inicio')} className="text-left text-gray-700 hover:text-blue-600 py-2">
                  Início
                </button>
                <button onClick={() => scrollToSection('ofertas')} className="text-left text-gray-700 hover:text-blue-600 py-2">
                  Ofertas
                </button>
                <button onClick={() => scrollToSection('contato')} className="text-left text-gray-700 hover:text-blue-600 py-2">
                  Contato
                </button>
                {!isAdminMode && (
                  <button 
                    onClick={() => setShowAdminLogin(true)}
                    className="text-left text-gray-500 hover:text-gray-700 py-2 flex items-center gap-2"
                  >
                    <Settings size={20} />
                    Admin
                  </button>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="inicio"
        className="relative min-h-screen flex items-center justify-center text-center"
      >
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {isAdminMode ? (
              <textarea
                value={content.hero.title}
                onChange={(e) => updateContent(['hero', 'title'], e.target.value)}
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg p-4 text-center resize-none text-white placeholder-white/70"
                rows={2}
              />
            ) : (
              content.hero.title
            )}
          </h2>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-lg">
            {isAdminMode ? (
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateContent(['hero', 'subtitle'], e.target.value)}
                className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg p-4 text-center resize-none text-white placeholder-white/70"
                rows={3}
              />
            ) : (
              content.hero.subtitle
            )}
          </p>
          
          <button
            onClick={() => scrollToSection('ofertas')}
            className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {content.hero.ctaText}
          </button>
        </div>
      </section>

      {/* Marketplaces Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Nossos Parceiros
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {content.marketplaces.map((marketplace, index) => (
              <button
                key={index}
                onClick={() => handleMarketplaceClick(marketplace.name)}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-3">{marketplace.logo}</div>
                <h3 className="font-bold text-gray-800 mb-2">{marketplace.name}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {marketplace.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Categorias
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {content.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.slug)}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="ofertas" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Ofertas em Destaque
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.offers.map((offer) => (
              <div key={offer.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{offer.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-500 line-through text-sm">{offer.originalPrice}</span>
                      <span className="text-2xl font-bold text-green-600 ml-2">{offer.salePrice}</span>
                    </div>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{offer.discount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>{offer.marketplace}</span>
                      <span className="mx-2">•</span>
                      <span>{offer.category}</span>
                    </div>
                    <a
                      href={offer.affiliateUrl}
                      target="_self"
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                    >
                      Ver Oferta
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
            {content.about.title}
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
            {content.about.text}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            {content.contact.title}
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleContactSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Enviar Mensagem
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-6 mb-6">
                {content.contact.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_self"
                    className="text-3xl text-white hover:scale-110 transition-transform drop-shadow-lg"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <p className="text-sm text-gray-800 bg-yellow-50/95 backdrop-blur-sm p-4 rounded-lg border border-yellow-200">
                {content.contact.notice}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {content.branding.siteName}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}