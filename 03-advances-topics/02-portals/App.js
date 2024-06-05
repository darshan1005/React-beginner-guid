
// 02-portals/App.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
};

const App = () => {
  return (
    <div>
      <h1>App Component</h1>
      <Modal>
        <h2>Modal Component</h2>
      </Modal>
    </div>
  );
};

export default App;
