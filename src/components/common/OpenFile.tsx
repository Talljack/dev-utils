import { readTextFile } from "@tauri-apps/plugin-fs";
import { Button } from '@/components/ui/button'
import { open } from '@tauri-apps/plugin-dialog'
import type { FC, PropsWithChildren } from 'react'

type DialogOptions = Parameters<typeof open>[0]

interface Props extends PropsWithChildren {
  title: string;
  openFileOption?: DialogOptions
  onContentChange: (fileContent: string) => void
}

const ReadFileButton: FC<Props> = ({
  title = 'Open File',
  children,
  openFileOption = {
    multiple: false as const,
    directory: false as const,
  },
  onContentChange
}) => {
  const handleClickOpenFile = async () => {
    const options = {
      ...openFileOption,
      title: 'Select a markdown file',
      filters: [
        {
          name: 'Markdown',
          extensions: ['md']
        }
      ]
    }
    const file = await open(options as DialogOptions);
    // @ts-ignore
    const data = await readTextFile(file?.path as string)
    onContentChange(data)
  }
  return children ? (
    <div onClick={handleClickOpenFile}>
      {children}
    </div>) : (
      <Button onClick={handleClickOpenFile}>{title}</Button>
    )
}

export default ReadFileButton