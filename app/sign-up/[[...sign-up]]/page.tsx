import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-6xl mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/images/flowmate-logo.png"
                alt="Flowmate Logo"
                width={48}
                height={48}
                className="dark:hidden"
              />
              <Image
                src="/assets/images/flowmate-dark-logo.png"
                alt="Flowmate Logo"
                width={48}
                height={48}
                className="hidden dark:block"
              />
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Flowmate
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Join thousands of teams
                <span className="block text-blue-600 dark:text-blue-400">
                  building better workflows
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Transform your team's productivity with AI-powered automation
                and intelligent collaboration tools designed for the future of
                work.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Smart Automation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Reduce manual work with intelligent task automation
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Team Collaboration
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Work together seamlessly across time zones
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  Analytics & Insights
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Make data-driven decisions with detailed reports
                </p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Trusted by teams at:
            </p>
            <div className="flex items-center space-x-6 text-slate-400 dark:text-slate-500">
              <span className="text-sm font-medium">Startups</span>
              <span className="text-sm font-medium">Agencies</span>
              <span className="text-sm font-medium">Enterprises</span>
            </div>
          </div>
        </div>

        {/* Right side - Sign Up Form */}
        <div className="flex flex-col justify-center">
          <div className="mx-auto w-full max-w-sm sm:max-w-md px-1 sm:px-2 lg:px-0">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-6 sm:mb-8">
              <Image
                src="/assets/images/flowmate-logo.png"
                alt="Flowmate Logo"
                width={40}
                height={40}
                className="dark:hidden"
              />
              <Image
                src="/assets/images/flowmate-dark-logo.png"
                alt="Flowmate Logo"
                width={40}
                height={40}
                className="hidden dark:block"
              />
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Flowmate
              </span>
            </div>

            {/* Sign up header for mobile */}
            <div className="lg:hidden text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Create your account
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Start your journey with Flowmate
              </p>
            </div>

            {/* Clerk Sign Up Component with custom styling */}
            <div className="">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full max-w-full",
                    card: "bg-transparent shadow-none border-none p-0 w-full max-w-full",
                    headerTitle:
                      "text-slate-900 dark:text-slate-100 text-lg sm:text-xl font-semibold",
                    headerSubtitle:
                      "text-slate-600 dark:text-slate-400 text-sm sm:text-base",
                    socialButtonsBlockButton:
                      "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 w-full max-w-full text-sm",
                    socialButtonsBlockButtonText:
                      "text-slate-900 dark:text-slate-100 font-medium text-sm",
                    formFieldInput:
                      "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 w-full max-w-full text-sm",
                    formFieldLabel:
                      "text-slate-700 dark:text-slate-300 font-medium text-sm",
                    formButtonPrimary:
                      "bg-blue-600 hover:bg-blue-700 text-white font-medium w-full max-w-full text-sm",
                    footerActionLink:
                      "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
                    identityPreviewText: "text-slate-700 dark:text-slate-300",
                    formFieldErrorText: "text-red-600 dark:text-red-400",
                    dividerLine: "bg-slate-200 dark:bg-slate-600",
                    dividerText: "text-slate-500 dark:text-slate-400",
                    otpCodeFieldInput:
                      "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100",
                  },
                }}
              />
            </div>

            {/* Additional info for mobile */}
            <div className="lg:hidden mt-6 sm:mt-8 text-center">
              <div className="space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 px-4">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy
                </p>
                <div className="flex items-center justify-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex-wrap gap-y-2">
                  <span className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Free trial</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>No credit card</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
