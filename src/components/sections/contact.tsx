"use client";

import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-foreground mb-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Mail className="w-7 h-7 text-primary" /> Let's Work Together
        </motion.h2>
        <motion.p
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          I'm always interested in new opportunities and exciting projects. Feel
          free to reach out if you'd like to collaborate!
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            variant="default"
            size="lg"
            className="hover:bg-primary/70 hover:shadow-lg transition-all duration-200"
          >
            <Mail className="w-5 h-5" />
            Send Message
          </Button>
          <Button variant="outline" size="lg">
            <User className="w-5 h-5" />
            Schedule Call
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
