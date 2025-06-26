// Program types and constants
export type ProgramId = "after-school" | "lego-robotics" | "homeschooling" | "learn-play"

export const PROGRAM_NAMES: Record<ProgramId, string> = {
  "after-school": "After School Care Program",
  "lego-robotics": "Lego Robotics Workshop", 
  "homeschooling": "Homeschooling Program",
  "learn-play": "Learn & Play Program"
}

export const PROGRAM_PRICING = {
  "after-school": { weekly: 135, registration: 75 },
  "lego-robotics": { session: 80 },
  "homeschooling": { weekly: 200 },
  "learn-play": { weekly: 120 }
} as const

export const BASE_FEES = {
  MEMBERSHIP: 5,
  REGISTRATION: 20,
  TOTAL: 25
} as const

export const PROGRAM_DESCRIPTIONS: Record<ProgramId, string> = {
  "after-school": "$135/week per child + $75 registration + Membership Fees",
  "lego-robotics": "$80/session per child + Membership Fees",
  "homeschooling": "$200/week per child + Membership Fees", 
  "learn-play": "$120/week per child + Membership Fees"
}

export const PROGRAM_BADGES: Record<ProgramId, Array<{text: string, className: string}>> = {
  "after-school": [
    { text: "School Pickup", className: "bg-blue-100 text-blue-800" },
    { text: "Homework Help", className: "bg-green-100 text-green-800" },
    { text: "STEM Activities", className: "bg-purple-100 text-purple-800" }
  ],
  "lego-robotics": [
    { text: "STEM Learning", className: "bg-green-100 text-green-800" },
    { text: "Team Building", className: "bg-yellow-100 text-yellow-800" },
    { text: "Problem Solving", className: "bg-indigo-100 text-indigo-800" }
  ],
  "homeschooling": [
    { text: "Group Learning", className: "bg-purple-100 text-purple-800" },
    { text: "Flexible Schedule", className: "bg-pink-100 text-pink-800" },
    { text: "Custom Curriculum", className: "bg-cyan-100 text-cyan-800" }
  ],
  "learn-play": [
    { text: "Interactive Learning", className: "bg-pink-100 text-pink-800" },
    { text: "Creative Play", className: "bg-orange-100 text-orange-800" },
    { text: "Age Appropriate", className: "bg-teal-100 text-teal-800" }
  ]
}

export const CARD_TYPES = ["visa", "mastercard", "amex", "discover"] as const
export const US_STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"] as const

export const STATE_OPTIONS = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
] as const
