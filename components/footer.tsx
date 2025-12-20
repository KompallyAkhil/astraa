"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent via-background/80 to-background">
      <div className="container px-4 md:px-6 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">

          {/* Left Section */}
          <div className="space-y-2 max-w-md">
            <div className="-ml-1">
              <Logo className="text-3xl" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A collection of helpful utility tools for developers and creators,
              built with modern web technologies. Designed for speed,
              accessibility, and ease of use.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">Developed by:</span>
              <div className="flex items-center -space-x-2">
                <Link
                  href="https://github.com/puri-adityakumar"
                  target="_blank"
                  className="transition-transform hover:scale-110 hover:z-10"
                >
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarImage src="https://github.com/puri-adityakumar.png" alt="@puri-adityakumar" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                </Link>
                {/* Placeholder for second dev if needed, or just one for now as repo owner is singular */}
                {/* <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                  +1
                </div> */}
              </div>
            </div>
          </div>

          {/* Right Section Removed */}
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Astraa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}