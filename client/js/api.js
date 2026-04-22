// ─── BASE CONFIG ─────────────────────────────────────────────────────────────
const BASE_URL = 'http://localhost:8080/api/v1';

// ─── CORE FETCH WRAPPER ───────────────────────────────────────────────────────
async function request(method, path, body = null, isFormData = false) {
  const options = {
    method,
    credentials: 'include',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
  };
  if (body) options.body = isFormData ? body : JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Something went wrong');
  return data;
}

const api = {
  get:    (path)              => request('GET',    path),
  post:   (path, body)       => request('POST',   path, body),
  put:    (path, body)       => request('PUT',    path, body),
  del:    (path)              => request('DELETE', path),
  upload: (path, formData)   => request('PUT',    path, formData, true),
  uploadPost: (path, formData) => request('POST', path, formData, true),
};

// ─── AUTH STATE ───────────────────────────────────────────────────────────────
const Auth = {
  user: null,
  async load() {
    try {
      const data = await api.get('/user/profile');
      this.user = data.user;
    } catch {
      this.user = null;
    }
    return this.user;
  },
  isAdmin() { return this.user?.role === 'admin'; },
  isLoggedIn() { return !!this.user; },
};

// ─── CART (localStorage) ─────────────────────────────────────────────────────
const Cart = {
  get() { return JSON.parse(localStorage.getItem('cart') || '[]'); },
  save(items) { localStorage.setItem('cart', JSON.stringify(items)); },
  add(product, qty = 1) {
    const items = this.get();
    const idx = items.findIndex(i => i._id === product._id);
    if (idx > -1) items[idx].qty += qty;
    else items.push({ ...product, qty });
    this.save(items);
  },
  remove(id) { this.save(this.get().filter(i => i._id !== id)); },
  clear() { localStorage.removeItem('cart'); },
  total() { return this.get().reduce((s, i) => s + i.price * i.qty, 0); },
  count() { return this.get().reduce((s, i) => s + i.qty, 0); },
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg text-white text-sm font-medium shadow-xl transition-all
    ${type === 'success' ? 'bg-green-600' : 'bg-red-500'}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── NAVIGATE ─────────────────────────────────────────────────────────────────
function go(path) { window.location.href = path; }
