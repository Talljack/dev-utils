import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

const sampleValue = `<svg style="flex:1;" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink">
<rect x="10" y="10" height="100" width="100"
  style="stroke:#ff0000; fill: #0000ff"/>
</svg>`;

const svgr = async (code: string, options = {}) => {
  const res = await fetch('https://api.react-svgr.com/api/svgr', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({ code, options }),
  })
  const json = await res.json()
  if (json.error) throw new Error(json.error)
  return json.output
}

const SVGToTSX: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const convertSvgToTsx = debounce(async (inputValue: string) => {
    try {
      if (!inputValue) {
        setInputResult('')
        setFormatOutput('')
        return
      }
      try {
        const tsxCode = await svgr(inputValue, { icon: true, typescript: true })
        setFormatOutput(tsxCode)
        setInputResult('')
      } catch (error) {
        setInputResult('Invalid SVG')
      }
    } catch (error) {
      setInputResult('Invalid SVG')
    }
  }, 300)

  useEffect(() => {
    convertSvgToTsx(userInput)
  }, [userInput, convertSvgToTsx])

  return (
    <div className="flex h-full">
      <div className="flex justify-between w-full py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            fontSize: 16
          }}
          language='html'
          inputResult={inputResult}
          sampleValue={sampleValue}
        />
        <CodeViewer
          code={formatOutput}
          showSpace={false}
          options={{
            readOnly: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            fontSize: 16
          }}
          language="typescript"
        />
      </div>
    </div>
  )
}

export default SVGToTSX
