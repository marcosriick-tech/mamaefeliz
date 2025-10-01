// Tipos TypeScript para o projeto Meus Descontos Online

export interface Marketplace {
  name: string
  logo: string
  description: string
  affiliateUrl: string
  color: string
}

export interface Category {
  name: string
  slug: string
  icon: string
  description: string
}

export interface Offer {
  id: number
  title: string
  marketplace: string
  category: string
  image: string
  originalPrice: string
  salePrice: string
  discount: string
  affiliateUrl: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Branding {
  siteName: string
  bgImage: string
  primary: string
  accent: string
  font: string
}

export interface Hero {
  title: string
  subtitle: string
  ctaText: string
}

export interface About {
  title: string
  text: string
}

export interface Contact {
  title: string
  emailTo: string
  notice: string
  socialLinks: SocialLink[]
}

export interface Admin {
  password: string
}

export interface ContentData {
  branding: Branding
  hero: Hero
  marketplaces: Marketplace[]
  categories: Category[]
  offers: Offer[]
  about: About
  contact: Contact
  admin: Admin
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface AdminState {
  isActive: boolean
  isLoggedIn: boolean
  password: string
}

export interface NavigationItem {
  label: string
  href: string
  section?: string
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}

export interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  cumulativeLayoutShift: number
}

// Tipos para eventos
export type ScrollPosition = number
export type ViewMode = 'home' | 'category' | 'marketplace'
export type AdminAction = 'save' | 'load' | 'export' | 'import'

// Tipos para hooks
export interface UseScrollMemoryReturn {
  saveCurrentPosition: () => void
  restorePosition: () => void
  clearPosition: () => void
}

export interface UseContentReturn {
  content: ContentData | null
  loading: boolean
  error: string | null
  updateContent: (path: string[], value: any) => void
  saveContent: () => void
  loadContent: () => Promise<void>
}

// Tipos para componentes
export interface MarketplaceCardProps {
  marketplace: Marketplace
  onClick: (name: string) => void
  isAdmin?: boolean
  onEdit?: (marketplace: Marketplace) => void
}

export interface CategoryCardProps {
  category: Category
  onClick: (slug: string) => void
  isAdmin?: boolean
  onEdit?: (category: Category) => void
}

export interface OfferCardProps {
  offer: Offer
  isAdmin?: boolean
  onEdit?: (offer: Offer) => void
  onDelete?: (id: number) => void
}

export interface AdminPanelProps {
  content: ContentData
  onContentUpdate: (content: ContentData) => void
  onClose: () => void
}

export interface ContactFormProps {
  onSubmit: (form: ContactForm) => void
  emailTo: string
}

// Enums
export enum MarketplaceName {
  AMAZON = 'Amazon',
  MERCADO_LIVRE = 'Mercado Livre',
  MAGAZINE_LUIZA = 'Magazine Luiza',
  AMERICANAS = 'Americanas',
  SHOPEE = 'Shopee',
  ALIEXPRESS = 'AliExpress'
}

export enum CategorySlug {
  TECNOLOGIA = 'tecnologia',
  CASA_JARDIM = 'casa-jardim',
  MODA = 'moda',
  BEBES = 'bebes',
  GAMES = 'games',
  BELEZA = 'beleza'
}

export enum FontFamily {
  INTER = 'font-inter',
  GEIST_SANS = 'font-geist-sans',
  GEIST_MONO = 'font-geist-mono',
  ROBOTO = 'font-roboto'
}

export enum ColorTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info'
}

// Tipos utilitários
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// Tipos para validação
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface FormValidation {
  field: string
  rules: ValidationRule[]
}

export interface ValidationRule {
  type: 'required' | 'email' | 'url' | 'minLength' | 'maxLength'
  value?: any
  message: string
}

export default ContentData