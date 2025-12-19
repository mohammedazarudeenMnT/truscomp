"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

interface ModernContactSectionProps {
  title?: string;
  subtitle?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  teamMember?: {
    name: string;
    role: string;
    phone: string;
    email: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  onSubmit?: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => void;
}

export const ModernContactSection: React.FC<ModernContactSectionProps> = ({
  title = "Transform Your Compliance Journey with TrusComp",
  subtitle = "Reach out to us today! ✨",
  contactEmail = "contact@truscomp.com",
  contactPhone = "(+91) 44 4900 6000",
  address = "No 9, Pe Ve Plaza, Lakshmi Nagar, Porur, Chennai - 600116",
  teamMember = {
    name: "MV Prakash",
    role: "Senior Vice President, Business Expansion",
    phone: "(+91) 97438 83000",
    email: "prakash@truscomp.com",
  },
  socialLinks = {
    facebook: "#",
    twitter: "#",
    linkedin: "#",
  },
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<{
    name: string;
    email: string;
    phone: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [countryCode, setCountryCode] = React.useState("+91");

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `${countryCode} ${formData.phone}`;
    onSubmit?.({ ...formData, phone: fullPhone });
    console.log("Form submitted:", { ...formData, phone: fullPhone });
  };

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden" ref={targetRef}>
      {/* Hero Section with Background Image */}
      <motion.div
        className="relative py-20 lg:py-32"
        style={{ scale, opacity }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/contact/photo-1742273330004-ef9c9d228530.avif')",
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 via-orange-600/70 to-red-500/80" />
        </motion.div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Title & Contact Cards */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-lg"
                variants={itemVariants}
              >
                {title}
              </motion.h1>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone Card */}
                <motion.div
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`}
                        className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors break-all"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Address Card */}
                <motion.div
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Address
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        {address}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Team Member Card */}
                <motion.div
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-semibold text-gray-500 mb-4">
                    Connect with Our Team
                  </p>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-lg">
                        {teamMember.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {teamMember.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {teamMember.role}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-orange-600" />
                          <a
                            href={`tel:${teamMember.phone.replace(
                              /[^0-9+]/g,
                              ""
                            )}`}
                            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                          >
                            {teamMember.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-orange-600" />
                          <a
                            href={`mailto:${teamMember.email}`}
                            className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
                          >
                            {teamMember.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-24 h-24 bg-white rounded-lg p-2 shadow-md border border-gray-200">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                            `BEGIN:VCARD\nVERSION:3.0\nFN:${teamMember.name}\nTEL:${teamMember.phone}\nEMAIL:${teamMember.email}\nEND:VCARD`
                          )}`}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-1">
                        Scan to connect
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ y }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {subtitle}
              </h2>
              <p className="text-gray-600 mb-6">
                Mail us at{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-orange-600 font-medium hover:underline"
                >
                  {contactEmail}
                </a>
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-gray-500">OR</span>
                {socialLinks.facebook && (
                  <motion.a
                    href={socialLinks.facebook}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
                    aria-label="Facebook"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                )}
                {socialLinks.twitter && (
                  <motion.a
                    href={socialLinks.twitter}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
                    aria-label="Twitter"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                )}
                {socialLinks.linkedin && (
                  <motion.a
                    href={socialLinks.linkedin}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                )}
              </div>

              <div className="h-px bg-gray-200 mb-6" />

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-gray-600 mb-4">
                  Leave us a brief message
                </p>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Phone
                  </Label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-28 h-12 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="81234 56789"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="flex-1 h-12 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Submit
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
