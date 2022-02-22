import type { NextPage } from "next";
import { useFetchUser } from "../utils/user";
import Router from 'next/router'

const Home: NextPage = () => {
  const { user } = useFetchUser()

  if (user) {
    Router.replace('/dashboard')
  }

  return <div className="center">
    <p>Please login to view forecast.</p>
  </div>;
};

export default Home;
