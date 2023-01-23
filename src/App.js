import './App.css';
import { useState, useEffect } from 'react'; 

function App() {
  
  const [tareas, setTareas] = useState([]);
  
  useEffect(() => {
    const tareas = JSON.parse(localStorage.getItem('tareas'));
    if(tareas){
      setTareas(tareas);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.tarea.value);

    const newTareas = [
      ...tareas,
      {
        id : Date.now().toString(),
        tarea : e.target.tarea.value,
        state : false
      }
    ]

    setTareas(newTareas);
    console.log(`El estado de tareas: ${tareas}`);
    e.target.tarea.value = "";
    localStorage.setItem('tareas', JSON.stringify(newTareas));
    console.log(`Tareas: ${tareas}`);
  }

  const handleCheck = (tarea) => {
    const newTareas = tareas.map((tareaItem) => {
      if(tareaItem.id === tarea.id){
        return {...tareaItem, state: !tareaItem.state}
      }
      return tareaItem;
    } );
    setTareas(newTareas);
    console.log(`Tareas: ${tareas}`);
  }

  const handleDelete = (tarea) => {
    const newTareas = tareas.filter((tareaItem) => {
      return tareaItem.id !== tarea.id;
    });
    setTareas(newTareas);
    localStorage.setItem('tareas', JSON.stringify(newTareas));
   }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" name='tarea' placeholder="Enter a new task" />
        <button type="input" >Add</button>
      </form>
      <ul>
        {
          tareas.map((tarea, index) => {
            return <li key={tarea.id} style={{
              textDecoration: tarea.state ? "line-through" : "",
            }}>
              {tarea.tarea} <input type="checkbox" onChange={()=>handleCheck(tarea)} id={index} value={tarea} ></input>
              <button type="input" onClick={()=> handleDelete(tarea)} >Delete</button>
            </li>
          }
          )
        } 
      </ul>
    </div>
  );
}

export default App;
