"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Service {
  _id: string;
  slug: string;
  heroTitle: string;
  heroDescription: string;
  heroImage?: string;
  isActive?: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ServicesGridSectionProps {
  services: Service[];
  pagination?: Pagination | null;
}

export default function ServicesGridSection({
  services = [],
  pagination,
}: ServicesGridSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-linear-to-b from-background to-muted/30 overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />

      <motion.div
        className="container mx-auto max-w-7xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center mb-16"
          variants={itemVariants}
        >
          <motion.span
            className="text-primary font-medium mb-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            OUR COMPLIANCE SOLUTIONS
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Comprehensive Services
          </h2>
          <motion.div
            className="w-24 h-1 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-3xl mx-auto mb-16 text-muted-foreground text-lg"
          variants={itemVariants}
        >
          Explore our range of specialized compliance solutions, designed to
          streamline your operations and ensure seamless regulatory adherence.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ServiceCard
                key={service._id}
                title={service.heroTitle}
                description={service.heroDescription}
                href={`/services/${service.slug}`}
                variants={itemVariants}
                delay={index * 0.05}
              />
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              variants={itemVariants}
            >
              <p className="text-muted-foreground text-lg">
                No services available at the moment.
              </p>
            </motion.div>
          )}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <motion.div 
            className="flex justify-center items-center gap-2 flex-wrap"
            variants={itemVariants}
          >
            {/* Previous Button */}
            {pagination.page > 1 && (
              <Link
                href={`/services?page=${pagination.page - 1}`}
                className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
              >
                Previous
              </Link>
            )}

            {/* Page Numbers */}
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                // Show first page, last page, current page, and pages around current
                const showPage = 
                  pageNum === 1 || 
                  pageNum === pagination.totalPages || 
                  Math.abs(pageNum - pagination.page) <= 1;

                if (!showPage) {
                  // Show ellipsis
                  if (pageNum === pagination.page - 2 || pageNum === pagination.page + 2) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                }

                return (
                  <Link
                    key={pageNum}
                    href={`/services?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      pageNum === pagination.page
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            {pagination.page < pagination.totalPages && (
              <Link
                href={`/services?page=${pagination.page + 1}`}
                className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
              >
                Next
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  variants: Variants;
  delay: number;
}

function ServiceCard({
  title,
  description,
  href,
  variants,
  delay,
}: ServiceCardProps) {
  return (
    <motion.div
      className="flex flex-col group bg-background border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="text-primary bg-primary/10 p-3 rounded-lg transition-colors duration-300 group-hover:bg-primary/20 relative shrink-0">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {description}
      </p>
      <Link
        href={href}
        className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all"
      >
        Read More{" "}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
