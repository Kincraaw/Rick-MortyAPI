import { CharacterResponse } from './api/models/Charactersmodel';
import Link from 'next/link';
import { Suspense } from 'react';
import Filters from './components/Filters';

interface HomeProps {
  searchParams: Promise<{
    status?: string;
    species?: string;
    gender?: string;
    origin?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  // Construction de l'URL avec les paramètres de filtre
  const queryParams = new URLSearchParams();
  if (params.status) queryParams.append('status', params.status);
  if (params.species) queryParams.append('species', params.species);
  if (params.gender) queryParams.append('gender', params.gender);
  if (params.origin) queryParams.append('origin', params.origin);

  const queryString = queryParams.toString();
  const url = `${process.env.BASE_URL}/character${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Erreur lors du fetch');
  }

  const data: CharacterResponse = await res.json();

  return (
    <div>
      <Suspense fallback={<div style={{ height: '30px' }} />}>
        <Filters />
      </Suspense>
      <main>
        {data.results.map((character) => (
          <div key={character.id}>
            <h2>{character.name}</h2>
            <Link href={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} width={150} />
            </Link>
            <p style={{ marginBottom: '25px' }}>{character.species}</p>
          </div>
        ))}
      </main>
    </div>
  );
}