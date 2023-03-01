import { createContext, useContext } from 'react';
import { Todo } from './todo';

interface Props {
    allTodos: Todo[];
    setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }

export const Todos = createContext<Props>({} as Props);
export const useTodos = () => useContext(Todos);