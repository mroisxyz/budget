// Ledgerhome router — authored draft final

import {
  transactions as seedTransactions,
  budgets as seedBudgets,
  goals as seedGoals,
  upcomingBills as seedBills,
} from './data.js';
import {
  renderDashboard, renderTransactions, renderBudgets, renderGoals, renderReports,
} from './views.js';

const STORAGE_KEY = 'ledgerhome:v1';

const ROUTES = {
  '/': renderDashboard,
  '/transactions': renderTransactions,
  '/budgets': renderBudgets,
  '/goals': renderGoals,
  '/reports': renderReports,
};

const ui = {
  search: '',
  category: '',
  type: '',
  sortKey: 'date',
  sortDir: 'desc',
};

let idSequence = 0;

function freshState() {
  return {
    transactions: seedTransactions.map((tx) => ({ ...tx })),
    budgets: seedBudgets.map((budget) => ({ ...budget })),
    goals: seedGoals.map((goal) => ({ ...goal, trend: [...goal.trend] })),
    upcomingBills: seedBills.map((bill) => ({ ...bill })),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.transactions) && Array.isArray(saved.budgets) && Array.isArray(saved.goals)) {
        return {
          transactions: saved.transactions,
          budgets: saved.budgets,
          goals: saved.goals,
          upcomingBills: Array.isArray(saved.upcomingBills) ? saved.upcomingBills : seedBills.map((bill) => ({ ...bill })),
        };
      }
    }
  } catch (_) {
    // Storage is optional; the in-memory ledger is the source of truth.
  }
  return freshState();
}

let state = loadState();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    // Private browsing or blocked storage: changes still live in memory.
  }
}

function resetState() {
  state = freshState();
  ui.search = '';
  ui.category = '';
  ui.type = '';
  ui.sortKey = 'date';
  ui.sortDir = 'desc';
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    // Nothing to clear when storage is unavailable.
  }
  if (getRoute() !== '/') location.hash = '#/';
  else render();
}

function getRoute() {
  const raw = String(location.hash || '').replace(/^#/, '') || '/';
  return Object.prototype.hasOwnProperty.call(ROUTES, raw) ? raw : '/';
}

function makeId() {
  idSequence += 1;
  return `tx-new-${Date.now().toString(36)}-${idSequence}`;
}

function render() {
  const active = document.activeElement;
  const activeId = active && active.id ? active.id : '';
  let start = null;
  let end = null;
  if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
    try {
      start = active.selectionStart;
      end = active.selectionEnd;
    } catch (_) {
      // Some input types do not expose a selection range.
    }
  }

  const route = getRoute();
  const view = document.getElementById('view');
  view.innerHTML = (ROUTES[route] || ROUTES['/'])(state, ui);

  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('data-nav') === route);
  });

  if (activeId) {
    const restored = document.getElementById(activeId);
    if (restored) {
      restored.focus();
      if (start !== null && typeof restored.setSelectionRange === 'function') {
        try {
          restored.setSelectionRange(start, end);
        } catch (_) {
          // Selection restoration is a nicety, not a requirement.
        }
      }
    }
  }
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  const reset = target.closest('[data-action="reset"]');
  if (reset) {
    resetState();
    return;
  }

  const sort = target.closest('[data-sort]');
  if (sort) {
    const key = sort.getAttribute('data-sort');
    if (ui.sortKey === key) {
      ui.sortDir = ui.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      ui.sortKey = key;
      ui.sortDir = key === 'date' ? 'desc' : 'asc';
    }
    render();
    return;
  }

  const remove = target.closest('[data-delete]');
  if (remove) {
    const id = remove.getAttribute('data-delete');
    state.transactions = state.transactions.filter((tx) => tx.id !== id);
    persist();
    render();
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'tx-search') {
    ui.search = event.target.value;
    render();
  }
});

document.addEventListener('change', (event) => {
  const element = event.target;
  if (element.id === 'tx-category') {
    ui.category = element.value;
    render();
    return;
  }
  if (element.id === 'tx-type') {
    ui.type = element.value;
    render();
    return;
  }
  if (element.matches && element.matches('[data-limit-id]')) {
    const budget = state.budgets.find((item) => item.id === element.getAttribute('data-limit-id'));
    const value = Number(element.value);
    if (budget && Number.isFinite(value) && value >= 0) {
      budget.limit = value;
      persist();
      render();
    }
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target;

  if (form.id === 'add-transaction-form') {
    event.preventDefault();
    const data = new FormData(form);
    const amount = Math.abs(Number(data.get('amount')) || 0);
    const payee = String(data.get('payee') || '').trim();
    if (!amount || !payee) return;
    state.transactions.push({
      id: makeId(),
      date: String(data.get('date') || '2026-11-30'),
      payee,
      category: String(data.get('category') || 'Other'),
      amount,
      type: data.get('type') === 'income' ? 'income' : 'expense',
      notes: String(data.get('notes') || '').trim(),
    });
    persist();
    render();
    return;
  }

  if (form.id === 'goal-contribute-form') {
    event.preventDefault();
    const data = new FormData(form);
    const goal = state.goals.find((item) => item.id === data.get('goalId'));
    const amount = Math.abs(Number(data.get('amount')) || 0);
    if (!goal || !amount) return;
    goal.saved += amount;
    if (goal.trend.length) goal.trend[goal.trend.length - 1] = goal.saved;
    persist();
    render();
  }
});

window.addEventListener('hashchange', render);

render();
