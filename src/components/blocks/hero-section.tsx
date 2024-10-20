'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Box, Code, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from 'react'

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5" />
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-gray-500/20 animate-pulse"
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background overflow-hidden">
      <BackgroundAnimation />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Skate
                <br />
                The Next.js 15 Starter Kit
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Kickflip your Next.js projects into high gear. Fast, flexible, and feature-packed for the modern web.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/get-started">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  View Docs
                  <Code className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className={`relative w-[300px] h-[300px] ${mounted ? 'animate-in zoom-in-50 duration-500' : ''}`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 blur-2xl opacity-25" />
              <div className="relative bg-muted border rounded-xl shadow-2xl p-6 w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="150"
                  height="150"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 17h.01" />
                  <path d="M7 7h.01" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
                  <path d="m18 16-2-2" />
                  <path d="m8 8-2-2" />
                  <path d="m6 18 12-12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center space-x-3 bg-muted rounded-lg p-4">
            <Zap className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium">Lightning-fast performance</p>
          </div>
          <div className="flex items-center space-x-3 bg-muted rounded-lg p-4">
            <Box className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium">Pre-configured components</p>
          </div>
          <div className="flex items-center space-x-3 bg-muted rounded-lg p-4">
            <Code className="h-6 w-6 text-primary" />
            <p className="text-sm font-medium">TypeScript ready</p>
          </div>
        </div>
      </div>
    </section>
  )
}