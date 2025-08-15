'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

const Confetti = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = [
      "#10b981",
      "#3b82f6",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
    ];
    const newParticles = Array.from({ length: 60 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.5
      const velocity = 3 + Math.random() * 4
      return {
        id: i,
        x: 50, // Start from center
        y: 50, // Start from center
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      }
    })
    setParticles(newParticles)

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1, // Add gravity
        })),
      )
    }

    const interval = setInterval(animateParticles, 50);
    const timeout = setTimeout(() => clearInterval(interval), 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full transition-all duration-75"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: Math.max(0, 1 - (Math.abs(particle.x - 50) + Math.abs(particle.y - 50)) / 100),
            transform: `rotate(${particle.x * 2}deg)`,
          }}
        />
      ))}
    </div>
  )
};

const Page = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Confetti />
      <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-violet-50 via-white to-blue-50">
        <div
          className={`max-w-md w-full transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center space-y-6">
              {/* Success Icon */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-violet-400 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  🎉 Billing Success
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full mx-auto"></div>
              </div>

              {/* Success Message */}
              <div className="space-y-3">
                <p className="text-lg text-gray-700 font-medium">
                  Congratulations! Your pro account has activated
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Checkout was successful and the premium features are now
                  available for you to enjoy. Thank you for your trust! ✨
                </p>
              </div>

              {/* Features List */}
              <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  What can you do now:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-violet-500">✓</span>
                    <span>Unlock AI-powered resume creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-500">✓</span>
                    <span>Export PDF on high quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-500">✓</span>
                    <span>Create more resumes</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link
                    href="/resumes"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Start to make resumes</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>

              {/* Additional Info */}
              <p className="text-xs text-gray-500 pt-2">
                Congratulations! You&apos;ve unlocked the key to a successful
                career. Start creating stunning resumes now!
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Page;
