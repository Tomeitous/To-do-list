import React from "react";

function TodoTable(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr></tr>
          {props.todos.map((todos, index) => (
            <tr key={index}>
              <td>{todos.date}</td>
              <td>{todos.description}</td>
              <td>{todos.priority}</td>
              <td>
                <button onClick={() => props.deleteTodo(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoTable;
