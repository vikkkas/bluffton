import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className="text-gray-400 hover:text-white transition-colors duration-200"
    aria-label={typeof children === "string" ? children : undefined}
  >
    {children}
  </Link>
);

type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
};

const FooterSection = ({ title, children }: FooterSectionProps) => (
  <div>
    <h3 className="font-semibold text-lg mb-4">{title}</h3>
    {children}
  </div>
);

const PROGRAMS = [
  { name: "After School Care", href: "/programs/after-school" },
  { name: "Lego Robotics", href: "/programs/robotics" },
  { name: "Homeschooling", href: "/programs/homeschooling" },
  { name: "Learn & Play", href: "/programs/learn-play" },
];

const QUICK_LINKS = [
  { name: "Registration", href: "/register" },
  { name: "Programs", href: "/programs" },
];

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-white py-12"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">Fun4KidZ</span>
            </div>
            <p className="text-gray-400">
              Nurturing young minds through innovative programs that combine
              learning, creativity, and fun.
            </p>
          </div>

          {/* Programs Section */}
          <FooterSection title="Programs">
            <ul className="space-y-2">
              {PROGRAMS.map((program) => (
                <li key={program.href}>
                  <FooterLink href={program.href}>{program.name}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Quick Links Section */}
          <FooterSection title="Quick Links">
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Contact Info">
            <address className="not-italic space-y-2 text-gray-400">
              <p>
                <a
                  href="tel:5551234567"
                  className="hover:text-white transition-colors"
                >
                  (555) 123-4567
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@fun4kidz.com"
                  className="hover:text-white transition-colors"
                >
                  info@fun4kidz.com
                </a>
              </p>
              <p>123 Learning Lane</p>
              <p>Education City, EC 12345</p>
            </address>
          </FooterSection>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {CURRENT_YEAR} Fun4KidZ Child Play Care. All rights reserved.
            Made with ❤️ for families.
          </p>
        </div>
      </div>
    </footer>
  );
};
