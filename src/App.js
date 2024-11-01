import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 4, packed: false },
// ];
export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function handledelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handletoggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleclearlist() {
    const confirmed = window.confirm("are you sure to delte the item ?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItem={handledelete}
        handletoggle={handletoggle}
        handleclr={handleclearlist}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    setdescription("");
    setquantity(1);
  }
  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>What do you need for your trip 😝</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, handletoggle, handleclr }) {
  const [sortBy, setsortBy] = useState("packed");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            handletoggle={handletoggle}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setsortBy(e.target.value)}>
          <option value="input"> sort by input order</option>
          <option value="description"> sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={handleclr}>Clear list</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItem, handletoggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handletoggle(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌&times;</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        {" "}
        <em>start adding some to your PackingList</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everything ready to go"
          : `💼You have ${numItems} items on your list, and you already packed{" "}
        ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
