import React, { useEffect, useState } from 'react';

import { injectScript } from '@module-federation/nextjs-mf/utils';


interface ReactCounterProps {
  initialCount?: number;
}

const ReactCounter: React.FC<ReactCounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [page, setPage] = useState();

  useEffect(() => {
    injectScript({
      global: 'auth',
      url: 'https://auth-layout.vercel.app/_next/static/chunks/remoteEntry.js',
    })
      .then((container: any) => container.get('./wrapper'))
      .then((loader: any) => {
        setPage(loader().default);
      });
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h2>React Counter Component</h2>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>Decrement</button>
      <div className="rounded">{page}</div>
    </div>
  );
};

export default ReactCounter; 