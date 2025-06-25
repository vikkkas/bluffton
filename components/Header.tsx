"use client"
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Heart, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = '' }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)
  
  return (
    <Link 
      href={href} 
      className={`transition-colors font-medium ${
        isActive 
          ? 'text-orange-500 font-semibold' 
          : 'text-gray-600 hover:text-orange-500'
      } ${className}`}
    >
      {children}
    </Link>
  )
  
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Programs", href: "/programs" },
  { name: "Register", href: "/register" },
]

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`top-0 z-50 bg-white ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            aria-label="Fun4KidZ Home"
          >
            Fun4KidZ
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {NAV_LINKS.map(link => (
            <NavLink key={link.href} href={link.href}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button 
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow"
          >
            Enroll Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-orange-500 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map(link => (
              <NavLink key={link.href} href={link.href} className="text-lg">
                {link.name}
              </NavLink>
            ))}
            <Button 
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 mt-2"
            >
              Enroll Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}