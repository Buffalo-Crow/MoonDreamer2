import { useEffect, useState } from 'react';

export default function MoonSignDisplay() {
  const [moonSign, setMoonSign] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/moon-sign')
      .then(res => res.json())
      .then(data => setMoonSign(data.moonSign))
      .catch(err => {
        console.error('Error fetching moon sign:', err);
        setError('Failed to load moon sign');
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!moonSign) return <p>Loading moon sign...</p>;

  return (
    <div>
      <h2>🌙 Today's Moon is in {moonSign}</h2>
    </div>
  );
}