import React, { useEffect, useState } from 'react';

import { injectScript } from '@module-federation/nextjs-mf/utils';


interface ReactCounterProps {
  initialCount?: number;
}

const ReactCounter: React.FC<ReactCounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [PageComponent, setPageComponent] = useState<any>(null);

  const navigationData = {
    navMain: [
      {
        title: "Commits",
        url: "#",
        icon: undefined,
        isActive: true,
        items: [
          {
            title: "Build",
            url: () => {}
          }
        ]
      }
    ]
  };

  useEffect(() => {
    injectScript({
      global: 'auth',
      url: 'https://auth-layout.vercel.app/_next/static/chunks/remoteEntry.js',
    })
      .then((container: any) => container.get('./wrapper'))
      .then((loader: any) => {
        setPageComponent(() => loader().default);
      });
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <h2>React Counter Component</h2>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>Decrement</button>
      <div className="rounded">
        {PageComponent && <PageComponent count={navigationData} ><div>Hello</div></PageComponent>}
      </div>
    </div>
  );
};

export default ReactCounter; 