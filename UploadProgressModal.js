import React from 'react';

const UploadProgressModal = ({ isOpen, onClose, uploadProgress }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Upload Progress</h2>
        <div className="mt-4 w-full max-h-96 overflow-y-auto">
          {uploadProgress.map((progress, index) => (
            <div key={index} className="mb-2 flex items-center">
              <span className="mr-2 font-semibold text-gray-700">
                {progress.fileName}:
              </span>
              {progress.status === 'uploading' && (
                <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full border-t-blue-500 border-r-transparent"></div>
              )}
              {progress.status === 'done' && (
                <i className="fas fa-check text-green-500 ml-2"></i>
              )}
              {progress.status === 'error' && (
                <i className="fas fa-times text-red-500 ml-2"></i>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProgressModal;
