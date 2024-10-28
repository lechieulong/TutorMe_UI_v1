import React from 'react';
import { FaFilter, FaFileExport  } from 'react-icons/fa';

const Transaction = () => {
    const transactions = [
        { name: 'Alex', email: 'alex@dashwind.com', location: 'Paris', amount: '$100', date: '23 Oct', img: 'https://placehold.co/30x30' },
        { name: 'Ereena', email: 'ereena@dashwind.com', location: 'London', amount: '$190', date: '22 Oct', img: 'https://placehold.co/30x30' },
        { name: 'John', email: 'jhon@dashwind.com', location: 'Canada', amount: '$112', date: '22 Oct', img: 'https://placehold.co/30x30' },
        { name: 'Matrix', email: 'matrix@dashwind.com', location: 'Peru', amount: '$111', date: '22 Oct', img: 'https://placehold.co/30x30' },
        { name: 'Virat', email: 'virat@dashwind.com', location: 'London', amount: '$190', date: '21 Oct', img: 'https://placehold.co/30x30' },
        { name: 'Miya', email: 'miya@dashwind.com', location: 'Paris', amount: '$230', date: '21 Oct', img: 'https://placehold.co/30x30' },
        { name: 'Virat', email: 'virat@dashwind.com', location: 'Canada', amount: '$331', date: '21 Oct', img: 'https://placehold.co/30x30' }
    ];

    return (
        <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <div className="flex items-center">
                    <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg p-2 mr-2" />
                    <button className="border border-gray-300 rounded-lg p-2 flex items-center mr-2">
                        <FaFilter className="mr-2" /> Filter
                    </button>
                    <button className="border border-gray-300 rounded-lg p-2 flex items-center">
                        <FaFileExport  className="mr-2" /> Export
                    </button>
                </div>
            </div>
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b">
                        <th className="py-2">Name</th>
                        <th className="py-2">Email Id</th>
                        <th className="py-2">Location</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 flex items-center">
                                <img src={transaction.img} alt={`Profile of ${transaction.name}`} className="rounded-full w-8 h-8 mr-2" />
                                {transaction.name}
                            </td>
                            <td className="py-2">{transaction.email}</td>
                            <td className="py-2">{transaction.location}</td>
                            <td className="py-2">{transaction.amount}</td>
                            <td className="py-2">{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Transaction;
