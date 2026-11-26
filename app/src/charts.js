// Ledgerhome charts — authored draft final

const round = (value) => Math.round(value * 10) / 10;

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[ch]));

function niceMax(raw) {
  const base = Math.max(1, raw);
  const magnitude = Math.pow(10, Math.floor(Math.log10(base)));
  return Math.ceil(base / (magnitude / 2)) * (magnitude / 2);
}

function axisLabel(value) {
  if (value >= 1000) {
    const k = value / 1000;
    return `${Number.isInteger(k) ? k : round(k)}k`;
  }
  return round(value);
}

export function donutChart(segments = [], opts = {}) {
  const size = opts.size || 220;
  const stroke = opts.stroke || 26;
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, seg) => sum + Math.max(0, Number(seg.value) || 0), 0) || 1;
  let offset = 0;

  const rings = segments.map((seg) => {
    const value = Math.max(0, Number(seg.value) || 0);
    const length = (value / total) * circumference;
    const ring = `<circle cx="${cx}" cy="${cy}" r="${round(radius)}" fill="none" stroke="${esc(seg.color || '#2ec2ac')}" stroke-width="${stroke}" stroke-dasharray="${round(length)} ${round(circumference - length)}" stroke-dashoffset="${round(-offset)}"><title>${esc(seg.label || 'Segment')}: ${round(value)}</title></circle>`;
    offset += length;
    return ring;
  }).join('');

  const big = opts.centerLabel || String(total);
  const small = opts.centerSub || 'TOTAL';
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.ariaLabel || 'Donut chart of spending by category')}">
    <circle cx="${cx}" cy="${cy}" r="${round(radius)}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="${stroke}"/>
    <g transform="rotate(-90 ${cx} ${cy})">${rings}</g>
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" dominant-baseline="middle" fill="#eaf3f6" font-size="21" font-weight="700">${esc(big)}</text>
    <text x="${cx}" y="${cy + 18}" text-anchor="middle" dominant-baseline="middle" fill="#9db5c2" font-size="10" letter-spacing="1.4">${esc(small)}</text>
  </svg>`;
}

export function barChart(points = [], opts = {}) {
  const width = opts.width || 560;
  const height = opts.height || 240;
  const pad = { top: 18, right: 12, bottom: 34, left: 46 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const peak = Math.max(1, ...points.flatMap((p) => [Number(p.income) || 0, Number(p.expense) || 0]));
  const max = niceMax(peak);
  const y = (value) => pad.top + plotH - (Math.max(0, Number(value) || 0) / max) * plotH;

  const grid = [0, 0.25, 0.5, 0.75, 1].map((fraction) => {
    const gy = round(pad.top + plotH - fraction * plotH);
    return `<line x1="${pad.left}" y1="${gy}" x2="${width - pad.right}" y2="${gy}" stroke="rgba(151,194,209,.14)"/><text x="${pad.left - 8}" y="${gy + 4}" text-anchor="end" fill="#74919f" font-size="10">${axisLabel(max * fraction)}</text>`;
  }).join('');

  const groupW = plotW / Math.max(points.length, 1);
  const barW = Math.min(26, groupW * 0.3);
  const bars = points.map((point, index) => {
    const gx = pad.left + index * groupW;
    const center = gx + groupW / 2;
    const income = Math.max(0, Number(point.income) || 0);
    const expense = Math.max(0, Number(point.expense) || 0);
    const incomeX = round(center - barW - 2);
    const expenseX = round(center + 2);
    return `<g>
      <rect x="${incomeX}" y="${round(y(income))}" width="${round(barW)}" height="${round(pad.top + plotH - y(income))}" rx="3" fill="#2ec2ac"><title>${esc(point.label)} income: ${income}</title></rect>
      <rect x="${expenseX}" y="${round(y(expense))}" width="${round(barW)}" height="${round(pad.top + plotH - y(expense))}" rx="3" fill="#f0b45b"><title>${esc(point.label)} spending: ${expense}</title></rect>
      <text x="${round(center)}" y="${height - 10}" text-anchor="middle" fill="#a0b9c6" font-size="11">${esc(point.label)}</text>
    </g>`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.ariaLabel || 'Bar chart of income and spending over six months')}">${grid}${bars}</svg>`;
}

export function lineChart(series = [], opts = {}) {
  const width = opts.width || 560;
  const height = opts.height || 220;
  const pad = { top: 16, right: 14, bottom: 30, left: 46 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const labels = opts.labels || [];
  const count = Math.max(labels.length, ...series.map((s) => s.values.length), 1);
  const values = series.flatMap((s) => s.values.map((v) => Math.max(0, Number(v) || 0)));
  const max = niceMax(Math.max(1, ...values));
  const xAt = (index) => pad.left + (count === 1 ? plotW / 2 : (index / (count - 1)) * plotW);
  const yAt = (value) => pad.top + plotH - (Math.max(0, Number(value) || 0) / max) * plotH;

  const grid = [0, 0.5, 1].map((fraction) => {
    const gy = round(pad.top + plotH - fraction * plotH);
    return `<line x1="${pad.left}" y1="${gy}" x2="${width - pad.right}" y2="${gy}" stroke="rgba(151,194,209,.14)"/><text x="${pad.left - 8}" y="${gy + 4}" text-anchor="end" fill="#74919f" font-size="10">${axisLabel(max * fraction)}</text>`;
  }).join('');

  const paths = series.map((line) => {
    const color = esc(line.color || '#2ec2ac');
    const points = line.values.map((value, index) => `${round(xAt(index))},${round(yAt(value))}`).join(' ');
    const lastX = round(xAt(Math.max(0, line.values.length - 1)));
    const base = round(pad.top + plotH);
    const area = line.values.length > 1
      ? `<polygon points="${pad.left},${base} ${points} ${lastX},${base}" fill="${color}" opacity=".08"/>`
      : '';
    const dots = line.values.map((value, index) => `<circle cx="${round(xAt(index))}" cy="${round(yAt(value))}" r="3" fill="${color}"><title>${esc(line.name || 'Series')} ${index + 1}: ${round(value)}</title></circle>`).join('');
    return `${area}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${dots}`;
  }).join('');

  const xLabels = labels.map((label, index) => `<text x="${round(xAt(index))}" y="${height - 8}" text-anchor="middle" fill="#a0b9c6" font-size="11">${esc(label)}</text>`).join('');

  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.ariaLabel || 'Line chart of savings over time')}">${grid}${paths}${xLabels}</svg>`;
}
