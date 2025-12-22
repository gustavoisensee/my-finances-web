import { SignIn } from '@clerk/clerk-react'
import { Wallet, TrendingUp, PiggyBank, Target } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-base-200 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center gap-12 px-4 py-8 relative z-10">
        {/* Left Side - Branding & Features */}
        <div className="w-full max-w-md lg:max-w-lg space-y-8">
          {/* Brand Header */}
          <div className="text-center lg:text-left space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-base-content">
                My Finances
              </h1>
            </div>
            <p className="text-lg text-base-content/70 max-w-md">
              Take control of your financial future with smart budgeting and insightful reports
            </p>
          </div>

          {/* Feature Cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-600/10 p-5 border border-emerald-500/20 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-emerald-500/20 p-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <h3 className="font-semibold text-base-content mb-1">Track Income</h3>
              <p className="text-sm text-base-content/60">Monitor your earnings and growth</p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 p-5 border border-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-violet-500/20 p-2">
                  <PiggyBank className="h-5 w-5 text-violet-500" />
                </div>
              </div>
              <h3 className="font-semibold text-base-content mb-1">Save Smart</h3>
              <p className="text-sm text-base-content/60">Build your savings effortlessly</p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 p-5 border border-amber-500/20 col-span-2 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-xl bg-amber-500/20 p-2">
                  <Target className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <h3 className="font-semibold text-base-content mb-1">Budget & Plan</h3>
              <p className="text-sm text-base-content/60">Set goals and stay on track with detailed insights</p>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              variables: {
                colorPrimary: '#6366f1',
                colorText: 'inherit',
                colorTextSecondary: 'inherit',
                colorBackground: 'transparent',
                borderRadius: '0.75rem',
                fontFamily: 'inherit',
              },
              elements: {
                rootBox: 'w-full',
                card: 'bg-base-100 shadow-2xl shadow-base-content/10 border border-base-300/50 rounded-2xl backdrop-blur-sm',
                headerTitle: 'text-base-content font-bold text-2xl',
                headerSubtitle: 'text-base-content/60',
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-content rounded-xl shadow-lg shadow-primary/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                formFieldInput: 'bg-base-100 border-base-300 text-base-content rounded-xl focus:border-primary focus:ring-primary transition-all',
                formFieldLabel: 'text-base-content/70 font-medium',
                formFieldInputShowPasswordButton: 'text-base-content/50 hover:text-base-content transition-colors',
                socialButtonsBlockButton: 'bg-base-200 border-base-300 text-base-content rounded-xl hover:bg-base-300 hover:border-base-content/20 transition-all duration-200 hover:shadow-md relative',
                socialButtonsBlockButtonText: 'text-base-content font-medium',
                socialButtonsIconButton: 'rounded-xl',
                socialButtonsProviderIcon: 'w-5 h-5',
                dividerLine: 'bg-base-300',
                dividerText: 'text-base-content/50 text-sm',
                footerActionLink: 'text-primary hover:text-primary/80 font-medium transition-colors',
                footerActionText: 'text-base-content/60',
                identityPreviewText: 'text-base-content',
                identityPreviewEditButton: 'text-primary hover:text-primary/80 transition-colors',
                formResendCodeLink: 'text-primary hover:text-primary/80 transition-colors',
                alert: 'rounded-xl border border-error/20 bg-error/10',
                alertText: 'text-base-content',
                badge: 'bg-primary/10 text-primary border border-primary/20 rounded-lg',
                identityPreview: 'rounded-xl bg-base-200 border border-base-300',
                identityPreviewEditButtonIcon: 'text-primary',
              }
            }}
            routing="hash"
            fallbackRedirectUrl="/dashboard"
            afterSignInUrl="/dashboard"
            afterSignUpUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}


