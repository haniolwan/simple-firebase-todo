import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);

  const todosRef = collection(db, 'todos');
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getDocs(todosRef)
      setTodos(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchTodos();
  }, [])

  return (
    <div className="App">
      {todos.map((ele)=>{
       return <p>{ele.title}</p>
      })}
    </div>
  );
}

export default App;
