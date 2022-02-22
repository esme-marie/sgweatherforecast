# Singapore Weather Forecast
A weather forecast web application

### Tech
NextJs, Typescript, Auth0, GraphJs

### External API
[Singapore Weather Forecast](https://data.gov.sg/dataset/weather-forecast)

### Deployed on
[Vercel](https://sgweatherforecast.vercel.app/)

## Web Flow
### Login
- A landing page inviting a user to login
- A user can sign-up and login into app with email and password

### Dashboard
- Only logged in user can view dashboard
- Dashboard automatically loads current day weather forecast for the next 4 days
- Line chart shows high and low temperature forecast
- Table displays weather forecast data
- User can select earlier dates (depending on API data availability) and both line chart and table will automatically reflect data changes
- If there is no data available on selected date, a message to prompt user to select another date will appear

### Logout
- User can logout from dashboard and will be directed back to landing page

-----

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To install project dependencies:

```bash
npm install
# or
yarn install
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
