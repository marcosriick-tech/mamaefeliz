'use client'

import { useEffect } from 'react'

export function useScrollMemory() {
  useEffect(() => {
    // Configurar scroll restoration manual
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      
      // Restaurar posição salva
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
      
      // Event listeners
      window.addEventListener('beforeunload', saveScrollPosition)
      window.addEventListener('pagehide', saveScrollPosition)
      
      // Cleanup
      return () => {
        window.removeEventListener('beforeunload', saveScrollPosition)
        window.removeEventListener('pagehide', saveScrollPosition)
      }
    }
  }, [])
  
  const saveCurrentPosition = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
  }
  
  const restorePosition = () => {
    if (typeof window !== 'undefined') {
      const savedScroll = sessionStorage.getItem('scrollPosition')
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll))
        }, 100)
      }
    }
  }
  
  const clearPosition = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('scrollPosition')
    }
  }
  
  return {
    saveCurrentPosition,
    restorePosition,
    clearPosition
  }
}

export default useScrollMemory