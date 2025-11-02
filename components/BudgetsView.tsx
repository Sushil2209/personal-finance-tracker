
import React, { useState } from 'react';
import { Budget, CATEGORIES } from '../types';

interface BudgetsViewProps {
  budgets: Budget[];
  onAddBudget: (budget: Omit<Budget, 'id'>) => void;
  monthlyExpensesByCategory: { [key: string]: number };
}

const ProgressBar: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const colorClass = percentage > 100 ? 'bg-red-500' : percentage > 75 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${Math.min(percentage, 100)}%` }}></div>
    </div>
  );
};

export const BudgetsView: React.FC<BudgetsViewProps> = ({ budgets, onAddBudget, monthlyExpensesByCategory }) => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [limit, setLimit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limitAmount = parseFloat(limit);
    if (category && limitAmount > 0) {
      onAddBudget({ category, limit: limitAmount });
      setLimit('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-surface p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Budget</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
              {CATEGORIES.filter(c => c !== 'Income').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Limit ($)</label>
            <input
              type="number"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="500"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              min="0"
              step="0.01"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition">
            Add Budget
          </button>
        </form>
      </div>

      <div className="md:col-span-2 bg-surface p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Budgets</h2>
        <div className="space-y-4">
          {budgets.map(budget => {
            const spent = monthlyExpensesByCategory[budget.category] || 0;
            return (
              <div key={budget.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{budget.category}</span>
                  <span className="text-sm text-gray-600">
                    ${spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                  </span>
                </div>
                <ProgressBar value={spent} max={budget.limit} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
