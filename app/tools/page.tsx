"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useTools } from "@/lib/tools-context"
import { SearchFilter } from "@/components/search-filter"
import { ContentGrid } from "@/components/content-grid"
import type { ContentItem } from "@/components/content-grid"

export default function ToolsPage() {
  const { categories } = useTools()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterValue, setFilterValue] = useState("all")

  // Create filter options from categories
  const filterOptions = useMemo(() => {
    const options = [{ value: "all", label: "All Categories" }]
    categories.forEach(category => {
      options.push({ value: category.name.toLowerCase(), label: category.name })
    })
    options.push({ value: "available", label: "Available Only" })
    options.push({ value: "coming-soon", label: "Coming Soon" })
    return options
  }, [categories])

  // Convert tools to ContentItem format with category info
  const toolItems: ContentItem[] = useMemo(() => {
    const items: ContentItem[] = []
    categories.forEach(category => {
      category.items.forEach(tool => {
        items.push({
          ...tool,
          category: category.name.toLowerCase()
        })
      })
    })
    return items
  }, [categories])

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    let filtered = toolItems

    // Apply category filter
    if (filterValue !== "all") {
      if (filterValue === "available") {
        filtered = filtered.filter(tool => !tool.comingSoon && !tool.wip)
      } else if (filterValue === "coming-soon") {
        filtered = filtered.filter(tool => tool.comingSoon)
      } else {
        filtered = filtered.filter(tool => tool.category === filterValue)
      }
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [toolItems, searchQuery, filterValue])

  const totalTools = toolItems.length
  const availableTools = toolItems.filter(t => !t.comingSoon && !t.wip).length

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
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>{totalTools} Total Tools</span>
          <span>•</span>
          <span>{availableTools} Available</span>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
        filterOptions={filterOptions}
        filterLabel="Category"
        placeholder="Search tools..."
      />

      {/* Show unified results when searching or filtering */}
      {(searchQuery || filterValue !== "all") && (
        <div className="space-y-4 sm:space-y-6">
          <div className="px-4">
            <p className="text-muted-foreground text-sm">
              Found {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
            </p>
          </div>
          <ContentGrid 
            items={filteredTools}
            emptyMessage="No tools match your search. Try different keywords or filters."
          />
        </div>
      )}

      {/* Show categorized tools when not searching */}
      {!searchQuery && filterValue === "all" && (
        <>
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex items-center gap-2 px-4">
                <h2 className="text-fluid-2xl font-semibold">{category.name}</h2>
                <span className="text-muted-foreground text-sm">({category.items.length})</span>
              </div>
              <ContentGrid 
                items={category.items.map(tool => ({ ...tool, category: category.name.toLowerCase() }))}
              />
            </motion.div>
          ))}
        </>
      )}
    </div>
  )
}