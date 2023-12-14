import TextEditor from '@/components/TextEditor'
import Select from '@/components/common/Select'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import type { DecodeType } from '@/type'

const decodeTypeOptions = [
  { label: 'Base64', value: 'base64' },
  { label: 'Base64 URL', value: 'base64url' },
  { label: 'URI', value: 'uri' },
  { label: 'URI Component', value: 'uri_component' }
]

const Base64Decode: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [decodeType, setDecodeType] = useState<DecodeType>('base64')
  const decodeBase64 = (input: string) => {
    try {
      const result = atob(input)
      setInputResult('')
      return result
    } catch (error) {
      setInputResult('Invalid decoded string')
      return input
    }
  }
  const decodeBase64Url = (input: string) => {
    try {
      const result = atob(input.replace(/-/g, '+').replace(/_/g, '/'))
      setInputResult('')
      return result
    } catch (error) {
      setInputResult('Invalid decoded string')
      return input
    }
  }

  const decodeURIStr = (input: string) => {
    try {
      const result = decodeURI(input)
      setInputResult('')
      return result
    } catch (error) {
      setInputResult('Invalid decoded string')
      return input
    }
  }

  const decodeURIComponentStr = (input: string) => {
    try {
      const result = decodeURIComponent(input)
      setInputResult('')
      return result
    } catch (error) {
      setInputResult('Invalid decoded string')
      return input
    }
  }

  useEffect(() => {
    switch (decodeType) {
      case 'base64':
        setFormatOutput(decodeBase64(userInput))
        break
      case 'base64url':
        setFormatOutput(decodeBase64Url(userInput))
        break
      case 'uri':
        setFormatOutput(decodeURIStr(userInput))
        break
      case 'uri_component':
        setFormatOutput(decodeURIComponentStr(userInput))
        break
      default:
        setFormatOutput(decodeBase64(userInput));
    }
  }, [userInput, decodeType])

  return (
    <div className="flex flex-col h-full">
      <Select options={decodeTypeOptions} value={decodeType} onChange={(value) => setDecodeType(value as DecodeType)} />
      <div className="flex justify-between flex-1 w-full gap-4 py-4">
        <TextEditor
          value={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          showSample={false}
          placeHolder='Enter the text to decode...'
          className='h-full text-white bg-black'
          inputResult={inputResult}
        />
        <TextEditor
          value={formatOutput}
          readOnly={true}
          className='h-full text-white bg-black'
          placeHolder=''
          inputLabel='Output:'
          showOperation={false}
          showCopy={true}
        />
      </div>
    </div>
  )
}

export default Base64Decode
