import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
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

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <button className="btn btn-primary">VFO</button>
        <h1 className="text-6xl font-bold">select stream to watch </h1>
        <select
          disabled={loading}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        >
          {actives.map((active, i) => (
            <option key={i} value={i}>
              {active.playbackId}
            </option>
          ))}
        </select>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
