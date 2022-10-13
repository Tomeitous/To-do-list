import React, { useState, useEffect } from "react";

function Avatar() {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((responseData) => {
        setListItems(responseData.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const itemRows = listItems.map((person) => (
    <tr key={person.id}>
      <td>{person.first_name}</td>
      <td>{person.last_name}</td>
      <td>{person.email}</td>
      <td>
        <img src={person.avatar}></img>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2>Persons</h2>
      <table>
        <tbody>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
          {itemRows}
        </tbody>
      </table>
    </div>
  );
}
export default Avatar;
