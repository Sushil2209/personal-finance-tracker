
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TransactionsView } from './components/TransactionsView';
import { BudgetsView } from './components/BudgetsView';
import { GoalsView } from './components/GoalsView';
import { Transaction, Budget, SavingsGoal, View } from './types';
import { useMockData } from './hooks/useMockData';
import { parseTransactionFromText, generateWeeklySummary } from './services/geminiService';
import { Modal } from './components/Modal';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const {
    transactions,
    addTransaction,
    budgets,
    addBudget,
    savingsGoals,
    addSavingsGoal,
  } = useMockData();

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

  const handleAiAddTransaction = async (text: string) => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const parsedData = await parseTransactionFromText(text);
      const newTransaction: Transaction = {
        id: `trans-${Date.now()}`,
        date: new Date().toISOString(),
        description: parsedData.description,
        amount: parsedData.amount,
        type: 'expense',
        category: parsedData.category,
      };
      addTransaction(newTransaction);
    } catch (error) {
      console.error('AI transaction parsing failed:', error);
      setAiError('Could not understand the transaction. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    setIsAiLoading(true);
    setAiError(null);
    setIsSummaryModalOpen(true);
    setAiSummary('');

    try {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        const recentTransactions = transactions.filter(t => new Date(t.date) > last7Days);

        if(recentTransactions.length === 0) {
            setAiSummary("No transactions in the last 7 days to analyze.");
            return;
        }

        const summary = await generateWeeklySummary(recentTransactions);
        setAiSummary(summary);
    } catch (error) {
        console.error('AI summary generation failed:', error);
        setAiSummary('Sorry, I was unable to generate a summary. Please try again later.');
    } finally {
        setIsAiLoading(false);
    }
  };

  const monthlyExpensesByCategory = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const expenses = transactions.filter(t => {
      const tDate = new Date(t.date);
      return t.type === 'expense' && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });

    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as { [key: string]: number });
    return categoryTotals;
  }, [transactions]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard
          transactions={transactions}
          savingsGoals={savingsGoals}
          onAiAddTransaction={handleAiAddTransaction}
          onGenerateSummary={handleGenerateSummary}
          isAiLoading={isAiLoading}
          aiError={aiError}
        />;
      case 'transactions':
        return <TransactionsView transactions={transactions} />;
      case 'budgets':
        return <BudgetsView
          budgets={budgets}
          onAddBudget={addBudget}
          monthlyExpensesByCategory={monthlyExpensesByCategory}
        />;
      case 'goals':
        return <GoalsView goals={savingsGoals} onAddGoal={addSavingsGoal} />;
      default:
        return <Dashboard
          transactions={transactions}
          savingsGoals={savingsGoals}
          onAiAddTransaction={handleAiAddTransaction}
          onGenerateSummary={handleGenerateSummary}
          isAiLoading={isAiLoading}
          aiError={aiError}
        />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
      <Modal isOpen={isSummaryModalOpen} onClose={() => setIsSummaryModalOpen(false)} title="Your Weekly AI Summary">
        {isAiLoading && !aiSummary && <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}
        {aiSummary && <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{__html: aiSummary.replace(/\n/g, '<br />')}}></div>}
      </Modal>
    </div>
  );
};

export default App;
