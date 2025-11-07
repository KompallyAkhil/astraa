"use client"

import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/lib/animations/hooks"

export function Footer() {
  const shouldReduce = useReducedMotion()

  return (
    <footer className="border-t border-border py-8 sm:py-12 mt-16 sm:mt-24 lg:mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors min-h-touch min-w-touch flex items-center justify-center"
                aria-label="Visit our GitHub"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={shouldReduce ? {} : { scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors min-h-touch min-w-touch flex items-center justify-center"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </motion.div>
          </div>
          
          <motion.p 
            className="text-sm sm:text-base text-muted-foreground text-center order-last md:order-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Built with ❤️ by the community
          </motion.p>
          
          <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base text-muted-foreground">
            <Link 
              href="/privacy" 
              className="hover:text-foreground transition-colors min-h-touch flex items-center"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-foreground transition-colors min-h-touch flex items-center"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}