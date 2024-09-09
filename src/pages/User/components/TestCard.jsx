const TestCard = ({ title, score, category, date, icon }) => (
    <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex items-center mb-2">
            {icon}
            <h3 className="text-xl font-semibold ml-2">{title}</h3>
        </div>
        <p className="text-gray-600">Score: {score}</p>
        <p className="text-gray-600">Category: {category}</p>
        <p className="text-gray-600">Date: {date}</p>
    </div>
);

export default TestCard;
