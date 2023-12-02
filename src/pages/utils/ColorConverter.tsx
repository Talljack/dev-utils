import InputTip from '@/components/common/InputTip'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cloneDeep } from 'lodash-es'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

const initialResult: ColorResult = {
  hex: '',
  rgb: '',
  hsl: '',
  cmyk: '',
  keyword: ''
}

// Color Result Type
interface ColorResult {
  hex: string
  rgb: string
  hsl: string
  cmyk: string
  keyword: string
}

interface ColorKeyword {
  rgb: [number, number, number]
  keyword: string
}

const errorColor = 'Invalid Color'

// Color Type
type ColorType = 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'keyword' | 'error'
// Color Name Map
const colorNameMap: Record<string, string> = {
  black: '0,0,0',
  silver: '192,192,192',
  gray: '128,128,128',
  white: '255,255,255',
  maroon: '128,0,0',
  red: '255,0,0',
  purple: '128,0,128',
  fuchsia: '255,0,255',
  green: '0,128,0',
  lime: '0,255,0',
  olive: '128,128,0',
  yellow: '255,255,0',
  navy: '0,0,128',
  blue: '0,0,255',
  teal: '0,128,128',
  aqua: '0,255,255'
}

// Hex to RGB
function hexToRgb(hex: string): string {
  const regArr = hex.match(/\w{2}/g)
  if (!regArr) return ''
  const [r, g, b] = regArr.map(item => parseInt(item, 16))
  return `rgb(${r}, ${g}, ${b})`
}
// Hex to HSL
function hexToHsl(hex: string): string {
  const regArr = hex.match(/\w{2}/g)
  if (!regArr) return ''
  const [r, g, b] = regArr.map(item => parseInt(item, 16))
  console.log(r, g, b)
  return rgbToHsl(`rgb(${r}, ${g}, ${b})`)
}
// Hex to CMYK
function hexToCmyk(hex: string): string {
  const regArr = hex.match(/\w{2}/g)
  if (!regArr) return ''
  const [r, g, b] = regArr.map(item => parseInt(item, 16))
  return rgbToCmyk(`rgb(${r}, ${g}, ${b})`)
}
// Hex to Color Name
function hexToColorName(hex: string): string {
  const regArr = hex.match(/\w{2}/g)
  if (!regArr) return ''
  const [r, g, b] = regArr.map(item => parseInt(item, 16))
  return rgbToColorName(`rgb(${r}, ${g}, ${b})`)
}

// RGB to Hex
function rgbToHex(rgb: string): string {
  const regArr = rgb.match(/\d+/g)
  if (!regArr) return ''
  const [r, g, b] = regArr.map(Number)
  return `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// RGB to HSL
function rgbToHsl(rgb: string): string {
  const regArr = rgb.match(/\d+/g)
  if (!regArr) return ''
  let [r, g, b] = regArr.map(Number)
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let s: number,
    l: number = (max + min) / 2
  let h = 0

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
    h *= 360
    s *= 100
    l *= 100
  }

  return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
}

// RGB to CMYK
function rgbToCmyk(rgb: string): string {
  const regArr = rgb.match(/\d+/g)
  if (!regArr) return ''
  let [r, g, b] = regArr.map(Number)
  if (r === 0 && g === 0 && b === 0) {
    return 'cmyk(0%, 0%, 0%, 100%)' // black
  }

  r /= 255
  g /= 255
  b /= 255

  const k = 1 - Math.max(r, g, b)
  const c = (1 - r - k) / (1 - k)
  const m = (1 - g - k) / (1 - k)
  const y = (1 - b - k) / (1 - k)

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(
    y * 100
  )}%, ${Math.round(k * 100)}%)`
}

// RGB to Color Name
function rgbToColorName(rgb: string): string {
  const regArr = rgb.match(/\d+/g)
  if (!regArr) return ''
  const [r, g, b] = regArr.map(Number)
  const cssColorKeywords: ColorKeyword[] = [
    { rgb: [255, 0, 0], keyword: 'red' },
    { rgb: [0, 255, 0], keyword: 'lime' },
    { rgb: [0, 0, 255], keyword: 'blue' },
    { rgb: [255, 255, 0], keyword: 'yellow' },
    { rgb: [0, 255, 255], keyword: 'cyan' },
    { rgb: [255, 0, 255], keyword: 'magenta' },
    { rgb: [255, 165, 0], keyword: 'orange' },
    { rgb: [255, 192, 203], keyword: 'pink' },
    { rgb: [128, 0, 128], keyword: 'purple' },
    { rgb: [128, 128, 128], keyword: 'gray' },
    { rgb: [0, 128, 0], keyword: 'green' },
    { rgb: [128, 128, 0], keyword: 'olive' },
    { rgb: [0, 0, 128], keyword: 'navy' },
    { rgb: [128, 0, 0], keyword: 'maroon' },
    { rgb: [255, 255, 255], keyword: 'white' },
    { rgb: [0, 0, 0], keyword: 'black' },
    { rgb: [79, 178, 51], keyword: 'limegreen' }
    //... 更多颜色
  ]

  let closestMatch = { keyword: 'Unknown', distance: Number.MAX_VALUE }

  cssColorKeywords.forEach(color => {
    const distance = Math.sqrt(
      Math.pow(r - color.rgb[0], 2) +
        Math.pow(g - color.rgb[1], 2) +
        Math.pow(b - color.rgb[2], 2)
    )

    if (distance < closestMatch.distance) {
      closestMatch = { keyword: color.keyword, distance: distance }
    }
  })

  return closestMatch.keyword
}

// HSL to Hex
function hslToHex(hsl: string): string {
  const regArr = hsl.match(/\d+/g)
  if (!regArr) return ''
  const [h, s, l] = regArr.map(Number)
  return rgbToHex(hslToRgb(`hsl(${h}, ${s}%, ${l}%)`))
}

// HSL to RGB
function hslToRgb(hsl: string): string {
  const regArr = hsl.match(/\d+/g)
  if (!regArr) return ''
  const [h, s, l] = regArr.map(Number)
  const hslToRgb = (h: number, s: number, l: number) => {
    let r, g, b
    if (s === 0) {
      r = g = b = l // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(
      b * 255
    )})`
  }
  return hslToRgb(h / 360, s / 100, l / 100)
}

// HSL to CMYK
function hslToCmyk(hsl: string): string {
  const regArr = hsl.match(/\d+/g)
  if (!regArr) return ''
  const [h, s, l] = regArr.map(Number)
  return rgbToCmyk(hslToRgb(`hsl(${h}, ${s}%, ${l}%)`))
}

// HSL to Color Name
function hslToColorName(hsl: string): string {
  const regArr = hsl.match(/\d+/g)
  if (!regArr) return ''
  const [h, s, l] = regArr.map(Number)
  return rgbToColorName(hslToRgb(`hsl(${h}, ${s}%, ${l}%)`))
}

// CMYK to Hex
function cmykToHex(cmyk: string): string {
  const regArr = cmyk.match(/\d+/g)
  if (!regArr) return ''
  const [c, m, y, k] = regArr.map(Number)
  return rgbToHex(cmykToRgb(`cmyk(${c}, ${m}, ${y}, ${k})`))
}

// CMYK to RGB
function cmykToRgb(cmyk: string): string {
  const regArr = cmyk.match(/\d+/g)
  if (!regArr) return ''
  const [c, m, y, k] = regArr.map(Number)
  const r = 255 * (1 - c / 100) * (1 - k / 100)
  const g = 255 * (1 - m / 100) * (1 - k / 100)
  const b = 255 * (1 - y / 100) * (1 - k / 100)
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
}

// CMYK to HSL
function cmykToHsl(cmyk: string): string {
  const regArr = cmyk.match(/\d+/g)
  if (!regArr) return ''
  const [c, m, y, k] = regArr.map(Number)
  return rgbToHsl(cmykToRgb(`cmyk(${c}, ${m}, ${y}, ${k})`))
}

// CMYK to Color Name
function cmykToColorName(cmyk: string): string {
  const regArr = cmyk.match(/\d+/g)
  if (!regArr) return ''
  const [c, m, y, k] = regArr.map(Number)
  return rgbToColorName(cmykToRgb(`cmyk(${c}, ${m}, ${y}, ${k})`))
}

// Color Name to Hex
function colorNameToHex(keyword: string): string {
  const hex = colorNameMap[keyword.toLowerCase()]
  return `#${hex}`
}

// Color Name to RGB
function colorNameToRgb(keyword: string): string {
  const rgb = colorNameMap[keyword.toLowerCase()]
  return `rgb(${rgb})`
}

// Color Name to HSL
function colorNameToHsl(keyword: string): string {
  const rgb = colorNameMap[keyword.toLowerCase()]
  return rgbToHsl(`rgb(${rgb})`)
}

// Color Name to CMYK
function colorNameToCmyk(keyword: string): string {
  const rgb = colorNameMap[keyword.toLowerCase()]
  return rgbToCmyk(`rgb(${rgb})`)
}

// Detect Color Type
function detectColorType(color: string): ColorType {
  if (color.startsWith('#')) {
    return 'hex'
  } else if (color.startsWith('rgb')) {
    return 'rgb'
  } else if (color.startsWith('hsl')) {
    return 'hsl'
  } else if (color.startsWith('cmyk')) {
    return 'cmyk'
  } else if (colorNameMap[color.toLowerCase()]) {
    return 'keyword'
  } else {
    return 'error'
  }
}

// Convert Color to Other Type
function convertColor(color: string, colorType: ColorType): ColorResult {
  const result = cloneDeep(initialResult)
  switch (colorType) {
    case 'hex':
      result.hex = color
      result.rgb = hexToRgb(color)
      result.hsl = hexToHsl(color)
      result.cmyk = hexToCmyk(color)
      result.keyword = hexToColorName(color)
      break
    case 'rgb':
      result.hex = rgbToHex(color)
      result.rgb = color
      result.hsl = rgbToHsl(color)
      result.cmyk = rgbToCmyk(color)
      result.keyword = rgbToColorName(color)
      break
    case 'hsl':
      result.hex = hslToHex(color)
      result.rgb = hslToRgb(color)
      result.hsl = color
      result.cmyk = hslToCmyk(color)
      result.keyword = hslToColorName(color)
      break
    case 'cmyk':
      result.hex = cmykToHex(color)
      result.rgb = cmykToRgb(color)
      result.hsl = cmykToHsl(color)
      result.cmyk = color
      result.keyword = cmykToColorName(color)
      break
    case 'keyword':
      result.hex = colorNameToHex(color)
      result.rgb = colorNameToRgb(color)
      result.hsl = colorNameToHsl(color)
      result.cmyk = colorNameToCmyk(color)
      result.keyword = color
      break
    default:
      break
  }
  return result
}

const renderColorItem = (color: string, type: string) => {
  return (
    <div className="color-item flex w-full flex-wrap">
      <Label>{type}</Label>
      <div className="color-show mt-1 w-full border border-red-200 p-1 shadow-md">
        {color}
      </div>
    </div>
  )
}

const ColorConverter: FC = () => {
  const [input, setInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [result, setResult] = useState<ColorResult>(cloneDeep(initialResult))
  useEffect(() => {
    if (!input) {
      setInputResult('')
      setResult(cloneDeep(initialResult))
      return
    }
    try {
      const colorType = detectColorType(input)
      if (colorType === 'error') {
        setInputResult(errorColor)
        setResult(cloneDeep(initialResult))
      } else {
        setInputResult('')
        const converterColorResult = convertColor(input, colorType)
        setResult(converterColorResult)
      }
    } catch (error) {
      console.error(error)
    }
  }, [input])
  return (
    <div className="mt-4 flex h-full gap-8">
      <div className="input flex flex-1 flex-col gap-4">
        <InputTip onValueChange={setInput} sampleValue="#4fb233" />
        <Textarea
          className="flex-1"
          placeholder={`Enter a color value in HEX, RGB, HSL, CMYK or Color keyword.`}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        {inputResult && (
          <div className="h-10 bg-black text-red-700">{inputResult}</div>
        )}
      </div>
      <div className="output flex flex-1 flex-col gap-4">
        <Label className="text-lg font-bold ">Output</Label>
        {result.hex && (
          <>
            <div
              className="color-show mt-6 h-8 w-full"
              style={{
                backgroundColor: result.hex,
                boxShadow: result.hex ? `0 0 0 1px ${result.hex}` : 'none'
              }}
            />
            {Object.keys(result).map(colorType => {
              return (
                <div key={colorType} className="flex">
                  {renderColorItem(
                    result[colorType as keyof ColorResult],
                    colorType
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default ColorConverter
