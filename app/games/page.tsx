"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { games } from "@/lib/games"
import { SearchFilter } from "@/components/search-filter"
import { ContentGrid } from "@/components/content-grid"
import type { ContentItem } from "@/components/content-grid"

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValue, setFilterValue] = useState("all")

  // Convert games to ContentItem format
  const gameItems: ContentItem[] = useMemo(() => 
    games.map(game => ({
      ...game,
      category: "game"
    })), 
    []
  )

  // Filter games based on search and availability
  const filteredGames = useMemo(() => {
    let filtered = gameItems

    // Apply availability filter
    if (filterValue === "available") {
      filtered = filtered.filter(game => !game.comingSoon)
    } else if (filterValue === "coming-soon") {
      filtered = filtered.filter(game => game.comingSoon)
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [gameItems, searchQuery, filterValue])

  const filterOptions = [
    { value: "all", label: "All Games" },
    { value: "available", label: "Available" },
    { value: "coming-soon", label: "Coming Soon" }
  ]

  const availableCount = gameItems.filter(g => !g.comingSoon).length
  const comingSoonCount = gameItems.filter(g => g.comingSoon).length

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
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>{availableCount} Available</span>
          <span>•</span>
          <span>{comingSoonCount} Coming Soon</span>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={filterOptions}
        filterLabel="Status"
        placeholder="Search games..."
      />

      {/* Results count */}
      {(searchQuery || filterValue !== "all") && (
        <div className="px-4">
          <p className="text-muted-foreground text-sm">
            Found {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
          </p>
        </div>
      )}

      {/* Games Grid */}
      <ContentGrid 
        items={filteredGames}
        emptyMessage="No games match your search. Try different keywords or filters."
      />
    </div>
  )
}