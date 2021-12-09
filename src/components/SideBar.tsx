import React, { useEffect, useState } from 'react'

import { api } from '../services/api'

import { Button } from './Button'

import '../styles/sidebar.scss'

interface GenreResponseProps {
    id: number
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
    title: string
}

interface SideBarProps {
    handleSetSelectedGenre: (genre: GenreResponseProps) => void
}

export function SideBar({ handleSetSelectedGenre }: SideBarProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1)
    const [genres, setGenres] = useState<GenreResponseProps[]>([])

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data)
        })
    }, [])

    useEffect(() => {
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(
            response => {
                handleSetSelectedGenre(response.data)
            }
        )
    }, [selectedGenreId])

    function handleClickButton(id: number) {
        setSelectedGenreId(id)
    }

    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>

            <div className="buttons-container">
                {genres.map(genre => (
                    <Button
                        key={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    )
}
