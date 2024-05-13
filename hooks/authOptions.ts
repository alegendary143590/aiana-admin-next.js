import  EmailProvider from "next-auth/providers/email";

export const authOptions = {
    providers: [
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: process.env.EMAIL_FROM
        }),
      ],
}