import { useState } from 'react'

export default function IndexPage() {
  const [inputValue, setInputValue] = useState('')
  return (
    <div className="h-full bg-gray-100 flex items-start justify-center">
      <div className="w-1/2 flex flex-col items-end">
        <div className="w-full mt-32 bg-white p-6 rounded-lg shadow">
            <textarea
              rows={8}
              className="outline-none w-full resize-none"
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value
                setInputValue(value)
              }}
            />
        </div>
        <button className="mt-6 bg-gray-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg">
          Tweet {inputValue}
        </button>
      </div>
    </div>
  )
}
