import Copy from '@/components/common/Copy'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { FC } from 'react'
import React, { useState } from 'react'

const Base64Decode: FC = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const decode = () => {
    const decoded = atob(input)
    setResult(decoded)
  }

  return (
    <div className="flex flex-col">
      <div className="grid w-full gap-2 py-4">
        <Label>Base64 Decode Input:</Label>
        <Textarea
          className="min-h-[120px]"
          placeholder="Please input original text"
          onChange={handleInput}
        />
        <Button onClick={decode}>Decode</Button>
      </div>
      <div className="result mt-8">
        <div className="mb-2 flex items-center justify-between">
          <Label>Base64 Decode Output:</Label>
          <Copy
            value={result}
            buttonProps={{
              variant: 'default'
            }}
          />
        </div>
        <Textarea value={result} readOnly className="min-h-[120px]" />
      </div>
    </div>
  )
}

export default Base64Decode
