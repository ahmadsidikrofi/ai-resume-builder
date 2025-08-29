"use client"

import { useEffect, useState } from "react"

export function ResumeLoading({ message = "Creating your resume...", className = "" }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [typedText, setTypedText] = useState("")

  const steps = [
    "Analyzing your experience",
    "Optimizing content with AI",
    "Formatting your resume",
    "Finalizing details",
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2000)

    return () => clearInterval(stepInterval)
  }, [])

  useEffect(() => {
    const text = steps[currentStep]
    setTypedText("")

    let i = 0
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentStep])

  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] space-y-8 ${className}`}>
      {/* Main Animation Container */}
      <div className="relative">
        {/* Floating Sparkles */}
        <div className="absolute -top-4 -left-4 w-3 h-3 bg-accent rounded-full animate-[sparkle_2s_ease-in-out_infinite]" />
        <div className="absolute -top-2 -right-6 w-2 h-2 bg-secondary rounded-full animate-[sparkle_2s_ease-in-out_infinite_0.5s]" />
        <div className="absolute -bottom-4 -right-2 w-3 h-3 bg-primary rounded-full animate-[sparkle_2s_ease-in-out_infinite_1s]" />
        <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-accent rounded-full animate-[sparkle_2s_ease-in-out_infinite_1.5s]" />

        {/* Document Container */}
        <div className="relative bg-card border-2 border-border rounded-lg shadow-lg p-6 w-80 h-96 animate-[float_3s_ease-in-out_infinite]">
          {/* Document Header */}
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-gradient-to-r from-violet-800 to-blue-400 rounded animate-[documentWrite_3s_ease-in-out_infinite]" />
            <div className="h-3 bg-muted rounded animate-[documentWrite_3s_ease-in-out_infinite_0.5s] w-3/4" />
            <div className="h-3 bg-muted rounded animate-[documentWrite_3s_ease-in-out_infinite_1s] w-1/2" />
          </div>

          {/* Document Lines */}
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-2 bg-muted-foreground/20 rounded animate-[documentWrite_3s_ease-in-out_infinite]`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  width: i % 3 === 0 ? "100%" : i % 2 === 0 ? "80%" : "90%",
                }}
              />
            ))}
          </div>

          {/* AI Brain Icon */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center animate-[aiPulse_2s_ease-in-out_infinite]">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-80 space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-violet-800 to-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{message}</h3>
        <p className="text-muted-foreground min-h-[24px] font-mono">
          {typedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full animate-[float_4s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
