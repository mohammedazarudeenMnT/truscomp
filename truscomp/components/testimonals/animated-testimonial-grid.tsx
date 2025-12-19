import * as React from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

// --- TYPE DEFINITIONS ---
interface Testimonial {
  imgSrc: string;
  alt: string;
}

interface AnimatedTestimonialGridProps {
  testimonials: Testimonial[];
  badgeText?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  ctaText: string;
  ctaHref: string;
  className?: string;
}

// --- PRE-DEFINED POSITIONS FOR THE IMAGES ---
const imagePositions = [
  { top: "5%", left: "15%", className: "hidden lg:block w-24 h-24" },
  { top: "15%", left: "35%", className: "hidden md:block w-20 h-20" },
  { top: "5%", left: "55%", className: "hidden md:block w-16 h-16" },
  { top: "10%", right: "15%", className: "hidden lg:block w-28 h-28" },
  { top: "25%", right: "5%", className: "hidden md:block w-20 h-20" },
  { top: "45%", right: "10%", className: "hidden lg:block w-24 h-24" },
  { top: "50%", left: "5%", className: "hidden md:block w-28 h-28" },
  { bottom: "5%", left: "20%", className: "hidden lg:block w-20 h-20" },
  { bottom: "15%", left: "45%", className: "hidden md:block w-16 h-16" },
  { bottom: "10%", right: "30%", className: "hidden md:block w-24 h-24" },
  { bottom: "2%", right: "15%", className: "hidden lg:block w-20 h-20" },
  { top: "10%", left: "5%", className: "block md:hidden w-16 h-16" },
  { top: "5%", right: "10%", className: "block md:hidden w-20 h-20" },
  { bottom: "5%", left: "10%", className: "block md:hidden w-20 h-20" },
  { bottom: "10%", right: "5%", className: "block md:hidden w-16 h-16" },
];

// --- ANIMATION LOGIC ---
const imageVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
      delay: Math.random() * 0.5,
    },
  },
};

const floatingAnimation = () => ({
  y: [0, Math.random() * -15 - 5, 0],
  transition: {
    duration: Math.random() * 4 + 5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  },
});

const IMG_PADDING = 12;

// --- COMPONENT ---
export const AnimatedTestimonialGrid = ({
  testimonials,
  badgeText = "Testimonials",
  title,
  description,
  ctaText,
  ctaHref,
  className,
}: AnimatedTestimonialGridProps) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const overlayRef = React.useRef(null);
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
    <div
      style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}
      className={className}
    >
      <div className="relative h-[90vh]">
        {/* Sticky Background with White */}
        <motion.div
          style={{
            height: `calc(100vh - ${IMG_PADDING * 2}px)`,
            top: IMG_PADDING,
            scale,
          }}
          ref={targetRef}
          className="sticky z-0 overflow-hidden rounded-3xl bg-linear-to-br from-white via-gray-50 to-white shadow-2xl"
        >
          {/* Subtle Grid Pattern Overlay */}
          <GridPattern
            width={40}
            height={40}
            x={-1}
            y={-1}
            squares={[
              [4, 4],
              [10, 2],
              [15, 8],
              [20, 12],
              [25, 6],
            ]}
            className="absolute inset-0 h-full w-full opacity-40"
          />

          <motion.div
            className="absolute inset-0 bg-white/40"
            style={{ opacity }}
          />

          {/* Floating Images Container */}
          <div className="absolute inset-0">
            {testimonials
              .slice(0, imagePositions.length)
              .map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "absolute rounded-lg shadow-xl overflow-hidden",
                    imagePositions[index].className
                  )}
                  style={{
                    top: imagePositions[index].top,
                    left: imagePositions[index].left,
                    right: imagePositions[index].right,
                    bottom: imagePositions[index].bottom,
                  }}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.1, zIndex: 20 }}
                >
                  <motion.img
                    src={testimonial.imgSrc}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover rounded-lg"
                    animate={floatingAnimation()}
                  />
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Overlay Content */}
        <motion.div
          style={{
            y,
            opacity: overlayOpacity,
          }}
          ref={overlayRef}
          className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-foreground px-4"
        >
          {badgeText && (
            <div className="mb-4 inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary">
              {badgeText}
            </div>
          )}
          <h1 className="text-center text-4xl font-bold md:text-6xl lg:text-7xl mb-6 max-w-4xl tracking-tight">
            {title}
          </h1>
          <p className="text-center text-lg md:text-xl max-w-2xl mb-8 text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-base font-medium shadow-lg transition-all hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-transparent border-2 border-primary text-primary px-8 py-3 text-base font-medium shadow-lg transition-all hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
