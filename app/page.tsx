import { CharacterResponse } from './api/models/Charactersmodel';
import Link from 'next/link';
 
export default async function Home() {
  const res = await fetch(`${process.env.BASE_URL}/character`);
 
  if (!res.ok) {
    throw new Error('Erreur lors du fetch');
  }
 
  const data: CharacterResponse = await res.json();

  return (

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

  );
}