import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { Wallet, TrendingUp, PiggyBank, Target, ShieldCheck } from 'lucide-react'

import { auth } from '@/lib/firebase'

const googleProvider = new GoogleAuthProvider()

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleGoogleSignIn = async () => {
    setError(null)
    setSubmitting(true)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err
          ? (err as { code: string }).code
          : ''
      if (code === 'auth/popup-closed-by-user') return
      setError(
        code === 'auth/account-exists-with-different-credential'
          ? 'An account already exists with a different sign-in method.'
          : 'Could not sign in with Google. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-base-200 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 px-4 py-8 relative z-10">
        <div className="w-full max-w-md lg:max-w-lg space-y-8 hidden lg:block">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-base-content">My Finances</h1>
            </div>
            <p className="text-lg text-base-content/70 max-w-md">
              Take control of your financial future with smart budgeting and insightful reports
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-600/10 p-5 border border-emerald-500/20 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-emerald-500/20 p-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <h3 className="font-semibold text-base-content mb-1">Track Income</h3>
              <p className="text-sm text-base-content/60">Monitor your earnings and growth</p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 p-5 border border-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-violet-500/20 p-2">
                  <PiggyBank className="h-5 w-5 text-violet-500" />
                </div>
              </div>
              <h3 className="font-semibold text-base-content mb-1">Save Smart</h3>
              <p className="text-sm text-base-content/60">Build your savings effortlessly</p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 p-5 border border-amber-500/20 col-span-2 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-amber-500/20 p-2">
                  <Target className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <h3 className="font-semibold text-base-content mb-1">Budget & Plan</h3>
              <p className="text-sm text-base-content/60">
                Set goals and stay on track with detailed insights
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-base-100 shadow-2xl shadow-base-content/10 border border-base-300/50 rounded-2xl backdrop-blur-sm p-8 lg:p-10">
            <div className="flex items-center justify-center lg:hidden gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-base-content">My Finances</span>
            </div>

            <h2 className="text-2xl font-bold text-base-content mb-2">Welcome</h2>
            <p className="text-sm text-base-content/60 mb-8">
              Sign in to manage your budgets, track expenses, and take control of your finances.
            </p>

            {error && (
              <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-base-content mb-6">
                {error}
              </div>
            )}

            <button
              type="button"
              disabled={submitting}
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full rounded-xl gap-3 border-base-300 hover:bg-base-200 hover:border-base-300 h-12 text-base"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {submitting ? 'Signing in…' : 'Sign in with Google'}
            </button>

            <div className="divider my-8 text-base-content/30 text-xs">SECURE & PRIVATE</div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-base-content">Google Authentication</p>
                  <p className="text-xs text-base-content/50">
                    Secure sign-in powered by Firebase. We never see your password.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2 mt-0.5">
                  <Wallet className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-base-content">Your Data, Your Control</p>
                  <p className="text-xs text-base-content/50">
                    All your financial data is private and only accessible to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
