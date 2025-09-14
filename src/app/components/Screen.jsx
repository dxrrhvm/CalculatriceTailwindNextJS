export default function Screen({ value }) {
  return (
    <div className="w-full h-20 bg-gray-800 rounded-lg flex items-center justify-end px-4 text-2xl font-mono">
      {value}
    </div>
  )
}