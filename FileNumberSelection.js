import React from 'react';
import Select from 'react-select';

const FileNumberSelection = ({
  fileNumbers,
  handleFileNumberChange,
  selectedFileNumber,
  containerExists,
  handleAddContainer,
  selectedContainer,
  selectedYear,
}) => {
  return (
    <div
      className={`bg-yellow-100 p-2 mb-2 ml-20 border rounded-lg ${
        containerExists ? 'flex items-center' : ''
      }`}
    >
      <div className={containerExists ? 'w-3/4' : 'w-full'}>
        <Select
          id="fileNumber"
          placeholder="Search With File Number"
          options={fileNumbers}
          onChange={handleFileNumberChange}
          isClearable
          value={
            selectedFileNumber
              ? { value: selectedFileNumber, label: selectedFileNumber }
              : null
          }
          className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400" // Use w-full here
          styles={{
            control: (provided) => ({
              ...provided,
              minWidth: '150px', // Ensure sufficient width if needed
            }),
            singleValue: (provided) => ({
              ...provided,
              overflow: 'visible', // Ensure the selected value is visible
            }),
          }}
          isDisabled={!!selectedYear}
        />
      </div>
      {selectedContainer && containerExists && (
        <button
          className="p-3 ml-4 border rounded-lg bg-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onClick={handleAddContainer}
        >
          Edit File Number
        </button>
      )}
    </div>
  );
};

export default FileNumberSelection;
