"use client"

import { WorkInProgress } from "@/components/wip"
import { BackButton } from "@/components/back-button"

export default function SudokuGame() {
  return (
    <div>
      <BackButton />
      <WorkInProgress />
    </div>
  )
}