import Copy from '@/components/common/Copy'
import InputTip from '@/components/common/InputTip'
import { Label } from '@/components/ui/label'
import { CopyIcon } from '@radix-ui/react-icons'
import { MD5, SHA1, SHA256, SHA384, SHA512 } from 'crypto-js'
import { cloneDeep } from 'lodash-es'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { MonacoEditor } from 'monaco-editor-component/react'

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
    <div className="flex flex-wrap w-full hash-item group/item">
      <Label className='text-lg '>{type}</Label>
      <div className="flex justify-between w-full p-1 mt-1 border border-red-200 shadow-md hash-show">
        <span className='w-[650px] overflow-hidden text-ellipsis whitespace-nowrap'>{hash}</span>
        <Copy
          className="flex items-center justify-center p-1 ml-2 shadow-md"
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
    <div className="flex h-full gap-8 mt-4">
      <div className="input flex w-[450px] shrink-0 flex-col gap-4">
        <InputTip value={input} onValueChange={setInput} sampleValue="test" />
        <MonacoEditor
          value={input}
          onChange={setInput}
        />
      </div>
      <div className="flex flex-col flex-1 gap-4 output">
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
