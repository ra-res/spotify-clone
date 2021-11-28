import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotifyService'

const refreshAccessToken = async token => {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const { body: refreshToken } = await spotifyApi.refreshAccessToken()
        console.log('Refresh token is ', refreshToken)

        return {
            ...token,
            accessToken: refreshToken.access_token,
            accessTokenExpires: Date.now + refreshToken.expires_in * 1000, // 1 hour
            refreshToken: refreshToken.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000 // convert to ms
                }
            }

            // return previous token if access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log('token not expired')
                return token
            }

            console.log('refreshing token')
            // access token expired -> refresh it
            return await refreshAccessToken(token)
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username

            return session
        }
    }
})
