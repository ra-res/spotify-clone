import React, { FC, useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue } from 'recoil'
import { shuffle } from 'lodash'

import { getImage } from './defaultProfileImage'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const headerColours: string[] = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-red-500',
    'from-yellow-500',
    'from-pink-500',
    'from-purple-500'
]

const Center: FC = () => {
    const { data: session } = useSession()
    const [colour, setColour] = useState<string>(headerColours[0])
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const spotifyApi = useSpotify()

    useEffect(() => {
        setColour(shuffle(headerColours).pop())
    }, [playlistId])

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then(data => setPlaylist(data.body))
            .catch(error => console.log('Something went wrong', error))
    }, [spotifyApi, playlistId])

    console.log(playlist)
    return (
        <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
                onClick={() => signOut()}>
                    {getImage(session?.user?.image)}
                    <h2> {session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colour} h-80 text-white p-8`}
            >
                <img
                    className="h-44 w-44 shadow-2xl"
                    src={playlist?.images?.[0]?.url}
                    alt="Playlist image"
                />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
        </div>
    )
}

export default Center
