import { Button, ButtonProps } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { CopyIcon } from '@radix-ui/react-icons'
import { writeText } from '@tauri-apps/api/clipboard'
import type { FC } from 'react'
import React from 'react'

interface CopyProps {
  value: string
  buttonProps?: ButtonProps
  className?: string
  showToast?: boolean
}

const Copy: FC<CopyProps> = ({
  value,
  buttonProps = {},
  className = '',
  showToast = false
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
    <Button
      variant="outline"
      {...buttonProps}
      className={className}
      onClick={onCopy}
    >
      <CopyIcon className="mr-2" />
      Copy
    </Button>
  )
}

export default Copy
