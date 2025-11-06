"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Gamepad2, Wrench } from "lucide-react"
import { useTools } from "@/lib/tools-context"
import { games } from "@/lib/games"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ExplorePage() {
  const { categories } = useTools()

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
      <motion.div 
        className="text-center space-y-3 sm:space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-fluid-4xl font-bold">Explore</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-fluid-base">
          Discover our collection of tools and games
        </p>
      </motion.div>

      {/* Tools Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 sm:space-y-6"
      >
        <div className="flex items-center gap-2 px-4">
          <Wrench className="h-5 w-5 sm:h-6 sm:w-6" />
          <h2 className="text-fluid-2xl font-semibold">Tools</h2>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4"
        >
          {categories[0]?.items.map((tool) => (
            <motion.div key={tool.path} variants={item}>
              <Link href={tool.path}>
                <Card className="p-5 sm:p-6 glass glass-hover group space-y-3 sm:space-y-4 h-full min-h-touch">
                  <div className="flex items-center justify-between">
                    <tool.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-accent transition-colors" />
                    {tool.wip && (
                      <Badge variant="secondary" className="text-xs">Work in Progress</Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{tool.name}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{tool.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Games Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 sm:space-y-6"
      >
        <div className="flex items-center gap-2 px-4">
          <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6" />
          <h2 className="text-fluid-2xl font-semibold">Games</h2>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4"
        >
          {games.map((game) => (
            <motion.div key={game.path} variants={item}>
              <Link href={game.path}>
                <Card className="p-5 sm:p-6 glass glass-hover group space-y-3 sm:space-y-4 h-full min-h-touch">
                  <div className="flex items-center justify-between">
                    <game.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-accent transition-colors" />
                    {game.comingSoon && (
                      <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{game.name}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">{game.description}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}