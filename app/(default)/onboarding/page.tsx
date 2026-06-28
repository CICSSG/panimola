export default function OnboardingPage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md flex-col gap-4 text-center">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
        <p className="text-muted-foreground">
          Your account is being set up. Please wait while an administrator
          completes your registration, or contact support if this takes too long.
        </p>
      </div>
    </div>
  )
}
