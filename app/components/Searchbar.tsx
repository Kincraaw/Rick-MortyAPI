"use client";

import { useEffect, useState } from 'react';
import '../style/Searchbar.css';

export function Searchbar() {
    const [characters, setCharacters] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.BASE_URL}/character/?name=${query}`);
                const { results } = await response.json();
                setCharacters(results);
            } catch (error) {
                console.error('Erreur lors du fetch:', error);
            }
        };

        if (query) {
            fetchData();
        }
    }, [query]);

    return (
        <div className="searchbar">
            <input type="text" 
            placeholder="Rechercher un personnage..." 
            className="input"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            />
        </div>
    )
}