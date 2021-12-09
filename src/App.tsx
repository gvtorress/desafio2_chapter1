import { useState } from 'react'

import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

import './styles/global.scss'

import './styles/sidebar.scss'
import './styles/content.scss'

interface GenreResponseProps {
    id: number
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
    title: string
}

interface MovieProps {
    imdbID: string
    Title: string
    Poster: string
    Ratings: Array<{
        Source: string
        Value: string
    }>
    Runtime: string
}

export function App() {
    const [movies, setMovies] = useState<MovieProps[]>([])
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
        {} as GenreResponseProps
    )

    function handleSetSelectedGenre(genre: GenreResponseProps) {
        setSelectedGenre(genre)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SideBar handleSetSelectedGenre={handleSetSelectedGenre} />

            <Content selectedGenre={selectedGenre} />
        </div>
    )
}
