// Ledgerhome data — hello batch orders slot — authored draft final

export const members = [
  { name: 'Mara', role: 'Operations lead', initials: 'M', income: 6200 },
  { name: 'Eli', role: 'Freelance designer', initials: 'E', income: 1800 },
  { name: 'Jo', role: 'Student & saver', initials: 'J', income: 0 },
];

export const incomeEntries = [
  { id: 'inc-1', date: '2026-11-01', source: 'Salary', payee: 'Northline Studio', member: 'Mara', amount: 6200, notes: 'Monthly salary, deposited on the first.' },
  { id: 'inc-2', date: '2026-11-15', source: 'Freelance', payee: 'Brightside Studio', member: 'Eli', amount: 1800, notes: 'Two brand illustration commissions.' },
  { id: 'inc-3', date: '2026-11-20', source: 'Rental', payee: 'Harbor Properties', member: 'Household', amount: 420, notes: 'South room sublet, November.' },
];

export const categories = [
  { name: 'Housing', color: '#2ec2ac' },
  { name: 'Groceries', color: '#f0b45b' },
  { name: 'Utilities', color: '#7aa6dd' },
  { name: 'Transport', color: '#b493dd' },
  { name: 'Dining & Coffee', color: '#e88377' },
  { name: 'Health', color: '#5bc9a9' },
  { name: 'Fun & Learning', color: '#d8a259' },
];

export const transactions = [
  { id: 't01', date: '2026-11-01', payee: 'Northline Studio', category: 'Salary', amount: 6200, type: 'income', notes: 'Mara · November salary' },
  { id: 't02', date: '2026-11-01', payee: 'Harbor Properties', category: 'Housing', amount: 2100, type: 'expense', notes: 'November rent' },
  { id: 't03', date: '2026-11-02', payee: 'City Transit', category: 'Transport', amount: 120, type: 'expense', notes: 'Monthly metro passes' },
  { id: 't04', date: '2026-11-03', payee: 'Greenfield Market', category: 'Groceries', amount: 520, type: 'expense', notes: 'Weekly shop and pantry restock' },
  { id: 't05', date: '2026-11-04', payee: 'Streamly', category: 'Fun & Learning', amount: 64, type: 'expense', notes: 'Family streaming bundle' },
  { id: 't06', date: '2026-11-05', payee: 'Willow Insurance', category: 'Housing', amount: 150, type: 'expense', notes: 'Home contents insurance' },
  { id: 't07', date: '2026-11-06', payee: 'City Power & Water', category: 'Utilities', amount: 236, type: 'expense', notes: 'Electric, water and refuse' },
  { id: 't08', date: '2026-11-07', payee: 'Cedar Pharmacy', category: 'Health', amount: 348, type: 'expense', notes: 'Prescriptions and dental copay' },
  { id: 't09', date: '2026-11-08', payee: 'The Copper Kettle', category: 'Dining & Coffee', amount: 158, type: 'expense', notes: 'Sunday family brunch' },
  { id: 't10', date: '2026-11-09', payee: 'Fiberline + Vox', category: 'Utilities', amount: 176, type: 'expense', notes: 'Internet and mobile plans' },
  { id: 't11', date: '2026-11-12', payee: 'Corner Cafe', category: 'Dining & Coffee', amount: 280, type: 'expense', notes: 'Coffee and weekday takeout' },
  { id: 't12', date: '2026-11-15', payee: 'Brightside Studio', category: 'Freelance', amount: 1800, type: 'income', notes: 'Eli · two illustrations' },
  { id: 't13', date: '2026-11-14', payee: 'Fuel Stop 7', category: 'Transport', amount: 214, type: 'expense', notes: 'Fuel and parking' },
  { id: 't14', date: '2026-11-16', payee: 'Corner Grocer & Farm Stand', category: 'Groceries', amount: 448, type: 'expense', notes: 'Produce and household basics' },
  { id: 't15', date: '2026-11-18', payee: 'Pages & Plates', category: 'Fun & Learning', amount: 322, type: 'expense', notes: 'Books and museum tickets' },
  { id: 't16', date: '2026-11-20', payee: 'Ridealong + Bike Works', category: 'Transport', amount: 222, type: 'expense', notes: 'Rideshares and bike tune-up' },
  { id: 't17', date: '2026-11-20', payee: 'Harbor Properties', category: 'Rental', amount: 420, type: 'income', notes: 'South room sublet' },
  { id: 't18', date: '2026-11-21', payee: 'Nori House', category: 'Dining & Coffee', amount: 190, type: 'expense', notes: 'Neighborhood dinner' },
  { id: 't19', date: '2026-11-25', payee: 'Riverbend Fitness', category: 'Health', amount: 126, type: 'expense', notes: 'Gym membership' },
  { id: 't20', date: '2026-11-27', payee: 'The Orchard Stage', category: 'Fun & Learning', amount: 240, type: 'expense', notes: 'Concert tickets, two seats' },
];

export const budgets = [
  { id: 'b-housing', category: 'Housing', limit: 2400, spent: 2250 },
  { id: 'b-groceries', category: 'Groceries', limit: 1050, spent: 968 },
  { id: 'b-utilities', category: 'Utilities', limit: 480, spent: 412 },
  { id: 'b-transport', category: 'Transport', limit: 600, spent: 556 },
  { id: 'b-dining', category: 'Dining & Coffee', limit: 650, spent: 628 },
  { id: 'b-health', category: 'Health', limit: 550, spent: 474 },
  { id: 'b-fun', category: 'Fun & Learning', limit: 700, spent: 626 },
];

export const goals = [
  {
    id: 'g-emergency', name: 'Emergency Fund', target: 15000, saved: 11250,
    due: '2027-06-30', note: 'Six months of core expenses',
    trend: [8600, 9200, 9800, 10300, 10800, 11250],
  },
  {
    id: 'g-home', name: 'Home Down Payment', target: 40000, saved: 18600,
    due: '2029-12-31', note: 'Shared long-horizon goal',
    trend: [14200, 15100, 16000, 16900, 17750, 18600],
  },
  {
    id: 'g-trip', name: 'Family Trip · Kyoto', target: 8000, saved: 3240,
    due: '2027-04-15', note: 'Spring break, three tickets',
    trend: [1900, 2150, 2400, 2650, 2950, 3240],
  },
];

export const history = [
  { month: 'Jun', income: 7900, spending: 5680 },
  { month: 'Jul', income: 8120, spending: 6120 },
  { month: 'Aug', income: 7980, spending: 5490 },
  { month: 'Sep', income: 8260, spending: 6340 },
  { month: 'Oct', income: 8340, spending: 5810 },
  { month: 'Nov', income: 8420, spending: 5914 },
];

export const upcomingBills = [
  { id: 'u1', name: 'Rent', category: 'Housing', due: '2026-12-01', amount: 2100 },
  { id: 'u2', name: 'Metro passes', category: 'Transport', due: '2026-12-02', amount: 120 },
  { id: 'u3', name: 'Power & water', category: 'Utilities', due: '2026-12-05', amount: 240 },
  { id: 'u4', name: 'Internet & mobile', category: 'Utilities', due: '2026-12-09', amount: 176 },
  { id: 'u5', name: 'Gym membership', category: 'Health', due: '2026-12-25', amount: 126 },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function money(value, decimals = 0) {
  const n = Number(value) || 0;
  return '$' + n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function monthLabel(iso) {
  const parts = String(iso || '').split('-');
  const month = MONTHS[Number(parts[1]) - 1] || '';
  const day = Number(parts[2]) || 0;
  return month ? `${month} ${day}` : String(iso || '');
}

export function categoryColor(name) {
  const found = categories.find((c) => c.name === name);
  return found ? found.color : '#8aa9b8';
}

export function summarizeTransactions(list = []) {
  let income = 0;
  let expense = 0;
  for (const tx of list) {
    const amount = Math.abs(Number(tx.amount) || 0);
    if (tx.type === 'income') income += amount;
    else expense += amount;
  }
  return { income, expense, net: income - expense };
}

export function spendByCategory(list = []) {
  const result = {};
  for (const tx of list) {
    if (tx.type !== 'expense') continue;
    const key = tx.category || 'Other';
    result[key] = (result[key] || 0) + (Math.abs(Number(tx.amount)) || 0);
  }
  return result;
}

export function summarizeBudgets(list = []) {
  let limit = 0;
  let spent = 0;
  for (const b of list) {
    limit += Math.max(0, Number(b.limit) || 0);
    spent += Math.max(0, Number(b.spent) || 0);
  }
  return { limit, spent, headroom: limit - spent };
}

export function sumSaved(list = []) {
  return list.reduce((total, g) => total + Math.max(0, Number(g.saved) || 0), 0);
}

export function sumTargets(list = []) {
  return list.reduce((total, g) => total + Math.max(0, Number(g.target) || 0), 0);
}
