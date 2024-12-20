export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-l-blue-600 border-r-blue-400 animate-spin" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-5 h-5 rounded-full border-4 border-t-indigo-500 border-b-indigo-700 border-l-indigo-600 border-r-indigo-400 animate-spin-reverse" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full" />
      </div>
    </div>
  )
}
