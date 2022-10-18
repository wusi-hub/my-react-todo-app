import { useState } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import './App.css';
import Template from './components/Template';
import TodoList from './components/TodoList';
import TodoInsert from './components/TodoInsert';

let  nextId = 4;
const App = () => {
  const [seletedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '10시 디자인시스템 툴 팀 회의',
      checked: true
    },
    {
      id: 2,
      text: '16시 봉진님 All-Hands Meeting',
      checked: false
    },
    {
      id: 3,
      text: '전통시장 카테고리 기능 추가',
      checked: false
    }
  ]);

  const onInsertToggle = () => {
    if (seletedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  };

  const onInsertTodo = (text) => {
    if (text === '') {
      return alert('할 일을 입력해주세요.')
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false
      };
      setTodos(todos => todos.concat(todo));
      nextId++;
    }
  }

  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)))
  }

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  }

  const onRemove = id => {
    onInsertToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, text} : todo))
  }

  return ( 
  <Template todoLength={todos.length}>
    <TodoList todos={todos} onCheckToggle={onCheckToggle} onInsertToggle={onInsertToggle} onChangeSelectedTodo={onChangeSelectedTodo}/>
    <div className='add-todo-button' onClick={onInsertToggle}>
    <MdOutlineAddCircleOutline/>
    </div>
    {insertToggle && <TodoInsert seletedTodo={seletedTodo} onInsertToggle={onInsertToggle} onInsertTodo={onInsertTodo} onRemove={onRemove} onUpdate={onUpdate}/>}
  </Template>
  );
};

export default App;
