"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Eye, EyeOff } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Verificar si ya hay una sesión guardada
  useEffect(() => {
    const authStatus = localStorage.getItem("visionkit-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsLoading(true)
    setError("")

    // Simular una verificación de contraseña (en producción esto sería una llamada a API)
    setTimeout(() => {
      // Contraseña predefinida para demostración
      if (password === "T3lefl3z#2025") {
        setIsAuthenticated(true)
        localStorage.setItem("visionkit-auth", "authenticated")
      } else {
        setError("Contraseña incorrecta. Por favor, inténtelo de nuevo.")
      }
      setIsLoading(false)
    }, 800)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("visionkit-auth")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <Card className="w-full max-w-md shadow-lg border-blue-100">
          <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">VisionKit Architecture</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.835a2f88e5f5-tVOXVPG0Gv82ycb5xCTO3UVG5bFX86.png"
                alt="Centro de Inteligencia Artificial"
                className="h-28 mb-6"
              />

              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Acceso Restringido</h2>

            <p className="text-center text-gray-600 mb-6">
              Ingrese la contraseña para acceder al visualizador de arquitectura.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">{error}</div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Verificando..." : "Acceder"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4 text-xs text-gray-500">
            Sistema de Visualización de Arquitectura Industrial © 2024
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative">
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg border border-gray-200 transition-all"
        title="Cerrar sesión"
      >
        <Lock className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  )
}

