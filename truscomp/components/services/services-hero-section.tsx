"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageSettings {
  hero?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
  };
}

interface ServicesHeroSectionProps {
  pageSettings?: PageSettings | null;
}

export default function ServicesHeroSection({
  pageSettings,
}: ServicesHeroSectionProps) {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload and validate background image
  useEffect(() => {
    const customImage = pageSettings?.hero?.backgroundImage;

    const loadImage = async () => {
      if (!customImage) {
        setImageLoaded(true);
        return;
      }

      // Convert .avif to .jpg and add Cloudinary transformations for better compatibility
      let imageUrl = customImage;
      if (customImage.includes("cloudinary.com")) {
        // Extract the public ID and build a new URL with transformations
        const publicIdMatch = customImage.match(
          /\/([^\/]+)\.(avif|jpg|jpeg|png|webp)$/
        );
        if (publicIdMatch) {
          const publicId = publicIdMatch[1];
          const baseUrl = customImage.substring(
            0,
            customImage.lastIndexOf("/")
          );
          // Add Cloudinary transformations: convert to JPG, optimize quality, and resize
          imageUrl = `${baseUrl}/f_jpg,q_auto,w_1920,h_1080,c_fill/${publicId}.jpg`;
        }
      }

      try {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setBackgroundImage(imageUrl);
            setImageLoaded(true);
            resolve(void 0);
          };
          img.onerror = reject;
          img.src = imageUrl;
        });
      } catch {
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              setBackgroundImage(customImage);
              setImageLoaded(true);
              resolve(void 0);
            };
            img.onerror = reject;
            img.src = customImage;
          });
        } catch {
          setImageLoaded(true);
        }
      }
    };

    loadImage();
  }, [pageSettings?.hero?.backgroundImage]);

  return (
    <section
      className={cn(
        "relative flex min-h-[600px] md:min-h-[700px] w-full items-center justify-center overflow-hidden"
      )}
    >
      {/* Background Image */}
      <div
        className={cn(
          "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500",
          imageLoaded || backgroundImage ? "opacity-100" : "opacity-50",
          !backgroundImage && "bg-gray-400"
        )}
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Loading overlay */}
      {!imageLoaded && (
        <div
          className="absolute inset-0 z-0 bg-gray-400 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-black/40" aria-hidden="true" />

      {/* Content Container */}
      <div className="z-20 flex max-w-5xl flex-col items-center justify-center text-center text-white px-4 md:px-6 py-20">
        {/* Animated Title */}
        <motion.h1
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {pageSettings?.hero?.title}
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-6 max-w-3xl text-lg leading-8 md:text-xl text-white/90"
        >
          {pageSettings?.hero?.subtitle}
        </motion.p>

        {/* Animated Button Group */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button asChild size="lg" className="text-base px-8">
            <Link href="#services">
              {pageSettings?.hero?.primaryButtonText}
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="text-base px-8"
          >
            <Link href="/contact">
              {pageSettings?.hero?.secondaryButtonText}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
