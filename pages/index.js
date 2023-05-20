import { useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

// export async function getServerSideProps() {
//   const response = await fetch('https://api.zenon.si/post')
//   const data = await response.json()
//   return {
//     props: {
//       tweets: data,
//     }
//   }
// }
export async function getStaticProps() {
  console.log('get tweets in build')
  const response = await fetch('https://api.zenon.si/post')
  const data = await response.json()
  return {
    props: {
      tweets: data,
    },
    revalidate: 86400,
  }
}

// const isClient = typeof window !== 'undefined'

export default function IndexPage(props) {
  const [inputValue, setInputValue] = useState('')
  const [name, setName] = useState('')
  const [list, setList] = useState(props.tweets)
  const page = useRef(0)
  const session = useSession()

  console.log(session)

  useEffect(() => {
    // // console.log('เข้าหน้าเสร็จแล้ว')
    // // client
    // // setScrollY(window.scrollY)

    const handler = () => {
      if (
        Math.round(
          window.scrollY + window.innerHeight
        ) === document.body.offsetHeight
      ) {
        loadList()
      }
    }

    // // Add effect-listener
    window.addEventListener('scroll', handler)
    
    // // window.removeEventListener
    return () => {
      // console.log('ออกหน้าแล้ว')
      // Remove effect-listener
      window.removeEventListener('scroll', handler)
    }
  }, [])

  const loadList = (isRefresh = false) => {
    if (!isRefresh) {
      page.current = page.current + 1
    }
    else {
      page.current = 0
    }
    fetch('https://api.zenon.si/post?page=' + page.current)
      .then(response => response.json())
      .then(data => {
        if (!isRefresh) {
          setList([ ...list, ...data  ])
        }
        else {
          setList(data)
        }
      })
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
        .then(() => loadList(true))
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
          className="bg-red-400 p-8"
          onClick={signIn}
        >
          My Login
        </button>
        <button
          className="mt-6 bg-gray-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg"
          type="submit"
        >
          Tweet
        </button>
        <button
          className="bg-gray-400 text-white p-4 rounded-lg"
          type="button"
          onClick={() => loadList(true)}
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
