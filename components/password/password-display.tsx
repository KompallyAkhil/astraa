"use client"

import { cn } from "@/lib/utils"

interface PasswordDisplayProps {
  password: string
}

export function PasswordDisplay({ password }: PasswordDisplayProps) {
  return (
    <div className="w-full">
      <div className={cn(
        "relative flex items-center justify-center min-h-[120px] p-6 rounded-lg transition-all duration-200",
        "bg-background border-2 border-border/60",
        "hover:border-primary/20 hover:shadow-sm"
      )}>
        {password ? (
          <div className="text-3xl sm:text-4xl font-mono font-medium tracking-wide text-center break-all text-foreground animate-in fade-in zoom-in-50 duration-200">
            {password}
          </div>
        ) : (
          <div className="text-lg text-muted-foreground/40 font-medium">
            Generate a password
          </div>
        )}
      </div>
    </div>
  )
}