import React, { FC, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'

import { getImage } from './defaultProfileImage'
import { headerColours } from '../lib/strings'

const Center: FC = () => {
    const { data: session } = useSession()
    const [colour, setColour] = useState<string>(headerColours[0])

    // useEffect(() => {
    //     setColour()
    // }, [])

    return (
        <div className="flex-grow text-white">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    {getImage(session?.user?.image)}
                    <h2> {session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section
                className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colour} h-80 text-white p-8`}
            >
                hello
            </section>
        </div>
    )
}

export default Center
