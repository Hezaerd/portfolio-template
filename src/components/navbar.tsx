"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Home, User, Briefcase, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { trackNavigation } from "@/lib/analytics";
import { useContactConfig } from "../stores/portfolio-store";

const baseNavigationItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Resume", href: "#resume", icon: FileText },
  { name: "Contact", href: "#contact", icon: Mail },
];

// Custom hook to track active section
function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Adjust these margins to fine-tune when sections become active
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[id]");
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return activeSection;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const activeSection = useActiveSection();
  const contactConfig = useContactConfig();
  const navItemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const navListRef = useRef<HTMLUListElement>(null);

  // Filter navigation items based on contact config
  const navigationItems = baseNavigationItems.filter(item => {
    if (item.name === "Contact" && contactConfig.service === "none") {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update underline position when active section changes
  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeNavItem = navItemRefs.current[activeSection];
      const navList = navListRef.current;

      if (activeNavItem && navList) {
        const navListRect = navList.getBoundingClientRect();
        const activeItemRect = activeNavItem.getBoundingClientRect();

        const left = activeItemRect.left - navListRect.left;
        const width = activeItemRect.width;

        setUnderlineStyle({
          left: left,
          width: width,
        });
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(updateUnderlinePosition, 10);

    return () => clearTimeout(timeoutId);
  }, [activeSection]);

  // Set initial position on mount
  useEffect(() => {
    const setInitialPosition = () => {
      const homeNavItem = navItemRefs.current["home"];
      const navList = navListRef.current;

      if (homeNavItem && navList) {
        const navListRect = navList.getBoundingClientRect();
        const homeItemRect = homeNavItem.getBoundingClientRect();

        const left = homeItemRect.left - navListRect.left;
        const width = homeItemRect.width;

        setUnderlineStyle({
          left: left,
          width: width,
        });
      }
    };

    // Wait for next tick to ensure refs are set
    const timeoutId = setTimeout(setInitialPosition, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace("#", "");
    trackNavigation(sectionId);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    return activeSection === href.replace("#", "");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-all duration-300"
            >
              Portfolio
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList
                ref={navListRef}
                className="space-x-1 relative"
              >
                {navigationItems.map(item => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink
                      ref={el => {
                        if (el) {
                          navItemRefs.current[item.href.replace("#", "")] = el;
                        }
                      }}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-300",
                        isActive(item.href) && "text-primary"
                      )}
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {/* Sliding underline */}
                <div
                  className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{
                    left: `${underlineStyle.left}px`,
                    width: `${underlineStyle.width}px`,
                    transform: "translateY(-2px)", // Move it slightly up from the very bottom
                  }}
                />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Theme Toggle and CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {contactConfig.service !== "none" && (
              <Button
                onClick={() => {
                  trackNavigation("contact");
                  scrollToSection("#contact");
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-2xl font-bold text-primary">
                      Portfolio
                    </span>
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    Portfolio Navigation
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {navigationItems.map(item => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left h-12 px-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300 relative",
                          isActive(item.href) &&
                            "bg-accent text-accent-foreground border-l-2 border-primary"
                        )}
                        onClick={() => scrollToSection(item.href)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                        {isActive(item.href) && (
                          <span className="absolute right-3 w-2 h-2 bg-primary rounded-full" />
                        )}
                      </Button>
                    );
                  })}
                  <div className="pt-6 space-y-4 border-t border-border">
                    <div className="flex items-center justify-between py-2 px-4">
                      <span className="text-sm font-medium text-foreground">
                        Theme
                      </span>
                      <div className="flex items-center">
                        <ThemeToggle />
                      </div>
                    </div>
                    {contactConfig.service !== "none" && (
                      <div className="px-4">
                        <Button
                          onClick={() => scrollToSection("#contact")}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-300"
                        >
                          Get In Touch
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
