import React from 'react';

const ContainersReceived = ({ receivedContainers, handleSelectContainer }) => {
  return (
    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow">
      <h3 className="font-semibold text-green-500 text-lg text-left mb-2">
        Containers Received
      </h3>
      <div className="max-h-screen overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Received Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {receivedContainers.map((container) => (
              <tr key={container.trackingNumber}>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900 cursor-pointer hover:text-blue-500 hover:bg-gray-200"
                  onClick={() =>
                    handleSelectContainer(container.trackingNumber)
                  }
                >
                  {container.trackingNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-500">
                  {container.receivedWh
                    ? container.receivedWh.split('T')[0]
                    : 'Received date not available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContainersReceived;
