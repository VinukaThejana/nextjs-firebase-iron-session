# NEXTjs Firebase authentication

Authentication with firebase client side SDK to get the authed
user information from the client side and use iron-session to create a session
when the users log in or signs up and retreive that session from the server side
(from the firebaseAdmin SDK) to get the information of the user on the server
side

## Getting Started

1. Create a .env.local file in the project root and add the env variable names as per the `modules.d.ts` file in the root of the project
   (you can find the values for the env variables from the firebase dashboard)
2. Run `pnpm install`, `npm install` or `yarn install` in the project root
3. Open the browser on your [localhost](http://localhost:3000)

## Acknowledgement

This is my first time working with firebase so if you find some ways to improve please open a pull request or if you have an issue on how to get this working please feel free to open an Issue

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
