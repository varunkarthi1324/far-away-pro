export default function Item({ item, onDeleteItem, handletoggle }) {
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
