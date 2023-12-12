import Copy from '@/components/common/Copy'
import InputTip from '@/components/common/InputTip'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CopyIcon } from '@radix-ui/react-icons'
import { MD5, SHA1, SHA256, SHA384, SHA512 } from 'crypto-js'
import { cloneDeep } from 'lodash-es'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

type HashResultType = {
  md5: string
  sha1: string
  sha256: string
  sha384: string
  sha512: string
}

const initialResult: HashResultType = {
  md5: '',
  sha1: '',
  sha256: '',
  sha384: '',
  sha512: ''
}

const renderHashItem = (hash: string, type: string) => {
  return (
    <div className="hash-item group/item flex w-full flex-wrap">
      <Label>{type}</Label>
      <div className="hash-show mt-1 flex w-full flex-wrap border border-red-200 p-1 shadow-md">
        {hash}
        <Copy
          className="invisible ml-2 flex items-center justify-center p-1 shadow-md group-hover/item:visible"
          value={hash}
        >
          <CopyIcon className="cursor-pointer" />
        </Copy>
      </div>
    </div>
  )
}

const HashGenerator: FC = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<HashResultType>(cloneDeep(initialResult))
  useEffect(() => {
    if (!input) {
      setResult(cloneDeep(initialResult))
      return
    }
    try {
      setResult({
        md5: MD5(input).toString(),
        sha1: SHA1(input).toString(),
        sha256: SHA256(input).toString(),
        sha384: SHA384(input).toString(),
        sha512: SHA512(input).toString()
      })
    } catch (error) {
      console.error(error)
    }
  }, [input])
  return (
    <div className="mt-4 flex h-full gap-8">
      <div className="input flex w-[400px] flex-col gap-4">
        <InputTip value={input} onValueChange={setInput} sampleValue="test" />
        <Textarea
          className="flex-1"
          placeholder={`Enter your text here`}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <div className="output flex flex-1 flex-col gap-4">
        <Label className="text-lg font-bold ">Output:</Label>
        {result.md5 && (
          <>
            {Object.keys(result).map(colorType => {
              return (
                <div key={colorType} className="flex">
                  {renderHashItem(
                    result[colorType as keyof HashResultType],
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

export default HashGenerator
