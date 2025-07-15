"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, ExternalLink, Check, ArrowRight } from "lucide-react";

export const ThemeReferenceStep = () => {
  const handleOpenTweakCn = () => {
    window.open("https://tweakcn.com/", "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Customize Your Colors & Theme</h3>
        <p className="text-muted-foreground">
          Make your portfolio uniquely yours with custom colors and themes.
        </p>
      </div>

      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            TweakCN - Professional Theme Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                We recommend using <strong>TweakCN</strong> for professional
                color customization. It's a powerful tool that lets you preview
                and generate custom color schemes for your portfolio.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleOpenTweakCn}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open TweakCN
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowRight className="h-4 w-4" />
                  Skip for Now
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <Palette className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Why TweakCN?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Real-time Preview</p>
                <p className="text-sm text-muted-foreground">
                  See your color changes instantly as you make them
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Professional Palettes</p>
                <p className="text-sm text-muted-foreground">
                  Access to curated color schemes that work well together
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Copy-Ready CSS</p>
                <p className="text-sm text-muted-foreground">
                  Generate CSS variables ready to paste into your project
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Use TweakCN</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Visit TweakCN</p>
                <p className="text-sm text-muted-foreground">
                  Open the website and explore the color customization options
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Choose Your Colors</p>
                <p className="text-sm text-muted-foreground">
                  Select primary, secondary, and accent colors that match your
                  brand
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Copy CSS Variables</p>
                <p className="text-sm text-muted-foreground">
                  Copy the generated CSS and paste it into your globals.css file
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <Palette className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Pro Tip: Color Psychology in Portfolio Design
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              Choose colors that reflect your professional brand:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Tech/Gaming
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  Blues, purples, teals
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Creative
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  Oranges, magentas, greens
                </p>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Professional
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  Navy, grays, subtle accents
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Note:</strong> You can always change your theme later! TweakCN
          makes it easy to experiment with different color combinations until
          you find the perfect look for your portfolio.
        </p>
      </div>
    </div>
  );
};
