// 05-advanced-types/App.tsx
import React from 'react';

type Status = 'loading' | 'success' | 'error';

interface Data {
  id: number;
  title: string;
}

interface AppState {
  status: Status;
  data: Data[];
}

const App: React.FC = () => {
  const [state, setState] = React.useState<AppState>({
    status: 'loading',
    data: [],
  });

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) =>
        setState({
          status: 'success',
          data,
        })
      )
      .catch(() =>
        setState({
          status: 'error',
          data: [],
        })
      );
  }, []);

  if (state.status === 'loading') return <p>Loading...</p>;
  if (state.status === 'error') return <p>Error fetching data</p>;

  return (
    <ul>
      {state.data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default App;

