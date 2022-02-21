import { useFetchUser } from "../utils/user";
import Link from 'next/link'
import { NextPage } from "next";

const Header:NextPage = () => {
    const { user, loading } = useFetchUser()

    let name: string = '';
    let profile: string = '';

    if (loading) {
        return (
            <div>
                <p>Data loading...</p>
            </div>
        )
    }

    if (user) {
        name = user.name.split('@')[0]
        profile = name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <div>
            <nav>
                {user && !loading ?
                    [
                        <>
                            <div className="dashboard">Dashboard</div>
                            <div className="grey push">Welcome, {profile}</div>
                            <Link href="/api/logout" >
                                <a className="bold">Logout</a>
                            </Link>
                        </>
                    ] : [
                        <>
                            <Link href="/api/login" >
                                <a className="bold">Login</a>
                            </Link>
                        </>
                    ]
                }
            </nav>
            <h1 className="header">Singapore Weather Forecast</h1>
        </div>
    );
};

export default Header;
