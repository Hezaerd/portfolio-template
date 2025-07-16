"use client";

import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit3,
  Trash2,
  ChevronUp,
  ChevronDown,
  Settings,
  GripVertical,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface Position {
  x: number;
  y: number;
  corner: Corner;
}

export const EditOnboarding = () => {
  const { resetOnboarding, setIsOnboardingOpen, currentStep } =
    useOnboardingContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: 16,
    y: 16,
    corner: "bottom-right",
  });
  const [tempPosition, setTempPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isDev = process.env.NODE_ENV === "development";

  // Load saved position from localStorage
  useEffect(() => {
    if (isDev) {
      const savedPosition = localStorage.getItem("dev-tools-position");
      const collapsedState = localStorage.getItem("dev-tools-collapsed");

      if (savedPosition) {
        try {
          const parsedPosition = JSON.parse(savedPosition);
          setPosition(parsedPosition);
        } catch (error) {
          console.error("Failed to parse saved position:", error);
        }
      }

      if (collapsedState === "true") {
        setIsCollapsed(true);
      }
    }
  }, [isDev]);

  // Save position and collapsed state to localStorage
  useEffect(() => {
    if (isDev) {
      localStorage.setItem("dev-tools-position", JSON.stringify(position));
      localStorage.setItem("dev-tools-collapsed", isCollapsed.toString());
    }
  }, [position, isCollapsed, isDev]);

  // Calculate position based on corner and offset
  const getAbsolutePosition = useCallback(
    (pos: Position) => {
      if (typeof window === "undefined") return { x: 16, y: 16 };

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Get actual dimensions from the element if available, otherwise use approximations
      const cardWidth = cardRef.current?.offsetWidth || 320;
      const cardHeight = cardRef.current?.offsetHeight || (isCollapsed ? 80 : 240);

      switch (pos.corner) {
        case "top-left":
          return { x: pos.x, y: pos.y };
        case "top-right":
          return { x: windowWidth - cardWidth - pos.x, y: pos.y };
        case "bottom-left":
          return { x: pos.x, y: windowHeight - cardHeight - pos.y };
        case "bottom-right":
          return {
            x: windowWidth - cardWidth - pos.x,
            y: windowHeight - cardHeight - pos.y,
          };
        default:
          return { x: pos.x, y: pos.y };
      }
    },
    [isCollapsed]
  );

  // Find which corner is closest to given coordinates
  const findClosestCorner = useCallback(
    (x: number, y: number): Corner => {
      if (typeof window === "undefined") return "bottom-right";

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Get actual dimensions from the element if available, otherwise use approximations
      const cardWidth = cardRef.current?.offsetWidth || 320;
      const cardHeight = cardRef.current?.offsetHeight || (isCollapsed ? 80 : 240);

      // Calculate distances to each corner
      const corners = [
        { corner: "top-left" as Corner, distance: Math.sqrt(x * x + y * y) },
        {
          corner: "top-right" as Corner,
          distance: Math.sqrt((windowWidth - x - cardWidth) ** 2 + y * y),
        },
        {
          corner: "bottom-left" as Corner,
          distance: Math.sqrt(x * x + (windowHeight - y - cardHeight) ** 2),
        },
        {
          corner: "bottom-right" as Corner,
          distance: Math.sqrt(
            (windowWidth - x - cardWidth) ** 2 +
              (windowHeight - y - cardHeight) ** 2
          ),
        },
      ];

      // Find closest corner
      const closest = corners.reduce((prev, current) =>
        current.distance < prev.distance ? current : prev
      );

      return closest.corner;
    },
    [isCollapsed]
  );

  // Animate to closest corner
  const slideToCorner = useCallback(
    (dragX: number, dragY: number) => {
      const closestCorner = findClosestCorner(dragX, dragY);
      setIsAnimating(true);
      setTempPosition(null);
      setPosition({ x: 16, y: 16, corner: closestCorner });

      // Reset animation state after animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    [findClosestCorner]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Update temporary position during drag
      setTempPosition({ x: newX, y: newY });
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && tempPosition) {
      // Slide to closest corner when drag ends
      slideToCorner(tempPosition.x, tempPosition.y);
    }
    setIsDragging(false);
  }, [isDragging, tempPosition, slideToCorner]);

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleEditOnboarding = () => {
    localStorage.setItem("onboarding-last-step", currentStep.toString());
    setIsOnboardingOpen(true);
  };

  const handleResetOnboarding = () => {
    localStorage.removeItem("onboarding-last-step");
    resetOnboarding();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isDev) {
    return null;
  }

  // Use temporary position during drag, otherwise use saved position
  const currentPosition = tempPosition || getAbsolutePosition(position);

  return (
    <motion.div
      ref={cardRef}
      className="fixed z-50 select-none"
      style={{
        left: 0,
        top: 0,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: currentPosition.x,
        y: currentPosition.y,
      }}
      transition={{
        duration: isDragging ? 0 : isAnimating ? 0.3 : 0.3,
        type: isAnimating ? "spring" : "tween",
        damping: 25,
        stiffness: 200,
      }}
    >
      <Card className="w-80 shadow-lg border-2 border-red-200 dark:border-red-800 bg-background/95 backdrop-blur">
        <CardHeader
          className="py-3 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
              <Settings className="h-4 w-4" />
              <span className="leading-none">Dev Tools</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <CardContent className="pt-0 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditOnboarding}
                  className="w-full flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Onboarding
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetOnboarding}
                  className="w-full flex items-center gap-2 text-orange-600 hover:text-orange-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Reset Onboarding
                </Button>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
