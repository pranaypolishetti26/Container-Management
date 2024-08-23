import React from 'react';

const DelayedContainers = ({ delayedContainers, handleSelectContainer }) => {
  return (
    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="font-semibold text-lg text-red-500 text-left mb-2">
        Delayed Containers
      </h3>
      <div className="max-h-screen overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ETA Memphis
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {delayedContainers.map((container) => (
              <tr key={container.trackingNumber}>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900"
                  onClick={() =>
                    handleSelectContainer(container.trackingNumber)
                  }
                >
                  {container.trackingNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-red-600">
                  {container.arrivalMemphis
                    ? container.arrivalMemphis.split('T')[0]
                    : 'Arrival date not available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DelayedContainers;
