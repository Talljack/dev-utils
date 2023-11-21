import UtilJsonFormatter from '@/pages/utils/JsonFormatter'
import type { UtilItem } from '@/type'
import JsonDiff from '@icons/json_diff.svg?react'
import JsonFormatter from '@icons/json_formatter.svg?react'
import React from 'react'
export const utilMap: UtilItem[] = [
  {
    name: 'JSON Formatter/Validate',
    path: '/utils/json-formatter',
    paramId: 'json-formatter',
    icon: <JsonFormatter />
  },
  {
    name: 'JSON Diff',
    path: '/utils/json-diff',
    paramId: 'json-diff',
    icon: <JsonDiff />
  }
]

export const utilsIdPageMap = {
  'json-formatter': (id: string) => <UtilJsonFormatter id={id} />
}
