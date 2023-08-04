import React, { useState } from 'react';

function ItemPanel({ items, onAddItem }) {
  const [newItem, setNewItem] = useState('');
  const today = new Date().toLocaleDateString();

  const handleAddItemClick = () => {
    if (newItem) {
      const item = { text: newItem, date: today };
      onAddItem(item);
      setNewItem('');
    }
  };

  const filteredItems = items.filter((item) => item.date === today);

  return (
    <div>
      <h2>Itens do dia atual:</h2>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItemClick}>Confirmar Leitura</button>
    </div>
  );
}

export default ItemPanel;
