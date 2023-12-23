import type { FC } from 'react'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input";
import { v1, v3, v4, v5 } from 'uuid'
import TextEditor from '@/components/TextEditor';
import Select from '@/components/common/Select';
import InputNumber from '@/components/ui/inputNumber'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import InputTip from '@/components/common/InputTip';
import { Button } from '@/components/ui/button';

type UUIDType = 'v1' | 'v3' | 'v4' | 'v5'

const uuidOptions = ['v1', 'v3', 'v4', 'v5'].map(item => ({
  label: `UUID${item}`,
  value: item
} as const))

const UUIDGenerator: FC = () => {
  const [uuid, setUuid] = useState<UUIDType>('v4')
  const [count, setCount] = useState(10)
  const [namespace, setNamespace] = useState(v5.URL)
  const [name, setName] = useState('')

  // output
  const [output, setOutput] = useState('')

  const showCount = useMemo(() => uuid === 'v4' || uuid === 'v1', [uuid])
  const handleReset = () => {
    setUuid('v4')
    setCount(10)
    setNamespace(v5.URL)
    setName('')
  }

  const handleGenerate = useCallback(() => {
    let value = ''
    switch (uuid) {
      case 'v1':
        for (let i = 0; i < count; i++) {
          value += v1() + '\n'
        }
        setOutput(value)
        break
      case 'v3':
        setOutput(v3(name ?? 'test', namespace))
        break
      case 'v4':
        for (let i = 0; i < count; i++) {
          value += v4() + '\n'
        }
        setOutput(value)
        break
      case 'v5':
        setOutput(v5(namespace, name ?? 'test'))
        break
      default:
        break
    }
  }, [uuid, count, namespace, name])

  useEffect(() => {
    handleGenerate()
  }, [uuid, count, namespace, name, setOutput, handleGenerate])

  const RenderNameAndSpace = () => {
    return (
      <div className="flex flex-col items-center gap-4 name-wrapper">
        <div className="flex flex-col justify-between w-full space-wrapper">
          <div className='flex justify-between label'>
            <Label>NameSpace:</Label>
            <RadioGroup value={namespace} onValueChange={setNamespace} className="flex items-center justify-center mb-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={v5.URL} id="r1" />
                <Label htmlFor="r1">
                  <span className='p-1 border border-gray-500 rounded-md shadow-md cursor-pointer'>URL</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={v5.DNS} id="r2" />
                <Label htmlFor="r2">
                  <span className='p-1 border border-gray-500 rounded-md shadow-md cursor-pointer'>DNS</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={v4()} id="r3" />
                <Label htmlFor="r3">
                  <span className='p-1 border border-gray-500 rounded-md shadow-md cursor-pointer'>Random</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Input placeholder="Enter NameSpace" value={namespace} onChange={e => setNamespace(e.target.value)} />
        </div>
        <div className="flex flex-col justify-between w-full space-wrapper">
          <Label>Name:</Label>
          <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <div className="flex w-full gap-4 py-4">
        <div className='flex flex-col flex-1 left'>
          <InputTip
            showSample={false}
            showCopy={false}
            showClipboard={false}
          >
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={handleGenerate}>Generate</Button>
          </InputTip>
          <div className='flex items-center w-full gap-2 space-wrapper'>
            {/* @ts-ignore */}
            <Select className='w-[150px]' options={uuidOptions} value={uuid} onChange={setUuid} />
            {showCount && <span>X</span>}
            {showCount && <InputNumber className='w-[150px]' min={1} max={150} step={1} value={count} onChange={setCount} showPlaceholder={false} />}
          </div>
          {(uuid === 'v3' || uuid === 'v5') && <RenderNameAndSpace />}
        </div>
        <div className='flex flex-1 right'>
          <TextEditor
            className='text-white bg-black'
            inputLabel='Output:'
            value={output}
            showOperation={false}
            showSample={false}
            showCopy={true}
          />
        </div>
      </div>
    </div>
  )
}

export default UUIDGenerator
