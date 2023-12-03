import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { FC } from 'react'
import React, { useState } from 'react'

type SelectOption = {
  label: string
  value: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

const SelectComp: FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Please select',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(option => option.value === value)
  const handleValueChange = (value: string) => {
    onChange(value)
    setIsOpen(false)
  }
  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} className={className}>
        <SelectValue placeholder={placeholder}>
          {selectedOption?.label}
        </SelectValue>
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  )
}

export default SelectComp
