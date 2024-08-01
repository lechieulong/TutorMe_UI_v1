import React from 'react';
import DataTable from './components/DataTable';

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900">Hello, Tailwind CSS!</h1>
        <p className="mt-4 text-gray-600">This is a simple test to check if Tailwind CSS is working properly.</p>
        <DataTable />
      </div>
    </div>
  );
}

export default App;
