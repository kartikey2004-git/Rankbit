"use client";
import { signIn } from "next-auth/react";
import features from "../data/features.json";
import { Search, TrendingUp, BarChart, Bell } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import faqs from "../data/faqs.json";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const iconMap = {
  Search,
  TrendingUp,
  BarChart,
  Bell,
};

export default function LoginScreen() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 text-center">
      {/* Spline Centered */}

      <h1 className="text-3xl mt-20 sm:hidden font-semibold tracking-tight text-gray-100 text-center">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
          RankBit
        </span>
      </h1>

      <p className="mt-6 text-lg text-gray-300 leading-relaxed text-center sm:hidden max-w-md mx-auto">
        The smarter way to track, monitor, and grow your SEO rankings — all in
        one place.
      </p>

      <div className="relative">
        {/* Spline Section */}
        <div className="hidden md:flex justify-center items-center w-full -mt-20 lg:ml-15">
          <div className="w-full max-w-[1200px] aspect-[16/9]">
            <Spline scene="https://prod.spline.design/gat-EWu4xdBLcgLX/scene.splinecode" />
          </div>
        </div>

        <div
          className=" hidden md:flex absolute bottom-3 lg:right-0 md:right-10  py-2 px-8 -mr-9 lg:-mr-12 z-30 font-semibold shadow-lg
        bg-black backdrop-blur-md border border-white/20 text-gray-200 text-lg rounded-full transition-all duration-300 
        hover:scale-[1.03] active:scale-[0.97]"
        >
          Powered by RankBit
        </div>
      </div>

      {/* Features Grid */}
      <motion.div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon];
          return (
            <motion.div
              key={feature.id}
              className="p-6 w-full max-w-sm mx-auto rounded-2xl
                   bg-white/5 backdrop-blur-xl border border-white/20 shadow-lg
                   hover:scale-[1.04] hover:shadow-xl hover:border-cyan-500/40
                   transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl 
                flex items-center justify-center  flex-shrink-0"
                >
                  {Icon && (
                    <Icon className="w-8 h-8 text-cyan-500" aria-hidden />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* FAQ Section */}
      <motion.section className="mt-28 max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl font-semibold text-center text-white mb-12">
          FAQ’s
        </h2>

        <Accordion
          type="single"
          collapsible
          className="max-w-4xl mx-auto divide-y divide-white/10 
               rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-lg"
        >
          {Array.isArray(faqs) &&
            faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`faq-${i}`}>
                  <AccordionTrigger
                    className="text-left ml-4 text-base sm:text-lg font-medium py-4 text-white
                         hover:text-cyan-500 transition-colors"
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 ml-4 text-sm sm:text-base pb-4 leading-relaxed text-left">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
        </Accordion>
      </motion.section>

      <section className="relative py-20 px-6 bg-black overflow-hidden">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-semibold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ready to Track Your Rankings Smarter?
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Stay ahead of the competition with Rankbit. Monitor keyword
            positions, analyze results, and grow your visibility—all in one
            place.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              className="px-8 py-4 font-semibold shadow-lg
        bg-black backdrop-blur-md border border-white/20 text-gray-200 text-lg rounded-full transition-all duration-300 
        hover:scale-[1.03] active:scale-[0.97]"
              onClick={() => signIn("google")}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative Cyan Glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

/*

It is not a server component , so we cannot use server functionality here , so instead we need to use only API calls and we need to do client request to our backend


signIn : 
  
   - helper function provided by NextAuth. 
   - To start the login flow with any provider you’ve configured (Google, GitHub, Credentials, etc.).


How it works
   
  - call it → signIn("google")
  - NextAuth redirects the user to that provider’s login page.

  - User logs in → provider (like Google) verifies identity.
  - NextAuth creates a session and stores it (via cookies/JWT).

  - User is sent back to your app with a valid session.


*/
