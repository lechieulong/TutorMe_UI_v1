import React, { useState, useMemo } from 'react';
import { FaPenAlt, FaBook, FaGraduationCap, FaAssistiveListeningSystems } from 'react-icons/fa';
import MainLayout from '../../layout/MainLayout';
import Filter from './components/Filter'; // Assume you have a Filter component
import TestCard from './components/TestCard'; // Create a similar card component for the test data

const UserTests = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const testsPerPage = 8;

    // Sample test data
    const tests = useMemo(() => [
        { title: "IELTS Listening Test 1", score: 8, category: "Listening", date: "2024-07-10", icon: <FaAssistiveListeningSystems className="text-blue-500 text-2xl" /> },
        { title: "IELTS Reading Test 2", score: 7.5, category: "Reading", date: "2024-07-12", icon: <FaBook className="text-blue-500 text-2xl" /> },
        { title: "IELTS Writing Test 3", score: 7, category: "Writing", date: "2024-07-15", icon: <FaPenAlt className="text-blue-500 text-2xl" /> },
        { title: "IELTS Speaking Test 4", score: 8.5, category: "Speaking", date: "2024-07-18", icon: <FaGraduationCap className="text-blue-500 text-2xl" /> },
        { title: "IELTS Listening Test 1", score: 8, category: "Listening", date: "2024-07-10", icon: <FaAssistiveListeningSystems className="text-blue-500 text-2xl" /> },
        { title: "IELTS Reading Test 2", score: 7.5, category: "Reading", date: "2024-07-12", icon: <FaBook className="text-blue-500 text-2xl" /> },
        { title: "IELTS Writing Test 3", score: 7, category: "Writing", date: "2024-07-15", icon: <FaPenAlt className="text-blue-500 text-2xl" /> },
        { title: "IELTS Speaking Test 4", score: 8.5, category: "Speaking", date: "2024-07-18", icon: <FaGraduationCap className="text-blue-500 text-2xl" /> },
        { title: "IELTS Listening Test 1", score: 8, category: "Listening", date: "2024-07-10", icon: <FaAssistiveListeningSystems className="text-blue-500 text-2xl" /> },
        { title: "IELTS Reading Test 2", score: 7.5, category: "Reading", date: "2024-07-12", icon: <FaBook className="text-blue-500 text-2xl" /> },
        { title: "IELTS Writing Test 3", score: 7, category: "Writing", date: "2024-07-15", icon: <FaPenAlt className="text-blue-500 text-2xl" /> },
        { title: "IELTS Speaking Test 4", score: 8.5, category: "Speaking", date: "2024-07-18", icon: <FaGraduationCap className="text-blue-500 text-2xl" /> },
        // Add more tests...
    ], []);

    const categories = useMemo(() => ["All", "Listening", "Reading", "Writing", "Speaking"], []);

    // Filter tests based on category and search term
    const filteredTests = useMemo(() => tests
        .filter(test => selectedCategory === 'All' || test.category === selectedCategory)
        .filter(test => test.title.toLowerCase().includes(searchTerm.toLowerCase())),
        [tests, selectedCategory, searchTerm]
    );

    // Pagination
    const indexOfLastTest = currentPage * testsPerPage;
    const indexOfFirstTest = indexOfLastTest - testsPerPage;
    const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);
    const totalPages = Math.ceil(filteredTests.length / testsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <MainLayout>
            <div className="px-4 py-6">
                {/* Banner Section */}
                <div className="bg-blue-100 p-4 rounded-lg mb-6 text-center">
                    <h2 className="text-2xl font-semibold text-blue-700">Your Completed IELTS Tests</h2>
                    <p className="text-gray-700 mt-2">Review your progress and scores for all the tests you have taken.</p>
                </div>

                {/* Filter and Tests Grid */}
                <Filter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={(category) => {
                        setSelectedCategory(category);
                        setCurrentPage(1); // Reset to page 1 when changing category
                    }}
                    searchTerm={searchTerm}
                    onSearchChange={(term) => setSearchTerm(term)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {currentTests.map((test) => (
                        <TestCard
                            key={test.title}
                            title={test.title}
                            score={test.score}
                            category={test.category}
                            date={test.date}
                            icon={test.icon}
                        />
                    ))}
                </div>

                {/* Pagination controls */}
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        aria-label="Previous Page"
                        className={`px-3 py-1.5 mx-1 text-sm font-medium ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600'} text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    >
                        Previous
                    </button>
                    <span className="text-sm mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        aria-label="Next Page"
                        className={`px-3 py-1.5 mx-1 text-sm font-medium ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600'} text-white border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default UserTests;
