"use client"

import { CommandMenu } from './command-menu'
import { Logo } from './logo'
import { ThemeToggle } from './theme/theme-toggle'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { Button } from './ui/button'

export function Navigation() {
  return (
    <nav className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="flex-1 hidden md:flex justify-center px-4 max-w-2xl mx-auto">
            <CommandMenu />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hidden sm:inline-flex min-h-touch min-w-touch"
            >
              <Link href="/contribute" aria-label="Contribute on GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}