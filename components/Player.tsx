import { SwitchHorizontalIcon, VolumeUpIcon } from '@heroicons/react/outline'
import {
    ReplyIcon,
    PauseIcon,
    VolumeUpIcon as VolumeDownIcon,
    FastForwardIcon,
    RewindIcon,
    PlayIcon
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { debounce } from 'lodash'

import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

const Player: FC = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState<number>(50)
    const songInfo = useSongInfo()

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                // console.log(`Now playing ${JSON.stringify(data.body?.item, null, 2)}`)
                setCurrentTrackId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data?.body?.is_playing) {
                spotifyApi.pause()
                setIsPlaying(false)
            } else {
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    const debounceAdjustVolume = useCallback(
        debounce(volume => {
            spotifyApi.setVolume(volume).catch(err => {})
            console.log('setting volume in spotifyu')
        }, 500),
        [volume]
    )

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            console.log('setting here')
            debounceAdjustVolume(volume)
        }
    }, [volume])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            //fetch song info
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* Left  */}
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon onClick={() => spotifyApi.skipToPrevious()} className="button" />

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                )}

                <FastForwardIcon onClick={() => spotifyApi.skipToNext()} className="button" />

                <ReplyIcon className="button" />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon
                    onClick={() => {
                        if (volume > 10) {
                            setVolume(volume - 10)
                        }
                    }}
                    className="button"
                />
                <input
                    className="w-14 md:w-25"
                    type="range"
                    value={volume}
                    min={0}
                    max={100}
                    onChange={e => {
                        setVolume(Number(e.target.value))
                        console.log(`setting volume to `, e.target.value)
                    }}
                />
                <VolumeUpIcon
                    onClick={() => {
                        if (volume < 100) {
                            setVolume(volume + 10)
                        }
                    }}
                    className="button"
                />
            </div>
        </div>
    )
}

export default Player
