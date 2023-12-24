import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

type KeyboardItem = {
  value: string | number | boolean
  link: string;
}

type KeyboardInfo = {
  key: KeyboardItem
  code: KeyboardItem
  altKey: KeyboardItem
  ctrlKey: KeyboardItem
  metaKey: KeyboardItem
  shiftKey: KeyboardItem
  isComposing: KeyboardItem
  location: KeyboardItem
  which: KeyboardItem
}

const KeyboardEvent: FC = () => {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({} as KeyboardInfo);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      setKeyboardInfo({
        key: {
          value: e.key,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key'
        },
        code: {
          value: e.code,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code'
        },
        altKey: {
          value: e.altKey,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey'
        },
        ctrlKey: {
          value: e.ctrlKey,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey'
        },
        metaKey: {
          value: e.metaKey,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey'
        },
        shiftKey: {
          value: e.shiftKey,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey'
        },
        isComposing: {
          value: e.isComposing,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing'
        },
        location: {
          value: e.location,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location'
        },
        which: {
          value: e.which,
          link: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which'
        }
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setKeyboardInfo])
  const keyboardLength = useMemo(() => Object.keys(keyboardInfo).length, [keyboardInfo])
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className='flex flex-col items-center justify-center w-full font-bold title size-10'>
        <div>⌘</div>
        <div>Press any key</div>
      </div>
      <div className='flex flex-col mt-4 info'>
        {keyboardLength > 0 && (
          <>
            <div className='text-gray-600 '>The keyboardEvent is:</div>
            <div className='flex flex-col gap-4 p-4 border border-gray-500 rounded-md shadow-md min-w-80'>
              {
                Object.keys(keyboardInfo).map(key => {
                  return (
                    <div key={key} className='flex items-center justify-between'>
                      <Link to={keyboardInfo[key as keyof KeyboardInfo].link} target='_blank' className='underline'>e.{key}</Link>
                      <span>{JSON.stringify(keyboardInfo[key as keyof KeyboardInfo].value)}</span>
                    </div>
                  )
                })
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KeyboardEvent;