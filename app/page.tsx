import { CharacterResponse } from './api/models/Charactersmodel';
import Link from 'next/link';
 
export default async function Home() {
  const res = await fetch(`${process.env.BASE_URL}/character`);
 
  if (!res.ok) {
    throw new Error('Erreur lors du fetch');
  }
 
  const data: CharacterResponse = await res.json();

  return (
    <div>
      <Link href={`${process.env.BASE_URL}/character/?status=alive`}>
      <p>Alive Characters</p>
      </Link>

       <Link href={`${process.env.BASE_URL}/character/?status=dead`}>
      <p>Dead Characters</p>
      </Link>

       <Link href={`${process.env.BASE_URL}/character/?status=unknown`}>
      <p>Unknown Characters</p>
      </Link>
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