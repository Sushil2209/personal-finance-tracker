
import React, { useState, useMemo } from 'react';
import { Transaction, SavingsGoal } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AIBrainIcon, SummaryIcon } from './icons/Icons';

interface DashboardProps {
  transactions: Transaction[];
  savingsGoals: SavingsGoal[];
  onAiAddTransaction: (text: string) => Promise<void>;
  onGenerateSummary: () => void;
  isAiLoading: boolean;
  aiError: string | null;
}

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];

export const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  savingsGoals,
  onAiAddTransaction,
  onGenerateSummary,
  isAiLoading,
  aiError,
}) => {
  const [naturalInput, setNaturalInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (naturalInput.trim()) {
      onAiAddTransaction(naturalInput).then(() => {
        setNaturalInput('');
      });
    }
  };

  const { incomeVsExpenseData, expenseBreakdownData } = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    const income = monthlyTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = monthlyTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const expenseByCategory = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as {[key: string]: number});

    return {
      incomeVsExpenseData: [{ name: 'This Month', income, expense }],
      expenseBreakdownData: Object.entries(expenseByCategory).map(([name, value]) => ({ name, value })),
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* AI Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AIBrainIcon />
            <span className="ml-2">Add Transaction with AI</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
              placeholder="e.g., 'groceries for 56.50 at Trader Joe's'"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
              disabled={isAiLoading}
            />
            {aiError && <p className="text-red-500 text-sm">{aiError}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center disabled:bg-opacity-50"
              disabled={isAiLoading || !naturalInput.trim()}
            >
              {isAiLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Add Transaction'
              )}
            </button>
          </form>
        </div>
        <div className="bg-surface p-6 rounded-lg shadow-sm flex flex-col justify-center">
           <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <SummaryIcon />
            <span className="ml-2">Financial Report</span>
          </h2>
          <p className="text-gray-600 mb-4">Get an AI-generated summary of your spending habits and personalized advice.</p>
           <button
            onClick={onGenerateSummary}
            className="w-full bg-secondary text-on-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center disabled:bg-opacity-50"
            disabled={isAiLoading}
          >
            {isAiLoading ? 'Generating...' : 'Get My Weekly AI Summary'}
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs. Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeVsExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
