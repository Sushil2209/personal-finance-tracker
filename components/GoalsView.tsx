
import React, { useState } from 'react';
import { SavingsGoal } from '../types';

interface GoalsViewProps {
  goals: SavingsGoal[];
  onAddGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
}

const GoalProgressBar: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      <div className="bg-secondary h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export const GoalsView: React.FC<GoalsViewProps> = ({ goals, onAddGoal }) => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(targetAmount);
    if (goalName.trim() && amount > 0) {
      onAddGoal({ goalName: goalName.trim(), targetAmount: amount });
      setGoalName('');
      setTargetAmount('');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-surface p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Savings Goal</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="goalName" className="block text-sm font-medium text-gray-700">Goal Name</label>
            <input
              type="text"
              id="goalName"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="e.g., New Laptop"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700">Target Amount ($)</label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="1500"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              min="0"
              step="0.01"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition">
            Add Goal
          </button>
        </form>
      </div>

      <div className="md:col-span-2 bg-surface p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Savings Goals</h2>
        <div className="space-y-6">
          {goals.map(goal => (
            <div key={goal.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{goal.goalName}</span>
                <span className="text-sm text-gray-600">
                  ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                </span>
              </div>
              <GoalProgressBar value={goal.currentAmount} max={goal.targetAmount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
