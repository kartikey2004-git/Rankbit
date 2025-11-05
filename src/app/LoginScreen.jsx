"use client";
import { signIn } from "next-auth/react";
import {
  Search,
  TrendingUp,
  BarChart,
  Bell,
  Globe,
  Wrench,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

const features = [
  {
    id: 1,
    icon: Globe,
    title: "Domain Management",
    description: "Add and manage multiple domains from one clean dashboard.",
  },
  {
    id: 2,
    icon: Search,
    title: "Keyword Tracking",
    description:
      "Track search engine ranks for the keywords that matter to you.",
  },
  {
    id: 3,
    icon: BarChart,
    title: "Ranking Charts",
    description: "Visualize keyword rank trends and performance over time.",
  },
  {
    id: 4,
    icon: Bell,
    title: "Automated Rank Updates",
    description: "Scheduled updates every midnight to keep your data fresh.",
  },
  {
    id: 5,
    icon: Wrench,
    title: "CRUD Support",
    description:
      "Full create, read, update, delete functionality for domains and keywords.",
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "On-Demand Rank Check",
    description: "Instantly fetch live search rankings with one click.",
  },
];

const faqs = [
  {
    question: "How often does RankBit update keyword data?",
    answer:
      "Keyword ranks are updated automatically every night at midnight through a cron job, ensuring you always have fresh data.",
  },
  {
    question: "Can I manage multiple domains?",
    answer:
      "Yes! RankBit lets you track and analyze multiple domains from a single dashboard.",
  },
  {
    question: "Is there an API for custom integrations?",
    answer:
      "Not yet, but we’re actively working on providing developer-friendly API endpoints.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation needed — RankBit runs entirely in the cloud. Just sign in and start tracking.",
  },
];

export default function LoginScreen() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <div className="relative bg-[#0b0b16] text-white min-h-screen overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full -z-10" />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#0b0b16]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Rank<span className="text-cyan-400">Bit</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => signIn("google")}
              className="px-5 py-2 text-sm font-normal bg-transparent border border-white/20 rounded-full hover:bg-white/10 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto text-center px-6 pt-40 pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-6xl gap-2 font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent"
        >
          Smarter SEO Tracking <br /> for Modern Teams
        </motion.h2>
        <motion.p
          className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Manage domains, track keywords, visualize performance, and monitor
          rankings — all in one automated dashboard.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="px-8 py-4 text-lg font-semibold bg-transparent border border-white/20 rounded-full hover:bg-white/10 transition-all"
            onClick={() => signIn("google")}
          >
            Get Started
          </Button>
          <Button className="px-8 py-4 text-lg font-semibold bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all">
            Made for dev's
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 mt-20 scroll-mt-24"
      >
        <motion.h3
          className="text-3xl font-semibold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Core Features
        </motion.h3>

        <motion.div
          className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.04 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 transition-all"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/10">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="text-xl font-mdeium text-white">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="max-w-4xl mx-auto px-6 mt-32 mb-28 scroll-mt-24"
      >
        <motion.h3
          className="text-3xl font-semibold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          FAQs
        </motion.h3>

        <Accordion
          type="single"
          collapsible
          className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 divide-y divide-white/10"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AccordionItem value={`faq-${i}`}>
                <AccordionTrigger className="text-left px-6 py-4 text-white font-normal text-lg hover:text-cyan-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400 text-md">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 text-center border-t border-white/10 bg-gradient-to-b from-transparent to-cyan-500/10">
        <motion.h3
          className="text-4xl sm:text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Track Smarter?
        </motion.h3>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Start using RankBit to manage domains, track rankings, and grow your
          visibility — all from one dashboard.
        </motion.p>
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            className="px-10 py-4 text-lg font-semibold bg-white/5 border border-white/20 rounded-full hover:bg-white/10 transition-all"
            onClick={() => signIn("google")}
          >
            Get Started
          </Button>
        </motion.div>
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
