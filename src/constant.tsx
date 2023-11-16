import type { UtilItem } from '@/type'
import JsonFormatter from '@icons/json_formatter.svg?react'
import React from 'react'
export const utilMap: UtilItem[] = [
  {
    name: 'JSON Formatter/Validate',
    path: '/util/json-formatter',
    paramId: 'json-formatter',
    icon: <JsonFormatter />
  }
]
