"use client";

import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { getIcon } from "@/lib/icon-map";

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface KeyFeaturesSectionProps {
    features?: Feature[];
    title?: string;
    subtitle?: string;
}

export function KeyFeaturesSection({ features = [], title = "Key Features", subtitle }: KeyFeaturesSectionProps) {

    return (
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-muted-foreground text-lg max-w-3xl">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = getIcon(feature.icon);
                        

                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                whileHover={{ y: -8 }}
                                className="group relative rounded-3xl border bg-card p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                            >
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Corner decorators with animation */}
                                <span className="absolute -left-px -top-px block size-3 border-l-2 border-t-2 border-primary z-20 transition-all duration-300 group-hover:size-6"></span>
                                <span className="absolute -right-px -top-px block size-3 border-r-2 border-t-2 border-primary z-20 transition-all duration-300 group-hover:size-6"></span>
                                <span className="absolute -bottom-px -left-px block size-3 border-b-2 border-l-2 border-primary z-20 transition-all duration-300 group-hover:size-6"></span>
                                <span className="absolute -bottom-px -right-px block size-3 border-b-2 border-r-2 border-primary z-20 transition-all duration-300 group-hover:size-6"></span>

                                {/* Grid Pattern */}
                                <GridPattern
                                    width={20}
                                    height={20}
                                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                    squares={[
                                        [0, 0],
                                        [2, 1],
                                        [4, 2],
                                    ]}
                                />

                                <div className="relative z-10">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/10">
                                            <IconComponent className="w-8 h-8 text-primary" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
