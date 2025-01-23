"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative flex w-full items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block text-lg font-bold">{siteConfig.name}</span>
      </Link>

      {/* Burger icon for mobile screens */}
      <button
        className="block md:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-black dark:text-white" />
        ) : (
          <Menu className="h-6 w-6 text-black dark:text-white" />
        )}
      </button>

      {/* Navigation menu */}
      <nav
        className={cn(
          "absolute left-0 top-full z-10 w-full flex-col bg-background md:static md:w-auto md:flex-row md:items-center",
          "transition-all duration-300 ease-in-out",
          isMenuOpen ? "flex" : "hidden md:flex"
        )}
      >
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "block w-full px-4 py-2 text-md rounded-md font-medium text-muted-foreground md:px-2 md:py-1 md:whitespace-nowrap",
                  "transition-colors hover:bg-accent hover:text-accent-foreground",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
    </div>
  )
}