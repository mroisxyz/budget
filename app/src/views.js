// Ledgerhome views — authored draft final

import {
  money, monthLabel, categoryColor, categories, history,
  summarizeTransactions, spendByCategory, summarizeBudgets,
  sumSaved, sumTargets,
} from './data.js';
import { donutChart, barChart, lineChart } from './charts.js';

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[ch]));
}

const e = escapeHtml;
const MONTH_LABELS = history.map((row) => row.month);

function head(eyebrow, title, sub, aside = '') {
  return `<div class="view-head">
    <div>
      <p class="eyebrow">${e(eyebrow)}</p>
      <h1 class="page-title">${e(title)}</h1>
      <p class="page-sub">${e(sub)}</p>
    </div>
    ${aside ? `<div class="head-aside">${aside}</div>` : ''}
  </div>`;
}

function percentChange(current, previous) {
  if (!previous) return { text: 'new', cls: 'flat' };
  const diff = ((current - previous) / previous) * 100;
  return {
    text: `${diff >= 0 ? '↑' : '↓'} ${Math.abs(diff).toFixed(1)}%`,
    cls: diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat',
  };
}

function metric(label, value, foot, accent) {
  return `<article class="card metric" style="--accent:${accent}">
    <p class="metric-label">${e(label)}</p>
    <p class="metric-value">${e(value)}</p>
    <p class="metric-foot">${foot}</p>
  </article>`;
}

function legendItem(color, label, value) {
  return `<span class="legend-item"><i class="swatch" style="background:${e(color)}"></i>${e(label)} <b>${e(value)}</b></span>`;
}

export function renderDashboard(state) {
  const sums = summarizeTransactions(state.transactions);
  const saved = sumSaved(state.goals);
  const spend = spendByCategory(state.transactions);
  const segments = categories
    .filter((cat) => spend[cat.name] > 0)
    .map((cat) => ({ label: cat.name, value: spend[cat.name], color: cat.color }));
  const incomeDelta = percentChange(history[5].income, history[4].income);
  const spendDelta = percentChange(history[5].spending, history[4].spending);
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .slice(0, 6);
  const bills = [...state.upcomingBills].sort((a, b) => a.due.localeCompare(b.due)).slice(0, 4);

  const activity = recent.map((tx) => `<div class="activity-row">
    <i class="act-dot" style="--dot:${categoryColor(tx.category)}"></i>
    <span class="act-main"><strong>${e(tx.payee)}</strong><small>${e(tx.category)} · ${e(monthLabel(tx.date))}</small></span>
    <span class="act-amt ${tx.type === 'income' ? 'income' : 'expense'}">${tx.type === 'income' ? '+' : '−'}${e(money(tx.amount))}</span>
  </div>`).join('');

  const billRows = bills.map((bill) => `<div class="bill">
    <span class="bill-date">${e(monthLabel(bill.due))}</span>
    <span class="bill-name">${e(bill.name)}<small>${e(bill.category)}</small></span>
    <strong>${e(money(bill.amount))}</strong>
  </div>`).join('');

  return `${head('November 2026 · household ledger', 'A quieter month, on purpose',
    'Income, spending and savings for Mara, Eli and Jo — all reconciled.',
    `<span class="live-pill"><i></i> 20 entries recorded</span>`)}
  <div class="grid metrics">
    ${metric('Money in', money(sums.income), `<span class="delta ${incomeDelta.cls}">${incomeDelta.text}</span> vs October`, 'var(--teal)')}
    ${metric('Money out', money(sums.expense), `<span class="delta ${spendDelta.cls}">${spendDelta.text}</span> vs October`, 'var(--amber)')}
    ${metric('Left to allocate', money(sums.net), 'After all recorded expenses', '#7aa6dd')}
    ${metric('Saved so far', money(saved), `Across ${state.goals.length} household goals`, '#b493dd')}
  </div>

  <div class="grid two-col section-headless" style="margin-top:18px">
    <section class="card">
      <div class="card-head"><div><h2 class="card-title">Where it went</h2><p class="card-sub">November spending by category</p></div></div>
      <div class="donut-layout">
        <div class="chart-wrap">${donutChart(segments, { centerLabel: money(sums.expense), centerSub: 'SPENT', size: 220 })}</div>
        <div class="chart-legend">${segments.map((seg) => legendItem(seg.color, seg.label, money(seg.value))).join('')}</div>
      </div>
    </section>
    <section class="card">
      <div class="card-head"><div><h2 class="card-title">Six-month cash flow</h2><p class="card-sub">Income against spending, June to November</p></div></div>
      <div class="chart-wrap">${barChart(history.map((row) => ({ label: row.month, income: row.income, expense: row.spending })))}</div>
      <div class="chart-legend">${legendItem('#2ec2ac', 'Income', 'teal')}${legendItem('#f0b45b', 'Spending', 'amber')}</div>
    </section>
  </div>

  <div class="grid two-col" style="margin-top:18px">
    <section class="card">
      <div class="card-head"><div><h2 class="card-title">Upcoming bills</h2><p class="card-sub">Next charges on the calendar</p></div></div>
      <div class="bills">${billRows}</div>
    </section>
    <section class="card">
      <div class="card-head"><div><h2 class="card-title">Recent activity</h2><p class="card-sub">Latest entries across all accounts</p></div><a class="link-btn" href="#/transactions">View all</a></div>
      <div class="activity">${activity}</div>
    </section>
  </div>`;
}

export function renderTransactions(state, ui) {
  const allCategories = [...new Set([
    ...categories.map((cat) => cat.name),
    ...state.transactions.map((tx) => tx.category),
  ])].sort();
  const formCategories = [...new Set([...allCategories, 'Salary', 'Freelance', 'Rental'])].sort();
  const query = ui.search.trim().toLowerCase();
  const filtered = state.transactions.filter((tx) => {
    const matchesQuery = !query
      || tx.payee.toLowerCase().includes(query)
      || tx.category.toLowerCase().includes(query)
      || String(tx.notes || '').toLowerCase().includes(query);
    const matchesCategory = !ui.category || tx.category === ui.category;
    const matchesType = !ui.type || tx.type === ui.type;
    return matchesQuery && matchesCategory && matchesType;
  });
  const direction = ui.sortDir === 'asc' ? 1 : -1;
  const key = ui.sortKey;
  filtered.sort((a, b) => {
    const av = key === 'amount' ? Number(a[key]) || 0 : String(a[key]).toLowerCase();
    const bv = key === 'amount' ? Number(b[key]) || 0 : String(b[key]).toLowerCase();
    if (av < bv) return -direction;
    if (av > bv) return direction;
    return 0;
  });
  const totals = summarizeTransactions(filtered);
  const arrow = (name) => ui.sortKey === name ? (ui.sortDir === 'asc' ? '▲' : '▼') : '↕';

  const rows = filtered.map((tx) => `<tr>
    <td>${e(monthLabel(tx.date))}</td>
    <td><strong>${e(tx.payee)}</strong></td>
    <td><span class="cat-cell"><i class="cat-dot" style="--dot:${categoryColor(tx.category)}"></i>${e(tx.category)}</span></td>
    <td><span class="tag tag-${tx.type}">${e(tx.type)}</span></td>
    <td class="num ${tx.type === 'income' ? 'positive' : ''}">${tx.type === 'income' ? '+' : '−'}${e(money(tx.amount))}</td>
    <td class="note-cell">${e(tx.notes || '—')}</td>
    <td class="num"><button type="button" class="btn btn-danger btn-sm" data-delete="${e(tx.id)}" aria-label="Delete ${e(tx.payee)}">Delete</button></td>
  </tr>`).join('');

  return `${head('Ledger', 'Transactions', 'Search, filter and reconcile every household entry.',
    `${state.transactions.length} entries this month`)}
  <section class="card">
    <div class="toolbar">
      <label class="search-box"><span aria-hidden="true">⌕</span><input id="tx-search" type="search" placeholder="Search payee, category or note" value="${e(ui.search)}" /></label>
      <select id="tx-category" aria-label="Filter by category"><option value="">All categories</option>${allCategories.map((cat) => `<option value="${e(cat)}"${ui.category === cat ? ' selected' : ''}>${e(cat)}</option>`).join('')}</select>
      <select id="tx-type" aria-label="Filter by type"><option value="">All types</option><option value="income"${ui.type === 'income' ? ' selected' : ''}>Income</option><option value="expense"${ui.type === 'expense' ? ' selected' : ''}>Expense</option></select>
      <span class="result-count">${filtered.length} of ${state.transactions.length} shown</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th><button type="button" class="sort-btn" data-sort="date">Date ${arrow('date')}</button></th>
          <th><button type="button" class="sort-btn" data-sort="payee">Payee ${arrow('payee')}</button></th>
          <th><button type="button" class="sort-btn" data-sort="category">Category ${arrow('category')}</button></th>
          <th>Type</th>
          <th class="num"><button type="button" class="sort-btn" data-sort="amount">Amount ${arrow('amount')}</button></th>
          <th>Note</th>
          <th class="num">Action</th>
        </tr></thead>
        <tbody>${rows || `<tr><td colspan="7" class="empty">No entries match these filters.</td></tr>`}</tbody>
        <tfoot><tr>
          <td colspan="4">Filtered totals</td>
          <td class="num"><span class="positive">+${e(money(totals.income))}</span> / <span class="negative">−${e(money(totals.expense))}</span></td>
          <td colspan="2" class="num ${totals.net >= 0 ? 'positive' : 'negative'}">Net ${e(money(totals.net))}</td>
        </tr></tfoot>
      </table>
    </div>
  </section>

  <div class="section-head"><h2>Add an entry</h2><span class="head-aside">Kept in memory for this session</span></div>
  <section class="card">
    <form id="add-transaction-form" class="form-grid">
      <label class="field"><span>Date</span><input type="date" name="date" value="2026-11-28" required /></label>
      <label class="field"><span>Payee</span><input type="text" name="payee" placeholder="e.g. Greenfield Market" required /></label>
      <label class="field"><span>Category</span><select name="category">${formCategories.map((cat) => `<option value="${e(cat)}">${e(cat)}</option>`).join('')}</select></label>
      <label class="field"><span>Type</span><select name="type"><option value="expense">Expense</option><option value="income">Income</option></select></label>
      <label class="field"><span>Amount</span><input type="number" name="amount" min="0" step="0.01" placeholder="0.00" required /></label>
      <label class="field field-wide"><span>Note</span><input type="text" name="notes" placeholder="Optional detail" /></label>
      <div class="form-actions"><button type="submit" class="btn btn-primary">Add transaction</button></div>
    </form>
  </section>`;
}

export function renderBudgets(state) {
  const summary = summarizeBudgets(state.budgets);
  const cards = state.budgets.map((budget) => {
    const pct = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
    const left = budget.limit - budget.spent;
    return `<article class="card budget-card">
      <div class="card-head">
        <div><h3 class="card-title">${e(budget.category)}</h3><p class="card-sub">${e(money(budget.spent))} of ${e(money(budget.limit))} planned</p></div>
        <i class="cat-dot" style="--dot:${categoryColor(budget.category)}"></i>
      </div>
      <div class="progress${left < 0 ? ' is-over' : ''}"><span style="width:${Math.min(pct, 100)}%"></span></div>
      <div class="budget-meta"><span>${pct.toFixed(0)}% used</span><span class="${left < 0 ? 'negative' : 'positive'}">${left < 0 ? `${e(money(Math.abs(left)))} over` : `${e(money(left))} left`}</span></div>
      <label class="field limit-field"><span>Monthly limit</span><input type="number" min="0" step="10" value="${budget.limit}" data-limit-id="${e(budget.id)}" aria-label="Monthly limit for ${e(budget.category)}" /></label>
    </article>`;
  }).join('');

  return `${head('Plan', 'Budgets', 'Seven envelopes with limits you can adjust in place.',
    `Planning ${e(money(summary.limit))} total`)}
  <section class="card">
    <div class="summary-strip">
      <div><span>Total planned</span><strong>${e(money(summary.limit))}</strong></div>
      <div><span>Spent to date</span><strong>${e(money(summary.spent))}</strong></div>
      <div><span>Headroom</span><strong class="${summary.headroom < 0 ? 'negative' : 'positive'}">${e(money(summary.headroom))}</strong></div>
      <div><span>Envelopes</span><strong>${state.budgets.length}</strong></div>
    </div>
  </section>
  <div class="grid goal-grid" style="margin-top:18px">${cards}</div>`;
}

export function renderGoals(state) {
  const saved = sumSaved(state.goals);
  const targets = sumTargets(state.goals);
  const overall = targets > 0 ? (saved / targets) * 100 : 0;
  const cards = state.goals.map((goal) => {
    const pct = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
    const color = categoryColor(goal.name);
    return `<article class="card goal-card">
      <div class="card-head"><div><h3 class="card-title">${e(goal.name)}</h3><p class="card-sub">${e(goal.note)}</p></div><i class="cat-dot" style="--dot:${e(color)}"></i></div>
      <div class="goal-figure"><strong>${e(money(goal.saved))}</strong><span>of ${e(money(goal.target))}</span></div>
      <div class="progress"><span style="width:${Math.min(pct, 100)}%"></span></div>
      <div class="goal-meta"><span>${pct.toFixed(1)}% funded</span><span>Target ${e(monthLabel(goal.due))}</span></div>
      <div class="chart-wrap">${lineChart([{ name: goal.name, color, values: goal.trend }], { labels: MONTH_LABELS, width: 420, height: 118, ariaLabel: `${goal.name} savings trend` })}</div>
    </article>`;
  }).join('');

  return `${head('Savings', 'Goals', 'Three shared targets, tracked month by month.',
    `${overall.toFixed(1)}% of total target`)}
  <section class="card">
    <div class="summary-strip">
      <div><span>Total saved</span><strong class="positive">${e(money(saved))}</strong></div>
      <div><span>Total target</span><strong>${e(money(targets))}</strong></div>
      <div><span>Remaining</span><strong>${e(money(Math.max(0, targets - saved)))}</strong></div>
      <div><span>Goals</span><strong>${state.goals.length}</strong></div>
    </div>
  </section>
  <div class="grid goal-grid" style="margin-top:18px">${cards}</div>

  <div class="section-head"><h2>Add a contribution</h2><span class="head-aside">Updates the current month point</span></div>
  <section class="card">
    <form id="goal-contribute-form" class="form-grid">
      <label class="field"><span>Goal</span><select name="goalId">${state.goals.map((goal) => `<option value="${e(goal.id)}">${e(goal.name)}</option>`).join('')}</select></label>
      <label class="field"><span>Amount</span><input type="number" name="amount" min="0" step="0.01" placeholder="0.00" required /></label>
      <div class="form-actions"><button type="submit" class="btn btn-primary">Contribute</button></div>
    </form>
  </section>`;
}

export function renderReports(state) {
  const rows = history.map((row) => {
    const net = row.income - row.spending;
    const rate = row.income > 0 ? (net / row.income) * 100 : 0;
    return `<tr>
      <td><strong>${e(row.month)} 2026</strong></td>
      <td class="num positive">${e(money(row.income))}</td>
      <td class="num">${e(money(row.spending))}</td>
      <td class="num ${net >= 0 ? 'positive' : 'negative'}">${e(money(net))}</td>
      <td class="num">${rate.toFixed(1)}%</td>
    </tr>`;
  }).join('');

  const spend = spendByCategory(state.transactions);
  const budgetMap = Object.fromEntries(state.budgets.map((b) => [b.category, b.limit]));
  const breakdown = categories.map((cat) => {
    const amount = spend[cat.name] || 0;
    const limit = budgetMap[cat.name] || 0;
    const share = history[5].spending > 0 ? (amount / history[5].spending) * 100 : 0;
    const variance = limit - amount;
    return `<tr>
      <td><span class="cat-cell"><i class="cat-dot" style="--dot:${e(cat.color)}"></i>${e(cat.name)}</span></td>
      <td class="num">${e(money(amount))}</td>
      <td class="num">${share.toFixed(1)}%</td>
      <td class="num">${e(money(limit))}</td>
      <td class="num ${variance >= 0 ? 'positive' : 'negative'}">${e(money(variance))}</td>
    </tr>`;
  }).join('');

  const goalSeries = state.goals.map((goal) => ({ name: goal.name, color: categoryColor(goal.name), values: goal.trend }));

  return `${head('Review', 'Reports', 'Six months of cash flow and a category deep-dive.',
    'June — November 2026')}
  <div class="grid report-grid">
    <section class="card">
      <div class="card-head"><div><h2 class="card-title">Monthly cash flow</h2><p class="card-sub">Income, spending and the resulting surplus</p></div></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Month</th><th class="num">Income</th><th class="num">Spending</th><th class="num">Net</th><th class="num">Save rate</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </section>
    <section class="card">
      <div class="card-head"><div><h2 class="card-title">Savings trajectory</h2><p class="card-sub">Goal balances over six months</p></div></div>
      <div class="chart-wrap">${lineChart(goalSeries, { labels: MONTH_LABELS, width: 480, height: 250, ariaLabel: 'Savings goals trend for six months' })}</div>
      <div class="chart-legend">${state.goals.map((goal) => legendItem(categoryColor(goal.name), goal.name, '')).join('')}</div>
    </section>
  </div>

  <div class="section-head"><h2>Category breakdown</h2><span class="head-aside">November actuals against plan</span></div>
  <section class="card">
    <div class="table-wrap"><table class="breakdown">
      <thead><tr><th>Category</th><th class="num">Spent</th><th class="num">Share</th><th class="num">Budget</th><th class="num">Variance</th></tr></thead>
      <tbody>${breakdown}</tbody>
    </table></div>
  </section>`;
}
