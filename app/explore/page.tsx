"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Gamepad2, Wrench } from "lucide-react"
import { useTools } from "@/lib/tools-context"
import { games } from "@/lib/games"
import { SearchFilter } from "@/components/search-filter"
import { ContentGrid } from "@/components/content-grid"
import type { ContentItem } from "@/components/content-grid"

export default function ExplorePage() {
  const { tools } = useTools()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValue, setFilterValue] = useState("all")

  // Combine tools and games into a single searchable list
  const allContent = useMemo(() => {
    const toolItems: ContentItem[] = tools.map(tool => ({
      ...tool,
      category: "tool"
    }))
    const gameItems: ContentItem[] = games.map(game => ({
      ...game,
      category: "game"
    }))
    return [...toolItems, ...gameItems]
  }, [tools])

  // Filter content based on search and filter
  const filteredContent = useMemo(() => {
    let filtered = allContent

    // Apply category filter
    if (filterValue !== "all") {
      filtered = filtered.filter(item => item.category === filterValue)
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allContent, searchQuery, filterValue])

  // Separate filtered content by type
  const filteredTools = filteredContent.filter(item => item.category === "tool")
  const filteredGames = filteredContent.filter(item => item.category === "game")

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "tool", label: "Tools" },
    { value: "game", label: "Games" }
  ]

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

      {/* Search and Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={filterOptions}
        filterLabel="Category"
        placeholder="Search tools and games..."
      />

      {/* Show all content when searching or filtering */}
      {(searchQuery || filterValue !== "all") && (
        <div className="space-y-4 sm:space-y-6">
          <div className="px-4">
            <p className="text-muted-foreground text-sm">
              Found {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <ContentGrid 
            items={filteredContent}
            emptyMessage="No items match your search. Try different keywords or filters."
          />
        </div>
      )}

      {/* Show categorized content when not searching */}
      {!searchQuery && filterValue === "all" && (
        <>
          {/* Tools Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-2 px-4">
              <Wrench className="h-5 w-5 sm:h-6 sm:w-6" />
              <h2 className="text-fluid-2xl font-semibold">Tools</h2>
              <span className="text-muted-foreground text-sm">({tools.length})</span>
            </div>
            <ContentGrid items={filteredTools} />
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
              <span className="text-muted-foreground text-sm">({games.length})</span>
            </div>
            <ContentGrid items={filteredGames} />
          </motion.div>
        </>
      )}
    </div>
  )
}