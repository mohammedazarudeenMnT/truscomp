"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";

interface ServiceDetailHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage: string;
}

const ServiceDetailHero = React.forwardRef<
  HTMLDivElement,
  ServiceDetailHeroProps
>(
  (
    {
      className,
      title,
      description,
      buttonText = "Book Now",
      buttonHref = "/contact",
      backgroundImage,
      ...props
    },
    ref
  ) => {
    // Animation variants for the container
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    // Animation variants for individual elements
    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-background text-foreground md:flex-row min-h-[600px]",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
          <motion.div variants={containerVariants} className="max-w-2xl">
            {/* Title */}
            <motion.h1
              className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl mb-6"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              className="my-6 h-1 w-20 bg-primary"
              variants={itemVariants}
            />

            {/* Description */}
            <motion.p
              className="mb-8 text-base md:text-lg text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              {description}
            </motion.p>

            {/* Button */}
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <a href={buttonHref} className="flex items-center gap-2">
                  {buttonText}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="relative w-full min-h-[400px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          }}
          animate={{ clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ duration: 1.2, ease: "circOut" }}
        >
          {/* Grid Pattern Overlay */}
          <GridPattern
            width={45}
            height={45}
            x={-1}
            y={-1}
            squares={[
              [3, 3],
              [9, 7],
              [15, 5],
              [21, 9],
              [27, 4],
            ]}
            className="absolute inset-0 h-full w-full opacity-20"
          />
        </motion.div>
      </motion.section>
    );
  }
);

ServiceDetailHero.displayName = "ServiceDetailHero";

export { ServiceDetailHero };
