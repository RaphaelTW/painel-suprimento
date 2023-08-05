import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import "./App.css";

function App() {
  const fetchColetas = async () => {
    try {
      const response = await fetch("http://localhost/painel-suprimentos/api/get_coletas.php");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [historico, setHistorico] = useState([]);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);

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

  const handleAddToHistorico = (item) => {
    setHistorico([...historico, item]);
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
    setIsModalOpen(false);
  };

  const handleShowHistorico = () => {
    setShowHistoricoModal(true);
  };

  const handleCloseHistorico = () => {
    setShowHistoricoModal(false);
  };

  useEffect(() => {
    fetchColetas();
  }, []);

  return (
    <Router>
      <div className='container'>
        <h2 className='my-4'>Painel Suprimentos</h2>
        <button className='btn btn-primary' onClick={handleShowHistorico}>
          Histórico
        </button>
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
            {items.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.taxed_weight}</td>
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
      <Routes>{/* Adicione suas rotas aqui */}</Routes>

      {/* Modal para Descrever e Enviar para Lidos */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel='Descrição do Item'
        style={{
          content: {
            maxWidth: "400px",
            maxHeight: "300px",
            margin: "auto",
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
            <button
              className='btn btn-secondary me-2'
              onClick={() => {
                handleAddToHistorico(itemDescription);
              }}
            >
              Histórico
            </button>
            <button className='btn btn-danger' onClick={handleModalClose}>
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal para Histórico */}
      <Modal
        isOpen={showHistoricoModal}
        onRequestClose={handleCloseHistorico}
        contentLabel='Histórico de Itens'
        style={{
          content: {
            maxWidth: "600px",
            maxHeight: "400px",
            margin: "auto",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
        }}
      >
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5'>Histórico de Itens</h1>
            <button
              type='button'
              className='btn-close'
              onClick={handleCloseHistorico}
            ></button>
          </div>
          <div className='modal-body'>
            {historico.map((item, index) => (
              <div key={index}>
                <p>
                  <strong>Item:</strong> {item.item}
                </p>
                <p>
                  <strong>Kg:</strong> {item.kl}
                </p>
                {/* E outras informações que você queira mostrar */}
              </div>
            ))}
          </div>
          <div className='modal-footer my-2'>
            <button className='btn btn-primary' onClick={handleCloseHistorico}>
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </Router>
  );
}

export default App;
