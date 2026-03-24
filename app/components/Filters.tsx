'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '15px',
      flexWrap: 'wrap',
      opacity: 0.7
    }}>
      <select 
        value={searchParams.get('status') || ''} 
        onChange={(e) => handleFilterChange('status', e.target.value)}
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
      >
        <option value="">Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select 
        value={searchParams.get('species') || ''} 
        onChange={(e) => handleFilterChange('species', e.target.value)}
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
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
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          backgroundColor: 'white',
          cursor: 'pointer'
        }}
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
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          border: '1px solid #ddd',
          borderRadius: '3px',
          width: '100px'
        }}
      />

      {(searchParams.get('status') || searchParams.get('species') || searchParams.get('gender') || searchParams.get('origin')) && (
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            border: '1px solid #ddd',
            borderRadius: '3px',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
 