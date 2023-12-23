import UtilBase64Decode from '@/pages/utils/Base64Decode'
import UtilBase64Encode from '@/pages/utils/Base64Encode'
import UtilColorConverter from '@/pages/utils/ColorConverter'
import UtilCssBoxShadowGenerator from '@/pages/utils/CssBoxShadowGenerator'
import UtilCssFormatter from '@/pages/utils/CssFormatter'
import UtilHashGenerator from '@/pages/utils/HashGenerator'
import UtilJSFormatter from '@/pages/utils/JSFormatter'
import UtilJsonDiff from '@/pages/utils/JsonDiff'
import UtilJsonFormatter from '@/pages/utils/JsonFormatter'
import UtilJsonSchemaToTypescript from '@/pages/utils/JsonSchemaToTypescript'
import UtilJsonToRust from '@/pages/utils/JsonToRust'
import UtilJsonToToml from '@/pages/utils/JsonToToml'
import UtilJsonToTypescript from '@/pages/utils/JsonToTypescript'
import UtilJsonToYaml from '@/pages/utils/JsonToYaml'
import UtilMarkdownFormatter from '@/pages/utils/MarkdownFormatter'
import UtilMarkdownPreview from '@/pages/utils/MarkdownPreview'
import UtilScssFormatter from '@/pages/utils/ScssFormatter'
import UtilSvgToTsx from '@/pages/utils/SvgToTsx'
import UtilTimestampConverter from '@/pages/utils/TimestampConverter'
import UtilTomlToJson from '@/pages/utils/TomlToJson'
import UtilYamlToJson from '@/pages/utils/YamlToJson'
import type { UtilItem } from '@/type'
import HTMLToMarkdown from './pages/utils/HTMLToMarkdown'
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
    name: 'SCSS Formatter',
    path: '/utils/scss-formatter',
    paramId: 'scss-formatter'
  },
  {
    name: 'Markdown Formatter',
    path: '/utils/markdown-formatter',
    paramId: 'markdown-formatter'
  },
  {
    name: 'Markdown Preview',
    path: '/utils/markdown-preview',
    paramId: 'markdown-preview'
  },
  {
    name: 'JSON Schema to TypeScript',
    path: '/utils/json-schema-to-typescript',
    paramId: 'json-schema-to-typescript'
  },
  {
    name: 'JSON to TypeScript',
    path: '/utils/json-to-typescript',
    paramId: 'json-to-typescript'
  },
  {
    name: 'JSON to Rust',
    path: '/utils/json-to-rust',
    paramId: 'json-to-rust'
  },
  {
    name: 'JSON to Yaml',
    path: '/utils/json-to-yaml',
    paramId: 'json-to-yaml'
  },
  {
    name: 'JSON to Toml',
    path: '/utils/json-to-toml',
    paramId: 'json-to-toml'
  },
  {
    name: 'Yaml to JSON',
    path: '/utils/yaml-to-json',
    paramId: 'yaml-to-json'
  },
  {
    name: 'Toml to JSON',
    path: '/utils/toml-to-json',
    paramId: 'toml-to-json'
  },
  {
    name: 'SVG to TSX',
    path: '/utils/svg-to-tsx',
    paramId: 'svg-to-tsx'
  },
  {
    name: 'CSS Box Shadow Generator',
    path: '/utils/css-box-shadow-generator',
    paramId: 'css-box-shadow-generator'
  },
  {
    name: 'HTML to Markdown',
    path: '/utils/html-to-markdown',
    paramId: 'html-to-markdown'
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
  'json-schema-to-typescript': <UtilJsonSchemaToTypescript />,
  'json-to-typescript': <UtilJsonToTypescript />,
  'json-to-rust': <UtilJsonToRust />,
  'json-to-yaml': <UtilJsonToYaml />,
  'json-to-toml': <UtilJsonToToml />,
  'svg-to-tsx': <UtilSvgToTsx />,
  'yaml-to-json': <UtilYamlToJson />,
  'toml-to-json': <UtilTomlToJson />,
  'scss-formatter': <UtilScssFormatter />,
  'markdown-formatter': <UtilMarkdownFormatter />,
  'markdown-preview': <UtilMarkdownPreview />,
  'css-box-shadow-generator': <UtilCssBoxShadowGenerator />,
  'html-to-markdown': <HTMLToMarkdown />
}
