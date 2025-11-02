# 🤖 AI-Powered Personal Finance Tracker

This is a web-based application designed to help users manage their finances effectively. It leverages the power of Google's Gemini API  to provide intelligent features like natural language transaction entry and automated financial summaries.


## ✨ Key Features

* **Transaction Logging:** Easily log income and expenses with customizable categories.
* **Budget Tracking:** Create monthly budgets for different categories (e.g., "Food", "Transport") and monitor your spending against them.
* **Visual Dashboard:** View your financial health at a glance with interactive charts and graphs showing your expense breakdown, income vs. expense, and more.
* **Savings Goals:** Set, track, and manage your savings goals, watching your progress in real-time.
* **Recurring Transactions:** A simple way to manage and log monthly bills and subscriptions.
* **Data Export:** Export your transaction data to a CSV file for your records.

## 🤖 Core AI Features

This project uses the Gemini API to make personal finance smarter:

1.  **Natural Language Transaction Entry:**
    Instead of filling out a complex form, you can add transactions using plain English.
    * **Example:** Typing `"Paid 56.50 for groceries at the store"` will be automatically parsed by the AI into `Amount: 56.50`, `Category: Food`, and `Description: "Groceries at the store"`.

2.  **AI-Powered Financial Summaries:**
    At the click of a button, you can get a weekly or monthly summary of your spending habits. The AI analyzes your transaction data and provides:
    * A short, 1-paragraph summary.
    * Identification of your top 3 spending categories.
    * A simple, actionable piece of advice for the next week.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Database:** Google Firebase (Firestore) - for real-time data storage.
* **AI:** Google Gemini API (from AI Studio)
* **Data Visualization:** [Chart.js](https://www.chartjs.org/) (or your chosen library)

## 🚀 Getting Started

To run this project locally, you will need to:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/[YOUR_REPOSITORY_NAME].git
    cd [YOUR_REPOSITORY_NAME]
    ```

2.  **Set up Firebase:**
    * Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    * Create a new **Firestore Database**.
    * In your project settings, find your web app's configuration object.
    * Create a `config.js` file in the project root and add your Firebase config (make sure `config.js` is in your `.gitignore` file!).
    ```javascript
    // config.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

3.  **Set up Gemini API:**
    * Get your API key from [Google AI Studio](httpsaistudio.google.com/app/apikey).
    * Add this key to your `config.js` file:
    ```javascript
    // config.js (continued)
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
    ```

4.  **Open the application:**
    * Simply open the `index.html` file in your browser.

## 💡 How to Use

1.  **Add a Transaction:** Use the "Quick Add" form or the AI-powered entry box to log your income and expenses.
2.  **Set a Budget:** Navigate to the "Budgets" page to create spending limits.
3.  **Create a Goal:** Go to the "Goals" page to set a target for something you're saving for.
4.  **Check Your Dashboard:** The main dashboard will show all your charts and progress.
5.  **Get AI Insights:** Click the "Get My AI Summary" button to receive a personalized report on your spending habits.
