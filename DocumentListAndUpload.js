import React from 'react';
import UploadProgressModal from './UploadProgressModal';
import CheckSheets from './CheckSheets';

const DocumentListAndUpload = ({
  finalizedMessage,
  selectedContainerNumber,
  documentOptions,
  handleDrop,
  handleDragOver,
  uploadError,
  handleDocumentTypeClick,
  selectedDocumentType,
  handleFileUpload,
  handleSaveUpload,
  handleCancelUpload,
  showUploadButtons,
  isUploadModalOpen,
  handleCloseUploadModal,
  uploadProgress,
  selectedCategoryID,
  selectedAccessLevel, // Receive the access level prop
}) => {
  return (
    <div className="w-full mt-4 flex-1 overflow-hidden">
      {selectedCategoryID === 5 ? (
        <CheckSheets container={selectedContainerNumber} />
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Document
          </h2>
          <div
            className="border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center rounded-lg"
            style={{ height: 'calc(93%)', overflow: 'hidden' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              {documentOptions.length > 0 && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  {documentOptions.length > 0 && (
                    <div className="mb-4 w-full px-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm w-full">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                                Document Types
                              </th>
                              <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                                Links
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {documentOptions.map((type) => (
                              <tr key={type.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  <button
                                    className="text-blue-600 hover:underline"
                                    onClick={() =>
                                      handleDocumentTypeClick(type)
                                    }
                                  >
                                    {type.description}
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {type.multipleDocuments.length > 1 ? (
                                    <select
                                      className="border rounded-lg p-2"
                                      onChange={(e) => {
                                        const selectedDocument =
                                          type.multipleDocuments.find(
                                            (doc) =>
                                              doc.docData === e.target.value
                                          );
                                        if (selectedDocument) {
                                          const link =
                                            document.createElement('a');
                                          link.href = `data:application/octet-stream;base64,${selectedDocument.docData}`;
                                          link.download = `${selectedDocument.docFileName}`;
                                          link.click();
                                        }
                                      }}
                                    >
                                      <option value="">Select Document</option>
                                      {type.multipleDocuments.map(
                                        (doc, index) => (
                                          <option
                                            key={index}
                                            value={doc.docData}
                                          >
                                            {`${doc.docFileName} - ${new Date(
                                              doc.uploadedDate
                                            )
                                              .toLocaleDateString()
                                              .replace(/\//g, '-')}`}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  ) : type.showLink && type.documentUrl ? (
                                    <a
                                      className="text-blue-600 hover:underline"
                                      href={`data:application/octet-stream;base64,${type.documentUrl}`}
                                      download={`${type.docFileName}`}
                                    >
                                      {`${type.docFileName}- ${new Date(
                                        type.uploadedDate
                                      )
                                        .toLocaleDateString()
                                        .replace(/\//g, '-')}`}
                                    </a>
                                  ) : (
                                    <span className="text-red-500">
                                      Not Available
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {uploadError && <p className="text-red-500">{uploadError}</p>}
                  {/* Conditionally render upload section based on access level */}
                  {(selectedAccessLevel === 'admin' ||
                    (selectedAccessLevel === 'china' &&
                      selectedDocumentType?.categoryId === 8) ||
                    (selectedAccessLevel === 'user' &&
                      selectedDocumentType?.categoryId === 8 &&
                      selectedDocumentType?.id === 14)) &&
                    (!finalizedMessage ||
                      (selectedDocumentType &&
                        selectedDocumentType.categoryId === 8 &&
                        selectedDocumentType.id === 14)) && (
                      <div className="flex flex-col items-center mt-4">
                        {selectedDocumentType && (
                          <div>
                            <p className="text-lg font-semibold text-red-600 mb-2">
                              Upload Document for{' '}
                              {selectedDocumentType.description}
                            </p>
                            <input
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent p-2.5"
                              id="file_input"
                              type="file"
                              multiple
                              onChange={handleFileUpload}
                            />
                          </div>
                        )}
                        {showUploadButtons && (
                          <>
                            <div className="mt-4 flex">
                              <button
                                className="mr-2 p-2 bg-green-500 text-white rounded"
                                onClick={handleSaveUpload}
                              >
                                Save
                              </button>
                              <button
                                className="p-2 bg-red-500 text-white rounded"
                                onClick={handleCancelUpload}
                              >
                                Cancel
                              </button>
                            </div>
                            <UploadProgressModal
                              isOpen={isUploadModalOpen}
                              onClose={handleCloseUploadModal}
                              uploadProgress={uploadProgress}
                            />
                          </>
                        )}
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentListAndUpload;
