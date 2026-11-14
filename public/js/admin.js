/* ════════════════════════════════════════════════
   DenimCraft BD — Admin Dashboard Script
   admin.js
════════════════════════════════════════════════ */

/* ═══ PAGE NAVIGATION ═══ */
const pageTitles = {
  dashboard: 'ড্যাশবোর্ড',
  orders: 'অর্ডার ম্যানেজমেন্ট',
  products: 'প্রোডাক্ট ম্যানেজমেন্ট',
  inventory: 'ইনভেন্টরি / স্টক',
  customers: 'কাস্টমার লিস্ট',
  offers: 'অফার ও কুপন',
  pixel: 'Facebook Pixel',
  reports: 'রিপোর্ট ও অ্যানালিটিক্স',
  settings: 'সাইট সেটিংস',
  'institute-setup': 'প্রতিষ্ঠান সেটাপ',
};

function showPage(id, el) {
  document.querySelectorAll('.page-content').forEach(p => p.classList.add('d-none'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.remove('d-none');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');

  document.getElementById('pageTitle').textContent = pageTitles[id] || id;

  // init page-specific content
  if (id === 'orders') initOrdersTable();
  if (id === 'products') initProductGrid();
  if (id === 'reports') initMonthlyChart();
}



/* ═══ SIDEBAR TOGGLE ═══ */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (window.innerWidth <= 991) {
    sb.classList.toggle('mobile-open');
  } else {
    sb.classList.toggle('collapsed');
    document.getElementById('mainContent').style.marginLeft = '';
  }
}

/* ═══ TOAST ═══ */
function showToast(msg, type = 'success') {
  const toastEl = document.getElementById('adminToast');
  document.getElementById('toastMsg').textContent = msg;
  toastEl.className = `toast align-items-center border-0 text-bg-${type === 'success' ? 'success' : 'danger'}`;
  const t = new bootstrap.Toast(toastEl, { delay: 3000 });
  t.show();
}

/* ══════════════════════════════════════════════
   ORDERS TABLE
══════════════════════════════════════════════ */
let allOrders = [
  { id: 'DC-1084', name: 'রাহেলা বেগম', phone: '01811-234501', product: 'স্লিম ফিট (কালো, ৩২)', qty: 1, price: 1850, date: 'আজ', status: 'পেন্ডিং' },
  { id: 'DC-1083', name: 'তানভীর আহমেদ', phone: '01711-234567', product: 'রেগুলার ফিট কম্বো (৩ পিস)', qty: 3, price: 6500, date: 'আজ', status: 'শিপমেন্টে' },
  { id: 'DC-1082', name: 'সাবরিনা ইসলাম', phone: '01611-567890', product: 'স্ট্রেচেবল স্কিনি (নেভি, ২৮)', qty: 1, price: 1850, date: 'গতকাল', status: 'ডেলিভারড' },
  { id: 'DC-1081', name: 'মাহমুদুল হাসান', phone: '01912-456789', product: 'ব্লু ডেনিম রেগুলার (৩৪)', qty: 1, price: 1650, date: 'গতকাল', status: 'ডেলিভারড' },
  { id: 'DC-1080', name: 'নাসরিন আক্তার', phone: '01516-789012', product: 'কম্বো অফার ৩ পিস + বেল্ট', qty: 3, price: 6500, date: '২ দিন আগে', status: 'ক্যান্সেলড' },
  { id: 'DC-1079', name: 'রিফাত হোসেন', phone: '01611-890123', product: 'স্লিম ফিট (ব্লু, ৩০)', qty: 1, price: 1850, date: '২ দিন আগে', status: 'ডেলিভারড' },
  { id: 'DC-1078', name: 'আফিয়া তাসনিম', phone: '01711-901234', product: 'রেগুলার ফিট (গ্রে, ৩২)', qty: 2, price: 3700, date: '৩ দিন আগে', status: 'শিপমেন্টে' },
  { id: 'DC-1077', name: 'সাইফুল ইসলাম', phone: '01811-012345', product: 'কম্বো ৩ পিস', qty: 3, price: 6500, date: '৩ দিন আগে', status: 'ডেলিভারড' },
  { id: 'DC-1076', name: 'শাহনাজ পারভিন', phone: '01912-123456', product: 'স্কিনি ফিট (কালো, ২৮)', qty: 1, price: 1850, date: '৪ দিন আগে', status: 'পেন্ডিং' },
  { id: 'DC-1075', name: 'জাহিদুল হক', phone: '01516-234567', product: 'রেগুলার ফিট (নেভি, ৩৬)', qty: 1, price: 1650, date: '৪ দিন আগে', status: 'ডেলিভারড' },
];

let filteredOrders = [...allOrders];
let currentPage = 1;
const ordersPerPage = 6;
let activeStatusFilter = '';
let activeSearch = '';

function initOrdersTable() {
  applyOrderFilters();
}

function filterOrders(val) {
  activeSearch = val.toLowerCase();
  currentPage = 1;
  applyOrderFilters();
}

function filterByStatus(val) {
  activeStatusFilter = val;
  currentPage = 1;
  applyOrderFilters();
}

function setOrderTab(el, status) {
  document.querySelectorAll('.otab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  activeStatusFilter = status;
  currentPage = 1;
  applyOrderFilters();
}

function applyOrderFilters() {
  filteredOrders = allOrders.filter(o => {
    const matchSearch = !activeSearch ||
      o.id.toLowerCase().includes(activeSearch) ||
      o.name.includes(activeSearch) ||
      o.phone.includes(activeSearch);
    const matchStatus = !activeStatusFilter || o.status === activeStatusFilter;
    return matchSearch && matchStatus;
  });
  renderOrdersTable();
  renderPagination();
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTbody');
  if (!tbody) return;
  const start = (currentPage - 1) * ordersPerPage;
  const pageData = filteredOrders.slice(start, start + ordersPerPage);

  if (!pageData.length) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center py-4 text-muted">কোনো অর্ডার পাওয়া যায়নি।</td></tr>`;
    return;
  }

  tbody.innerHTML = pageData.map(o => {
    const initials = o.name.substring(0, 2);
    const sc = o.status === 'পেন্ডিং' ? 'pending' : o.status === 'শিপমেন্টে' ? 'shipped' : o.status === 'ডেলিভারড' ? 'delivered' : 'cancelled';
    return `
      <tr>
        <td><input type="checkbox" class="row-check"></td>
        <td><span class="order-id">#${o.id}</span></td>
        <td><div class="cust-cell"><div class="cust-av">${initials}</div>${o.name}</div></td>
        <td>${o.phone}</td>
        <td>${o.product}</td>
        <td>${o.qty} পিস</td>
        <td>৳ ${o.price.toLocaleString('bn-BD')}</td>
        <td>${o.date}</td>
        <td><span class="badge-status ${sc}">${o.status}</span></td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn-action" onclick="viewOrder('${o.id}')" title="বিস্তারিত"><i class="fas fa-eye"></i></button>
            <button class="btn-action" onclick="deleteOrder('${o.id}')" title="মুছুন"><i class="fas fa-trash" style="color:var(--danger)"></i></button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function renderPagination() {
  const wrap = document.getElementById('ordersPagination');
  if (!wrap) return;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  if (totalPages <= 1) { wrap.innerHTML = ''; return; }

  let html = `<button onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>‹</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }
  html += `<button onclick="goPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>›</button>`;
  wrap.innerHTML = html;
}

function goPage(p) {
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  renderOrdersTable();
  renderPagination();
}

function toggleAll(el) {
  document.querySelectorAll('.row-check').forEach(c => c.checked = el.checked);
}

function viewOrder(id) {
  const o = allOrders.find(x => x.id === id);
  if (!o) return;
  document.getElementById('modalOrderTitle').textContent = `অর্ডার #${o.id}`;
  document.getElementById('oName').value = o.name;
  document.getElementById('oPhone').value = o.phone;
  document.getElementById('oAddress').value = '';
  document.getElementById('oQty').value = o.qty;
  document.getElementById('oPrice').value = o.price;
  document.getElementById('oStatus').value = o.status;
  new bootstrap.Modal(document.getElementById('orderModal')).show();
}

function openOrderModal() {
  document.getElementById('modalOrderTitle').textContent = 'নতুন অর্ডার';
  ['oName', 'oPhone', 'oAddress', 'oNote'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('oQty').value = 1;
  document.getElementById('oPrice').value = '';
  new bootstrap.Modal(document.getElementById('orderModal')).show();
}

function saveOrder() {
  const name = document.getElementById('oName').value.trim();
  const phone = document.getElementById('oPhone').value.trim();
  if (!name || !phone) { showToast('নাম ও ফোন নম্বর আবশ্যক!', 'danger'); return; }

  const newId = 'DC-' + (1085 + allOrders.length);
  const newOrder = {
    id: newId,
    name, phone,
    product: document.getElementById('oProduct').value,
    qty: +document.getElementById('oQty').value,
    price: +document.getElementById('oPrice').value || 0,
    date: 'এইমাত্র',
    status: document.getElementById('oStatus').value,
  };
  allOrders.unshift(newOrder);
  applyOrderFilters();
  bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
  showToast('অর্ডার সফলভাবে সেভ হয়েছে!');
}

function deleteOrder(id) {
  if (!confirm('এই অর্ডারটি মুছে ফেলবেন?')) return;
  allOrders = allOrders.filter(o => o.id !== id);
  applyOrderFilters();
  showToast('অর্ডার মুছে ফেলা হয়েছে।', 'danger');
}

/* ══════════════════════════════════════════════
   PRODUCTS GRID
══════════════════════════════════════════════ */
let allProducts = [
  { id: 1, name: '৪-ওয়ে স্ট্রেচ কম্বো (৩ পিস)', sku: 'DC-C001', mrp: 9000, price: 6500, stock: 85, sold: 132, status: 'সক্রিয়' },
  { id: 2, name: 'স্লিম ফিট ব্লু ডেনিম জিন্স', sku: 'DC-S001', mrp: 2500, price: 1850, stock: 62, sold: 87, status: 'সক্রিয়' },
  { id: 3, name: 'রেগুলার ফিট কালো জিন্স', sku: 'DC-R001', mrp: 2200, price: 1650, stock: 48, sold: 64, status: 'সক্রিয়' },
  { id: 4, name: 'স্কিনি ফিট নেভি ব্লু জিন্স', sku: 'DC-SK01', mrp: 2500, price: 1850, stock: 5, sold: 38, status: 'লো স্টক' },
  { id: 5, name: 'রেগুলার ফিট গ্রে জিন্স', sku: 'DC-R002', mrp: 2200, price: 1650, stock: 34, sold: 29, status: 'সক্রিয়' },
  { id: 6, name: 'স্লিম ফিট কালো জিন্স (প্রিমিয়াম)', sku: 'DC-S002', mrp: 3000, price: 2250, stock: 0, sold: 21, status: 'আউট অফ স্টক' },
];

function initProductGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = allProducts.map(p => {
    const sc = p.status === 'সক্রিয়' ? 'delivered' : p.status === 'লো স্টক' ? 'pending' : 'cancelled';
    const disc = Math.round((1 - p.price / p.mrp) * 100);
    return `
      <div class="col-xl-4 col-md-6">
        <div class="prod-admin-card">
          <div class="prod-admin-img">
            <i class="fas fa-vest-patches"></i>
            ${disc > 0 ? `<span class="prod-admin-badge">-${disc}%</span>` : ''}
          </div>
          <div class="prod-admin-body">
            <div class="prod-admin-name">${p.name}</div>
            <div class="prod-admin-sku">SKU: ${p.sku}</div>
            <div class="prod-admin-price-row">
              <div class="prod-admin-price">৳ ${p.price.toLocaleString('bn-BD')}</div>
              <div class="prod-admin-mrp">৳ ${p.mrp.toLocaleString('bn-BD')}</div>
            </div>
            <div class="prod-admin-meta">
              <span><i class="fas fa-boxes me-1"></i>স্টক: ${p.stock} পিস</span>
              <span><i class="fas fa-shopping-bag me-1"></i>বিক্রি: ${p.sold} পিস</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span class="badge-status ${sc}">${p.status}</span>
            </div>
            <div class="prod-admin-actions">
              <button class="btn btn-sm btn-outline-primary flex-fill" onclick="editProduct(${p.id})">
                <i class="fas fa-edit me-1"></i>এডিট
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})" title="মুছুন">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function openProductModal() {
  document.getElementById('productModalTitle').textContent = 'নতুন প্রোডাক্ট';
  ['pName', 'pSku', 'pMrp', 'pPrice', 'pStock', 'pDesc', 'pImg'].forEach(id => document.getElementById(id).value = '');
  new bootstrap.Modal(document.getElementById('productModal')).show();
}

function editProduct(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  document.getElementById('productModalTitle').textContent = 'প্রোডাক্ট এডিট করুন';
  document.getElementById('pName').value = p.name;
  document.getElementById('pSku').value = p.sku;
  document.getElementById('pMrp').value = p.mrp;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pStock').value = p.stock;
  new bootstrap.Modal(document.getElementById('productModal')).show();
}

function saveProduct() {
  const name = document.getElementById('pName').value.trim();
  if (!name) { showToast('প্রোডাক্ট নাম আবশ্যক!', 'danger'); return; }
  showToast('প্রোডাক্ট সফলভাবে সেভ হয়েছে!');
  bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
}

function deleteProduct(id) {
  if (!confirm('এই প্রোডাক্টটি মুছে ফেলবেন?')) return;
  allProducts = allProducts.filter(p => p.id !== id);
  initProductGrid();
  showToast('প্রোডাক্ট মুছে ফেলা হয়েছে।', 'danger');
}

/* ══════════════════════════════════════════════
   FACEBOOK PIXEL
══════════════════════════════════════════════ */
function savePixel() {
  const pid = document.getElementById('pixelId').value.trim();
  if (!pid) { showToast('Pixel ID দিন!', 'danger'); return; }
  showToast('Pixel ID সেভ হয়েছে! ৳ ' + pid);
}

/* ══════════════════════════════════════════════
   CHARTS
══════════════════════════════════════════════ */
let salesChartInst, statusChartInst, monthlyChartInst, sizeChartInst;

function initDashboardCharts() {
  /* ── Sales (bar + line) ── */
  const sc = document.getElementById('salesChart');
  if (!sc) return;
  if (salesChartInst) salesChartInst.destroy();
  salesChartInst = new Chart(sc, {
    type: 'bar',
    data: {
      labels: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
      datasets: [
        {
          label: 'অর্ডার',
          data: [38, 52, 45, 60, 55, 72, 48],
          backgroundColor: 'rgba(26,86,219,.18)',
          borderColor: '#1a56db',
          borderWidth: 2,
          borderRadius: 8,
          order: 2,
        },
        {
          label: 'রেভিনিউ (হাজার ৳)',
          type: 'line',
          data: [56, 78, 68, 91, 83, 108, 72],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.08)',
          borderWidth: 2.5,
          tension: .4,
          fill: true,
          pointBackgroundColor: '#10b981',
          pointRadius: 4,
          order: 1,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#f1f5f9' }, beginAtZero: true },
      }
    }
  });

  /* ── Status Donut ── */
  const dc = document.getElementById('statusChart');
  if (statusChartInst) statusChartInst.destroy();
  statusChartInst = new Chart(dc, {
    type: 'doughnut',
    data: {
      labels: ['ডেলিভারড', 'শিপমেন্টে', 'পেন্ডিং', 'ক্যান্সেলড'],
      datasets: [{
        data: [183, 78, 47, 20],
        backgroundColor: ['#10b981', '#1a56db', '#f59e0b', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '70%',
      plugins: { legend: { display: false } }
    }
  });
}

function initMonthlyChart() {
  const mc = document.getElementById('monthlyChart');
  if (!mc) return;
  if (monthlyChartInst) monthlyChartInst.destroy();
  monthlyChartInst = new Chart(mc, {
    type: 'bar',
    data: {
      labels: ['জান', 'ফেব', 'মার', 'এপ্রি', 'মে', 'জুন', 'জুলাই', 'আগ', 'সেপ', 'অক্টো', 'নভে', 'ডিসে'],
      datasets: [
        {
          label: 'অর্ডার সংখ্যা',
          data: [120, 145, 190, 220, 180, 260, 310, 275, 290, 328, 0, 0],
          backgroundColor: 'rgba(26,86,219,.8)',
          borderRadius: 8,
          order: 2,
        },
        {
          type: 'line',
          label: 'রেভিনিউ (হাজার ৳)',
          data: [180, 215, 285, 330, 268, 390, 462, 414, 437, 464, 0, 0],
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          tension: .4,
          pointBackgroundColor: '#10b981',
          pointRadius: 4,
          order: 1,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#f1f5f9' }, beginAtZero: true },
      }
    }
  });

  /* ── Size Chart ── */
  const szc = document.getElementById('sizeChart');
  if (!szc) return;
  if (sizeChartInst) sizeChartInst.destroy();
  sizeChartInst = new Chart(szc, {
    type: 'polarArea',
    data: {
      labels: ['২৮', '৩০', '৩২', '৩৪', '৩৬', '৩৮'],
      datasets: [{
        data: [42, 68, 95, 78, 32, 13],
        backgroundColor: [
          'rgba(26,86,219,.7)', 'rgba(16,185,129,.7)', 'rgba(245,158,11,.7)',
          'rgba(239,68,68,.7)', 'rgba(99,102,241,.7)', 'rgba(20,184,166,.7)',
        ],
        borderWidth: 0,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'right' } }
    }
  });
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
/* ═══ LOGOUT ═══ */
function logoutAdmin() {
  if (!confirm('লগআউট করবেন?')) return;
  sessionStorage.removeItem('admin_logged_in');
  sessionStorage.removeItem('admin_email');
  sessionStorage.removeItem('admin_role');
  window.location.href = 'admin-login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  // Show logged-in user info
  const role = sessionStorage.getItem('admin_role') || 'Admin';
  const email = sessionStorage.getItem('admin_email') || '';
  const nameEl = document.querySelector('.admin-name');
  const roleEl = document.querySelector('.admin-role');
  if (nameEl) nameEl.textContent = role;
  if (roleEl) roleEl.textContent = email;

  // Logout button
  const logoutBtn = document.querySelector('.btn-logout');
  if (logoutBtn) logoutBtn.onclick = logoutAdmin;

  initDashboardCharts();

  // Mobile sidebar overlay close
  document.addEventListener('click', (e) => {
    const sb = document.getElementById('sidebar');
    if (window.innerWidth <= 991 &&
      sb.classList.contains('mobile-open') &&
      !sb.contains(e.target) &&
      !e.target.closest('.sidebar-toggle')) {
      sb.classList.remove('mobile-open');
    }
  });
});

