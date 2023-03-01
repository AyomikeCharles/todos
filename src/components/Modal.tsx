import { useContext, useState } from "react";
import { Todo } from "../res/todo";
import { Todos, useTodos } from "../res/todos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type AppProps = {
    onClose : ()=>void;
}

interface val {
    task:string,
    datetime:Date
}


export default function Modal({onClose}:AppProps):JSX.Element{
    const [taskTodo, setTaskTodo] = useState<val>({task:'',datetime:new Date()} as val);
    const {allTodos, setAllTodos} = useTodos()
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name, value}: {name:string, value:string} = e.target
        setTaskTodo({...taskTodo, [name]: value,})

    }

const submit = (e:React.FormEvent):void=>{
    e.preventDefault()

    if(taskTodo){
        let prevId : number 
        if(allTodos.length===0){
            prevId = 1;
        }else{
            prevId = allTodos[allTodos.length - 1].id; 
        }
        setAllTodos([...allTodos, {id:prevId+1, task:taskTodo.task, deadline:taskTodo.datetime, completed:false}]);
        setTaskTodo({task:'',datetime:new Date()} as val);
        onClose()
    }
}



    return(
        <>
            <div className="modal">
                <div onClick={onClose}> <span className="close-modal"><FontAwesomeIcon icon ={["fas", "close"]} /></span> </div>
                <div className="inner-modal">
                    <form className="form" onSubmit={submit}>
                        <div>
                            <label htmlFor="task">Task</label>
                            <br/>
                            <input id="task" required type="text" placeholder="go shopping" name="task" value={taskTodo.task} onChange={handleChange}/>
                        </div>
                        <div>
                            <label htmlFor="dead-line">Dead line</label>
                            <br/>
                            <input id="dead-line" required type="datetime-local" name="datetime" value={taskTodo.datetime?.toLocaleString().split(', ')} onChange={handleChange}/>
                        </div>
                        <div>
                            <br/>
                            <button id="submit" type="submit">Submit <FontAwesomeIcon icon ={["fas", "paper-plane"]} /></button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}