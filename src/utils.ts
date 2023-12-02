import { utilMap } from '@/constant'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUtilItem = (paramId: string) => {
  return utilMap.find(item => item.paramId === paramId) ?? utilMap[0]
}

export function hexToRGBA(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, 1)`
}

export function rgbaToHex(rgba: string): string {
  const parts = (rgba.match(/\d+/g) ?? []) as string[]
  if (parts.length < 3) return '#000000'
  const r = parseInt(parts[0]).toString(16).padStart(2, '0')
  const g = parseInt(parts[1]).toString(16).padStart(2, '0')
  const b = parseInt(parts[2]).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}
