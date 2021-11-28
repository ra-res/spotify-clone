import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
    return (
        <div className="">
            <Head>
                <title> Spotify Clone </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>hello</h1>
            <main>
                <Sidebar />
                {/* center */}
            </main>
            <div>{/* player */}</div>
        </div>
    )
}
