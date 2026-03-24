import { Character } from '../../api/models/Charactersmodel';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
}

// `params` contient l'ID dynamique de l'URL
export default async function CharacterPage({ params }: PageProps) {
  const { id } = await params;

  // On fetch le personnage selon l'ID
  const res = await fetch(`${process.env.BASE_URL}/character/${id}`);

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Erreur lors du fetch du personnage');
  }

  const character: Character = await res.json();

  // Fetch les détails de chaque épisode
  const episodeDetails = await Promise.all(
    character.episode.map(async (episodeUrl) => {
      const episodeRes = await fetch(episodeUrl);
      if (episodeRes.ok) {
        const episode = await episodeRes.json();
        return episode;
      }
      return null;
    })
  );

  return (
    <div>
      <main>
        <h1>{character.name}</h1>
        <img src={character.image} alt={character.name} width={300} />
        <div>
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Gender:</strong> {character.gender}</p>
          <p><strong>Origin:</strong> {character.origin.name}</p>
          <p><strong>Location:</strong> {character.location.name}</p>
          <div>
            <strong>Episodes ({character.episode.length}):</strong>
            <ul>
              {episodeDetails.filter(ep => ep !== null).map((episode, index) => (
                <li key={index}>
                  Episode {episode.id}: {episode.name} (S{episode.episode})
                </li>
              ))}
            </ul>
            <Link href={`/`} style={{ marginTop: '25px'}}>
              Back to Characters
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}