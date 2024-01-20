interface RouteItemProps {
  position: number
  value: string
}

export function RouteItem({ position, value }: RouteItemProps) {
  return (
    <div className="flex gap-4 items-center">
      <span className="rounded-full w-10 h-10 flex justify-center items-center p-2 bg-blue-500 text-gray-50 font-bold">
        {position}
      </span>
      <p>{value}</p>
    </div>
  )
}
