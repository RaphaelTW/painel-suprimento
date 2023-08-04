import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";
import ItemPanel from "./components/ItemPanel";
import ReadItems from "./components/ReadItems";
import Modal from "react-modal";

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDescription, setItemDescription] = useState("");

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleItemDescription = (item) => {
    setItemDescription(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const sampleData = [
    { item: "Item 1", kl: 58.5 },
    { item: "Item 2", kl: 81.2 },
    { item: "Item 3", kl: 67.4 },
  ];

  return (
    <Router>
      <div className='container'>
        <h2 className='my-4'>Painel Suprimentos</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Kg</th>
              <th>Ver</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((data, index) => (
              <tr key={index}>
                <td>{data.item}</td>
                <td>{data.kl}</td>
                <td>
                  <button
                    className='btn btn-primary'
                    onClick={() => handleItemDescription(data)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Routes>
        <Route path='/read-items' element={<ReadItems />} />
      </Routes>

      {/* Modal para Descrever e Enviar para Lidos */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel='Descrição do Item'
        className='modal-dialog modal-dialog-centered'
      >

          <div class='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5'>
                  Descrever Uma Observação do Item
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className='modal-body'>
                <p>
                  <strong>Item:</strong> {itemDescription.item}
                </p>
                <p>
                  <strong>Kg:</strong> {itemDescription.kl}
                </p>
                <textarea
                  className='form-control'
                  value={itemDescription.description || ""}
                  onChange={(e) =>
                    setItemDescription({
                      ...itemDescription,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className='modal-footer'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    handleAddItem(itemDescription);
                    handleModalClose();
                  }}
                >
                  Enviar para Lidos
                </button>
                <button
                  className='btn btn-secondary'
                  onClick={handleModalClose}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>

      </Modal>
    </Router>
  );
}

export default App;
