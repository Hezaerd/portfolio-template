"use client";

import { useOnboardingContext } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Mail,
  Globe,
  ExternalLink,
  Check,
  Zap,
  Cloud,
  Settings,
  Sparkles,
  Rocket,
  X,
} from "lucide-react";
import { usePortfolioUpdates } from "../../../hooks/usePortfolioUpdates";

export const FinalSetupStep = () => {
  const { form } = useOnboardingContext();
  const { updateContactConfig } = usePortfolioUpdates();

  const contactService = form.watch("contactForm.service");
  const deploymentPlatform = form.watch("deployment.platform");

  const handleServiceSelect = (
    service: "formspree" | "netlify" | "custom" | "none"
  ) => {
    form.setValue("contactForm.service", service);
    if (service === "none") {
      form.setValue("contactForm.endpoint", "");
    }

    // Update Zustand store immediately for real-time UI updates
    updateContactConfig(
      service,
      service === "none" ? "" : form.getValues("contactForm.endpoint")
    );
  };

  const handlePlatformSelect = (
    platform: "vercel" | "netlify" | "other" | "none"
  ) => {
    form.setValue("deployment.platform", platform);
    if (platform === "none") {
      form.setValue("deployment.customDomain", "");
    }
  };

  const openLink = (url: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Final Setup</h3>
        </div>
        <p className="text-muted-foreground">
          Configure contact forms and deployment settings to complete your
          portfolio setup.
        </p>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Form
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Deployment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Form Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control as any}
                name="contactForm.service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose a contact form service</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: "formspree",
                          title: "Formspree",
                          description: "Easy setup, handles form submissions",
                          icon: <Mail className="h-5 w-5" />,
                          badge: "Recommended",
                          link: "https://formspree.io",
                        },
                        {
                          id: "netlify",
                          title: "Netlify Forms",
                          description: "Built-in if deployed on Netlify",
                          icon: <Globe className="h-5 w-5" />,
                          badge: "Popular",
                          link: "https://netlify.com",
                        },
                        {
                          id: "custom",
                          title: "Custom Endpoint",
                          description: "Use your own form handling service",
                          icon: <Settings className="h-5 w-5" />,
                          badge: "Advanced",
                          link: null,
                        },
                        {
                          id: "none",
                          title: "No Contact Form",
                          description: "Skip contact form functionality",
                          icon: <X className="h-5 w-5" />,
                          badge: "Skip",
                          link: null,
                        },
                      ].map(service => (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all ${
                            field.value === service.id
                              ? "ring-2 ring-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => handleServiceSelect(service.id as any)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{service.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">
                                    {service.title}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {service.badge}
                                  </Badge>
                                  {field.value === service.id && (
                                    <Check className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {service.description}
                                </p>
                                {service.link && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={e => {
                                      openLink(service.link, e);
                                    }}
                                    className="h-auto p-0 text-xs"
                                  >
                                    Learn more{" "}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(contactService === "formspree" ||
                contactService === "custom") && (
                <FormField
                  control={form.control as any}
                  name="contactForm.endpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {contactService === "formspree"
                          ? "Formspree Endpoint"
                          : "Custom Endpoint URL"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            contactService === "formspree"
                              ? "https://formspree.io/f/your-form-id"
                              : "https://your-api.com/contact"
                          }
                          {...field}
                          onChange={e => {
                            field.onChange(e);
                            // Update Zustand store immediately
                            updateContactConfig(contactService, e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      {contactService === "formspree" && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Setup:</strong> 1. Sign up at formspree.io
                            2. Create a new form 3. Copy the endpoint URL here
                          </p>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              )}

              {contactService === "netlify" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Netlify Forms:</strong> No additional setup needed!
                    Your contact form will automatically work when deployed to
                    Netlify.
                  </p>
                </div>
              )}

              {contactService === "none" && (
                <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Contact form will be disabled. Visitors can still reach you
                    through your social links in the portfolio.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Deployment Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control as any}
                name="deployment.platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose your deployment platform</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: "vercel",
                          title: "Vercel",
                          description:
                            "Perfect for Next.js apps, automatic deployments",
                          icon: <Zap className="h-5 w-5" />,
                          badge: "Recommended",
                          link: "https://vercel.com",
                        },
                        {
                          id: "netlify",
                          title: "Netlify",
                          description: "Great for static sites, built-in forms",
                          icon: <Globe className="h-5 w-5" />,
                          badge: "Popular",
                          link: "https://netlify.com",
                        },
                        {
                          id: "other",
                          title: "Other Platform",
                          description: "GitHub Pages, AWS, or custom hosting",
                          icon: <Settings className="h-5 w-5" />,
                          badge: "Custom",
                          link: null,
                        },
                        {
                          id: "none",
                          title: "Local Development",
                          description: "Just developing locally for now",
                          icon: <Sparkles className="h-5 w-5" />,
                          badge: "Local",
                          link: null,
                        },
                      ].map(platform => (
                        <Card
                          key={platform.id}
                          className={`cursor-pointer transition-all ${
                            field.value === platform.id
                              ? "ring-2 ring-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() =>
                            handlePlatformSelect(platform.id as any)
                          }
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">{platform.icon}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">
                                    {platform.title}
                                  </h4>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {platform.badge}
                                  </Badge>
                                  {field.value === platform.id && (
                                    <Check className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {platform.description}
                                </p>
                                {platform.link && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={e => {
                                      openLink(platform.link, e);
                                    }}
                                    className="h-auto p-0 text-xs"
                                  >
                                    Learn more{" "}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(deploymentPlatform === "other" ||
                deploymentPlatform === "vercel" ||
                deploymentPlatform === "netlify") && (
                <FormField
                  control={form.control as any}
                  name="deployment.customDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Domain (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="yourname.com" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        You can add a custom domain later in your deployment
                        platform settings.
                      </p>
                    </FormItem>
                  )}
                />
              )}

              {deploymentPlatform === "vercel" && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Vercel Setup:</strong> 1. Push your code to GitHub
                    2. Connect your repository to Vercel 3. Automatic
                    deployments on every commit!
                  </p>
                </div>
              )}

              {deploymentPlatform === "netlify" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Netlify Setup:</strong> 1. Build your project with
                    `bun run build` 2. Drag the `out` folder to Netlify 3. Or
                    connect your Git repository!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Pro Tip:</strong> You can always re-run this onboarding
          process later to update your information. Just delete the localStorage
          entry or use the reset option in development mode.
        </p>
      </div>
    </div>
  );
};
