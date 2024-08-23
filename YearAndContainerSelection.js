import React from 'react';
import Select from 'react-select';
import AddContainer from './AddContainer';

const YearAndContainerSelection = ({
  selectedYear,
  handleYearChange,
  generateYearOptions,
  containerNumbers,
  handleContainerChange,
  selectedContainer,
  containerExists,
  handleAddContainer,
  isModalOpen,
  saveFileNumber,
  setIsModalOpen,
  selectedFileNumber,
}) => {
  return (
    <div>
      <div className="mb-4 w-full">
        <Select
          placeholder="Select Year"
          isClearable
          id="year"
          className="w-64 p-2 ml-20 border rounded-lg bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          options={generateYearOptions()}
          onChange={handleYearChange}
          value={
            selectedYear ? { value: selectedYear, label: selectedYear } : null
          }
          isDisabled={!!selectedFileNumber}
        />
      </div>
      <div className="mb-5 ml-20 w-full flex flex-wrap items-center sm:justify-start">
        <div className="w-full sm:w-64 p-2 bg-yellow-100 border rounded-lg flex flex-col items-center">
          <div className="w-full">
            <Select
              id="containerNum"
              placeholder="Select a Container"
              isClearable
              className="w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              options={containerNumbers.map((container) => ({
                value: container,
                label: container,
              }))}
              onChange={handleContainerChange}
              value={
                selectedContainer
                  ? { value: selectedContainer, label: selectedContainer }
                  : null
              }
            />
          </div>
          {selectedContainer && !containerExists && (
            <div className="w-full mt-4 flex justify-center">
              <button
                className="p-3 w-full border rounded-lg bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                onClick={handleAddContainer}
              >
                Assign File Number
              </button>
            </div>
          )}
        </div>
        <AddContainer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={saveFileNumber}
          selectedContainer={selectedContainer}
          isEditMode={containerExists}
        />
      </div>
    </div>
  );
};

export default YearAndContainerSelection;
