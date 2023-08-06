import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "react-modal";
import "./App.css";

function App() {
  const fetchColetas = async () => {
    try {
      const response = await fetch(
        "http://localhost/painel-suprimentos/api/get_coletas.php"
      );
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
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleItemDescription = (item) => {
    setSelectedItem(item);
    setItemDescription({ description: "" }); // Limpar a descrição quando abrir o modal
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddToHistorico = (item) => {
    setHistorico([...historico, item]);
    const updatedItems = items.filter((i) => i !== item);
    setItems(updatedItems);
    setIsModalOpen(false); // Fechar o modal depois de enviar para o histórico
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

  const handleSendToHistorico = () => {
    setHistorico([...historico, selectedItem]);
    const updatedItems = items.filter((i) => i !== selectedItem);
    setItems(updatedItems);
    setIsModalOpen(false); // Fechar o modal depois de enviar para o histórico
  };

  return (
    <Router>
      <div className='container'>
        <h1 className='my-4'>Painel Suprimentos</h1>
        <button className='btn btn-primary' onClick={handleShowHistorico}>
          Histórico
        </button>
        <div className='row table-responsive custom-table-responsive'>
          <table className='table table-hover custom-table custom-table-responsive'>
            <thead>
              <tr>
                <th class='negrito' scope='col'>
                  <strong>Item</strong>
                </th>
                <th class='negrito' scope='col'>
                  <strong>Kg</strong>
                </th>
                <th class='negrito' scope='col'>
                  <strong>Ação</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((data) => (
                <tr className='houveTD' key={data.id}>
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
      </div>

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
            {selectedItem && (
              <>
                <p>
                  <strong>Item:</strong> {selectedItem.id}
                </p>
                <p>
                  <strong>Kg:</strong> {selectedItem.taxed_weight}
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
              </>
            )}
          </div>
          <div className='modal-footer my-2'>
            {selectedItem && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={handleSendToHistorico}
                >
                  Enviar para Lidos
                </button>
                <button className='btn btn-danger' onClick={handleModalClose}>
                  Fechar
                </button>
              </>
            )}
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
                  <strong>Item:</strong> {item.id}
                </p>
                <p>
                  <strong>Kg:</strong> {item.taxed_weight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </Router>
  );
}

export default App;
