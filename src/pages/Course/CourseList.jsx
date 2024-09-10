import React, { useState, useMemo } from 'react';
import { FaBook, FaSurprise , FaAssistiveListeningSystems, FaPenAlt } from 'react-icons/fa';
import MainLayout from '../../layout/MainLayout';
import Filter from './components/Filter';
import CourseCard from './components/CourseCard';

const CoursesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const coursesPerPage = 8;

    const courses = useMemo(() => [
        { title: "IELTS Listening Essentials", 
            description: "Master the listening section of IELTS with focused practice.", 
            category: "Listening", 
            icon: <FaAssistiveListeningSystems className="text-blue-500 text-2xl" />, 
            teacher: "John Doe" 
        },
        { title: "IELTS Reading Mastery", 
            description: "Boost your reading comprehension for high IELTS scores.", 
            category: "Reading", icon: <FaBook className="text-blue-500 text-2xl" />, teacher: "John Doe" },
        { title: "IELTS Writing Advanced", 
            description: "Learn advanced techniques to improve your IELTS writing.", 
            category: "Writing", icon: <FaPenAlt  className="text-blue-500 text-2xl" />, teacher: "John Doe" },
        { title: "IELTS Speaking Confidence", 
            description: "Gain confidence in your speaking ability for the IELTS test.", 
            category: "Speaking", icon: <FaSurprise  className="text-blue-500 text-2xl" />, teacher: "John Doe" },
        { title: "IELTS Listening Essentials", 
            description: "Master the listening section of IELTS with focused practice.", 
            category: "Listening", icon: <FaAssistiveListeningSystems className="text-blue-500 text-2xl" />, teacher: "John Doe" },
        { title: "IELTS Reading Mastery", 
            description: "Boost your reading comprehension for high IELTS scores.", 
            category: "Reading", icon: <FaBook className="text-blue-500 text-2xl" />, teacher: "John Doe" },
        { title: "IELTS Writing Advanced", 
            description: "Learn advanced techniques to improve your IELTS writing.", 
            category: "Writing", icon: <FaPenAlt  className="text-blue-500 text-2xl" />, teacher: "John Doe" },
        { title: "IELTS Speaking Confidence", 
            description: "Gain confidence in your speaking ability for the IELTS test.", 
            category: "Speaking", icon: <FaSurprise  className="text-blue-500 text-2xl" /> },
        { title: "IELTS Listening Essentials", 
            description: "Master the listening section of IELTS with focused practice.", 
            category: "Listening", icon: <FaAssistiveListeningSystems className="text-blue-500 text-2xl" /> },
        { title: "IELTS Reading Mastery", 
            description: "Boost your reading comprehension for high IELTS scores.", 
            category: "Reading", icon: <FaBook className="text-blue-500 text-2xl" /> },
        { title: "IELTS Writing Advanced", 
            description: "Learn advanced techniques to improve your IELTS writing.", 
            category: "Writing", icon: <FaPenAlt  className="text-blue-500 text-2xl" /> },
        { title: "IELTS Speaking Confidence", 
            description: "Gain confidence in your speaking ability for the IELTS test.", 
            category: "Speaking", icon: <FaSurprise  className="text-blue-500 text-2xl" /> },
        // Additional courses...
    ], []);

    const categories = useMemo(() => ["All", "Listening", "Reading", "Writing", "Speaking"], []);

    // Filter courses based on selected category and search term
    const filteredCourses = useMemo(() => courses
        .filter(course => selectedCategory === 'All' || course.category === selectedCategory)
        .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase())),
        [courses, selectedCategory, searchTerm]
    );

    // Pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

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
                    <h2 className="text-2xl font-semibold text-blue-700">Enhance Your IELTS Skills with Our Comprehensive Courses!</h2>
                    <p className="text-gray-700 mt-2">Browse through our range of courses designed to help you ace the IELTS exam. Explore and start learning today!</p>
                </div>

                {/* Filter and Courses Grid */}
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
                    {currentCourses.map((course) => (
                        <CourseCard
                            key={course.title}
                            title={course.title}
                            description={course.description}
                            category={course.category}
                            icon={course.icon}
                            teacher={course.teacher}
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

export default CoursesSection;
