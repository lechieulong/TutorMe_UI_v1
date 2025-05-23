import React, { useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { handleExport } from "../../components/ADMIN/CSV";
import { getTransactions } from "../../components/ADMIN/Transaction";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 10;

  const fetchProducts = async () => {
    const result = await getTransactions(page, pageSize, searchQuery);
    setTransactions(result.transactions);
    setTotalPages(result.totalPages);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleOpenModal = (gift = null) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Transactions</h2>
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mr-2"
            />
            <button
            onClick={() => handleExport(transactions)} 
              type="button"
              className="border border-gray-300 rounded-lg p-2 flex items-center"
            >
              <FaFileExport className="mr-2" /> Export
            </button>
          </form>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">UserId</th>
            <th className="py-2">Amount</th>
            <th className="py-2">PaymentStatus</th>
            <th className="py-2">Created Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-2">{transaction.userId}</td>
                <td className="py-2">{transaction.amount}</td>
                <td className="py-2">{transaction.paymentStatus}</td>
                <td className="py-2">
                  {new Date(transaction.createdAt).toLocaleString()}
                </td>
                <td className="py-2 flex whitespace-nowrap">
               </td>  
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 border rounded ${
            page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 border rounded ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default TransactionPage;
