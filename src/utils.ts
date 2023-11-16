import { utilMap } from '@/constant'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUtilItem = (paramId: string) => {
  return utilMap.find(item => item.paramId === paramId) ?? utilMap[0]
}
