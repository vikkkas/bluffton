"use client";

import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Users,
  Star,
  Shield,
  Zap,
  BookOpen,
  Wrench,
} from "lucide-react";
import ProgramCard from "@/components/ProgramCard";
import Link from "next/link";

const PROGRAMS = [
  {
    id: "after-school-care",
    title: "After School Care",
    subtitle: "Comprehensive care from school dismissal until 6 PM",
    icon: Clock,
    gradient: "from-blue-500 to-purple-600",
    hoverGradient: "from-blue-600 to-purple-700",
    badges: ["School Pickup Available", "Homework Help", "STEM Activities"],
    price: "$135/week",
    registrationFee: "$75 Registration Fee per family",
    description: "Comprehensive care from school dismissal until 6 PM",
    features: [
      {
        icon: Star,
        text: "We love what we do and it shows. We are a family friendly, community oriented business who cares about our customers and their families.",
      },
      {
        icon: Zap,
        text: "We pack a lot of fun into just a few hours! We have homework help, outside time, character building activities, STEM Lego Robotics and crafts!",
      },
      {
        icon: Clock,
        text: "Our program is open from school dismissal until 6 PM. We are open on school holidays and early release days!",
      },
    ],
    details: [
      {
        icon: MapPin,
        title: "Pickup Available From:",
        items: [
          "Bluffton Elementary School",
          "Okatie Elementary",
          "River Ridge Academy",
        ],
      },
      {
        icon: Clock,
        title: "Hours:",
        items: ["School Pick up - 6 PM"],
      },
    ],
    specialNote: {
      icon: Shield,
      title: "Special Discounts Available",
      text: "We offer discounts for military personnel and first responders",
    },
    buttonText: "Register for 25/26 School Year",
  },
  {
    id: "lego-robotics",
    title: "Lego Robotics",
    subtitle: "STEM learning through fun robotics challenges",
    icon: Wrench,
    gradient: "from-green-500 to-teal-600",
    hoverGradient: "from-green-600 to-teal-700",
    badges: ["STEM Learning", "Team Building", "Problem Solving"],
    description:
      "Our Lego Robotics programs are built around fun and exciting challenges that strengthen your child's grasp of Science, Technology, Engineering, and Math concepts. Your child will also develop team-building skills as they discover more about the world of robotics and computer programming.",
    features: [
      {
        icon: Zap,
        text: "Strengthen STEM concepts through hands-on learning",
      },
      {
        icon: Users,
        text: "Develop team-building and collaboration skills",
      },
      {
        icon: Wrench,
        text: "Learn robot design and computer programming",
      },
    ],
    challenges: [
      {
        emoji: "🏴‍☠️",
        title: "Finding Buried Treasure",
        description: "Navigate and search missions",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-800",
        descColor: "text-green-700",
      },
      {
        emoji: "🚀",
        title: "Exploring Mars",
        description: "Space exploration challenges",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
        descColor: "text-red-700",
      },
      {
        emoji: "♻️",
        title: "Programming a Recycling Bot",
        description: "Environmental problem solving",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-800",
        descColor: "text-blue-700",
      },
    ],
    challengesTitle: "Exciting Challenges",
    challengesDescription:
      "Our goal is to help the next generation learn how to make a difference in their world using robot design and computer programming to solve problems like:",
    buttonText: "Enroll in Lego Robotics",
  },
  {
    id: "homeschool",
    title: "Homeschool Programs",
    subtitle: "Specialized programs for homeschool groups",
    icon: BookOpen,
    gradient: "from-purple-500 to-indigo-600",
    hoverGradient: "from-purple-600 to-indigo-700",
    badges: ["Group Learning", "STEM Focus", "Flexible Scheduling"],
    description:
      "Fun4KidZ StemLego is proud to offer programs for homeschool groups, which can add variety and exciting new concepts to your classroom. You can rest easy knowing that your child will participate in relevant, fun, and challenging projects that are specially designed to enhance their skills and knowledge.",
    features: [
      {
        icon: Star,
        text: "Add variety and excitement to your homeschool curriculum",
      },
      {
        icon: Zap,
        text: "Relevant, fun, and challenging projects",
      },
      {
        icon: BookOpen,
        text: "Specially designed to enhance skills and knowledge",
      },
    ],
    offerings: [
      {
        emoji: "🔬",
        title: "STEM Lego Activities",
        description:
          "Hands-on science, technology, engineering, and math learning",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-800",
        descColor: "text-purple-700",
      },
      {
        emoji: "👥",
        title: "Group Learning Environment",
        description:
          "Social interaction and collaborative learning opportunities",
        bgColor: "bg-indigo-50",
        borderColor: "border-indigo-200",
        textColor: "text-indigo-800",
        descColor: "text-indigo-700",
      },
      {
        emoji: "📅",
        title: "Flexible Scheduling",
        description: "Programs designed to fit your homeschool schedule",
        bgColor: "bg-pink-50",
        borderColor: "border-pink-200",
        textColor: "text-pink-800",
        descColor: "text-pink-700",
      },
      {
        emoji: "🎯",
        title: "Skill Enhancement",
        description: "Targeted activities to develop specific competencies",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-800",
        descColor: "text-green-700",
      },
    ],
    buttonText: "Join Our Homeschool Program",
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Our Programs
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of educational and fun programs
            designed to inspire, educate, and entertain your children.
          </p>
        </div>

        {/* Programs */}
        {PROGRAMS.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of families who trust Fun4KidZ with their children's
            education and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
