"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Heart, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by developers for everyone. Your contributions help shape the future of astraa"
  },
  {
    icon: Zap,
    title: "Open Source",
    description: "Fully open source and free to use. Inspect the code, suggest improvements, or add new features."
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every feature is crafted with attention to detail and a focus on user experience."
  }
]

export default function ContributePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <motion.div 
        className="text-center space-y-3 sm:space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-fluid-4xl font-bold">Contribute to astraa</h1>
        <p className="text-muted-foreground text-fluid-base">
          Help us make astraa better for everyone
        </p>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3 px-4">
        {features.map((feature) => (
          <Card key={feature.title} className="p-5 sm:p-6 glass glass-hover h-full">
            <feature.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{feature.description}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 sm:p-8 text-center mx-4">
        <h2 className="text-fluid-2xl font-bold mb-3 sm:mb-4">Ready to Contribute?</h2>
        <p className="text-muted-foreground mb-5 sm:mb-6 text-fluid-base">
          Check out our GitHub repository to get started. Every contribution counts!
        </p>
        <Button asChild className="min-h-touch">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="gap-2"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </Card>
    </div>
  )
}