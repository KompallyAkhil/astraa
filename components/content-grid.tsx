"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export interface ContentItem {
  name: string
  description: string
  path: string
  icon: LucideIcon
  wip?: boolean
  comingSoon?: boolean
  category?: string
}

interface ContentGridProps {
  items: ContentItem[]
  emptyMessage?: string
}

export function ContentGrid({ items, emptyMessage = "No items found" }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4"
    >
      {items.map((contentItem) => (
        <motion.div key={contentItem.path} variants={item}>
          <Link href={contentItem.comingSoon ? "#" : contentItem.path}>
            <Card className="p-5 sm:p-6 glass glass-hover group space-y-3 sm:space-y-4 h-full min-h-touch">
              <div className="flex items-center justify-between">
                <contentItem.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-accent transition-colors" />
                <div className="flex gap-2">
                  {contentItem.wip && (
                    <Badge variant="secondary" className="text-xs">Work in Progress</Badge>
                  )}
                  {contentItem.comingSoon && (
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{contentItem.name}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{contentItem.description}</p>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
