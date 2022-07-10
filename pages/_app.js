import '../styles/globals.css'
import Layout from '../components/Navbar'

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      {/* <Layout ></Layout> */}
      <Component {...pageProps} />
    </>

  )
}
