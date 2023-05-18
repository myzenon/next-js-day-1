import { useState } from 'react'

export default function IndexPage() {
  const [inputValue, setInputValue] = useState('')
  const [list, setList] = useState([])

  const loadList = () => {
    fetch('https://api.zenon.si/post')
      .then(response => response.json())
      .then(data => setList(data))
  }

  const tweet = () => {
    setInputValue('')
    fetch('https://api.zenon.si/post', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: 'อะไรก็ได้', content: inputValue, }),
    })
      .then(() => loadList())
  }

  return (
    <div className="min-h-full bg-gray-100 flex flex-col items-center">
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
        <button
          className="mt-6 bg-gray-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg"
          onClick={tweet}
        >
          Tweet
        </button>
        <button
          className="bg-gray-400 text-white p-4 rounded-lg"
          onClick={loadList}
        >
          Refresh
        </button>
      </div>
      <div className="w-1/2 mt-8">
        { list.map((data) => {
          return (
            <div key={data.id} className="mt-4 bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-xl font-bold">{data.name}</h1>
              <div className="mt-2 text-gray-600">
                {data.content}
              </div>
            </div>
          )
        }) }
      </div>
    </div>
  )
}
