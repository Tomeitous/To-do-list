import React, { useState } from "react";

function Gith() {
  const [listItems, setListItems] = useState([]);
  const [search, setSearch] = useState("");

  const gitget = (event) => {
    event.preventDefault();
    fetch("https://api.github.com/search/repositories?q=" + search)
      .then((response) => response.json())
      .then((responseData) => {
        setListItems(responseData.items);
      })
      .catch((err) => console.error(err));
  };

  const itemRows = listItems.map((item) => (
    <tr key={item.id}>
      <td>{item.full_name}</td>
      <td>
        <a href={item.html_url}>{item.html_url}</a>
      </td>
    </tr>
  ));

  return (
    <div>
      <form onSubmit={gitget}>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>github</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>url</th>
          </tr>
          {itemRows}
        </tbody>
      </table>
    </div>
  );
}
export default Gith;
