import UtilBase64Encode from '@/pages/utils/Base64Encode'
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
  },
  {
    name: 'Base64 Encode',
    path: '/utils/base64-encode',
    paramId: 'base64-encode'
  }
]

export const utilsIdPageMap = {
  'json-formatter': <UtilJsonFormatter />,
  'json-diff': <UtilJsonDiff />,
  'base64-encode': <UtilBase64Encode />
}
