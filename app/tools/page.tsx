"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useTools } from "@/lib/tools-context"

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

export default function ToolsPage() {
  const { categories } = useTools()

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
      <motion.div
        className="text-center space-y-3 sm:space-y-4 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-fluid-4xl font-bold">Tools Arsenal</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-fluid-base">
          Discover our collection of powerful tools designed to enhance your workflow
        </p>
      </motion.div>

      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          <h2 className="text-fluid-2xl font-semibold px-4">{category.name}</h2>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4"
          >
            {category.items.map((tool) => (
              <motion.div key={tool.path} variants={item}>
                <Link href={tool.comingSoon ? "#" : tool.path}>
                  <Card className="p-5 sm:p-6 glass glass-hover group space-y-3 sm:space-y-4 h-full min-h-touch">
                    <div className="flex items-center justify-between">
                      <tool.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-accent transition-colors" />
                      {tool.comingSoon && (
                        <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
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
      ))}
    </div>
  )
}