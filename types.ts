
export type TransactionType = 'income' | 'expense';
export type View = 'dashboard' | 'transactions' | 'budgets' | 'goals';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
}

export interface SavingsGoal {
  id: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
}

export const CATEGORIES = [
    "Food", "Transport", "Housing", "Entertainment", "Utilities", "Shopping", "Health", "Income", "Other"
];
