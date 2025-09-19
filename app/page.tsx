import { ModeToggle } from "@/components/dark-mode/Mode-Toggle";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">

      <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-6xl mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Left side - Hero Content */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8 px-1 sm:px-2 lg:px-8">
            {/* Logo for mobile */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-4">
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

            {/* Logo for desktop */}
            <div className="hidden lg:flex items-center space-x-3">
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

            <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                The Future of
                <span className="block text-blue-600 dark:text-blue-400">
                  AI-Powered Teamwork
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Transform your team&apos;s productivity with intelligent
                automation and seamless collaboration designed for modern remote
                teams.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center lg:items-start">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 text-base"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href="/sign-in" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium px-6 py-3 text-base"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Feature highlights for mobile */}
            <div className="lg:hidden flex items-center justify-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex-wrap gap-y-2">
              <span className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>AI-powered</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Real-time sync</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Analytics</span>
              </span>
            </div>
          </div>

          {/* Right side - Features */}
          <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Why teams choose Flowmate
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Smart Automation
                      </h4>
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
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Real-time Collaboration
                      </h4>
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
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        Advanced Analytics
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Make data-driven decisions with detailed insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Trusted by teams worldwide
              </p>
              <div className="flex items-center justify-center space-x-6 text-slate-400 dark:text-slate-500">
                <span className="text-sm font-medium">10,000+ Teams</span>
                <span className="text-sm font-medium">50+ Countries</span>
                <span className="text-sm font-medium">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
