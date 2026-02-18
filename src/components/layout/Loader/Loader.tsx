import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export const Loader = ({className = ''}: {className?: string}) => {
  return (
    <div className={cn('w-full flex items-center justify-center h-100', className)}>
      <Spinner className='size-10' />
    </div>
  )
}
