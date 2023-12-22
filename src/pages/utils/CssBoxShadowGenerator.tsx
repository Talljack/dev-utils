import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FC } from 'react'
import { useState } from 'react'
import { Label } from '@radix-ui/react-label';
import { Slider } from '@/components/ui/slider';
import InputColor from 'react-input-color';

type SliderItemProps = {
  label: string
  value: number
  min?: number
  max?: number
  valueSuffix?: string
  onChange: (value: number) => void
}

const renderSliderItem = ({
  label,
  value,
  min = -50,
  max = 50,
  valueSuffix = 'px',
  onChange
}: SliderItemProps) => {
  const onValueChange = (value: number[]) => {
    onChange(value[0])
  }
  return <div className='flex flex-col items-center gap-1 slider-item'>
    <div className='flex items-center justify-between w-full label'>
      <Label>{label}</Label>
      <span>{value}{valueSuffix}</span>
    </div>
    <Slider min={min} max={max} value={[value]} onValueChange={onValueChange} />
  </div>
}

type ShadowShape = 'rect' | 'circle' | 'header'

const CSSBoxShadowGenerator: FC = () => {
  const [horizontalOffset, setHorizontalOffset] = useState(13)
  const [verticalOffset, setVerticalOffset] = useState(12)
  const [blurRadius, setBlurRadius] = useState(5)
  const [spreadRadius, setSpreadRadius] = useState(2)
  const [color, setColor] = useState('#000000')

  // output
  const [shape, setShape] = useState<ShadowShape>('rect')

  return (
    <div className="flex h-full">
      <div className="flex w-full gap-4 py-4">
        <div className='flex flex-col flex-1 gap-4 left'>
          {renderSliderItem({
            label: 'Horizontal Offset',
            value: horizontalOffset,
            onChange: setHorizontalOffset
          })}
          {renderSliderItem({
            label: 'Vertical Offset',
            value: verticalOffset,
            onChange: setVerticalOffset
          })}
          {renderSliderItem({
            label: 'Blur Radius',
            value: blurRadius,
            onChange: setBlurRadius
          })}
          {renderSliderItem({
            label: 'Spread Radius',
            value: spreadRadius,
            onChange: setSpreadRadius
          })}
          <div className='flex items-center color'>
            <Label>Shadow Color:</Label>
            <InputColor initialValue={color} onChange={colorValue => setColor(colorValue.hex)} />
            <span className="ml-4">{color}</span>
          </div>
        </div>
        <div className='flex-col flex-1 gap-6 pl-2 border-l right'>
          <div className={`flex ${shape === 'header' ? '' : 'items-center justify-center'} w-full h-60 bg-white shadow-md overflow-hidden rounded-[20px]`}>
            {
              shape === 'header' ? (
                <div className="w-full h-20 bg-blue-500 box" style={{
                  boxShadow: `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${color}`
                }} />
              ) : (
                <div className='w-20 h-20 bg-blue-500 box' style={{
                  boxShadow: `${horizontalOffset}px ${verticalOffset}px ${blurRadius}px ${spreadRadius}px ${color}`,
                  borderRadius: shape === 'circle' ? '50%' : '0'
                }} />
              )
            }
          </div>
          <div className='mt-6 shape'>
            {/* @ts-ignore */}
            <RadioGroup value={shape} onValueChange={setShape} className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rect" id="r1" />
                <Label htmlFor="r1">Box</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="circle" id="r2" />
                <Label htmlFor="r2">Circle</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="header" id="r2" />
                <Label htmlFor="r2">Header</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='flex items-center justify-center w-full mt-6 text-white bg-black border border-black'>
            Box Shadow: {horizontalOffset}px {verticalOffset}px {blurRadius}px {spreadRadius}px {color}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CSSBoxShadowGenerator
