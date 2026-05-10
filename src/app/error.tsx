'use client';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div style={{ padding: 40, color: '#fff', background: '#1a1a1a', minHeight: '100vh' }}>
      <h1>Error caught:</h1>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: 20 }}>
        {error.message}
      </pre>
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: 10, opacity: 0.6 }}>
        {error.stack}
      </pre>
    </div>
  );
}
