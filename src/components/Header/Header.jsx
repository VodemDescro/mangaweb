import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(() => {
    const saved = localStorage.getItem('menu')
    return saved === 'true'
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    const newState = !menuOpen
    setMenuOpen(newState)
    localStorage.setItem('menu', newState)
  }

  return (
    <nav
      className={`fixed w-full transition-colors duration-300 z-50 ${
        scrolled
          ? 'bg-[#EDF2FB] dark:bg-[#051923] border-b border-[#051923] dark:border-[#EDF2FB]'
          : 'bg-transparent border-b-0'
      }`}
    >
      <div className="flex items-center justify-between p-2 px-[16px] w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="h-[56px] flex items-center">
            <img
              src="/DarkLogo.svg"
              alt="Website Logo Light"
              className="h-[80px] w-auto block dark:hidden"
            />
            <img
              src="/LightLogo.svg"
              alt="Website Logo Dark"
              className="h-[80px] w-auto hidden dark:block"
            />
          </Link>
        </div>

        <div className="flex justify-end items-center space-x-4 w-[800px]">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Header
