export default function FixedBottomToolbar({ children, className }: { children: React.ReactNode, className?: string}) {
  return (
    <span className={`sticky bottom-2 bg-background border-2 p-2 rounded-md w-inherit flex items-center ${className}`}>
      {children}
    </span>
    )
}