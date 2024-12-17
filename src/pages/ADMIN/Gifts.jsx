import React, { useEffect, useState } from "react";
import { getGifts,addGift,updateGift,deleteGift } from "../../components/ADMIN/Gifts";
import { FaTrash , FaFileExport, FaPlus, FaEdit } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { handleExport } from "../../components/ADMIN/CSV";
import Modal from 'react-modal';

const GiftPage = () => {
  const [gifts, setGifts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null); // State cho gift hiện tại (add hoặc update)

  const pageSize = 10;

  const fetchProducts = async () => {
    const result = await getGifts(page, pageSize, searchQuery);
    setGifts(result.gifts);
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

  const handleCloseModal = () => {
    setSelectedGift(null);
    setIsModalOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (selectedGift.id) {
      await updateGift(selectedGift);
      fetchProducts();
    } else {
      await addGift(selectedGift);
      fetchProducts();
    }
    fetchProducts();
    setIsModalOpen(false); // Đóng modal sau khi xử lý
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gift?")) {
      await deleteGift(id);
      fetchProducts(); // Cập nhật danh sách sau khi xóa
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Gifts</h2>
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
            onClick={() => handleExport(gifts)} 
              type="button"
              className="border border-gray-300 rounded-lg p-2 flex items-center"
            >
              <FaFileExport className="mr-2" /> Export
            </button>
          </form>
          <button
            onClick={() => handleOpenModal()}
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
          >
            <FaPlus className="mr-2" /> Add New
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Image</th>
            <th className="py-2">Created Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {gifts.length > 0 ? (
            gifts.map((gift) => (
              <tr key={gift.id} className="border-b">
                <td className="py-2">{gift.name}</td>
                <td className="py-2">{gift.price}</td>
                <td className="py-2">
                  <DotLottieReact
                    src={gift.url}
                    loop
                    autoplay
                    style={{ width: "80px" }}
                  />
                </td>
                <td className="py-2">
                  {new Date(gift.createdDate).toLocaleString()}
                </td>
                <td className="py-2 flex whitespace-nowrap">
                    <button onClick={() => handleOpenModal(gift)} className="px-2 py-1 bg-yellow-500 text-white rounded-lg flex items-center">
                     <FaEdit className="mr-1" /> Edit
                    </button>
                    <button onClick={() => handleDelete(gift.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg flex items-center" >
                     <FaTrash className="mr-1" /> Delete
                   </button>
               </td>  
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 text-center">
                No gifts found.
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

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        contentLabel={selectedGift ? "Edit Gift" : "Add New Gift"}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          {selectedGift ? "Edit Gift" : "Add New Gift"}
        </h2>
        <form onSubmit={handleSave}>
          <input
            type="text"
            placeholder="Gift Name"
            value={selectedGift?.name || ""}
            onChange={(e) =>
              setSelectedGift((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={selectedGift?.price || ""}
            onChange={(e) =>
              setSelectedGift((prev) => ({ ...prev, price: e.target.value }))
            }
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            required
          />
          <input
            type="text"
            placeholder="Url"
            value={selectedGift?.url || ""}
            onChange={(e) =>
              setSelectedGift((prev) => ({ ...prev, url: e.target.value }))
            }
            className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default GiftPage;
