import TextEditor from '@/components/TextEditor';
import { debounce } from 'lodash-es'
import type { FC } from 'react'
import toml from 'toml';
import { useEffect, useState } from 'react'
import CodeViewer from '@/components/CodeViewer';

const sampleValue = `firstName = "John"
hobbies = ["football","video games"]

[info]
age = 23
job = "engineer"
teenage = true
`


const TomlToJson: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const convertToml2Json = debounce(async (inputValue: string) => {
    try {
      if (!inputValue) {
        setInputResult('')
        setFormatOutput('')
        return
      }
      try {
        const jsonObj = toml.parse(inputValue);
        const jsonText = JSON.stringify(jsonObj, null, 2);
        setFormatOutput(jsonText)
        setInputResult('')
      } catch (error) {
        setInputResult('Invalid TOML')
      }
    } catch (error) {
      setInputResult('Invalid TOML')
    }
  }, 300)

  useEffect(() => {
    convertToml2Json(userInput)
  }, [userInput, convertToml2Json])

  return (
    <div className="flex h-full">
      <div className="flex justify-between w-full gap-4 py-4">
      <TextEditor
          className='flex-1 text-white bg-black'
          value={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          showCopy={false}
          placeHolder='Enter TOML text...'
          inputResult={inputResult}
          sampleValue={sampleValue}
        />
        <CodeViewer
          code={formatOutput}
          options={{
            readOnly: true
          }}
          showSpace={false}
          language="json"
        />
      </div>
    </div>
  )
}

export default TomlToJson
