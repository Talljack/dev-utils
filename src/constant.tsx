import UtilJsonDiff from '@/pages/utils/JsonDiff'
import UtilJsonFormatter from '@/pages/utils/JsonFormatter'
import type { UtilItem } from '@/type'
import React from 'react'
export const utilMap: UtilItem[] = [
  {
    name: 'JSON Formatter/Validate',
    path: '/utils/json-formatter',
    paramId: 'json-formatter'
  },
  {
    name: 'JSON Diff',
    path: '/utils/json-diff',
    paramId: 'json-diff'
  }
]

export const utilsIdPageMap = {
  'json-formatter': (id: string) => <UtilJsonFormatter id={id} />,
  'json-diff': (id: string) => <UtilJsonDiff id={id} />
}
