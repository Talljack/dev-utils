import UtilBase64Decode from '@/pages/utils/Base64Decode'
import UtilBase64Encode from '@/pages/utils/Base64Encode'
import UtilColorConverter from '@/pages/utils/ColorConverter'
import UtilJsonDiff from '@/pages/utils/JsonDiff'
import UtilJsonFormatter from '@/pages/utils/JsonFormatter'
import UtilTimestampConverter from '@/pages/utils/TimestampConverter'
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
  },
  {
    name: 'Base64 Decode',
    path: '/utils/base64-decode',
    paramId: 'base64-decode'
  },
  {
    name: 'Color Converter',
    path: '/utils/color-converter',
    paramId: 'color-converter'
  },
  {
    name: 'Timestamp Converter',
    path: '/utils/timestamp-converter',
    paramId: 'timestamp-converter'
  }
]

export const utilsIdPageMap = {
  'json-formatter': <UtilJsonFormatter />,
  'json-diff': <UtilJsonDiff />,
  'base64-encode': <UtilBase64Encode />,
  'base64-decode': <UtilBase64Decode />,
  'color-converter': <UtilColorConverter />,
  'timestamp-converter': <UtilTimestampConverter />
}
