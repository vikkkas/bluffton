
import { z } from "zod"
import { CARD_TYPES, US_STATES } from "./registration-constants"

// Schema validation
const registrationSchema = z.object({
  // Parent Information
  parent: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address")
  }),
  
  // Child Information
  children: z.array(z.object({
    fullName: z.string().min(1, "Child's full name is required")
  })).min(1, "At least one child is required"),
  
  // Program Selection
  program: z.object({
    selectedPrograms: z.array(z.enum([
      "after-school", 
      "lego-robotics", 
      "homeschooling", 
      "learn-play"
    ])).optional(),
    membershipOnly: z.boolean().default(false)
  }).refine((data) => {
    return data.membershipOnly || (data.selectedPrograms && data.selectedPrograms.length > 0);
  }, {
    message: "Please select either membership only or at least one program",
    path: ["selectedPrograms"]
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

export default registrationSchema