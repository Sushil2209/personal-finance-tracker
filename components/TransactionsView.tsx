
import React from 'react';
import { Transaction } from '../types';
import { ExportIcon } from './icons/Icons';

interface TransactionsViewProps {
  transactions: Transaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {

  const handleExport = () => {
    let csvContent = "data:text/csv;charset=utf-8,Date,Description,Amount,Type,Category\n";
    transactions.forEach(row => {
        const date = new Date(row.date).toLocaleDateString();
        // Ensure description with commas is handled correctly
        const description = `"${row.description.replace(/"/g, '""')}"`;
        csvContent += `${date},${description},${row.amount},${row.type},${row.category}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "financial_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
        <button
          onClick={handleExport}
          className="bg-secondary text-on-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition flex items-center"
        >
          <ExportIcon />
          <span className="ml-2">Export to CSV</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 font-semibold text-gray-600">Date</th>
              <th className="py-2 px-4 font-semibold text-gray-600">Description</th>
              <th className="py-2 px-4 font-semibold text-gray-600">Category</th>
              <th className="py-2 px-4 font-semibold text-gray-600 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-500">{formatDate(t.date)}</td>
                <td className="py-3 px-4 text-gray-800 font-medium">{t.description}</td>
                <td className="py-3 px-4">
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{t.category}</span>
                </td>
                <td className={`py-3 px-4 font-semibold text-right ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
