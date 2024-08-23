import React, { useState, useEffect, useCallback } from 'react';
import logo from '../logo-square-black.png';
import Select from 'react-select';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  getContainersByYear,
  getDocumentTypes,
  getDocumentbyContainer,
  uploadDocument,
  getExpectedContainers,
  getRecentlyReceivedContainers,
  getDelayedContainers,
  addContainer,
  getContainersByFileNumber,
  getContainers,
  getContainerbyContainerCode,
  updateContainerFileNumber,
  finalizeContainer,
  getDocumentCategories,
  getDocumentsbyContainerandCategoryId,
} from './apiService';
import MissingDocumentsModal from './MissingDocumentsModal';
import DocumentCategoryButtons from './DocumentCategoryButtons';
import ExpectedContainers from './ExpectedContainers';
import DelayedContainers from './DelayedContainers';
import ContainersReceived from './ContainersReceived';
import DocumentListAndUpload from './DocumentListAndUpload';
import FinalizedMessageModal from './FinalizedMessageModal';
import YearFileContainerSelection from './YearFileContainerSelection';

const ContainerManagement = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedContainerNumber, setSelectedContainerNumber] = useState('');
  const [containers, setContainers] = useState([]);
  const [containerNumbers, setContainerNumbers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [documentOptions, setDocumentOptions] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expectedContainers, setExpectedContainers] = useState([]);
  const [receivedContainers, setReceivedContainers] = useState([]);
  const [delayedContainers, setDelayedContainers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [, setMultipleDocuments] = useState([]);
  const [isMissingDocumentsModalOpen, setIsMissingDocumentsModalOpen] =
    useState(false);
  const [missingDocuments, setMissingDocuments] = useState([]);
  const [fileNumbers, setFileNumbers] = useState([]);
  const [selectedFileNumber, setSelectedFileNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [containerExists, setContainerExists] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [showUploadButtons, setShowUploadButtons] = useState(false);
  const [finalizedMessage, setFinalizedMessage] = useState(false);
  const [isFinalizedModalOpen, setIsFinalizedModalOpen] = useState(false);
  const [, setIsAdmin] = useState(false);
  const [, setIsUser] = useState(false);
  const [, setIsChina] = useState(false);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState('admin');

  const fetchContainersByYear = useCallback(async (year) => {
    try {
      const containers = await getContainersByYear(year);
      if (containers && containers.length > 0) {
        setContainerNumbers(containers.sort((a, b) => a.localeCompare(b)));
        setErrorMessage(''); // Clear any previous error messages
      } else {
        setContainerNumbers([]);
        setErrorMessage('No containers found for the selected year.');
      }
    } catch (error) {
      console.error('Failed to fetch containers by year:', error);
      setContainerNumbers([]);
      setErrorMessage('Failed to fetch containers. Please try again later.');
    }
  }, []);
  
  const fetchDocumentCategories = useCallback(async () => {
    try {
      const categories = await getDocumentCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Failed to fetch document categories:', error);
    }
  }, []);

  const fetchDocumentTypes = useCallback(async () => {
    try {
      const types = await getDocumentTypes();
      setDocumentTypes(types);
    } catch (error) {
      console.error('Failed to fetch document types:', error);
    }
  }, []);

  const fetchDocumentsByContainer = useCallback(async () => {
    try {
      const documents = await getDocumentbyContainer(
        selectedContainerNumber.toString()
      );
      return documents;
    } catch (error) {
      setErrorMessage('Failed to fetch documents for the container:', error);
      return [];
    }
  }, [selectedContainerNumber]);

  const fetchDocumentsByContainerandCategoryId = useCallback(async () => {
    try {
      const documents = await getDocumentsbyContainerandCategoryId(
        selectedContainerNumber.toString(),
        selectedCategoryID
      );
      return documents;
    } catch (error) {
      setErrorMessage('Failed to fetch documents for the container:', error);
      return [];
    }
  }, [selectedCategoryID, selectedContainerNumber]);

  const fetchContainers = async () => {
    try {
      const containers = await getContainers();
      const uniqueFileNumbers = [
        ...new Set(containers.map((container) => container.fileNumber)),
      ]
        .sort((a, b) => b.localeCompare(a))
        .map((fileNumber) => ({
          value: fileNumber,
          label: fileNumber,
        }));
      setFileNumbers(uniqueFileNumbers);
      setContainers(containers);
    } catch (error) {
      setErrorMessage('Failed to fetch documents for the container:', error);
      return [];
    }
  };

  const fetchContainersByFileNum = async (selectedFileNumber) => {
    try {
      const containers = await getContainersByFileNumber(selectedFileNumber);
      setContainerNumbers(
        containers.map((container) => container.containerCode)
      );
      return containers;
    } catch (error) {
      setErrorMessage('Failed to fetch documents for the container.');
    }
  };

  const fetchExpectedContainers = async () => {
    try {
      const expectedContainers = await getExpectedContainers();
      setExpectedContainers(expectedContainers);
      return expectedContainers;
    } catch (error) {
      setErrorMessage('Failed to fetch expected containers:', error);
      return [];
    }
  };
  const fetchRecentlyReceivedContainers = async () => {
    try {
      const recentlyReceivedContainers = await getRecentlyReceivedContainers();
      setReceivedContainers(recentlyReceivedContainers);
      return recentlyReceivedContainers;
    } catch (error) {
      setErrorMessage('Failed to fetch recently received:', error);
      return [];
    }
  };
  const fetchDelayedContainers = async () => {
    try {
      const delayedContainers = await getDelayedContainers();
      setDelayedContainers(delayedContainers);
      return delayedContainers;
    } catch (error) {
      setErrorMessage('Failed to fetch delayed containers:', error);
      return [];
    }
  };

  const fetchContainerbyContainerCode = useCallback(
    async (selectedContainer) => {
      try {
        const container = await getContainerbyContainerCode(selectedContainer);

        if (container && container.length > 0) {
          const [containerProps] = container;

          if (
            containerProps.finalUser != null &&
            containerProps.finalDate != null
          ) {
            setFinalizedMessage(true);
          }
        } else {
          setFinalizedMessage(false);
        }

        return container;
      } catch (error) {
        setErrorMessage('Failed to fetch container.');
        return [];
      }
    },
    []
  );

  useEffect(() => {
    if (errorMessage) {
      console.log('Current Error Message:', errorMessage);
    }
  }, [errorMessage]);

  const resetDocumentState = () => {
    setSelectedDocumentType(null);
    setUploadedFile(null);
    setUploadError('');
  };

  useEffect(() => {
    if (!!selectedFileNumber) {
      fetchContainersByFileNum(selectedFileNumber);
    }
    if (!!selectedContainer) {
      fetchContainerbyContainerCode(selectedContainer);
    }
    fetchContainers();
    fetchExpectedContainers();
    fetchRecentlyReceivedContainers();
    fetchDelayedContainers();
    fetchDocumentTypes(); // existing function call
    fetchDocumentCategories(); // new function call
  }, [
    selectedFileNumber,
    selectedContainer,
    fetchDocumentTypes,
    fetchDocumentCategories,
    fetchDocumentsByContainerandCategoryId,
    fetchContainerbyContainerCode,
    selectedYear,
  ]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 4000);

      // Cleanup function to clear the timeout if the component unmounts or errorMessage changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (uploadError) {
      const timer = setTimeout(() => {
        setUploadError('');
      }, 2000);

      // Cleanup function to clear the timeout if the component unmounts or uploadError changes
      return () => clearTimeout(timer);
    }
  }, [uploadError]);

  useEffect(() => {
    if (finalizedMessage) {
      setIsFinalizedModalOpen(true);
    }
  }, [finalizedMessage]);

  const clearAllSelections = () => {
    setSelectedYear(null);
    setSelectedContainer(null);
    setSelectedFileNumber(null);
  };

  const handleYearChange = async (selectedOption) => {
    if (selectedOption) {
      const year = selectedOption.value;
      setSelectedYear(year);
      setSelectedFileNumber(''); // Clear file number selection when a new year is selected
      setSelectedContainer('');
      setFinalizedMessage(false);
      setDocumentOptions([]);
      fetchContainersByYear(year);
    } else {
      // Handle the case where the year selection is cleared
      clearAllSelections();
      setFinalizedMessage(false);
      setDocumentOptions([]);
      setContainerNumbers([]); // Clear container numbers when year is cleared
    }
  };
  

  const handleContainerChange = (selectedOption) => {
    if (!selectedOption) {
      // Reset everything if no option is selected
      setSelectedContainerNumber('');
      setSelectedContainer(null);
      setFinalizedMessage(false);
      setContainerExists(false);
      setSelectedFileNumber(''); // Clear the file number
      setContainerNumbers([]); // Clear container numbers if needed
      return;
    }

    const containerNum = selectedOption.value;
    const selectedContainerObject = containers.find(
      (container) => container.containerCode === containerNum
    );

    if (selectedContainerObject) {
      setSelectedContainerNumber(containerNum.toString()); // Set the selected container number
      setSelectedContainer(containerNum.toString()); // Set the selected container

      if (selectedContainerObject.fileNumber) {
        setSelectedFileNumber(selectedContainerObject.fileNumber); // Set the file number if it exists
        setContainerExists(true); // Indicate that the container exists and has a file number
      } else {
        setSelectedFileNumber(''); // Clear the file number if it doesn't exist
        setContainerExists(false); // Indicate that the container exists but without a file number
      }
    } else {
      // If no container object is found (unlikely case), reset everything
      setSelectedContainerNumber(containerNum);
      setSelectedContainer(containerNum);
      setSelectedFileNumber(''); 
      setContainerExists(false);
    }
};



  const handleFileNumberChange = (selectedOption) => {
    setFinalizedMessage(false);
    clearAllSelections();
    setSelectedContainerNumber(''); // Reset the selected container number

    const fileNum = selectedOption ? selectedOption.value : '';
    setSelectedFileNumber(fileNum); // Update the selected file number

    if (fileNum) {
      const filteredContainers = containers.filter(
        (container) => container.fileNumber === fileNum
      );
      setContainerNumbers(
        filteredContainers.map((container) => container.containerCode)
      );
      setContainerExists(true); // Show the Edit File Number button
    } else {
      setContainerNumbers([]);
      setContainerExists(false); // Hide the Edit File Number button
    }
  };

  const mapDocumentOptions = (documents, category) => {
    return documentTypes
      .filter((type) => type.categoryId === category.id)
      .map((type) => {
        const relatedDocuments = documents.filter(
          (doc) => doc.docTypeID === type.id
        );
        const document = relatedDocuments[0];
        const hasMultipleDocuments = relatedDocuments.length > 1;

        return {
          ...type,
          showLink: !!document,
          documentUrl: hasMultipleDocuments
            ? null
            : document
            ? document.docData
            : null,
          docExtension: document ? document.docExtension : null,
          multipleDocuments: hasMultipleDocuments ? relatedDocuments : [],
          present: !!document,
          docFileName: document ? document.docFileName : null,
          uploadedDate: document ? document.uploadedDate : null,
        };
      });
  };

  const handleDocumentCategoryChange = async (category) => {
    if (!selectedContainer) {
      setErrorMessage('Please select a container');
      return;
    }
    setErrorMessage('');
    resetDocumentState();
    setSelectedCategory(category.category);
    setSelectedCategoryID(category.id);
    setIsUploadModalOpen(false);
    setShowUploadButtons(false);

    try {
      const documents = await getDocumentsbyContainerandCategoryId(
        selectedContainerNumber,
        category.id
      );

      const mappedOptions = mapDocumentOptions(documents, category);

      setDocumentOptions(mappedOptions);
    } catch (error) {
      console.error('Failed to fetch documents for the category:', error);
    }
  };

  const checkAllDocuments = async () => {
    if (finalizedMessage) {
      setErrorMessage('Container has already been finalized!!');
      return;
    }
    if (!selectedContainerNumber) {
      setErrorMessage('Please select a container to finalize.');
      return;
    }

    // Checking if a file number is added
    if (!selectedFileNumber) {
      setErrorMessage('Please add a file number to the selected container.');
      return;
    }

    try {
      const documents = await fetchDocumentsByContainer();
      const presentDocumentTypes = documents.map((doc) => doc.docTypeID);

      // Excluding the "Check Sheets" category and Other Communication from Email Communication category.
      const filteredDocumentTypes = documentTypes.filter(
        (type) =>
          type.categoryId !== 5 &&
          !(
            type.categoryId === 8 && type.description === 'Other Communications'
          )
      );

      const missingDocuments = filteredDocumentTypes.filter(
        (type) => !presentDocumentTypes.includes(type.id)
      );

      if (missingDocuments.length > 0) {
        setMissingDocuments(missingDocuments);
        setIsMissingDocumentsModalOpen(true);
        return;
      }

      // If all documents are present, finalize the container
      await finalizeContainer(selectedContainerNumber, 30); // Replace 0 with the actual user ID if necessary
      setUploadError(
        'All documents are present. Container finalized successfully.'
      );
    } catch (error) {
      setErrorMessage('Failed to check or finalize the container.');
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files); // Convert the FileList to an array
    if (files.length > 0) {
      setUploadedFile(files);
      setUploadError('');
    } else {
      setUploadError('Please upload valid files.');
    }
  };

  const handleSaveUpload = async () => {
    if (!uploadedFile.length || !selectedDocumentType) {
      setUploadError('Please select a document type and upload files.');
      return;
    }

    const initialProgress = uploadedFile.map((file) => ({
      fileName: file.name,
      status: 'uploading',
    }));
    setUploadProgress(initialProgress);
    setIsUploadModalOpen(true);

    try {
      const uploadPromises = uploadedFile.map(async (file, index) => {
        const formData = new FormData();
        formData.append('ContainerCode', selectedContainerNumber.toString());
        formData.append('DocTypeID', selectedDocumentType.id);
        formData.append('Name', 'File');
        formData.append('DocCategoryId', selectedCategoryID);
        formData.append('UserID', 0);
        formData.append('File', file);

        await uploadDocument(formData);

        setUploadProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          newProgress[index].status = 'done';
          return newProgress;
        });
      });

      await Promise.all(uploadPromises);

      // After all uploads are complete, refetch the documents
      const updatedDocuments = await getDocumentsbyContainerandCategoryId(
        selectedContainerNumber,
        selectedCategoryID
      );

      const updatedDocumentOptions = mapDocumentOptions(updatedDocuments, {
        id: selectedCategoryID,
      });

      setDocumentOptions(updatedDocumentOptions); // Update the UI with the new document options
      setUploadedFile([]);
      setSelectedDocumentType(null);
      setUploadError('Documents uploaded successfully.');
    } catch (error) {
      setUploadError('Failed to upload documents.');
      console.error('Failed to upload documents:', error);
      setUploadProgress((prevProgress) =>
        prevProgress.map((progress) =>
          progress.status === 'uploading'
            ? { ...progress, status: 'error' }
            : progress
        )
      );
    }
  };

  const handleCancelUpload = () => {
    setUploadedFile(null);
    setSelectedDocumentType(null);
    setUploadError('');
    setUploadProgress([]);
    setShowUploadButtons(false);
  };

  const handleDocumentTypeClick = async (type) => {
    setSelectedDocumentType(type);
    setShowUploadButtons(true);
    setIsUploadModalOpen(false);
    const documents = await fetchDocumentsByContainer();
    const relatedDocuments = documents.filter(
      (doc) => doc.docTypeID === type.id
    );

    if (relatedDocuments.length > 1) {
      setMultipleDocuments(relatedDocuments);
    } else {
      setMultipleDocuments([]);
    }

    const document = relatedDocuments[0];

    setDocumentOptions((prevDocumentOptions) =>
      prevDocumentOptions.map((docType) =>
        docType.id === type.id
          ? {
              ...docType,
              showLink: docType.showLink || !!document, // Preserve showLink state
              documentUrl: document ? document.docData : null,
              docExtension: document ? document.docExtension : null,
              description: type.description,
              ContainerCode: selectedContainerNumber,
              present: !!document,
              docFileName: document ? document.docFileName : null,
            }
          : docType
      )
    );
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload({ target: { files: [file] } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => {
      const year = currentYear - i;
      return { value: year, label: year };
    });
  };

  const handleAddContainer = () => {
    if (selectedContainer) {
      setIsModalOpen(true);
    } else {
      setErrorMessage('Select a Container to add File Number');
    }
  };

  const saveFileNumber = async (fileNumber) => {
    if (!selectedContainer || !fileNumber) return;

    const existingContainer = containers.find(
      (container) => container.containerCode === selectedContainer
    );

    if (existingContainer) {
      try {
        await updateContainerFileNumber(selectedContainer, fileNumber);
        setSelectedFileNumber(fileNumber); // Keep the new file number selected
        setIsModalOpen(false); // Close the modal
        setContainerExists(true); // Ensure the containerExists state is set to true
      } catch (error) {
        setErrorMessage('Error updating container file number');
      }
    } else {
      const newContainerData = {
        id: 0,
        containerCode: selectedContainer,
        fileNumber: fileNumber,
        rcvUser: 0,
        rcvDate: new Date().toISOString(),
        finalUser: 0,
        finalDate: new Date().toISOString(),
      };

      try {
        await addContainer(newContainerData);
        setSelectedFileNumber(fileNumber); // Keep the new file number selected
        setIsModalOpen(false); // Close the modal
        setContainerExists(true); // Ensure the containerExists state is set to true
      } catch (error) {
        setErrorMessage('Error adding container');
      }
    }
  };

  const handleCloseUploadModal = () => {
    setShowUploadButtons(false);
    setIsUploadModalOpen(false);
    setUploadProgress([]); // Clear progress only when modal is closed
  };

  const handleSelectContainer = (trackingNumber) => {
    const selectedOption = { value: trackingNumber, label: trackingNumber };
    handleContainerChange(selectedOption);
  };

  const handleAccessLevel = (selectedOption) => {
    if (!selectedOption) {
      // Handle the case when the selection is cleared
      setSelectedAccessLevel(null);
      setIsAdmin(false);
      setIsUser(false);
      setIsChina(false);
      clearAllSelections();
      return;
    }

    const accessLevel = selectedOption.value;
    setSelectedAccessLevel(accessLevel);

    setIsAdmin(false);
    setIsUser(false);
    setIsChina(false);

    if (accessLevel === 'admin') {
      setIsAdmin(true);
    } else if (accessLevel === 'user') {
      setIsUser(true);
    } else if (accessLevel === 'china') {
      setIsChina(true);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden">
      <div className="w-1/4 bg-white p-6 shadow-lg flex flex-col items-center h-full">
        <div className="relative">
          <div className="mb-6 w-full flex justify-center">
            <img src={logo} alt="Corkys Footwear" className="w-1/4" />
          </div>
          <Select
            isClearable
            id="access"
            placeholder="User Level"
            className="w-64 p-2 ml-20 mb-3 border rounded-lg bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
              { value: 'china', label: 'China' },
            ]}
            onChange={handleAccessLevel}
          />
          <YearFileContainerSelection
            selectedYear={selectedYear}
            handleYearChange={handleYearChange}
            generateYearOptions={generateYearOptions}
            containerNumbers={containerNumbers}
            handleContainerChange={handleContainerChange}
            selectedContainer={selectedContainer}
            containerExists={containerExists}
            handleAddContainer={handleAddContainer}
            isModalOpen={isModalOpen}
            saveFileNumber={saveFileNumber}
            setIsModalOpen={setIsModalOpen}
            setContainerExists={setContainerExists}
            selectedFileNumber={selectedFileNumber}
            fileNumbers={fileNumbers}
            handleFileNumberChange={handleFileNumberChange}
          />
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md flex items-center mb-4"
              role="alert"
            >
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15h2v-2h-2v2zm0-4h2V7h-2v4zm0-12C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
          <DocumentCategoryButtons
            categories={categories}
            handleDocumentCategoryChange={handleDocumentCategoryChange}
          />
          <MissingDocumentsModal
            isOpen={isMissingDocumentsModalOpen}
            onClose={() => setIsMissingDocumentsModalOpen(false)}
            missingDocuments={missingDocuments}
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-gray-700 text-white p-6 shadow-lg flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Container Management</h1>
        </div>
        <div className="flex-1 bg-white p-6 shadow-lg flex flex-col items-center overflow-hidden">
          {!selectedContainerNumber && (
            <div className="flex w-full mb-4 space-x-4">
              <ExpectedContainers
                expectedContainers={expectedContainers}
                handleSelectContainer={handleSelectContainer}
              />
              <DelayedContainers
                delayedContainers={delayedContainers}
                handleSelectContainer={handleSelectContainer}
              />
              <ContainersReceived
                receivedContainers={receivedContainers}
                handleSelectContainer={handleSelectContainer}
              />
            </div>
          )}
          {selectedContainerNumber && (
            <DocumentListAndUpload
              selectedCategory={selectedCategory}
              selectedContainerNumber={selectedContainerNumber}
              documentOptions={documentOptions}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              uploadError={uploadError}
              handleDocumentTypeClick={handleDocumentTypeClick}
              selectedDocumentType={selectedDocumentType}
              handleFileUpload={handleFileUpload}
              handleSaveUpload={handleSaveUpload}
              handleCancelUpload={handleCancelUpload}
              showUploadButtons={showUploadButtons}
              isUploadModalOpen={isUploadModalOpen}
              handleCloseUploadModal={handleCloseUploadModal}
              uploadProgress={uploadProgress}
              finalizedMessage={finalizedMessage}
              selectedCategoryID={selectedCategoryID}
              selectedAccessLevel={selectedAccessLevel}
            />
          )}
          {isFinalizedModalOpen && (
            <FinalizedMessageModal
              isOpen={isFinalizedModalOpen}
              onClose={() => setIsFinalizedModalOpen(false)}
            />
          )}
          <button
            className="absolute bottom-4 right-8 p-3 border rounded-lg bg-pink-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
            onClick={() => checkAllDocuments()}
          >
            Finalize Container
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainerManagement;
