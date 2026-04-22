// ─── DETECT PATH DEPTH ───────────────────────────────────────────────────────
const isAdminPage = window.location.pathname.includes('/admin/');
const base = isAdminPage ? '../' : '';
const adminBase = isAdminPage ? '' : 'admin/';

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function getInitials(name) {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';
}

// ─── NAVBAR RENDERER ─────────────────────────────────────────────────────────
function renderNav(activePage = '') {
  const cartCount = Cart.count();
  const user = Auth.user;
  const initials = user ? getInitials(user.name) : '';
  const firstName = user ? user.name.split(' ')[0] : '';

  const navHTML = `
  <nav style="background:rgba(5,10,18,0.9);border-bottom:1px solid rgba(0,245,255,0.1);backdrop-filter:blur(16px);font-family:'Rajdhani',sans-serif;position:sticky;top:0;z-index:40;">
    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap" rel="stylesheet"/>
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

      <a href="${base}home.html" style="font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;letter-spacing:0.05em;color:white;text-decoration:none;">
        TRON<span style="color:#00f5ff;">IXY</span>
      </a>

      <div class="hidden md:flex items-center gap-5" style="font-size:0.82rem;font-weight:600;letter-spacing:0.08em;">
        <a href="${base}home.html" style="color:${activePage==='home'?'#00f5ff':'rgba(255,255,255,0.55)'};text-decoration:none;text-transform:uppercase;transition:color 0.2s;" onmouseover="this.style.color='#00f5ff'" onmouseout="this.style.color='${activePage==='home'?'#00f5ff':'rgba(255,255,255,0.55)'}'">Home</a>

        ${user ? `
          <a href="${base}my-orders.html" style="color:${activePage==='orders'?'#00f5ff':'rgba(255,255,255,0.55)'};text-decoration:none;text-transform:uppercase;transition:color 0.2s;" onmouseover="this.style.color='#00f5ff'" onmouseout="this.style.color='${activePage==='orders'?'#00f5ff':'rgba(255,255,255,0.55)'}'">Orders</a>

          <a href="${base}cart.html" style="position:relative;color:rgba(255,255,255,0.55);text-decoration:none;font-size:1.1rem;transition:color 0.2s;" onmouseover="this.style.color='#00f5ff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">
            🛒
            ${cartCount > 0 ? `<span style="position:absolute;top:-6px;right:-8px;background:#00f5ff;color:#050a12;font-size:0.6rem;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;">${cartCount}</span>` : ''}
          </a>

          ${user.role==='admin' ? `<a href="${base}${adminBase}dashboard.html" style="color:#00f5ff;text-decoration:none;text-transform:uppercase;border:1px solid rgba(0,245,255,0.35);padding:4px 12px;border-radius:4px;font-size:0.78rem;transition:all 0.2s;" onmouseover="this.style.background='rgba(0,245,255,0.1)'" onmouseout="this.style.background='transparent'">⚡ Admin</a>` : ''}

          <!-- Avatar + Welcome — clicks to profile -->
          <a href="${base}profile.html" style="display:flex;align-items:center;gap:8px;text-decoration:none;padding:4px 12px 4px 6px;border:1px solid rgba(0,245,255,0.2);border-radius:20px;background:rgba(0,245,255,0.05);transition:all 0.2s;" onmouseover="this.style.borderColor='rgba(0,245,255,0.5)';this.style.background='rgba(0,245,255,0.1)'" onmouseout="this.style.borderColor='rgba(0,245,255,0.2)';this.style.background='rgba(0,245,255,0.05)'">
            ${user.profilePic?.url
              ? `<img src="${user.profilePic.url}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:1px solid rgba(0,245,255,0.5);"/>`
              : `<div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#00f5ff,#0066ff);display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:800;color:#050a12;flex-shrink:0;font-family:'Rajdhani',sans-serif;">${initials}</div>`
            }
            <span style="color:rgba(255,255,255,0.75);font-size:0.78rem;font-weight:600;font-family:'Rajdhani',sans-serif;">Hey, <span style="color:#00f5ff;">${firstName}</span></span>
          </a>

          <button onclick="handleLogout()" style="background:transparent;border:1px solid rgba(239,68,68,0.4);color:rgba(239,68,68,0.75);padding:4px 12px;border-radius:4px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.78rem;letter-spacing:0.08em;text-transform:uppercase;transition:all 0.2s;" onmouseover="this.style.borderColor='#ef4444';this.style.color='#ef4444';this.style.background='rgba(239,68,68,0.08)'" onmouseout="this.style.borderColor='rgba(239,68,68,0.4)';this.style.color='rgba(239,68,68,0.75)';this.style.background='transparent'">Logout</button>

        ` : `
          <a href="${base}cart.html" style="position:relative;color:rgba(255,255,255,0.55);text-decoration:none;font-size:1.1rem;" onmouseover="this.style.color='#00f5ff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'">🛒</a>
          <a href="${base}login.html" style="color:${activePage==='login'?'#00f5ff':'rgba(255,255,255,0.55)'};text-decoration:none;text-transform:uppercase;transition:color 0.2s;" onmouseover="this.style.color='#00f5ff'" onmouseout="this.style.color='${activePage==='login'?'#00f5ff':'rgba(255,255,255,0.55)'}'">Login</a>
          <a href="${base}register.html" style="background:rgba(0,245,255,0.08);border:1px solid rgba(0,245,255,0.3);color:#00f5ff;text-decoration:none;text-transform:uppercase;padding:5px 14px;border-radius:4px;font-size:0.78rem;letter-spacing:0.08em;transition:all 0.2s;" onmouseover="this.style.background='rgba(0,245,255,0.15)'" onmouseout="this.style.background='rgba(0,245,255,0.08)'">Register</a>
        `}
      </div>

      <button onclick="toggleMobileMenu()" style="color:rgba(255,255,255,0.7);background:none;border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:1.1rem;" class="md:hidden">☰</button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="hidden" style="background:rgba(5,10,18,0.98);border-top:1px solid rgba(0,245,255,0.08);padding:16px 20px;">
      <div style="display:flex;flex-direction:column;gap:14px;">
        ${user ? `
          <div style="display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid rgba(0,245,255,0.08);">
            ${user.profilePic?.url
              ? `<img src="${user.profilePic.url}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;border:1px solid rgba(0,245,255,0.4);"/>`
              : `<div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#00f5ff,#0066ff);display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;color:#050a12;font-family:'Rajdhani',sans-serif;">${initials}</div>`
            }
            <div>
              <p style="color:white;font-weight:700;font-size:0.95rem;font-family:'Rajdhani',sans-serif;margin:0;">Hey, ${firstName}!</p>
              <p style="color:rgba(0,245,255,0.5);font-size:0.7rem;margin:0;font-family:'Rajdhani',sans-serif;letter-spacing:0.05em;">${user.role.toUpperCase()}</p>
            </div>
          </div>
        ` : ''}
        <a href="${base}home.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;">Home</a>
        ${user ? `
          <a href="${base}profile.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;">Profile</a>
          <a href="${base}my-orders.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;">Orders</a>
          <a href="${base}cart.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;">Cart (${cartCount})</a>
          ${user.role==='admin' ? `<a href="${base}${adminBase}dashboard.html" style="color:#00f5ff;text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;">⚡ Admin Panel</a>` : ''}
          <button onclick="handleLogout()" style="text-align:left;background:none;border:none;color:rgba(239,68,68,0.8);cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;letter-spacing:0.08em;text-transform:uppercase;padding:0;">Logout</button>
        ` : `
          <a href="${base}login.html" style="color:rgba(255,255,255,0.7);text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;text-transform:uppercase;">Login</a>
          <a href="${base}register.html" style="color:#00f5ff;text-decoration:none;font-family:'Rajdhani',sans-serif;font-weight:600;font-size:0.9rem;text-transform:uppercase;">Register</a>
        `}
      </div>
    </div>
  </nav>`;

  document.getElementById('navbar').innerHTML = navHTML;
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

async function handleLogout() {
  try {
    await api.get('/user/logout');
    Auth.user = null;
    TokenStore.clear();
    toast('Logged out');
    go(`${base}login.html`);
  } catch (e) {
    toast(e.message, 'error');
  }
}