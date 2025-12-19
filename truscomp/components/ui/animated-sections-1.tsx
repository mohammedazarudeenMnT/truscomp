"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { GridPattern } from "@/components/ui/grid-pattern";

gsap.registerPlugin(Observer, SplitText);

interface SectionData {
  text: string;
  img: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface AnimatedSectionsProps {
  sections?: SectionData[];
  className?: string;
  headerTitle?: string;
}

const defaultSections: SectionData[] = [
  {
    text: "Whispers of Radiance",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img1.jpeg",
  },
  {
    text: "Ethereal Moments",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img3.jpeg",
  },
  {
    text: "Silent Beauty",
    img: "https://raw.githubusercontent.com/66HEX/free-photos/main/img5.jpeg",
  },
];

const AnimatedSections: React.FC<AnimatedSectionsProps> = ({
  sections = defaultSections,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<any>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const splitHeadingsRef = useRef<SplitText[]>([]);
  const currentIndexRef = useRef<number>(-1);
  const animatingRef = useRef<boolean>(false);
  const sectionsRefs = useRef<HTMLElement[]>([]);
  const imagesRefs = useRef<HTMLDivElement[]>([]);
  const outerRefs = useRef<HTMLDivElement[]>([]);
  const innerRefs = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<HTMLHeadingElement[]>([]);
  const counterCurrentRef = useRef<HTMLSpanElement | null>(null);
  const counterNextRef = useRef<HTMLSpanElement | null>(null);
  const counterCurrentSplitRef = useRef<SplitText | null>(null);
  const counterNextSplitRef = useRef<SplitText | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const isTransitioningRef = useRef(false);
  const scrollListenerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Disable body scroll initially only if not complete
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    }

    let loaded = 0;
    sections.forEach((section) => {
      const img = new Image();
      img.src = section.img;
      img.onload = () => {
        loaded++;
        if (loaded === sections.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === sections.length) {
          setImagesLoaded(true);
        }
      };
    });

    // Cleanup function to re-enable scroll
    return () => {
      document.body.style.overflow = "auto";
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current);
        scrollListenerRef.current = null;
      }
    };
  }, [sections, isComplete]);

  // Re-activate hero when scrolling back to top
  useEffect(() => {
    if (!isComplete) return;

    const handleScroll = () => {
      if (window.scrollY === 0 && isComplete) {
        // User scrolled back to top - reactivate hero
        setIsComplete(false);
        isTransitioningRef.current = false;

        if (containerRef.current) {
          containerRef.current.style.display = "";
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.4,
            onComplete: () => {
              // Re-disable body scroll
              document.body.style.overflow = "hidden";

              // Recreate the observer
              if (!observerRef.current && imagesLoaded) {
                createObserver();
              }
            },
          });
        }
      }
    };

    scrollListenerRef.current = handleScroll;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollListenerRef.current) {
        window.removeEventListener("scroll", scrollListenerRef.current);
      }
    };
  }, [isComplete, imagesLoaded]);

  const createObserver = useCallback(() => {
    if (!containerRef.current) return;

    observerRef.current = Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      onDown: () => {
        if (isTransitioningRef.current) return;
        if (!animatingRef.current && currentIndexRef.current > 0) {
          gotoSection(currentIndexRef.current - 1, -1);
        }
      },
      onUp: () => {
        if (isTransitioningRef.current) return;
        if (!animatingRef.current) {
          if (currentIndexRef.current < sections.length - 1) {
            gotoSection(currentIndexRef.current + 1, 1);
          } else {
            // Reached the last section - transition out
            isTransitioningRef.current = true;

            // Kill observer immediately
            if (observerRef.current) {
              observerRef.current.kill();
              observerRef.current = null;
            }

            // Fade out and enable scrolling
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => {
                // Re-enable body scroll
                document.body.style.overflow = "";
                setIsComplete(true);

                // Hide the hero section but keep it in DOM
                if (containerRef.current) {
                  containerRef.current.style.display = "none";
                }

                // Scroll to next section
                window.scrollTo({ top: 1, behavior: "instant" });
              },
            });
          }
        }
      },
      tolerance: 10,
      preventDefault: true,
    });
  }, [sections.length]);

  const gotoSection = useCallback((index: number, direction: number) => {
    if (!containerRef.current || animatingRef.current) return;

    const sectionsElements = sectionsRefs.current as Element[];
    const images = imagesRefs.current as Element[];
    const outerWrappers = outerRefs.current as Element[];
    const innerWrappers = innerRefs.current as Element[];
    const wrap = gsap.utils.wrap(0, sectionsElements.length);
    index = wrap(index);

    animatingRef.current = true;
    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: () => {
        animatingRef.current = false;
      },
    });

    timelineRef.current = tl;

    if (currentIndexRef.current >= 0) {
      gsap.set(sectionsElements[currentIndexRef.current], { zIndex: 0 });
      tl.to(images[currentIndexRef.current], { xPercent: -15 * dFactor }).set(
        sectionsElements[currentIndexRef.current],
        { autoAlpha: 0 }
      );
    }

    gsap.set(sectionsElements[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      {
        xPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
      },
      { xPercent: 0 },
      0
    ).fromTo(images[index], { xPercent: 15 * dFactor }, { xPercent: 0 }, 0);

    if (
      splitHeadingsRef.current[index] &&
      splitHeadingsRef.current[index].lines
    ) {
      const lines = splitHeadingsRef.current[index].lines;
      gsap.set(lines, {
        opacity: 0,
        yPercent: 100,
      });
      tl.to(
        lines,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        },
        0.4
      );
    }

    if (counterCurrentRef.current && counterNextRef.current) {
      if (!counterCurrentSplitRef.current) {
        counterCurrentSplitRef.current = new SplitText(
          counterCurrentRef.current,
          {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          }
        );
      }

      counterNextRef.current.textContent = String(index + 1);
      gsap.set(counterNextRef.current, { opacity: 1 });

      if (counterNextSplitRef.current) {
        counterNextSplitRef.current.revert();
        counterNextSplitRef.current = null;
      }

      counterNextSplitRef.current = new SplitText(counterNextRef.current, {
        type: "lines",
        linesClass: "line",
        mask: "lines",
      });

      const currentLines = counterCurrentSplitRef.current?.lines || [];
      const nextLines = counterNextSplitRef.current?.lines || [];

      gsap.set(currentLines, { opacity: 1, yPercent: 0 });
      gsap.set(nextLines, { opacity: 1, yPercent: 100 * dFactor });

      tl.to(
        currentLines,
        {
          yPercent: -100 * dFactor,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: { each: 0.1, from: "start" },
        },
        0.4
      );

      tl.to(
        nextLines,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: { each: 0.1, from: "start" },
        },
        0.4
      ).add(() => {
        if (counterCurrentSplitRef.current) {
          counterCurrentSplitRef.current.revert();
          counterCurrentSplitRef.current = null;
        }
        if (counterNextSplitRef.current) {
          counterNextSplitRef.current.revert();
          counterNextSplitRef.current = null;
        }
        if (counterCurrentRef.current && counterNextRef.current) {
          counterCurrentRef.current.textContent =
            counterNextRef.current.textContent;
        }
        gsap.set(counterNextRef.current, { opacity: 0, clearProps: "all" });
      });
    }

    currentIndexRef.current = index;
    setCurrentIndex(index);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !imagesLoaded) return;

      gsap.registerPlugin(Observer, SplitText);

      const headings = headingRefs.current as HTMLElement[];
      const outerWrappers = outerRefs.current as Element[];
      const innerWrappers = innerRefs.current as Element[];

      splitHeadingsRef.current = headings.map(
        (heading) =>
          new SplitText(heading, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          })
      );

      gsap.set(outerWrappers, { xPercent: 100 });
      gsap.set(innerWrappers, { xPercent: -100 });

      createObserver();
      gotoSection(0, 1);

      return () => {
        if (observerRef.current) {
          observerRef.current.kill();
          observerRef.current = null;
        }
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
        splitHeadingsRef.current.forEach((split) => {
          if (split && typeof split.revert === "function") {
            split.revert();
          }
        });
        splitHeadingsRef.current = [];
        if (
          counterCurrentSplitRef.current &&
          typeof counterCurrentSplitRef.current.revert === "function"
        ) {
          counterCurrentSplitRef.current.revert();
          counterCurrentSplitRef.current = null;
        }
        if (
          counterNextSplitRef.current &&
          typeof counterNextSplitRef.current.revert === "function"
        ) {
          counterNextSplitRef.current.revert();
          counterNextSplitRef.current = null;
        }
      };
    },
    { scope: containerRef, dependencies: [sections.length, imagesLoaded] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black text-white uppercase font-sans ${className}`}
      style={{ height: isComplete ? "100vh" : "100vh" }}
    >
      {sections.map((section, i) => (
        <section
          key={`section-${i}`}
          className="fixed top-0 h-full w-full invisible"
          ref={(el) => {
            if (el) sectionsRefs.current[i] = el;
          }}
        >
          <div
            className="outer w-full h-full overflow-hidden"
            ref={(el) => {
              if (el) outerRefs.current[i] = el;
            }}
          >
            <div
              className="inner w-full h-full overflow-hidden"
              ref={(el) => {
                if (el) innerRefs.current[i] = el;
              }}
            >
              <div
                className="bg flex items-center justify-center absolute top-0 h-full w-full bg-cover bg-center"
                ref={(el) => {
                  if (el) imagesRefs.current[i] = el;
                }}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%), url("${section.img}")`,
                }}
              >
                {/* Grid Pattern Overlay */}
                <GridPattern
                  width={50}
                  height={50}
                  x={-1}
                  y={-1}
                  squares={[
                    [2, 2],
                    [8, 6],
                    [14, 8],
                    [20, 4],
                    [26, 10],
                  ]}
                  className="absolute inset-0 h-full w-full opacity-15"
                />
                <div className="flex flex-col items-center justify-center text-center w-[90vw] max-w-[1200px] z-10 px-6 relative">
                  {section.title && (
                    <div className="text-primary text-sm md:text-base font-medium mb-4 tracking-wider">
                      {section.title}
                    </div>
                  )}
                  <h2
                    className="section-heading text-white font-semibold text-[clamp(2rem,5vw,4.5rem)] normal-case leading-tight mb-6"
                    ref={(el) => {
                      if (el) headingRefs.current[i] = el;
                    }}
                  >
                    {section.text}
                  </h2>
                  {section.description && (
                    <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl mb-8 leading-relaxed">
                      {section.description}
                    </p>
                  )}
                  {section.buttonText && section.buttonLink && (
                    <a
                      href={section.buttonLink}
                      className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {section.buttonText}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AnimatedSections;
