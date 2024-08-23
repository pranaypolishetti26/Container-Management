import React from 'react';

const DocumentCategoryButtons = ({
  categories,
  handleDocumentCategoryChange,
}) => {
  return (
    <div className="w-full">
      <h3 className="font-semibold text-gray-700 mb-4">Available Documents</h3>
      {categories.map((category) => (
        <button
          key={category.id} // Use category.id as the key
          className="w-full mt-3 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => handleDocumentCategoryChange(category)}
        >
          {category.category}
        </button>
      ))}
    </div>
  );
};

export default DocumentCategoryButtons;
