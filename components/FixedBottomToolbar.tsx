export default function FixedBottomToolbar({ children, className }: { children: React.ReactNode, className?: string}) {
  return (
    <span className={`sticky bottom-2 bg-white border p-2 rounded-md w-inherit border-gray-200 flex justify-center items-center h-16 ${className}`}>
      {children}
    </span>
    )
}