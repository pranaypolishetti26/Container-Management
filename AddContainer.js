import React, { useState, useRef, useEffect } from 'react';

const AddContainer = ({
  isOpen,
  onClose,
  onSave,
  selectedContainer,
  isEditMode,
}) => {
  const [newContainerNumber, setNewContainerNumber] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          {isEditMode ? 'Edit File Number' : 'Add File Number'}
        </h2>
        <p className="text-xl font-semibold">
          Selected Container: {selectedContainer}
        </p>
        <input
          ref={containerRef}
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Enter File Number"
          value={newContainerNumber}
          onChange={(e) => setNewContainerNumber(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              onClose();
              setNewContainerNumber('');
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => {
              onSave(newContainerNumber);
              setNewContainerNumber('');
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContainer;
