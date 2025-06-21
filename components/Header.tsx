import React from 'react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <Link href="/"  className="text-2xl cursor-pointer font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Fun4KidZ
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/programs" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Programs
            </Link>
            <Link href="/register" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
              Register
            </Link>
          </nav>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
            Enroll Now
          </Button>
        </div>
      </header>  )
}
