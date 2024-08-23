import React from 'react';

const FinalizedMessageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-11/12 md:w-1/3 max-w-lg">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Finalized</h2>
        <p className="text-2xl text-gray-700">
          This container has been finalized!
        </p>
        <button
          className="mt-6 w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FinalizedMessageModal;
