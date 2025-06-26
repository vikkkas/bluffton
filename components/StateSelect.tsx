import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { STATE_OPTIONS } from "@/utils/registration-constants"

interface StateSelectProps {
  value?: string
  onValueChange: (value: string) => void
  className?: string
  placeholder?: string
}

export function StateSelect({ value, onValueChange, className, placeholder = "Select state" }: StateSelectProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {STATE_OPTIONS.map(({ value: stateValue, label }) => (
          <SelectItem key={stateValue} value={stateValue}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
