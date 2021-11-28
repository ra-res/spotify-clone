import React, { FC } from 'react'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import clsx from 'clsx'

interface Props {
    providers: Promise<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>>
}

const Login: FC<Props> = ({ providers }) => {
    return (
        <div className="flex flex-col bg-black w-full min-h-screen items-center justify-center">
            <img className="w-52 mb-5" src="/spotify-logo.svg" alt="Spotify Logo" />

            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button
                        className="bg-[#1DB954] text-white p-5 rounded-lg"
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: '/'
                            })
                        }
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers
        }
    }
}
