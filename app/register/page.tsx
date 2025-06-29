"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shield, CreditCard, Users, Heart } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Constants
const FEE_TYPES = {
  MEMBERSHIP: {
    id: "membership",
    name: "Membership Fee Only",
    description: "$5 Annual Membership + $20 Registration Fee = $25",
    amount: "25.00"
  },
  AFTER_SCHOOL: {
    id: "after-school",
    name: "After School Care Program",
    description: "$150/week + Membership Fees = $175",
    amount: "175.00"
  },
  LEGO_ROBOTICS: {
    id: "lego-robotics",
    name: "Lego Robotics Workshop",
    description: "$80/session + Membership Fees = $105",
    amount: "105.00"
  },
  HOMESCHOOLING: {
    id: "homeschooling",
    name: "Homeschooling Program",
    description: "$200/week + Membership Fees = $225",
    amount: "225.00"
  },
  LEARN_PLAY: {
    id: "learn-play",
    name: "Learn & Play Program",
    description: "$120/week + Membership Fees = $145",
    amount: "145.00"
  }
}

const CARD_TYPES = ["visa", "mastercard", "amex", "discover"] as const
const US_STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] as const

// Schema validation
const registrationSchema = z.object({
  // Parent Information
  parent: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address")
  }),
  
  // Child Information
  child: z.object({
    fullName: z.string().min(1, "Child's full name is required")
  }),
  
  // Program Selection
  program: z.object({
    feeType: z.enum([
      "membership", 
      "after-school", 
      "lego-robotics", 
      "homeschooling", 
      "learn-play"
    ], {
      required_error: "Please select a program"
    })
  }),
  
  // Payment Information
  payment: z.object({
    cardholder: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required")
    }),
    billing: z.object({
      address: z.string().min(1, "Billing address is required"),
      city: z.string().min(1, "City is required"),
      state: z.enum(US_STATES, {
        required_error: "Please select a state"
      }),
      zipCode: z.string()
        .min(5, "ZIP code must be at least 5 characters")
        .max(10, "ZIP code cannot exceed 10 characters")
        .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code")
    }),
    card: z.object({
      type: z.enum(CARD_TYPES, {
        required_error: "Please select a card type"
      }),
      number: z.string()
        .min(13, "Card number is too short")
        .max(19, "Card number is too long")
        .regex(/^[0-9\s]+$/, "Please enter a valid card number"),
      expiry: z.string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please use MM/YY format"),
      cvv: z.string()
        .min(3, "CVV is too short")
        .max(4, "CVV is too long")
        .regex(/^\d+$/, "CVV must contain only numbers")
    }),
    amount: z.string().min(1, "Amount is required")
  })
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationPage() {
  const [amount, setAmount] = useState("")
  
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      parent: {
        firstName: "",
        lastName: "",
        email: ""
      },
      child: {
        fullName: ""
      },
      program: {
        feeType: undefined
      },
      payment: {
        cardholder: {
          firstName: "",
          lastName: ""
        },
        billing: {
          address: "",
          city: "",
          state: undefined,
          zipCode: ""
        },
        card: {
          type: undefined,
          number: "",
          expiry: "",
          cvv: ""
        },
        amount: ""
      }
    }
  })

  const onFeeTypeChange = (value: string) => {
    // Find the fee type by ID instead of casting
    const feeType = Object.values(FEE_TYPES).find(ft => ft.id === value)
    const newAmount = feeType?.amount || ""
    
    setAmount(newAmount)
    form.setValue("payment.amount", newAmount)
  }

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form submitted with data:", data)
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Registration</h1>
            <p className="text-xl text-gray-600">Complete your child's enrollment in just a few steps</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Parent Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="h-6 w-6 mr-3 text-blue-600" />
                    Parent Information
                  </CardTitle>
                  <CardDescription>Please provide your contact details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="parent.firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="parent.lastName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="parent.email"
                      render={({ field }) => (
                        <FormItem className="space-y-2 md:col-span-2">
                          <FormLabel>Email for Receipt *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Child Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-2xl flex items-center">
                    <Heart className="h-6 w-6 mr-3 text-green-600" />
                    Child Information
                  </CardTitle>
                  <CardDescription>Tell us about your child</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="child.fullName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Child's Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your child's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Program Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                  <CardTitle className="text-2xl">Program Selection</CardTitle>
                  <CardDescription>Choose between membership fees or program enrollment</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="program.feeType"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-base font-medium">Please Specify Fee Type *</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={(value) => {
                              field.onChange(value)
                              onFeeTypeChange(value)
                            }}
                            value={field.value}
                            className="space-y-4"
                          >
                            {Object.values(FEE_TYPES).map((feeType) => (
                              <div key={feeType.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                                <RadioGroupItem value={feeType.id} id={feeType.id} />
                                <Label htmlFor={feeType.id} className="flex-1 cursor-pointer">
                                  <div className="font-medium">{feeType.name}</div>
                                  <div className="text-sm text-gray-600">{feeType.description}</div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                  <CardTitle className="text-2xl flex items-center">
                    <CreditCard className="h-6 w-6 mr-3 text-orange-600" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>Secure payment processing</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Cardholder Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Cardholder Information</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="payment.cardholder.firstName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>First Name on Card *</FormLabel>
                              <FormControl>
                                <Input placeholder="First name as on card" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="payment.cardholder.lastName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Last Name on Card *</FormLabel>
                              <FormControl>
                                <Input placeholder="Last name as on card" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="payment.billing.address"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Billing Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="Street address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="payment.billing.city"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="payment.billing.state"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>State *</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {US_STATES.map((state) => (
                                      <SelectItem key={state} value={state}>{state}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="payment.billing.zipCode"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>ZIP Code *</FormLabel>
                                <FormControl>
                                  <Input placeholder="ZIP code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Card Information</h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="payment.card.type"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Card Type *</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select card type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="visa">Visa</SelectItem>
                                  <SelectItem value="mastercard">Mastercard</SelectItem>
                                  <SelectItem value="amex">American Express</SelectItem>
                                  <SelectItem value="discover">Discover</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="payment.card.number"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Credit Card Number *</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" maxLength={19} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="payment.card.expiry"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Expiry Date *</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" maxLength={5} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="payment.card.cvv"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>CVV *</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" maxLength={4} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <FormField
                      control={form.control}
                      name="payment.amount"
                      render={({ field }) => (
                        <FormItem>
                          <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex justify-between items-center">
                              <FormLabel htmlFor="amount" className="text-lg font-semibold">
                                Total Amount
                              </FormLabel>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-green-600">${amount || "0.00"}</div>
                              </div>
                            </div>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-12 py-4 text-lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Complete Registration & Payment
                </Button>
              </div>
            </form>
          </Form>

          {/* Security Notice */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">Your payment information is encrypted and secure</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
