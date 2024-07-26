import React from 'react'

type Props = {}

export default function NavBar({ }: Props) {
    return (
        <>
            <div><a href='/'>Home</a></div>
            <div><a href='/shelf'>Shelf</a></div>
            <div><a href='/statistics'>Statistics</a></div>
        </>
    )
}