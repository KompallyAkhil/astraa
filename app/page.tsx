"use client"

import { Suspense, lazy } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Code2, Heart, Sparkles, Zap, Lightbulb, Users } from "lucide-react"

// Lazy load non-critical components for better initial load performance
const CommandMenu = lazy(() => import("@/components/command-menu").then(mod => ({ default: mod.CommandMenu })))

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 // Reduced for faster mobile animations
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3 // Faster animations for mobile
    }
  }
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools run directly in your browser - no server delays"
  },
  {
    icon: Heart,
    title: "Free Forever",
    description: "Every tool is completely free to use, no hidden costs"
  },
  {
    icon: Code2,
    title: "Open Source",
    description: "Built in the open, contributions welcome from everyone"
  },
  {
    icon: Lightbulb,
    title: "Smart Defaults",
    description: "Thoughtfully designed with sensible defaults"
  }
]

const philosophy = [
  {
    title: "Built for Everyone",
    description: "Our tools are designed to be intuitive and accessible for everyone"
  },
  {
    title: "Privacy First",
    description: "Your data never leaves your browser. No tracking, pure functionality"
  },
  {
    title: "Community Driven",
    description: "Shaped by real user feedback and community needs"
  }
]

export default function Home() {
  return (
    <div className="space-y-16 md:space-y-32">
      {/* Hero Section */}
      <motion.div 
        className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto pt-8 md:pt-20 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute -top-4 -right-4 md:-top-8 md:-right-8 text-primary"
          >
            <Sparkles className="h-4 w-4 md:h-6 md:w-6 animate-pulse" />
          </motion.div>
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="block text-foreground">Powerful Tools</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-green-400 to-green-500 dark:from-purple-500 dark:via-blue-500 dark:to-purple-500">
                अस्त्र at Your Command
              </span>
            </h1>
            <h2 className="mx-auto max-w-[600px] text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl px-4">
              Your all-in-one utility suite for everyone. Simple, powerful tools designed to make your life easier.
            </h2>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <Link href="/explore">
            <Button 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 h-12 md:h-14 min-w-[120px] touch-manipulation"
            >
              Explore All Tools
            </Button>
          </Link>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
            Press <kbd className="pointer-events-none select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">⌘</kbd> <kbd className="pointer-events-none select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">K</kbd> to discover
          </p>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 md:space-y-12 px-4"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Why Choose astraa?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Crafted with attention to detail and focused on delivering the best possible experience
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-4 md:p-6 glass glass-hover h-full">
                <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Philosophy Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8 md:space-y-12 px-4"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Philosophy</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            The principles that guide everything we build
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {philosophy.map((item, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 md:p-8 glass glass-hover text-center h-full">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contribute Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center space-y-6 md:space-y-8 px-4"
      >
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Want to Contribute?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-4">
            Join our community of developers and help make astraa even better
          </p>
        </div>

        <Card className="p-6 md:p-8 glass max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            <Users className="h-10 w-10 md:h-12 md:w-12 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Open Source Community</h3>
              <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
                Whether you're fixing bugs, adding features, or improving documentation - every contribution matters
              </p>
              <Button 
                asChild 
                className="h-10 md:h-11 px-4 md:px-6 text-sm md:text-base min-w-[100px] touch-manipulation"
              >
                <Link href="/contribute" className="gap-2">
                  Get Started
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Lazy load command menu for better performance */}
      <Suspense fallback={null}>
        <CommandMenu />
      </Suspense>
    </div>
  )
}