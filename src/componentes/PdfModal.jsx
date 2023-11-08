import React from 'react';

const PdfModal = ({ src, closeModal }) => {
  const modalStyle = {
    position: 'relative',
    width: '80%',
    height: '600px',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '140px',
    zIndex: '1',
  };

  const iframeStyle = {
    position: 'relative',
    zIndex: '0',
  };

  return (
    <div style={modalStyle}>
      <button
        style={closeButtonStyle}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={closeModal}
      >
        Cerrar PDF
      </button>
      <iframe
        title="PDF Viewer"
        src={src}
        width="100%"
        height="100%"
        frameBorder="0"
        style={iframeStyle}
      ></iframe>
    </div>
  );
};

export default PdfModal;
