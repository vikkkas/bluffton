"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CreditCard, Shield, Users, Heart, CheckCircle, AlertCircle, Star, X } from "lucide-react"
import Link from "next/link"
import registrationSchema from "@/utils/zod_schema"
import { ProgramId, PROGRAM_NAMES } from "@/utils/registration-constants"
import { calculateTotal, getCalculationBreakdown, formatCardNumber, formatExpiry } from "@/utils/registration-utils"
import { ProgramOption } from "@/components/ProgramOption"
import { StateSelect } from "@/components/StateSelect"

type RegistrationFormData = z.infer<typeof registrationSchema>
export default function RegistrationPage() {
  const [cardType, setCardType] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      parent: {
        firstName: "",
        lastName: "",
        email: "",
      },
      children: [{ fullName: "" }],
      program: {
        selectedPrograms: [],
        membershipOnly: false,
      },
      payment: {
        cardholder: {
          firstName: "",
          lastName: "",
        },
        billing: {
          address: "",
          city: "",
          state: undefined,
          zipCode: "",
        },
        card: {
          type: undefined,
          number: "",
          expiry: "",
          cvv: "",
        },
        amount: "",
      },
    },
  });

  const selectedPrograms = form.watch("program.selectedPrograms") || []
  const membershipOnly = form.watch("program.membershipOnly")
  const children = form.watch("children") || [{ fullName: "" }]

  const handleProgramSelection = (programId: ProgramId, checked: boolean) => {
    const currentPrograms = form.getValues("program.selectedPrograms") || []

    if (checked) {
      const newPrograms = [...currentPrograms, programId]
      form.setValue("program.selectedPrograms", newPrograms)
      form.setValue("program.membershipOnly", false)
    } else {
      const newPrograms = currentPrograms.filter((id) => id !== programId)
      form.setValue("program.selectedPrograms", newPrograms)
    }

    updateAmount()
  }

  const handleMembershipOnlyChange = (checked: boolean) => {
    form.setValue("program.membershipOnly", checked)
    if (checked) {
      form.setValue("program.selectedPrograms", [])
    }
    updateAmount()
  }

  const addChild = () => {
    const currentChildren = form.getValues("children") || []
    form.setValue("children", [...currentChildren, { fullName: "" }])
    updateAmount()
  }

  const removeChild = (index: number) => {
    const currentChildren = form.getValues("children") || []
    if (currentChildren.length > 1) {
      const newChildren = currentChildren.filter((_, i) => i !== index)
      form.setValue("children", newChildren)
      updateAmount()
    }
  }

  const updateAmount = () => {
    const total = calculateTotal(selectedPrograms, membershipOnly, children)
    form.setValue("payment.amount", total)
    form.trigger("payment.amount")
  }

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      console.log("Form submitted with data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccessMessage(true);

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reset form after successful submission
      setTimeout(() => {
        form.reset({
          parent: {
            firstName: "",
            lastName: "",
            email: "",
          },
          children: [{ fullName: "" }],
          program: {
            selectedPrograms: [],
            membershipOnly: false,
          },
          payment: {
            cardholder: {
              firstName: "",
              lastName: "",
            },
            billing: {
              address: "",
              city: "",
              state: undefined,
              zipCode: "",
            },
            card: {
              type: undefined,
              number: "",
              expiry: "",
              cvv: "",
            },
            amount: "",
          },
        });
        updateAmount();
      }, 1500);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error here if needed
    }
  };

  // Auto-update amount when form values change
  useEffect(() => {
    updateAmount()
  }, [selectedPrograms, membershipOnly, children])

  const isFormValid = () => {
    return membershipOnly || selectedPrograms.length > 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message - Fixed at top */}
          {showSuccessMessage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
              <Alert className="border-green-200 bg-green-50 shadow-lg relative">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <button
                  onClick={() => setShowSuccessMessage(false)}
                  className="absolute top-2 right-2 text-green-600 hover:text-green-800"
                >
                  <X className="h-4 w-4" />
                </button>
                <AlertDescription className="text-green-800 pr-8">
                  Registration submitted successfully! We'll process your
                  payment and send you a confirmation email.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Program Registration
            </h1>
            <p className="text-xl text-gray-600">
              Complete your child's enrollment in just a few steps
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Parent Information */}
              <Card className="border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-2xl flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    Parent Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact details for registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="parent.firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            First Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              className="border-2 focus:border-blue-500 focus:outline-none transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parent.lastName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Last Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              className="border-2 focus:border-blue-500 focus:outline-none transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parent.email"
                      render={({ field }) => (
                        <FormItem className="space-y-2 md:col-span-2">
                          <FormLabel className="text-sm font-semibold text-gray-700">
                            Email for Receipt *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="border-2 focus:border-blue-500 focus:outline-none transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-gray-500">
                            We'll send your registration confirmation and
                            receipts to this email
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Child Information */}
              <Card className="border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-2xl flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                      Children Information
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addChild}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Add Another Child
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Tell us about your children joining our programs
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {(form.watch("children") || [{ fullName: "" }]).map(
                      (_, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-800">
                              Child {index + 1}
                            </h4>
                            {(form.watch("children") || [{ fullName: "" }])
                              .length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeChild(index)}
                                className="border-red-300 text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <FormField
                            control={form.control}
                            name={`children.${index}.fullName`}
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Child's Full Name *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter child's full name"
                                    className="border-2 focus:border-green-500 focus:outline-none transition-colors"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-xs text-gray-500">
                                  Please enter the full name as it should appear
                                  on certificates and records
                                </FormDescription>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                          {index <
                            (form.watch("children") || [{ fullName: "" }])
                              .length -
                              1 && (
                            <div className="mt-6 border-b border-gray-200"></div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Program Selection */}
              <Card className="border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-violet-500"></div>
                <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                  <CardTitle className="text-2xl flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    Program Selection
                  </CardTitle>
                  <CardDescription>
                    Choose between membership fees or program enrollment
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="program.selectedPrograms"
                    render={() => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-base font-semibold text-gray-800">
                          Select Programs & Payment Options *
                        </FormLabel>

                        {/* Membership Only Option */}
                        <div className="relative">
                          <div
                            className={`flex items-center space-x-4 p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                              membershipOnly
                                ? "border-orange-500 bg-orange-50"
                                : "border-gray-200 hover:border-orange-300"
                            }`}
                          >
                            <Checkbox
                              id="membership-only"
                              checked={membershipOnly}
                              onCheckedChange={handleMembershipOnlyChange}
                              className="h-5 w-5"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor="membership-only"
                                className="text-lg font-semibold cursor-pointer text-gray-800"
                              >
                                Membership Fee Only
                              </Label>
                              <p className="text-sm text-gray-600 mt-1">
                                $5 Annual Membership + $20 Registration Fee =
                                $25 (One-time payment)
                              </p>
                              <div className="flex items-center mt-2">
                                <Badge
                                  variant="secondary"
                                  className="bg-orange-100 text-orange-800"
                                >
                                  Basic Access
                                </Badge>
                              </div>
                            </div>
                            {membershipOnly && (
                              <CheckCircle className="h-6 w-6 text-orange-500" />
                            )}
                          </div>
                        </div>

                        {/* Program Options */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Available Programs
                          </h4>

                          <ProgramOption
                            programId="after-school"
                            isSelected={selectedPrograms.includes("after-school")}
                            isDisabled={membershipOnly}
                            onSelectionChange={handleProgramSelection}
                            childrenCount={children?.filter(child => child.fullName.trim()).length || 1}
                            selectedClass="border-blue-500 bg-blue-50"
                            hoverClass="border-gray-200 hover:border-blue-300"
                          />

                          <ProgramOption
                            programId="lego-robotics"
                            isSelected={selectedPrograms.includes("lego-robotics")}
                            isDisabled={membershipOnly}
                            onSelectionChange={handleProgramSelection}
                            childrenCount={children?.filter(child => child.fullName.trim()).length || 1}
                            selectedClass="border-green-500 bg-green-50"
                            hoverClass="border-gray-200 hover:border-green-300"
                          />

                          <ProgramOption
                            programId="homeschooling"
                            isSelected={selectedPrograms.includes("homeschooling")}
                            isDisabled={membershipOnly}
                            onSelectionChange={handleProgramSelection}
                            childrenCount={children?.filter(child => child.fullName.trim()).length || 1}
                            selectedClass="border-purple-500 bg-purple-50"
                            hoverClass="border-gray-200 hover:border-purple-300"
                          />

                          <ProgramOption
                            programId="learn-play"
                            isSelected={selectedPrograms.includes("learn-play")}
                            isDisabled={membershipOnly}
                            onSelectionChange={handleProgramSelection}
                            childrenCount={children?.filter(child => child.fullName.trim()).length || 1}
                            selectedClass="border-pink-500 bg-pink-50"
                            hoverClass="border-gray-200 hover:border-pink-300"
                          />
                        </div>

                        {/* Selected Programs Summary */}
                        {selectedPrograms.length > 0 && !membershipOnly && (
                          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Selected Programs Summary:
                            </h4>
                            <ul className="space-y-2">
                              {selectedPrograms.map((program) => (
                                <li
                                  key={program}
                                  className="flex items-center text-blue-800"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  <span className="font-medium">
                                    {PROGRAM_NAMES[program]}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Registration Summary */}
                        {(selectedPrograms.length > 0 || membershipOnly) && (
                          <div className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl">
                            <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                              <Users className="h-5 w-5 mr-2" />
                              Registration Summary:
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-amber-800">
                                  Children Enrolled:
                                </span>
                                <p className="text-amber-700 mt-1">
                                  {children?.filter(child => child.fullName.trim()).length || 0} child
                                  {(children?.filter(child => child.fullName.trim()).length || 0) !== 1 ? 'ren' : ''}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium text-amber-800">
                                  Programs Selected:
                                </span>
                                <p className="text-amber-700 mt-1">
                                  {membershipOnly
                                    ? "Membership Only"
                                    : `${selectedPrograms.length} program${
                                        selectedPrograms.length !== 1 ? "s" : ""
                                      }`}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500"></div>
                <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                  <CardTitle className="text-2xl flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg mr-3">
                      <CreditCard className="h-6 w-6 text-orange-600" />
                    </div>
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    Secure payment processing with end-to-end encryption
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    {/* Cardholder Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Cardholder Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="payment.cardholder.firstName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                First Name on Card *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="First name as on card"
                                  className="border-2 focus:border-orange-500 focus:outline-none transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="payment.cardholder.lastName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Last Name on Card *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Last name as on card"
                                  className="border-2 focus:border-orange-500 focus:outline-none transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Billing Address
                      </h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="payment.billing.address"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Billing Address *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Street address"
                                  className="border-2 focus:border-orange-500 focus:outline-none transition-colors"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="payment.billing.city"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  City *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="City"
                                    className="border-2 focus:border-orange-500 focus:outline-none transition-colors"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="payment.billing.state"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  State *
                                </FormLabel>
                                <FormControl>
                                  <StateSelect
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="border-2 focus:border-orange-500 focus:outline-none transition-colors"
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="payment.billing.zipCode"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  ZIP Code *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="ZIP code"
                                    className="border-2 focus:border-orange-500 focus:outline-none transition-colors"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Card Information
                      </h3>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="payment.card.type"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Card Type *
                              </FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setCardType(value);
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-2 focus:border-orange-500 transition-colors">
                                    <SelectValue placeholder="Select card type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="visa">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                        VISA
                                      </div>
                                      Visa
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="mastercard">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                        MC
                                      </div>
                                      Mastercard
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="amex">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                        AMEX
                                      </div>
                                      American Express
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="discover">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-5 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                        DISC
                                      </div>
                                      Discover
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="payment.card.number"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Credit Card Number *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                  className="border-2 focus:border-orange-500 focus:outline-none transition-colors font-mono"
                                  {...field}
                                  onChange={(e) => {
                                    const formatted = formatCardNumber(
                                      e.target.value
                                    );
                                    field.onChange(formatted);
                                  }}
                                />
                              </FormControl>
                              <FormDescription className="text-xs text-gray-500">
                                Your card information is encrypted and secure
                              </FormDescription>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="payment.card.expiry"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Expiry Date *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    className="border-2 focus:border-orange-500 focus:outline-none transition-colors font-mono"
                                    {...field}
                                    onChange={(e) => {
                                      const formatted = formatExpiry(
                                        e.target.value
                                      );
                                      field.onChange(formatted);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="payment.card.cvv"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  CVV *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123"
                                    maxLength={4}
                                    type="password"
                                    className="border-2 focus:border-orange-500 focus:outline-none transition-colors font-mono"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-xs text-gray-500">
                                  3-4 digits on the back of your card
                                </FormDescription>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <FormField
                      control={form.control}
                      name="payment.amount"
                      render={({ field }) => (
                        <FormItem>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl border-2 border-green-200">
                            <div className="flex justify-between items-center mb-6">
                              <FormLabel className="text-2xl font-bold text-gray-800">
                                Total Amount
                              </FormLabel>
                              <div className="text-right">
                                <div className="text-4xl font-bold text-green-600 mb-1">
                                  ${calculateTotal(selectedPrograms, membershipOnly, children)}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                  USD
                                </div>
                              </div>
                            </div>

                            {/* Detailed Calculation Breakdown */}
                            {selectedPrograms.length > 0 || membershipOnly ? (
                              <div>
                                <div className="bg-white p-6 rounded-xl border border-green-200 mb-4">
                                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    Calculation Breakdown
                                  </h4>
                                  <div className="space-y-3">
                                    {getCalculationBreakdown(selectedPrograms, membershipOnly, children).map(
                                      (item, index) => (
                                        <div
                                          key={index}
                                          className={`flex justify-between items-center py-3 px-4 rounded-lg border-l-4 ${
                                            item.type === "base"
                                              ? "bg-blue-50 border-blue-400"
                                              : "bg-purple-50 border-purple-400"
                                          }`}
                                        >
                                          <div className="flex items-center">
                                            {item.type === "base" ? (
                                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                            ) : (
                                              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                                            )}
                                            <span
                                              className={`font-medium ${
                                                item.type === "base"
                                                  ? "text-blue-800"
                                                  : "text-purple-800"
                                              }`}
                                            >
                                              {item.item}
                                            </span>
                                          </div>
                                          <span className="text-gray-900 font-semibold">
                                            ${item.amount.toFixed(2)}
                                          </span>
                                        </div>
                                      )
                                    )}

                                    {/* Subtotals */}
                                    {!membershipOnly &&
                                      getCalculationBreakdown(selectedPrograms, membershipOnly, children).some(
                                        (item) => item.type === "program"
                                      ) && (
                                        <>
                                          <div className="border-t border-gray-200 pt-3 mt-4">
                                            <div className="flex justify-between items-center py-2">
                                              <span className="text-blue-700 font-medium">
                                                Base Fees:
                                              </span>
                                              <span className="text-blue-800 font-semibold">
                                                $
                                                {getCalculationBreakdown(selectedPrograms, membershipOnly, children)
                                                  .filter(
                                                    (item) =>
                                                      item.type === "base"
                                                  )
                                                  .reduce(
                                                    (sum, item) =>
                                                      sum + item.amount,
                                                    0
                                                  )
                                                  .toFixed(2)}
                                              </span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                              <span className="text-purple-700 font-medium">
                                                Program Fees:
                                              </span>
                                              <span className="text-purple-800 font-semibold">
                                                $
                                                {getCalculationBreakdown(selectedPrograms, membershipOnly, children)
                                                  .filter(
                                                    (item) =>
                                                      item.type === "program"
                                                  )
                                                  .reduce(
                                                    (sum, item) =>
                                                      sum + item.amount,
                                                    0
                                                  )
                                                  .toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      )}

                                    <div className="flex justify-between items-center pt-4 border-t-2 border-green-300 bg-green-100 px-4 py-3 rounded-lg">
                                      <span className="text-xl font-bold text-gray-800">
                                        Total Amount
                                      </span>
                                      <span className="text-xl font-bold text-green-600">
                                        ${calculateTotal(selectedPrograms, membershipOnly, children)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600 mb-4">
                                  {membershipOnly
                                    ? "Membership fee and registration (one-time payment)"
                                    : `Includes membership fees, registration, and ${
                                        selectedPrograms.length
                                      } selected program${
                                        selectedPrograms.length !== 1 ? "s" : ""
                                      } for ${
                                        form.watch("children")?.length || 1
                                      } child${
                                        (form.watch("children")?.length ||
                                          1) !== 1
                                          ? "ren"
                                          : ""
                                      }`}
                                </div>
                              </div>
                            ) : null}
                            <Input
                              {...field}
                              value={calculateTotal(selectedPrograms, membershipOnly, children)}
                              readOnly
                              className="hidden"
                            />
                            <FormMessage className="text-xs" />
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
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={!isFormValid() || form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Complete Registration & Payment
                    </>
                  )}
                </Button>
              </div>

              {/* Form Validation Summary */}
              {Object.keys(form.formState.errors).length > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Please review and correct the errors in the form before
                    submitting.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </Form>

          {/* Security Notice */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">
                Your payment information is encrypted and secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
