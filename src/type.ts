import type { ReactNode } from 'react'
export type UtilItem = {
  name: string
  path: string
  icon?: ReactNode
  paramId: string
}

export type DecodeType = 'base64' | 'base64url' | 'uri' | 'uri_component'
