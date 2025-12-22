"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIconComponent } from "@/lib/icons";

const IMG_PADDING = 12;

interface ParallaxHeroButton {
  text: string;
  href: string;
  icon?: string;
  variant?: "default" | "outline";
}

interface ParallaxHeroProps {
  backgroundImage: string;
  subheading: string;
  heading: string;
  description: string;
  buttons: ParallaxHeroButton[];
}

export default function ParallaxHero({
  backgroundImage,
  subheading,
  heading,
  description,
  buttons,
}: ParallaxHeroProps) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const overlayRef = useRef(null);
  const { scrollYProgress: overlayProgress } = useScroll({
    target: overlayRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(overlayProgress, [0, 1], [250, -250]);
  const overlayOpacity = useTransform(
    overlayProgress,
    [0.25, 0.5, 0.75],
    [0, 1, 0]
  );

  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[90vh]">
        {/* Sticky Background Image */}
        <motion.div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: `calc(100vh - ${IMG_PADDING * 2}px)`,
            top: IMG_PADDING,
            scale,
          }}
          ref={targetRef}
          className="sticky z-0 overflow-hidden rounded-3xl"
        >
          <motion.div
            className="absolute inset-0 bg-neutral-950/70"
            style={{ opacity }}
          />
          {/* Grid Pattern Overlay */}
          <GridPattern
            width={60}
            height={60}
            x={-1}
            y={-1}
            squares={[
              [2, 2],
              [8, 4],
              [12, 8],
              [18, 6],
              [22, 10],
            ]}
            className="absolute inset-0 h-full w-full opacity-20"
          />
        </motion.div>

        {/* Overlay Content */}
        <motion.div
          style={{
            y,
            opacity: overlayOpacity,
          }}
          ref={overlayRef}
          className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4"
        >
          <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl font-medium">
            {subheading}
          </p>
          <h1 className="text-center text-4xl font-bold md:text-7xl mb-6 max-w-4xl">
            {heading}
          </h1>
          <p className="text-center text-lg md:text-xl max-w-2xl mb-8 text-white/90">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {buttons.map((button, index) => {
              const IconComponent = button.icon
                ? getIconComponent(button.icon)
                : null;
              const isOutline = button.variant === "outline";

              return (
                <Button
                  key={index}
                  size="lg"
                  asChild
                  className={
                    isOutline
                      ? "border border-white text-white hover:bg-white/10 bg-transparent"
                      : "bg-white text-black hover:bg-white/90"
                  }
                  variant="default"
                >
                  <Link href={button.href} className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                    {button.text}
                  </Link>
                </Button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
