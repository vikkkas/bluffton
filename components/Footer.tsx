import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Fun4KidZ</span>
            </div>
            <p className="text-gray-400">
              Nurturing young minds through innovative programs that combine
              learning, creativity, and fun.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <p>
                  After School Care
                </p>
              </li>
              <li>
                <p>
                  Lego Robotics
                </p>
              </li>
              <li>
                <p>
                  Homeschooling
                </p>
              </li>
              <li>
                <p>
                  Learn & Play
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="register" className="hover:text-white transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <Link href="programs" className="hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>(555) 123-4567</p>
              <p>info@fun4kidz.com</p>
              <p>123 Learning Lane</p>
              <p>Education City, EC 12345</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Fun4KidZ Child Play Care. All rights reserved. Made with
            ❤️ for families.
          </p>
        </div>
      </div>
    </footer>
  );
};
