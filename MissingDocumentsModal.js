import React from 'react';

const MissingDocumentsModal = ({ isOpen, onClose, missingDocuments }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Missing Documents
        </h2>
        {missingDocuments.length > 0 ? (
          <ul className="list-disc list-inside text-left">
            {missingDocuments.map((doc) => (
              <li key={doc.id} className="text-red-600 mb-2">
                {doc.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600 text-center">
            All documents are present.
          </p>
        )}
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissingDocumentsModal;
