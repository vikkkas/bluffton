"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { 
  Star, Users, Clock, MapPin, Phone, 
  Mail, Zap, Gamepad2, GraduationCap, Heart 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import kids from "../assets/home/kids.webp"
import { sendEmail } from "@/lib/actions"

// Program card data for easy maintenance
const PROGRAMS = [
  {
    title: "After School Care",
    description: "STEM Lego & Gymnastics",
    icon: Zap,
    color: "blue",
    features: [
      "STEM-focused activities",
      "Lego building challenges",
      "Physical fitness & gymnastics",
      "Homework assistance",
      "Healthy snacks included"
    ],
    price: "$150/week"
  },
  {
    title: "Lego Robotics",
    description: "Workshops & Competitions",
    icon: Gamepad2,
    color: "green",
    features: [
      "Build & program robots",
      "Problem-solving skills",
      "Team collaboration",
      "Competition preparation",
      "Advanced STEM concepts"
    ],
    price: "$80/session"
  },
  {
    title: "Homeschooling",
    description: "Personalized Education",
    icon: GraduationCap,
    color: "purple",
    features: [
      "Customized curriculum",
      "One-on-one attention",
      "Flexible scheduling",
      "Progress tracking",
      "Parent collaboration"
    ],
    price: "$200/week"
  },
  {
    title: "Learn & Play",
    description: "Early Childhood Development",
    icon: Heart,
    color: "blue",
    features: [
      "Age-appropriate activities",
      "Social skill development",
      "Creative arts & crafts",
      "Music & movement",
      "Pre-school preparation"
    ],
    price: "$120/week"
  }
]

// Feature data for Why Choose Us section
const FEATURES = [
  {
    title: "Expert Staff",
    description: "Certified educators with years of experience in child development",
    icon: Users,
    color: "blue"
  },
  {
    title: "STEM Focus",
    description: "Cutting-edge STEM programs that prepare kids for the future",
    icon: Zap,
    color: "green"
  },
  {
    title: "Flexible Hours",
    description: "Programs designed to fit your family's busy schedule",
    icon: Clock,
    color: "purple"
  },
  {
    title: "Safe Environment",
    description: "Secure, nurturing space where children can learn and grow",
    icon: Heart,
    color: "blue"
  }
]

// Contact information
const CONTACT_INFO = [
  {
    title: "Phone",
    value: "(555) 123-4567",
    icon: Phone
  },
  {
    title: "Email",
    value: "info@fun4kidz.com",
    icon: Mail
  },
  {
    title: "Location",
    value: "123 Learning Lane, Education City, EC 12345",
    icon: MapPin
  }
]

// Testimonials data
const TESTIMONIALS = [
  {
    name: "Sarah M.",
    relationship: "Parent of Emma, Age 8",
    text: "My daughter loves the STEM activities! She's learned so much about robotics and problem-solving. The staff is amazing and really cares about each child."
  },
  {
    name: "Michael R.",
    relationship: "Parent of Jake, Age 10",
    text: "The homeschooling program has been perfect for our family. The personalized attention and flexible schedule work great with our lifestyle."
  },
  {
    name: "Lisa K.",
    relationship: "Parent of Alex, Age 7",
    text: "Fun4KidZ has been a game-changer for our after-school routine. My son is engaged, learning, and having fun every day!"
  }
]

// Component for program cards
// @ts-ignore
const ProgramCard = ({ program }) => {
  const { title, description, icon: Icon, color, features, price } = program
  
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-${color}-50 to-${color === 'blue' ? 'cyan' : color === 'green' ? 'emerald' : color === 'purple' ? 'violet' : color === 'rose' ? 'pink' : 'rose'}-50`}>
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color === 'blue' ? 'cyan' : color === 'green' ? 'emerald' : color === 'purple' ? 'violet' : color === 'rose' ? 'pink' : 'rose'}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className={`text-xl text-${color}-800`}>{title}</CardTitle>
        <CardDescription className={`text-${color}-600`}>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-gray-600 mb-6">
          {/* @ts-ignore */}
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        <div className="text-center">
          <div className={`text-2xl font-bold text-${color}-600 mb-2`}>{price}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleContactSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const result = await sendEmail(formData);
      setSubmitMessage(result.message);
    } catch (error) {
      setSubmitMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-100">Now Enrolling for 2025!</Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Where Learning Meets{" "}
                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  Adventure
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Premium child care programs combining STEM education, creative play, and personalized learning. Give
                your child the foundation they need to thrive!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => router.push("/programs")}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  View Programs
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  size="lg" 
                  variant="outline" 
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Register
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Ages 3-12</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Flexible Hours</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Safe Environment</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl transform rotate-3"></div>
              <Image
                src={kids}
                alt="Children engaged in STEM and play activities"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Carefully designed programs that blend education, creativity, and fun for optimal child development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of families who trust Fun4KidZ with their children's growth and development. Registration is
            quick and easy!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/register")}
              size="lg" 
              variant="secondary" 
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              Start Registration
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/programs")}
              className="border-white text-orange-600 hover:bg-white hover:text-orange-600"
            >
              View Programs
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-orange-100">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5★</div>
              <div className="text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">8+</div>
              <div className="text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Parents Say</h2>
            <p className="text-xl text-gray-600">Real feedback from families in our community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{`"${testimonial.text}"`}</p>
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.relationship}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Fun4KidZ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the highest quality care and education for your child
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => {
              const { title, description, icon: Icon, color } = feature;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color === 'blue' ? 'cyan' : color === 'green' ? 'emerald' : color === 'purple' ? 'violet' : color === 'pink' ? 'pink' : 'rose'}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to give your child the best start? Contact us today to learn more about our programs and schedule
                a visit.
              </p>

              <div className="space-y-6">
                {CONTACT_INFO.map((item, index) => {
                  const { title, value, icon: Icon } = item;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{title}</p>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>Get in touch with us for any questions or program information</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Tell us about your questions or program interests..."
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  {submitMessage && (
                    <div className={`text-center p-3 rounded-md ${
                      submitMessage.includes("success") 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}