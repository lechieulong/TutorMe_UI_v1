function ChartCard({ title }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-gray-600">{title}</h2>
            <div className="mt-4">
                <img src="https://placehold.co/600x400" alt={`Chart showing ${title}`} />
            </div>
        </div>
    );
}

export default ChartCard;