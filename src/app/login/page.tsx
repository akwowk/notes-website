"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError("Email atau password salah")
    } else if (res?.ok) {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
      <main className="w-full max-w-sm p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-sm text-gray-500 mt-1">Aplikasi Notes</p>
        </header>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1" htmlFor="email">Email</label>
            <input 
              className="w-full h-10 px-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none text-sm" 
              id="email" 
              placeholder="nama@email.com" 
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1" htmlFor="password">Password</label>
            <input 
              className="w-full h-10 px-3 border border-gray-300 rounded focus:border-gray-900 focus:outline-none text-sm" 
              id="password" 
              placeholder="••••••••" 
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input className="w-4 h-4 border-gray-300 rounded" type="checkbox"/>
              <span className="text-gray-600">Ingat Saya</span>
            </label>
            <a className="text-gray-900 hover:underline" href="#">Lupa Password?</a>
          </div>

          <button 
            className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded transition-colors" 
            type="submit"
          >
            Masuk
          </button>
        </form>

      </main>
    </div>
  )
}