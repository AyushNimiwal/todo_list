import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoItem({todo}) {
    const [isEdit, setIsEdit] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleTodo } = useTodo();
    const editTodo=()=>{
        updateTodo(todo.id,{...todo,todo:todoMsg})
        setIsEdit(false)
    }
    const toggleCompleted=()=>{
        toggleTodo(todo.id)
    }
  return (
    <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.isDone ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.isDone}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isEdit ? "border-black/10 px-2" : "border-transparent"
              } ${todo.isDone ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isEdit}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.isDone) return;

                  if (isEdit) {
                      editTodo();
                  } else setIsEdit((prev) => !prev);
              }}
              disabled={todo.isDone}
          >
              {isEdit ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  )
}

export default TodoItem