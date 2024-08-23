import React, { useEffect, useState } from 'react';
import { getItemPropertyChecks, getItemProperties } from './apiService';

const CheckSheets = ({ container }) => {
  const [, setDocuments] = useState([]);
  const [properties, setProperties] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('');

  const fetchIPCsByContainer = async () => {
    try {
      const documents = await getItemPropertyChecks(container);
      if (Array.isArray(documents)) {
        setDocuments(documents);

        const grouped = documents.reduce((acc, doc) => {
          const key = `${doc.itemCode} + ${doc.purchaseOrderNumber}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(doc);
          return acc;
        }, {});
        setGroupedData(grouped);
      } else {
        console.error('Expected an array but got:', documents);
      }
    } catch (error) {
      console.log('Failed to fetch documents for the container:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const properties = await getItemProperties();
      setProperties(properties);
    } catch (error) {}
  };

  useEffect(() => {
    fetchProperties();
    if (container) {
      fetchIPCsByContainer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">CheckSheets</h2>
      {Object.keys(groupedData).length === 0 ? (
        <div className="text-center text-2xl text-red-600 font-semibold mt-72">
          Check Sheets not available!!
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="groupSelect" className="mr-2 font-medium">
              Select an Item:
            </label>
            <select
              id="groupSelect"
              onChange={handleGroupChange}
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select</option>
              {Object.keys(groupedData).map((key) => {
                const hasFailStatus = groupedData[key].some(
                  (doc) => doc.status === 'Fail'
                );
                return (
                  <option
                    key={key}
                    value={key}
                    className={hasFailStatus ? 'text-red-600' : ''}
                  >
                    {key}
                  </option>
                );
              })}
            </select>
          </div>
          {selectedGroup && groupedData[selectedGroup] && (
            <div
              className="overflow-x-auto"
              style={{ maxHeight: '650px', overflowY: 'auto' }}
            >
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Property Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Category
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Item Code
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Purchase Order Number
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Status
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Date Checked
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-200">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {groupedData[selectedGroup].map((doc) => {
                    const property = properties.find(
                      (prop) => prop.id === doc.propertyId
                    );
                    return (
                      <tr key={doc.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b border-gray-300 text-left text-sm text-gray-700">
                          {property ? property.name : 'N/A'}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-left text-sm text-gray-700 capitalize">
                          {property ? property.category : 'N/A'}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-left text-sm text-gray-700">
                          {doc.itemCode}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-left text-sm text-gray-700">
                          {doc.purchaseOrderNumber}
                        </td>
                        <td
                          className={`px-6 py-4 border-b border-gray-300 text-left text-sm ${
                            doc.status === 'Pass'
                              ? 'text-green-600'
                              : doc.status === 'Fail'
                              ? 'text-red-600'
                              : 'text-gray-700'
                          }`}
                        >
                          {doc.status}
                        </td>

                        <td className="px-6 py-4 border-b border-gray-300 text-left text-sm text-gray-700">
                          {doc.dateChecked.split('T')[0]}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300 text-left text-sm text-gray-700">
                          {doc.notes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckSheets;
