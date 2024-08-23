import axios from 'axios';

const API_BASE_URL = 'https://api.corkysfootwear.com';

export const getContainersByYear = async (year) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/CheckSheets/container/year/${year}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch containers by year:', error);
    throw error;
  }
};

export const getDocumentCategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/documents-categories`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch document categories', error);
    throw error;
  }
};

export const getDocumentTypes = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/documents/document-types`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch document types', error);
    throw error;
  }
};
export const getDocumentbyContainer = async (container) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/documents/${container}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch documents from the container:', error);
    throw error;
  }
};

export const getDocumentsbyContainerandCategoryId = async (
  container,
  categoryId
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/documents/${container}/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch documents from the container:', error);
    throw error;
  }
};

export const getContainers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/containers`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Containers', error);
    throw error;
  }
};

export const getContainerbyContainerCode = async (containerCode) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/container/${containerCode}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Container', error);
    throw error;
  }
};

export const getContainersByFileNumber = async (fileNumber) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/containers/file/${fileNumber}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch Containers from the File Number:', error);
    throw error;
  }
};

export const addContainer = async (container) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/ContainerManagement/containers`,
      container
    );
    return response.data;
  } catch (error) {
    console.error('Failed to add container:', error);
    throw error;
  }
};

export const updateContainerFileNumber = async (containerCode, fileNumber) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/ContainerManagement/containers/${containerCode}/file-number/${fileNumber}`,
      { fileNumber }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to update container file number:', error);
    throw error;
  }
};

export const finalizeContainer = async (containerCode, userId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/ContainerManagement/containers/${containerCode}/finalize/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error('Failed to finalize container:', error);
    throw error;
  }
};

export const uploadDocument = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/ContainerManagement/documents/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to upload document:', error);
    throw error;
  }
};

export const getItemPropertyChecks = async (container) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/CheckSheets/item-property-check/container/${container}`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch item property checks from the container:',
      error
    );
    throw error;
  }
};
export const getItemProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/CheckSheets/property`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch item properties from the container:', error);
    throw error;
  }
};

export const getExpectedContainers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/containers/expected`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getRecentlyReceivedContainers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/containers/recent-received`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDelayedContainers = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ContainerManagement/containers/delayed`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
