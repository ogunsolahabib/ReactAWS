import React from 'react'

import { Auth } from "aws-amplify";
import { useAppContext } from "../App";

export default function Header() {
    const { user } = useAppContext();

    function signOut() {
        Auth.signOut().then(_ => {
            if (typeof window !== 'undefined') {
                window.location.href = '/'
            }
        });

    }

    return <header>
        <h1 className='underline'>Header</h1>
        {user ? <ul>
            <li className='text-primary text-5xl font-bold'>{user.attributes.name}</li>
            <li><button onClick={signOut}>Sign out</button></li>
        </ul> : <a href='/signin'>Sign in</a>}
    </header>

}