'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '2rem', background: '#fff', color: '#000' }}>
      <h1>Render Error</h1>
      <p>Message: {error.message}</p>
      <p>Digest: {error.digest}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
