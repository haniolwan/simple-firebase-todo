import { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [newTitle, setNewTitle] = useState([]);
  const todosRef = collection(db, 'todos');
  const auth = getAuth();

  const addTodo = async () => {
    await addDoc(todosRef, { title, description });
  }
  const updateTodo = async (id, title) => {
    const todoDoc = doc(db, 'todos', id)
    updateDoc(todoDoc, { title: newTitle })
  }
  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id)
    await deleteDoc(todoDoc)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getDocs(todosRef)
      setTodos(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }
    fetchTodos();
  }, [])

  return (
    <><div>
      <button onClick={() => {
        signOut(auth)
      }}>Logout</button>
      Title<input onChange={(event) => setTitle(event.target.value)} />
      Description<input onChange={(event) => setDescription(event.target.value)} />
      <button onClick={addTodo}> Add todo</button>
    </div><div className="App">
        {todos.map((ele) => {
          return <div key={ele.id}><p >{ele.title}</p>
            <input onChange={(event) => setNewTitle(event.target.value)} />
            <button onClick={() => updateTodo(ele.id, ele.title)}>UpdateTodo</button>
            <button onClick={() => deleteTodo(ele.id)}>DeleteTodo</button>
          </div>
        })}
      </div></>
  );
}

export default Home;
