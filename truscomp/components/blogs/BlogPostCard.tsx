import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const cardVariants = cva(
  "group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-md",
  {
    variants: {
      variant: {
        default: "p-6",
        featured: "flex-col md:flex-row",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BlogPostCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  post: {
    tag: string;
    date: string;
    title: string;
    description: string;
    imageUrl?: string;
    href: string;
    readTime?: string;
  };
  readMoreText?: string;
}

const BlogPostCard = React.forwardRef<HTMLDivElement, BlogPostCardProps>(
  (
    {
      className,
      variant,
      post,
      readMoreText = "Read the full article",
      ...props
    },
    ref
  ) => {
    const { tag, date, title, description, imageUrl, href, readTime } = post;
    // Animation variants for framer-motion
    const cardHover: Variants = {
      hover: {
        y: -5,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      },
    };

    if (variant === "featured") {
      return (
        <motion.div
          variants={cardHover}
          whileHover="hover"
          className="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <a
            href={href}
            className="absolute inset-0 z-10"
            aria-label={`Read ${title}`}
          >
            <span className="sr-only">Read More</span>
          </a>
          {imageUrl && (
            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
            <div>
              <div className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {tag}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
                {readTime && (
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {readTime}
                  </span>
                )}
              </div>
              <h3 className="mb-4 text-2xl md:text-3xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                  {title}
                </span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {description}
              </p>
            </div>
            <div className="mt-8">
              <Button variant="default" className="group/button">
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={cardHover}
        whileHover="hover"
        className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300 h-full"
      >
        <a
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Read ${title}`}
        >
          <span className="sr-only">Read More</span>
        </a>
        {imageUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {tag}
            </Badge>
            <span className="text-muted-foreground">{date}</span>
          </div>
          <h3 className="mb-3 text-xl font-bold leading-tight flex-1">
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {title}
            </span>
          </h3>
          <p className="text-muted-foreground line-clamp-3">{description}</p>
          <div className="mt-4 flex items-center text-sm text-primary font-medium">
            Read more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.div>
    );
  }
);

BlogPostCard.displayName = "BlogPostCard";

export { BlogPostCard };
