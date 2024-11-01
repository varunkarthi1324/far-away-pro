import { useState } from "react";
export default function Form({ onAddItems }) {
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
  