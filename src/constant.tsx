import UtilBase64Decode from '@/pages/utils/Base64Decode'
import UtilBase64Encode from '@/pages/utils/Base64Encode'
import UtilColorConverter from '@/pages/utils/ColorConverter'
import UtilCssFormatter from '@/pages/utils/CssFormatter'
import UtilHashGenerator from '@/pages/utils/HashGenerator'
import UtilJSFormatter from '@/pages/utils/JSFormatter'
import UtilJsonDiff from '@/pages/utils/JsonDiff'
import UtilJsonFormatter from '@/pages/utils/JsonFormatter'
import UtilJsonSchemaToTypescript from '@/pages/utils/JsonSchemaToTypescript'
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
  },
  {
    name: 'Hash Generator',
    path: '/utils/hash-generator',
    paramId: 'hash-generator'
  },
  {
    name: 'JS Formatter',
    path: '/utils/js-formatter',
    paramId: 'js-formatter'
  },
  {
    name: 'CSS Formatter',
    path: '/utils/css-formatter',
    paramId: 'css-formatter'
  },
  {
    name: 'JSON Schema to TypeScript',
    path: '/utils/json-schema-to-typescript',
    paramId: 'json-schema-to-typescript'
  }
]

export const utilsIdPageMap = {
  'json-formatter': <UtilJsonFormatter />,
  'json-diff': <UtilJsonDiff />,
  'base64-encode': <UtilBase64Encode />,
  'base64-decode': <UtilBase64Decode />,
  'color-converter': <UtilColorConverter />,
  'timestamp-converter': <UtilTimestampConverter />,
  'hash-generator': <UtilHashGenerator />,
  'js-formatter': <UtilJSFormatter />,
  'css-formatter': <UtilCssFormatter />,
  'json-schema-to-typescript': <UtilJsonSchemaToTypescript />
}
