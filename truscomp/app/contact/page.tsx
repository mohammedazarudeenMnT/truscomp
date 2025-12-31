"use client";

import { ModernContactSection } from "@/components/contact/ModernContactSection";
import { Phone, Mail, MapPin } from "lucide-react";
import { CtaHero } from "@/components/ui/cta-hero";
import { FaqSection } from "@/components/ui/faq-section";

export default function ContactPage() {
  const handleFormSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    console.log("Contact form submitted:", data);
    // Here you would typically send the data to your backend
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Contact Section */}
      <ModernContactSection
        title="Transform Your Compliance Journey with TrusComp"
        subtitle="Reach out to us today! ✨"
        contactEmail="contact@truscomp.com"
        contactPhone="(+91) 44 4900 6000"
        address="No 9, Pe Ve Plaza, Lakshmi Nagar, Porur, Chennai - 600116"
        teamMember={{
          name: "MV Prakash",
          role: "Senior Vice President, Business Expansion",
          phone: "(+91) 97438 83000",
          email: "prakash@truscomp.com",
        }}
        socialLinks={{
          facebook: "https://facebook.com/truscomp",
          twitter: "https://twitter.com/truscomp",
          linkedin: "https://linkedin.com/company/truscomp",
        }}
        onSubmit={handleFormSubmit}
      />

      {/* Google Map Section */}
      <section className="container mx-auto px-6 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visit our office or reach out to us. We&apos;re here to help you
            with all your compliance needs.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.826789!2d80.156789!3d13.035789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzA4LjgiTiA4MMKwMDknMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TrusComp Office Location"
          />
        </div>

        {/* Address Info Below Map */}
        <div className="mt-8 bg-card border rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-sm text-muted-foreground">
                No 9, Pe Ve Plaza, Lakshmi Nagar,
                <br />
                Porur, Chennai - 600116
              </p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <a
                href="tel:+914444906000"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                (+91) 44 4900 6000
              </a>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href="mailto:contact@truscomp.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                contact@truscomp.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaHero
        badge="Ready to Get Started?"
        heading="Take the Next Step in Your Compliance Journey"
        description="Start your seamless compliance journey today with our expert solutions and tailored support."
        buttons={[
          {
            text: "Schedule a Free Consultation",
            href: "/contact",
            variant: "secondary",
          },
          {
            text: "Request a Demo",
            href: "/contact",
            variant: "outline",
          },
        ]}
        isDark={true}
      />

      {/* FAQ Section */}
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Get Your Questions Answered"
        description="Find answers to common questions about our services and how we can help with your compliance needs."
        faqs={[
          {
            question: "How do I schedule a consultation?",
            answer:
              "You can schedule a consultation directly through our Schedule a Free Consultation link or contact us via phone or email.",
          },
          {
            question:
              "Who should I reach out to for business expansion inquiries?",
            answer:
              "For business expansion-related queries, you can contact MV Prakash, our Senior Vice President, at prakash@truscomp.com or (+91) 97438 83000.",
          },
          {
            question: "What support does TrusComp provide?",
            answer:
              "We offer tailored compliance solutions, expert guidance, and ongoing support for seamless compliance management.",
          },
          {
            question: "Where is TrusComp located?",
            answer:
              "Our office is located at No 9, Pe Ve Plaza, Lakshmi Nagar, Porur, Chennai – 600116.",
          },
          {
            question: "Can I request a demo of your services?",
            answer:
              "Yes, click on Request a Demo to experience how our solutions can simplify compliance for your organization.",
          },
        ]}
      />
    </div>
  );
}
