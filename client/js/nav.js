// ─── NAVBAR RENDERER ──────────────────────────────────────────────────────────
// Call renderNav() in every page after Auth.load()

function renderNav(activePage = '') {
  const cartCount = Cart.count();
  const user = Auth.user;

  const navHTML = `
  <nav class="bg-gray-900 sticky top-0 z-40 shadow-lg">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="/pages/home.html" class="text-white text-2xl font-bold tracking-tight">
        Troni<span class="text-blue-400">xy</span>
      </a>

      <div class="hidden md:flex items-center gap-6 text-sm text-gray-300">
        <a href="/pages/home.html" class="hover:text-white ${activePage==='home'?'text-white font-semibold':''}">Home</a>
        ${user ? `
          <a href="/pages/profile.html" class="hover:text-white ${activePage==='profile'?'text-white font-semibold':''}">Profile</a>
          <a href="/pages/my-orders.html" class="hover:text-white ${activePage==='orders'?'text-white font-semibold':''}">Orders</a>
          ${user.role==='admin' ? `<a href="/pages/admin/dashboard.html" class="hover:text-white text-yellow-400">Admin</a>` : ''}
          <button onclick="handleLogout()" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition">Logout</button>
        ` : `
          <a href="/pages/login.html" class="hover:text-white ${activePage==='login'?'text-white font-semibold':''}">Login</a>
          <a href="/pages/register.html" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition">Register</a>
        `}
        <a href="/pages/cart.html" class="relative hover:text-white ${activePage==='cart'?'text-white font-semibold':''}">
          🛒
          ${cartCount > 0 ? `<span class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">${cartCount}</span>` : ''}
        </a>
      </div>

      <!-- Mobile menu button -->
      <button onclick="toggleMobileMenu()" class="md:hidden text-white text-2xl">☰</button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="hidden md:hidden bg-gray-800 px-4 pb-4 flex flex-col gap-3 text-sm text-gray-300">
      <a href="/pages/home.html" class="hover:text-white py-1">Home</a>
      ${user ? `
        <a href="/pages/profile.html" class="hover:text-white py-1">Profile</a>
        <a href="/pages/my-orders.html" class="hover:text-white py-1">My Orders</a>
        <a href="/pages/cart.html" class="hover:text-white py-1">Cart (${cartCount})</a>
        ${user.role==='admin' ? `<a href="/pages/admin/dashboard.html" class="text-yellow-400 py-1">Admin Panel</a>` : ''}
        <button onclick="handleLogout()" class="text-left text-red-400 py-1">Logout</button>
      ` : `
        <a href="/pages/login.html" class="hover:text-white py-1">Login</a>
        <a href="/pages/register.html" class="hover:text-white py-1">Register</a>
        <a href="/pages/cart.html" class="hover:text-white py-1">Cart (${cartCount})</a>
      `}
    </div>
  </nav>`;

  document.getElementById('navbar').innerHTML = navHTML;
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

async function handleLogout() {
  try {
    await api.get('/user/logout');
    Auth.user = null;
    toast('Logged out successfully');
    go('/pages/login.html');
  } catch (e) {
    toast(e.message, 'error');
  }
}
