import { SignIn } from '@clerk/clerk-react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-base-200">
      <div className="w-full max-w-md px-4">
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
              card: 'bg-base-100 shadow-xl shadow-base-content/5 border border-base-300/50 rounded-2xl',
              headerTitle: 'text-base-content',
              headerSubtitle: 'text-base-content/60',
              formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-content rounded-xl shadow-md shadow-primary/25 transition-all duration-200',
              formFieldInput: 'bg-base-100 border-base-300 text-base-content rounded-xl focus:border-primary focus:ring-primary',
              formFieldLabel: 'text-base-content/70',
              formFieldInputShowPasswordButton: 'text-base-content/50 hover:text-base-content',
              socialButtonsBlockButton: 'bg-base-200 border-base-300 text-base-content rounded-xl hover:bg-base-300 transition-all duration-200',
              socialButtonsBlockButtonText: 'text-base-content font-medium',
              dividerLine: 'bg-base-300',
              dividerText: 'text-base-content/50',
              footerActionLink: 'text-primary hover:text-primary/80',
              footerActionText: 'text-base-content/60',
              identityPreviewText: 'text-base-content',
              identityPreviewEditButton: 'text-primary hover:text-primary/80',
              formResendCodeLink: 'text-primary hover:text-primary/80',
              alert: 'rounded-xl',
              alertText: 'text-base-content',
            }
          }}
          routing="hash"
          fallbackRedirectUrl="/dashboard"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  )
}


