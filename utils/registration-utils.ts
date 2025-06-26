import { PROGRAM_PRICING, BASE_FEES, ProgramId } from './registration-constants'

export interface CalculationItem {
  item: string
  amount: number
  type: 'base' | 'program'
}

export interface Child {
  fullName: string
}

export const calculateTotal = (
  selectedPrograms: ProgramId[], 
  membershipOnly: boolean, 
  children: Child[]
): string => {
  const childrenCount = children?.filter(child => child.fullName.trim()).length || 1

  if (membershipOnly) return BASE_FEES.TOTAL.toFixed(2)

  // Only add base fees if programs are selected
  if (selectedPrograms.length === 0) return "0.00"

  let total = BASE_FEES.TOTAL // Base membership + registration fees

  selectedPrograms.forEach((program) => {
    switch (program) {
      case "after-school":
        total += (PROGRAM_PRICING["after-school"].weekly * childrenCount) + PROGRAM_PRICING["after-school"].registration
        break
      case "lego-robotics":
        total += PROGRAM_PRICING["lego-robotics"].session * childrenCount
        break
      case "homeschooling":
        total += PROGRAM_PRICING["homeschooling"].weekly * childrenCount
        break
      case "learn-play":
        total += PROGRAM_PRICING["learn-play"].weekly * childrenCount
        break
    }
  })

  return total.toFixed(2)
}

export const getCalculationBreakdown = (
  selectedPrograms: ProgramId[], 
  membershipOnly: boolean, 
  children: Child[]
): CalculationItem[] => {
  const childrenCount = children?.filter(child => child.fullName.trim()).length || 1

  if (membershipOnly) {
    return [
      { item: "Annual Membership Fee", amount: BASE_FEES.MEMBERSHIP, type: "base" },
      { item: "Registration Fee", amount: BASE_FEES.REGISTRATION, type: "base" }
    ]
  }

  // Return empty breakdown if no programs selected
  if (selectedPrograms.length === 0) {
    return []
  }

  const breakdown: CalculationItem[] = [
    { item: "Annual Membership Fee", amount: BASE_FEES.MEMBERSHIP, type: "base" },
    { item: "Registration Fee", amount: BASE_FEES.REGISTRATION, type: "base" }
  ]

  selectedPrograms.forEach((program) => {
    switch (program) {
      case "after-school":
        breakdown.push({ 
          item: `After School Care - Weekly Rate (${childrenCount} child${childrenCount !== 1 ? 'ren' : ''})`, 
          amount: PROGRAM_PRICING["after-school"].weekly * childrenCount, 
          type: "program" 
        })
        breakdown.push({ 
          item: "After School Care - Registration Fee", 
          amount: PROGRAM_PRICING["after-school"].registration, 
          type: "program" 
        })
        break
      case "lego-robotics":
        breakdown.push({ 
          item: `Lego Robotics Workshop - Session (${childrenCount} child${childrenCount !== 1 ? 'ren' : ''})`, 
          amount: PROGRAM_PRICING["lego-robotics"].session * childrenCount, 
          type: "program" 
        })
        break
      case "homeschooling":
        breakdown.push({ 
          item: `Homeschooling Program - Weekly Rate (${childrenCount} child${childrenCount !== 1 ? 'ren' : ''})`, 
          amount: PROGRAM_PRICING["homeschooling"].weekly * childrenCount, 
          type: "program" 
        })
        break
      case "learn-play":
        breakdown.push({ 
          item: `Learn & Play Program - Weekly Rate (${childrenCount} child${childrenCount !== 1 ? 'ren' : ''})`, 
          amount: PROGRAM_PRICING["learn-play"].weekly * childrenCount, 
          type: "program" 
        })
        break
    }
  })

  return breakdown
}

export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  if (parts.length) {
    return parts.join(" ")
  } else {
    return v
  }
}

export const formatExpiry = (value: string): string => {
  const v = value.replace(/\D/g, "")
  if (v.length >= 2) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}`
  }
  return v
}
