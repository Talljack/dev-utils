import TextEditor from '@/components/TextEditor'
import { Label } from '@/components/ui/label'
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
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  // return re
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : ''
}
// Hex to HSL
function hexToHsl(hex: string): string {
  let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0
    let s = 0
    const l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }
    return `hsl(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;

}
// Hex to CMYK
function hexToCmyk(hex: string): string {
  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  if (hex.length !== 7) {
      throw new Error("Invalid hex color format!");
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  // Calculate CMYK
  let computedC = 1 - (r / 255);
  let computedM = 1 - (g / 255);
  let computedY = 1 - (b / 255);
  let computedK = Math.min(computedC, computedM, computedY);

  if (computedK === 1) {
      return "cmyk(0%, 0%, 0%, 100%)";
  }

  computedC = (computedC - computedK) / (1 - computedK) * 100;
  computedM = (computedM - computedK) / (1 - computedK) * 100;
  computedY = (computedY - computedK) / (1 - computedK) * 100;
  computedK *= 100;

  return `cmyk(${computedC.toFixed(0)}%, ${computedM.toFixed(0)}%, ${computedY.toFixed(0)}%, ${computedK.toFixed(0)}%)`;
}
// Hex to Color Name
function hexToColorName(hex: string): string {
  const rgb = hexToRgb(hex)
  return rgbToColorName(rgb)
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
    { rgb: [47, 79, 79], keyword: 'darkslategray' },
    { rgb: [105, 105, 105], keyword: 'dimgray' },
    { keyword: 'gray', rgb: [128, 128, 128] },
    { keyword: 'darkgray', rgb: [169, 169, 169] },
    { keyword: 'silver', rgb: [192, 192, 192] },
    { keyword: 'lightgray', rgb: [211, 211, 211] },
    { keyword: 'gainsboro', rgb: [220, 220, 220] },
    { keyword: 'whitesmoke', rgb: [245, 245, 245] },
    { rgb: [79, 178, 51], keyword: 'limegreen' },
    { keyword: 'mediumturquoise', rgb: [72, 209, 204] },
    { rgb: [240, 128, 128], keyword: 'lightcoral' },
    { rgb: [255, 99, 71], keyword: 'tomato' },
    { rgb: [255, 127, 80], keyword: 'coral' },
    { rgb: [255, 69, 0], keyword: 'orangered' },
    { rgb: [255, 215, 0], keyword: 'gold' },
    { rgb: [218, 165, 32], keyword: 'goldenrod' },
    { rgb: [189, 183, 107], keyword: 'darkkhaki' },
    { rgb: [245, 222, 179], keyword: 'wheat' },
    { rgb: [222, 184, 135], keyword: 'burlywood' },
    { rgb: [210, 180, 140], keyword: 'tan' },
    { rgb: [188, 143, 143], keyword: 'rosybrown' },
    { rgb: [255, 228, 196], keyword: 'bisque' },
    { rgb: [255, 218, 185], keyword: 'peachpuff' },
    { rgb: [250, 235, 215], keyword: 'antiquewhite' },
    { rgb: [255, 250, 250], keyword: 'snow' },
    { rgb: [240, 255, 240], keyword: 'honeydew' },
    { rgb: [245, 245, 220], keyword: 'beige' },
    { rgb: [255, 250, 205], keyword: 'lemonchiffon' },
    { rgb: [255, 239, 213], keyword: 'papayawhip' },
    { rgb: [255, 228, 225], keyword: 'mistyrose' },
    { rgb: [250, 240, 230], keyword: 'linen' },
    { rgb: [253, 245, 230], keyword: 'oldlace' },
    { rgb: [255, 245, 238], keyword: 'seashell' },
    { rgb: [255, 255, 240], keyword: 'ivory' },
    { rgb: [240, 248, 255], keyword: 'aliceblue' },
    { rgb: [230, 230, 250], keyword: 'lavender' },
    { rgb: [216, 191, 216], keyword: 'thistle' },
    { rgb: [221, 160, 221], keyword: 'plum' },
    { rgb: [238, 130, 238], keyword: 'violet' },
    { rgb: [218, 112, 214], keyword: 'orchid' },
    { rgb: [255, 0, 255], keyword: 'fuchsia' },
    { rgb: [255, 20, 147], keyword: 'deeppink' },
    { rgb: [199, 21, 133], keyword: 'mediumvioletred' },
    { rgb: [219, 112, 147], keyword: 'palevioletred' },
    { rgb: [255, 105, 180], keyword: 'hotpink' },
    { rgb: [70, 130, 180], keyword: 'steelblue' },
    { rgb: [135, 206, 235], keyword: 'skyblue' },
    { rgb: [135, 206, 250], keyword: 'lightskyblue' },
    { rgb: [25, 25, 112], keyword: 'midnightblue' },
    { rgb: [100, 149, 237], keyword: 'cornflowerblue' },
    { rgb: [65, 105, 225], keyword: 'royalblue' },
    { rgb: [0, 191, 255], keyword: 'deepskyblue' },
    { rgb: [30, 144, 255], keyword: 'dodgerblue' },
    { rgb: [173, 216, 230], keyword: 'lightblue' },
    { rgb: [176, 196, 222], keyword: 'lightsteelblue' },
    { rgb: [95, 158, 160], keyword: 'cadetblue' },
    { rgb: [70, 130, 180], keyword: 'steelblue' },
    { rgb: [72, 61, 139], keyword: 'darkslateblue' },
    { rgb: [106, 90, 205], keyword: 'slateblue' },
    { rgb: [123, 104, 238], keyword: 'mediumslateblue' },
    { rgb: [0, 250, 154], keyword: 'mediumspringgreen' },
    { rgb: [0, 255, 127], keyword: 'springgreen' },
    { rgb: [32, 178, 170], keyword: 'lightseagreen' },
    { rgb: [47, 79, 79], keyword: 'darkslategray' },
    { rgb: [0, 128, 128], keyword: 'teal' },
    { rgb: [0, 139, 139], keyword: 'darkcyan' },
    { rgb: [143, 188, 143], keyword: 'darkseagreen' },
    { rgb: [60, 179, 113], keyword: 'mediumseagreen' },
    { rgb: [46, 139, 87], keyword: 'seagreen' },
    { rgb: [102, 205, 170], keyword: 'mediumaquamarine' },
    { rgb: [127, 255, 212], keyword: 'aquamarine' },
    { rgb: [152, 251, 152], keyword: 'palegreen' },
    { rgb: [50, 205, 50], keyword: 'limegreen' },
    { rgb: [144, 238, 144], keyword: 'lightgreen' },
    { rgb: [238, 232, 170], keyword: 'palegoldenrod' },
    { rgb: [250, 250, 210], keyword: 'lightgoldenrodyellow' },
    { rgb: [255, 215, 0], keyword: 'gold' },
    { rgb: [255, 165, 0], keyword: 'orange' },
    { rgb: [255, 140, 0], keyword: 'darkorange' },
    { rgb: [255, 69, 0], keyword: 'orangered' },
    { rgb: [255, 99, 71], keyword: 'tomato' },
    { rgb: [255, 127, 80], keyword: 'coral' },
    { rgb: [255, 228, 181], keyword: 'moccasin' },
    { rgb: [255, 222, 173], keyword: 'navajowhite' },
    { rgb: [255, 218, 185], keyword: 'peachpuff' },
    { rgb: [255, 228, 196], keyword: 'bisque' },
    { rgb: [255, 248, 220], keyword: 'cornsilk' },
    { rgb: [255, 250, 205], keyword: 'lemonchiffon' },
    { rgb: [255, 245, 238], keyword: 'seashell' },
    { rgb: [240, 255, 255], keyword: 'azure' },
    { rgb: [240, 248, 255], keyword: 'aliceblue' },
    { rgb: [230, 230, 250], keyword: 'lavender' },
    { rgb: [255, 240, 245], keyword: 'lavenderblush' },
    { rgb: [255, 228, 225], keyword: 'mistyrose' },
    { rgb: [255, 192, 203], keyword: 'pink' },
    { rgb: [255, 182, 193], keyword: 'lightpink' },
    { rgb: [255, 105, 180], keyword: 'hotpink' },
    { rgb: [255, 20, 147], keyword: 'deeppink' },
    { rgb: [199, 21, 133], keyword: 'mediumvioletred' },
    { rgb: [219, 112, 147], keyword: 'palevioletred' },
    { rgb: [176, 48, 96], keyword: 'maroon' },
    { rgb: [255, 0, 255], keyword: 'fuchsia' },
    { rgb: [238, 130, 238], keyword: 'violet' },
    { rgb: [221, 160, 221], keyword: 'plum' },
    { rgb: [218, 112, 214], keyword: 'orchid' },
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
  } else if (color.toLowerCase().startsWith('rgb')) {
    return 'rgb'
  } else if (color.toLocaleLowerCase().startsWith('hsl')) {
    return 'hsl'
  } else if (color.toLocaleLowerCase().startsWith('cmyk')) {
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
    <div className="flex flex-wrap w-full color-item">
      <Label>{type}</Label>
      <div className="w-full p-1 mt-1 border border-red-200 shadow-md color-show">
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
    <div className="flex h-full gap-8 mt-4">
      <div className="flex flex-col flex-1 gap-4 input">
        <TextEditor value={input} sampleValue='#4fb233' inputResult={inputResult} onChange={(value) => setInput(value)} className='flex-1 text-white bg-black' placeHolder={`Enter a color value in HEX, RGB, HSL, CMYK or Color keyword.`} />
      </div>
      <div className="flex flex-col flex-1 gap-4 output">
        <Label className="text-lg font-bold ">Output</Label>
        {result.hex && (
          <>
            <div
              className="w-full h-8 mt-6 color-show"
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
