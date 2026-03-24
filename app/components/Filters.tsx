'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import '../style/Filter.css';

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }   

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="blocs">
      <select 
        value={searchParams.get('status') || ''} 
        onChange={(e) => handleFilterChange('status', e.target.value)}
      >
        <option value="">Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select 
        value={searchParams.get('species') || ''} 
        onChange={(e) => handleFilterChange('species', e.target.value)}
      >
        <option value="">Species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Robot">Robot</option>
        <option value="Animal">Animal</option>
      </select>

      <select 
        value={searchParams.get('gender') || ''} 
        onChange={(e) => handleFilterChange('gender', e.target.value)}
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <input
        type="text"
        placeholder="Origin"
        value={searchParams.get('origin') || ''}
        onChange={(e) => handleFilterChange('origin', e.target.value)}
      />

      {(searchParams.get('status') || searchParams.get('species') || searchParams.get('gender') || searchParams.get('origin')) && (
        <button
          onClick={() => router.push('/')}
        >
          Clear
        </button>
      )}
    </div>
  );
}
 