import { Button, ButtonProps } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { CopyIcon } from '@radix-ui/react-icons'
// @ts-ignore
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import type { FC } from 'react'
import React from 'react'

interface CopyProps {
  value: string
  buttonProps?: ButtonProps
  className?: string
  showToast?: boolean

  children?: React.ReactNode
}

const Copy: FC<CopyProps> = ({
  value,
  buttonProps = {},
  className = '',
  showToast = true,
  children
}) => {
  const { toast } = useToast()

  const onCopy = async () => {
    await writeText(value)
    showToast &&
      toast({
        description: 'Copied to clipboard',
        duration: 3000
      })
  }
  return (
    <>
      {children ? (
        <div onClick={onCopy} className={className}>
          {children}
        </div>
      ) : (
        <Button
          {...buttonProps}
          className={className}
          onClick={onCopy}
        >
          <CopyIcon className="mr-2 cursor-pointer" />
          Copy
        </Button>
      )}
    </>
  )
}

export default Copy
