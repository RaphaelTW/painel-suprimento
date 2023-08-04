import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemPanel from "./components/ItemPanel";
import ReadItems from "./components/ReadItems";
import Modal from "react-modal";
import "./App.css";

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
    { item: "Item 4", kl: 80.8 },
    { item: "Item 5", kl: 115.0 },
    { item: "Item 6", kl: 76.2 },
    { item: "Item 7", kl: 92.4 },
    { item: "Item 8", kl: 68.8 },
    { item: "Item 9", kl: 65.9 },
    { item: "Item 10", kl: 50.0 },
    { item: "Item 11", kl: 50.4 },
    { item: "Item 12", kl: 274.4 },
  ];

  return (
    <Router>
      <div className='container'>
        <h2 className='my-4'>Painel Suprimentos</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>
                <strong>Item</strong>
              </th>
              <th>
                <strong>Kg</strong>
              </th>
              <th>
                <strong>Ação</strong>
              </th>
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
                    <i className='bi bi-eye'></i>
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
        style={{
          content: {
            maxWidth: "400px",
            maxHeight: "300px", // Defina a altura máxima como 80% da altura da viewport
            margin: "auto", // Para centralizar horizontalmente
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
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
          <div className='modal-footer my-2'>
            <button
              className='btn btn-primary me-2'
              onClick={() => {
                handleAddItem(itemDescription);
                handleModalClose();
              }}
            >
              Enviar para Lidos
            </button>
            <button className='btn btn-danger' onClick={handleModalClose}>
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </Router>
  );
}

export default App;
