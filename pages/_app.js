import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div>
        <h1>VideoFlowOnline</h1>
      </div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
