import { CharacterResponse } from './api/models/Charactersmodel';

export default async function Allinfo() {
  const res = await fetch(`${process.env.BASE_URL}/character`);

  if (!res.ok) {
    throw new Error('Erreur lors du fetch');
  }

  const data: CharacterResponse = await res.json();

  return (
    <div>
      <main>
        {data.results.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} width={150}/>
            <h2>{character.name}</h2>
            <p>{character.species}</p>
            <p></p>
          </div>
        ))}
      </main>
    </div>
  );
}