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

const Base64Encode: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const [decodeType, setDecodeType] = useState<DecodeType>('base64')
  const encodeBase64 = (input: string) => {
    try {
      const result = btoa(input)
      return result
    } catch (error) {
      return input
    }
  }
  const encodeBase64Url = (input: string) => {
    try {
      const result = btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
      return result
    } catch (error) {
      return input
    }
  }
  const encodeURIStr = (input: string) => {
    try {
      const result = encodeURI(input)
      return result
    } catch (error) {
      return input
    }
  }
  const encodeURIComponentStr = (input: string) => {
    try {
      const result = encodeURIComponent(input)
      return result
    } catch (error) {
      return input
    }
  }

  useEffect(() => {
    switch (decodeType) {
      case 'base64':
        setFormatOutput(encodeBase64(userInput))
        break
      case 'base64url':
        setFormatOutput(encodeBase64Url(userInput))
        break
      case 'uri':
        setFormatOutput(encodeURIStr(userInput))
        break
      case 'uri_component':
        setFormatOutput(encodeURIComponentStr(userInput))
        break
      default:
        setFormatOutput(encodeBase64(userInput));
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
          placeHolder='Enter the text to encode...'
          className='h-full text-white bg-black'
        />
        <TextEditor
          value={formatOutput}
          readOnly={true}
          className='h-full text-white bg-black'
          inputLabel='Output:'
          placeHolder=''
          showOperation={false}
          showCopy={true}
        />
      </div>
    </div>
  )
}

export default Base64Encode
