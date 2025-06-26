import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { ProgramId, PROGRAM_NAMES, PROGRAM_DESCRIPTIONS, PROGRAM_BADGES } from "@/utils/registration-constants"

interface ProgramOptionProps {
  programId: ProgramId
  isSelected: boolean
  isDisabled: boolean
  onSelectionChange: (programId: ProgramId, checked: boolean) => void
  childrenCount: number
  selectedClass: string
  hoverClass: string
}

export function ProgramOption({
  programId,
  isSelected,
  isDisabled,
  onSelectionChange,
  childrenCount,
  selectedClass,
  hoverClass
}: ProgramOptionProps) {
  const name = PROGRAM_NAMES[programId]
  const description = PROGRAM_DESCRIPTIONS[programId]
  const badges = PROGRAM_BADGES[programId]

  const getPerChildText = () => {
    if (childrenCount <= 1) return null
    
    const rates = {
      "after-school": 135,
      "lego-robotics": 80,
      "homeschooling": 200,
      "learn-play": 120
    }
    
    const unit = programId === "lego-robotics" ? "session" : "week"
    const rate = rates[programId]
    
    return `$${rate * childrenCount}/${unit} for ${childrenCount} children`
  }

  const getColorClasses = () => {
    const colors = {
      "after-school": {
        selected: "border-blue-500 bg-blue-50",
        hover: "border-gray-200 hover:border-blue-300",
        icon: "text-blue-500",
        perChild: "text-blue-600"
      },
      "lego-robotics": {
        selected: "border-green-500 bg-green-50", 
        hover: "border-gray-200 hover:border-green-300",
        icon: "text-green-500",
        perChild: "text-green-600"
      },
      "homeschooling": {
        selected: "border-purple-500 bg-purple-50",
        hover: "border-gray-200 hover:border-purple-300", 
        icon: "text-purple-500",
        perChild: "text-purple-600"
      },
      "learn-play": {
        selected: "border-pink-500 bg-pink-50",
        hover: "border-gray-200 hover:border-pink-300",
        icon: "text-pink-500", 
        perChild: "text-pink-600"
      }
    }
    return colors[programId]
  }

  const colorClasses = getColorClasses()
  const perChildText = getPerChildText()

  return (
    <div className="relative">
      <div
        className={`flex items-center space-x-4 p-6 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
          isSelected ? colorClasses.selected : colorClasses.hover
        } ${isDisabled ? "opacity-50 pointer-events-none" : ""}`}
      >
        <Checkbox
          id={programId}
          checked={isSelected}
          onCheckedChange={(checked) => onSelectionChange(programId, checked as boolean)}
          disabled={isDisabled}
          className="h-5 w-5"
        />
        <div className="flex-1">
          <Label
            htmlFor={programId}
            className="text-lg font-semibold cursor-pointer text-gray-800"
          >
            {name}
          </Label>
          <p className="text-sm text-gray-600 mt-1">
            {description}
          </p>
          {perChildText && (
            <p className={`text-xs mt-1 font-medium ${colorClasses.perChild}`}>
              {perChildText}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={badge.className}
              >
                {badge.text}
              </Badge>
            ))}
          </div>
        </div>
        {isSelected && (
          <CheckCircle className={`h-6 w-6 ${colorClasses.icon}`} />
        )}
      </div>
    </div>
  )
}
