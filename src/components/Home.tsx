import { useEffect, useState} from "react";
import { createPortal } from "react-dom";
import { Todo } from "../res/todo";
import Modal from "./Modal";
import { Todos, useTodos } from "../res/todos";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Home():JSX.Element{
    const [modal,setModal] = useState<boolean>(false);
    const [allTodos, setAllTodos] = useState<Todo[]>([])

    const displayForm = ():void =>{
            setModal(true)
    }

    const myTodos =  useTodos()


    const completed = (todoId:number):void =>{
        const updatedTodos = allTodos.map((todo) => {
            if (todo.id === todoId) {
                if(todo.completed===false){
                    return {
                        ...todo,
                        completed: true,
                      };
                }else{
                    return {
                        ...todo,
                        completed: false,
                      };
                }
              
             
            }
           
            return todo;
          });
        
          setAllTodos(updatedTodos)
    }

    const del = (todoId:number):void =>{
        const deleteTodo = allTodos.filter(todo => todo.id !== todoId);
        setAllTodos(deleteTodo)
    }

    


    return(
        <Todos.Provider value={{allTodos, setAllTodos}}>
            <div>
                <h4 className="banner">Task to do</h4>
                
                {allTodos.map((todo,i)=>
                
                
                {
                    return(
                    <div className="main-task-holder" key={todo.id}>
                        <div className="count">{i+1}</div>
                        <div className="task-holder">
                            <div className="tasks-info">
                                <div className="task">{todo.task}</div>
                                <div className="deadline">Deadline: {todo.deadline?.toLocaleString().split(', ')}</div>
                            </div>
                            <div className="actions">
                                <span className="icon" onClick={()=>del(todo.id)}><FontAwesomeIcon icon ={["fas", "trash"]} /></span>
                                <span className="icon" onClick={()=>completed(todo.id)}>{todo.completed?<FontAwesomeIcon icon ={["fas", "check-circle"]} />:<FontAwesomeIcon icon ={["fas", "circle"]} />}</span>
                            </div>
                        </div>
                    </div>
                )})}
                <div className="submit">
                    <div className="plus-circle" onClick={displayForm}><FontAwesomeIcon icon ={["fas", "plus-circle"]} /></div>
                </div>
            </div>
            {modal && createPortal(
                <Modal onClose={()=>{setModal(false)}} />, document.body
            )}
        </Todos.Provider>
    )
}