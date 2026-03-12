import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {

  providers:[
    CredentialsProvider({

      name:"credentials",

      credentials:{
        email:{},
        password:{}
      },

      async authorize(credentials){

        if(
          credentials?.email === "admin@test.com" &&
          credentials?.password === "123456"
        ){

          return {
            id:"1",
            name:"Admin",
            role:"admin"
          }

        }

        return null

      }

    })
  ],

  callbacks:{

    async session({session,token}){

      session.user.role = token.role

      return session

    },

    async jwt({token,user}){

      if(user){
        token.role = user.role
      }

      return token

    }

  }

}