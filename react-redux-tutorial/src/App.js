import React from 'react';
import Counter from './components/Counter';
import Todos from './components/Todos';

function App() {
  return <div>
    <Counter number={2} />
    <hr>
    </hr>
    <Todos />
  </div>;
}

export default App;
