import React from 'react'

import { Auth } from "aws-amplify";
import useCurrentUser from '../customHooks/useCurrentUser';

export default function Header() {
    const { user } = useCurrentUser();

    function signOut() {
        Auth.signOut().then(_ => {
            if (typeof window !== 'undefined') {
                window.location.href = '/'
            }
        });
    }

    return <header className='w-full lg:w-[50rem] mx-auto px-4 py-10'>
        <div className="flex justify-between items-center gap-5 flex-wrap">
            <a href='/'>
                <figure className='text-primary font-bold text-2xl'>
                    React Amplify
                </figure>
            </a>
            {user ? <nav className='flex gap-10 lg:ml-auto'>
                <ul className='flex gap-3 align-middle'>
                    <li>Sign in as <span className='font-bold'>{user.attributes.name}</span></li>
                    <li>
                        <button className='text-red-500 text-sm' onClick={signOut}>Sign out</button>
                    </li>

                </ul></nav> : <a href='/signin'>Sign in</a>}
        </div>
    </header>

}