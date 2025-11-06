"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
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

export default function GamesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <motion.div 
        className="text-center space-y-3 sm:space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-fluid-4xl font-bold">Games</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-fluid-base">
          Take a break with our collection of games
        </p>
      </motion.div>

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
                  <h2 className="text-lg sm:text-xl font-semibold mb-2">{game.name}</h2>
                  <p className="text-muted-foreground text-sm sm:text-base">{game.description}</p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}