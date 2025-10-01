# Meus Descontos Online

Site completo de afiliados com sistema de administração integrado, otimizado para público feminino.

## 🚀 Características

- **Design Responsivo**: Mobile-first, otimizado para todos os dispositivos
- **Performance**: Lazy loading, otimizações de imagem, SEO integrado
- **Admin Panel**: Sistema completo de edição de conteúdo
- **Scroll Memory**: Mantém posição ao navegar entre páginas
- **Acessibilidade**: WCAG AA compliant
- **Background Personalizado**: Imagem de fundo global configurável

## 📁 Estrutura do Projeto

```
├── src/app/
│   ├── page.tsx          # Página principal com todas as funcionalidades
│   └── layout.tsx        # Layout base
├── public/
│   ├── content.json      # Configuração editável do site
│   └── assets/           # Imagens e recursos
└── README.md
```

## ⚙️ Configuração Inicial

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Conteúdo
Edite o arquivo `public/content.json` para personalizar:
- Textos e títulos
- Links de afiliado
- Cores e branding
- Informações de contato

### 3. Trocar Imagem de Fundo
Para usar sua própria imagem de fundo:
1. Substitua a URL em `content.json` → `branding.bgImage`
2. Ou use o painel admin para alterar

## 🔧 Modo Administrador

### Ativar Admin
1. Acesse o site
2. Clique no ícone de engrenagem (⚙️) no header
3. Digite a senha: `admin123`

### Funcionalidades Admin
- ✏️ **Edição Inline**: Clique nos textos para editar
- 🎨 **Personalização**: Altere cores, fontes e layout
- 🔗 **Links de Afiliado**: Configure todos os links facilmente
- 💾 **Exportar Config**: Baixe arquivo `content.json` atualizado
- 📱 **Preview em Tempo Real**: Veja mudanças instantaneamente

### Salvar Alterações
1. Faça as edições no painel admin
2. Clique em "Salvar Configuração"
3. Baixe o arquivo `content.json`
4. Substitua o arquivo no servidor

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Conecte seu repositório GitHub
2. Configure build: `npm run build`
3. Pasta de publicação: `out` ou `.next`

### Hostinger/cPanel
1. Execute `npm run build`
2. Faça upload da pasta `out` para `public_html`

## 🔗 Configurar Links de Afiliado

### Amazon
1. Acesse [Amazon Associates](https://associados.amazon.com.br)
2. Gere seus links
3. Substitua `https://SEU-LINK-AMAZON` no `content.json`

### Mercado Livre
1. Acesse [Mercado Livre Partners](https://partners.mercadolivre.com.br)
2. Configure sua conta
3. Atualize os links no admin

### Outros Marketplaces
- **Magazine Luiza**: [Afiliados Magalu](https://afiliados.magazineluiza.com.br)
- **Americanas**: [Americanas Partners](https://partners.americanas.com)
- **Shopee**: [Shopee Affiliate](https://affiliate.shopee.com.br)
- **AliExpress**: [AliExpress Portals](https://portals.aliexpress.com)

## 📊 SEO e Performance

### Otimizações Incluídas
- ✅ Meta tags otimizadas
- ✅ Open Graph para redes sociais
- ✅ Lazy loading de imagens
- ✅ Compressão de assets
- ✅ Schema markup
- ✅ Sitemap automático

### Melhorar Performance
1. Otimize imagens (WebP, tamanhos adequados)
2. Use CDN para assets estáticos
3. Configure cache no servidor
4. Monitore Core Web Vitals

## 🎨 Personalização Visual

### Cores Padrão
- **Primária**: Azul (#0d6efd)
- **Secundária**: Laranja (#ff7a00)
- **Background**: Branco com overlay

### Alterar Cores
1. Via admin: Painel → Configurações → Cores
2. Via código: Edite `content.json` → `branding`

### Fontes Disponíveis
- Inter (padrão)
- Geist Sans
- Roboto
- Fira Code

## 📱 Funcionalidades Especiais

### Scroll Memory
- Mantém posição ao voltar de categorias
- Navegação fluida entre seções
- Experiência de usuário aprimorada

### Mesma Aba
- Todos os links abrem na mesma aba
- Melhor para SEO e retenção
- Configurável por link

### Responsividade
- Design mobile-first
- Breakpoints otimizados
- Touch-friendly em dispositivos móveis

## 🔒 Segurança

### Senha Admin
**IMPORTANTE**: Altere a senha padrão antes do deploy!

1. Edite `content.json` → `admin.password`
2. Ou configure via variável de ambiente:
```bash
ADMIN_PASSWORD=sua_senha_segura
```

### Variáveis de Ambiente
Crie arquivo `.env.local`:
```
ADMIN_PASSWORD=sua_senha_segura
CONTACT_EMAIL=seu@email.com
```

## 📞 Suporte

### Problemas Comuns

**Imagem de fundo não aparece**
- Verifique se a URL está acessível
- Confirme formato de imagem (JPG, PNG, WebP)

**Links de afiliado não funcionam**
- Teste os links individualmente
- Verifique se estão ativos nos programas

**Admin não funciona**
- Confirme a senha
- Verifique console do navegador

### Contato
- 📧 Email: contato@meusdescontosonline.com
- 💬 WhatsApp: [Configurar no content.json]
- 📱 Instagram: [Configurar no content.json]

## 📄 Licença

Este projeto é de uso livre para fins comerciais e pessoais.

---

**Desenvolvido com ❤️ para o público feminino brasileiro**