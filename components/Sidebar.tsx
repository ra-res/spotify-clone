import React from 'react'
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    RssIcon,
    HeartIcon,
    PlusCircleIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import ButtonWithIcon from './ButtonWithIcon'

// TODO: Needs refactoring
const Sidebar = () => {
    const buttonClasses = clsx('flex', 'items-center', 'space-x-2', 'hover:text-white')
    return (
        <div className="text-gray-500 p-5 text-sm border-right border-gray-900">
            <div className="space-y-4">
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
                <p className="cursor-pointer hover:text-white">Playlist name...</p>
            </div>
        </div>
    )
}

export default Sidebar
