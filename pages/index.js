import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  const response = await fetch('https://api.zenon.si/post')
  const data = await response.json()
  return {
    props: {
      tweets: data,
    }
  }
}


export default function IndexPage(props) {
  const [inputValue, setInputValue] = useState('')
  const [name, setName] = useState('')
  const [list, setList] = useState(props.tweets)

  useEffect(() => {
    // loadList()
  }, [])

  const loadList = () => {
    fetch('https://api.zenon.si/post')
      .then(response => response.json())
      .then(data => setList(data))
  }

  const tweet = () => {
    if(inputValue !== '' && name !== '') {
      setInputValue('')
      fetch('https://api.zenon.si/post', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, content: inputValue, }),
      })
        .then(() => loadList())
    }
  }

  return (
    <div className="min-h-full bg-gray-100 flex flex-col items-center">
      <form
        className="w-1/2 flex flex-col items-end"
        onSubmit={(event) => {
          event.preventDefault()
          tweet()
        }}
      >
        <div className="w-full mt-48 mb-4 bg-black p-4 rounded-lg shadow-lg">
          <input type="text"
          className="bg-black text-white outline-none w-full"
            onChange={({ target: { value} }) => setName(value)}
            value={name}
            placeholder="Your name"
          />
        </div>
        <div className="w-full bg-white p-6 rounded-lg shadow">
            <textarea
              rows={8}
              className="outline-none w-full resize-none"
              placeholder="Say something ..."
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value
                setInputValue(value)
              }}
            />
        </div>
        <button
          className="mt-6 bg-gray-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg"
          type="submit"
        >
          Tweet
        </button>
        <button
          className="bg-gray-400 text-white p-4 rounded-lg"
          type="button"
          onClick={loadList}
        >
          Refresh
        </button>
      </form>
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
