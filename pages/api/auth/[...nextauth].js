/**
 * Dependencies
 */
import NextAuth from 'next-auth'

// Custom github provider
const GithubProvider = {
  id: 'github',
  name: 'GitHub',
  type: 'oauth',
  version: '2.0',
  scope: 'read:user',
  accessTokenUrl: 'https://github.com/login/oauth/access_token',
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  profileUrl: 'https://api.github.com/user',
  profile: (profile) => ({
    id: profile.id,
    name: profile.login,
    email: profile.email,
    image: profile.avatar_url
  }),
  clientId: process.env.GH_CLIENT_ID,
  clientSecret: process.env.GH_CLIENT_SECRET
}

const options = {
  providers: [
    GithubProvider
  ],
  jwt: {
    secret: process.env.JWT_SECRET
  }

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL
}

/**
 * API Endpoint
 *
 * "/auth/[...nextauth]"
 *
 * @returns {JSON} HTML Response with json object array of all documents
 */
export default (req, res) => NextAuth(req, res, options)
