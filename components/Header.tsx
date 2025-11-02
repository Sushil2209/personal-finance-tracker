
import React from 'react';
import { View } from '../types';
import { DashboardIcon, TransactionIcon, BudgetIcon, GoalIcon } from './icons/Icons';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

interface NavItemProps {
  view: View;
  label: string;
  icon: React.ReactNode;
  activeView: View;
  onClick: (view: View) => void;
}

const NavItem: React.FC<NavItemProps> = ({ view, label, icon, activeView, onClick }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => onClick(view)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-primary text-on-primary'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-surface shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">FinanceAI</h1>
          </div>
          <nav className="flex space-x-2 sm:space-x-4">
            <NavItem view="dashboard" label="Dashboard" icon={<DashboardIcon />} activeView={activeView} onClick={setActiveView} />
            <NavItem view="transactions" label="Transactions" icon={<TransactionIcon />} activeView={activeView} onClick={setActiveView} />
            <NavItem view="budgets" label="Budgets" icon={<BudgetIcon />} activeView={activeView} onClick={setActiveView} />
            <NavItem view="goals" label="Goals" icon={<GoalIcon />} activeView={activeView} onClick={setActiveView} />
          </nav>
        </div>
      </div>
    </header>
  );
};
