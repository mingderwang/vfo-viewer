import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import ReactPlayer from 'react-player'

export default function Home() {
  const playerRef = useRef()
  const [actives, setActives] = useState([])
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState(0)
  async function bootstrap() {
    fetch('/api/streams')
      .then((res) => res.json())
      .then((array) => {
        console.log(array)
        setActives(array)
        setLoading(false)
        if (array.length > 0) {
          setValue(array[0].playbackId)
        }
      })
  }
  useEffect(() => {
    bootstrap()
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReactPlayer
        controls="true"
        playing="true"
        url={'https://cdn.livepeer.com/hls/' + value + '/index.m3u8'}
      />
      <>
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <button className="btn btn-primary">VFO</button>
          <h1 className="text-1l font-bold">select stream to watch </h1>
          <select
            className="text-6xl font-bold bg-black"
            disabled={loading}
            value={value}
            onChange={(e) => {
              console.log(e.currentTarget)
              setValue(e.currentTarget.value)
            }}
          >
            {actives.map((active, i) => (
              <option key={i} value={active.playbackId}>
                {active.name}
              </option>
            ))}
          </select>
        </main>
      </>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/VFO.png" alt="Vercel Logo" className="h-20 ml-2" />
        </a>
      </footer>
    </div>
  )
}
