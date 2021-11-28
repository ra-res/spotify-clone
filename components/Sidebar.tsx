import React, { useEffect, useState } from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    RssIcon,
    HeartIcon,
    PlusCircleIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'

// TODO: Needs refactoring
const Sidebar = () => {
    const buttonClasses = clsx('flex', 'items-center', 'space-x-2', 'hover:text-white')
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])
    const spotifyApi = useSpotify()

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists(session).then(data => setPlaylists(data.body.items))
        }
    }, [session, spotifyApi])

    console.log(playlists)
    return (
        <div className="text-gray-500 p-5 text-sm border-right border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
            <div className="space-y-4">
                <button onClick={() => signOut()} className={buttonClasses}>
                    <p>Logout</p>
                </button>

                <button className={buttonClasses}>
                    <HomeIcon className="w-5 h-5" />
                    <p>Home</p>
                </button>
                <button className={buttonClasses}>
                    <SearchIcon className="w-5 h-5" />
                    <p>Search</p>
                </button>
                <button className={buttonClasses}>
                    <LibraryIcon className="w-5 h-5" />
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                <button className={buttonClasses}>
                    <PlusCircleIcon className="w-5 h-5" />
                    <p>Create Playlist</p>
                </button>
                <button className={buttonClasses}>
                    <HeartIcon className="w-5 h-5" />
                    <p>Your Library</p>
                </button>

                <button className={buttonClasses}>
                    <RssIcon className="w-5 h-5" />
                    <p>Your episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900" />

                {/* Playlists */}
                {playlists.map(playlist => (
                    <p key={playlist.id} className="cursor-pointer hover:text-white">
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
