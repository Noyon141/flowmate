"use client";

import { ModeToggle } from "@/components/dark-mode/Mode-Toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Navigation items configuration
const navigationItems = [
  {
    title: "Features",
    href: "/features",
    description: "Discover powerful tools for your team",
    items: [
      {
        title: "AI Automation",
        href: "/features/automation",
        description: "Intelligent workflow automation",
      },
      {
        title: "Team Collaboration",
        href: "/features/collaboration",
        description: "Real-time team collaboration tools",
      },
      {
        title: "Analytics",
        href: "/features/analytics",
        description: "Advanced insights and reporting",
      },
    ],
  },
  {
    title: "Solutions",
    href: "/solutions",
    description: "Solutions for different team sizes",
    items: [
      {
        title: "For Startups",
        href: "/solutions/startups",
        description: "Perfect for growing teams",
      },
      {
        title: "For Enterprises",
        href: "/solutions/enterprise",
        description: "Scale with confidence",
      },
      {
        title: "For Agencies",
        href: "/solutions/agencies",
        description: "Manage multiple clients",
      },
    ],
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Simple, transparent pricing",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about Flowmate",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Image
            src="/assets/images/flowmate-logo.png"
            alt="Flowmate Logo"
            width={60}
            height={60}
            className="dark:hidden"
          />
          <Image
            src="/assets/images/flowmate-dark-logo.png"
            alt="Flowmate Logo"
            width={60}
            height={60}
            className="hidden dark:block"
          />
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Flowmate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                        {item.items.map((subItem) => (
                          <NavigationMenuLink key={subItem.title} asChild>
                            <Link
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 focus:bg-slate-100 dark:focus:bg-slate-800 focus:text-slate-900 dark:focus:text-slate-100"
                            >
                              <div className="text-sm font-medium leading-none text-slate-900 dark:text-slate-100">
                                {subItem.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-600 dark:text-slate-400">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <ModeToggle />
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigationItems.map((item) => (
              <div key={item.title} className="space-y-2">
                <Link
                  href={item.href}
                  className="block text-sm font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
                {item.items && (
                  <div className="ml-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="block text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col space-y-3">
              <div className="flex items-center justify-between space-x-4 px-2">
                <UserButton />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
