# Personal Finance & Expense Analytics App

A React-based personal finance management application that helps users track income, expenses, budgets, and visualize their financial data.

## Features

### Transaction Management
- Add, edit, and delete income/expense transactions
- Categorize transactions (Food, Travel, Rent, Shopping, Entertainment, Health, Utilities, Subscriptions, Salary, Investment, Other)
- Mark expenses as recurring
- Search transactions by title or notes
- Filter by category, transaction type, and date range
- Sort by date, amount, or category

### Budget Tracking
- Set monthly budget
- Track spending against budget
- Visual progress bar showing budget usage
- Alerts when exceeding budget

### Analytics Dashboard
- Total income, expenses, and net balance
- Top spending category
- Spending by category (Pie chart)
- Monthly spending trends (Line chart)
- Income vs Expenses comparison (Bar chart)

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Routing**: React Router DOM v7
- **State Management**: Context API
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: React Icons (Font Awesome)
- **Date Handling**: date-fns
- **Currency API**: Exchange Rate API

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── TransactionCard   # Transaction display card
│   ├── SearchBar         # Search input component
│   ├── Filters           # Filter controls
│   ├── BudgetCard        # Budget display card
│   └── Charts            # Recharts visualizations
├── pages/                # Page components
│   ├── Dashboard         # Main dashboard
│   ├── Transactions     # Transaction list
│   ├── AddTransaction   # Add/Edit form
│   ├── Budget           # Budget tracking
│   └── Analytics        # Charts & insights
├── context/              # React Context
│   └── FinanceContext   # Global state management
├── hooks/                # Custom hooks
│   ├── useTransactions  # Transaction CRUD + filtering
│   ├── useBudget        # Budget calculations
│   ├── useCurrency      # Currency conversion
│   └── useDebounce     # Search debouncing
├── services/             # API services
│   └── api.js           # Currency exchange API
├── utils/                # Utility functions
│   └── currencyFormatter.js
├── App.jsx               # Main app with routing
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Routes

| Path | Description |
|------|-------------|
| `/dashboard` | Overview with stats and charts |
| `/transactions` | List all transactions |
| `/transactions/new` | Add new transaction |
| `/transactions/edit/:id` | Edit existing transaction |
| `/budget` | Budget management |
| `/analytics` | Detailed analytics |

## Data Model

### Transaction
```javascript
{
  id: string,
  title: string,
  amount: number,
  category: string,
  type: "income" | "expense",
  date: date,
  notes: string,
  recurring: boolean
}
```

### Budget
```javascript
{
  monthlyBudget: number
}
```

## Custom Hooks

- **useTransactions**: Handles transaction CRUD, search, filtering, and sorting
- **useBudget**: Manages budget state and calculations
- **useCurrency**: Fetches exchange rates and handles currency conversion
- **useDebounce**: Optimizes search performance by debouncing input

## External APIs

- **Currency Exchange API**: `https://api.exchangerate-api.com/v4/latest/USD`
  - Fetches live exchange rates
  - Supports multiple currencies (USD, INR, EUR, GBP, etc.)

## Key Libraries

| Package | Purpose |
|---------|---------|
| react-router-dom | Navigation & routing |
| axios | HTTP requests |
| react-hook-form | Form handling |
| yup | Form validation |
| recharts | Data visualization |
| framer-motion | Animations |
| react-icons | Icon library |
| date-fns | Date formatting |
| uuid | Unique ID generation |
| react-toastify | Toast notifications |

## Design

- Clean, modern UI with card-based layout
- Responsive design for mobile and desktop
- Color-coded categories and transaction types
- Smooth animations using Framer Motion

## Storage

Data is persisted to browser's localStorage:
- `transactions`: Array of transaction objects
- `budget`: Monthly budget setting

