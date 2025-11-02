
import { useState } from 'react';
import { Transaction, Budget, SavingsGoal } from '../types';

const initialTransactions: Transaction[] = [
  { id: 't1', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Coffee Shop', amount: 5.75, type: 'expense', category: 'Food' },
  { id: 't2', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), description: 'Monthly Salary', amount: 3000, type: 'income', category: 'Income' },
  { id: 't3', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Gas Bill', amount: 75.20, type: 'expense', category: 'Utilities' },
  { id: 't4', date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), description: 'Groceries', amount: 124.50, type: 'expense', category: 'Food' },
];

const initialBudgets: Budget[] = [
  { id: 'b1', category: 'Food', limit: 500 },
  { id: 'b2', category: 'Entertainment', limit: 200 },
];

const initialSavingsGoals: SavingsGoal[] = [
  { id: 'sg1', goalName: 'New Laptop', targetAmount: 1500, currentAmount: 300 },
  { id: 'sg2', goalName: 'Vacation', targetAmount: 2000, currentAmount: 800 },
];

export const useMockData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(initialSavingsGoals);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = { ...budget, id: `budget-${Date.now()}` };
    setBudgets(prev => [...prev, newBudget]);
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    const newGoal: SavingsGoal = { ...goal, id: `goal-${Date.now()}`, currentAmount: 0 };
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  return {
    transactions,
    addTransaction,
    budgets,
    addBudget,
    savingsGoals,
    addSavingsGoal,
  };
};
