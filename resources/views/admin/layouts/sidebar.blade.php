<!-- ══════════════════════════════════════════
     SIDEBAR
══════════════════════════════════════════ -->

  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon"><i class="fas fa-vest-patches"></i></div>
      <div>
        <div class="brand-name">DenimCraft BD</div>
        <div class="brand-sub">Admin Panel</div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">মেইন মেনু</div>

      <a href="{{ url('/') }}" class="nav-item {{ request()->is('/') ? 'active' : '' }}" @if(request()->is('/')) onclick="showPage('dashboard',this)" @endif>
        <i class="fas fa-th-large"></i><span>ড্যাশবোর্ড</span>
      </a>
      <a href="#" class="nav-item" onclick="showPage('orders',this)">
        <i class="fas fa-shopping-bag"></i><span>অর্ডার ম্যানেজমেন্ট</span>
        <span class="nav-badge">12</span>
      </a>
      <a href="#" class="nav-item" onclick="showPage('products',this)">
        <i class="fas fa-box-open"></i><span>প্রোডাক্ট ম্যানেজমেন্ট</span>
      </a>
      <a href="#" class="nav-item" onclick="showPage('inventory',this)">
        <i class="fas fa-warehouse"></i><span>ইনভেন্টরি / স্টক</span>
      </a>
      <a href="#" class="nav-item" onclick="showPage('customers',this)">
        <i class="fas fa-users"></i><span>কাস্টমার লিস্ট</span>
      </a>

      <div class="nav-section-label">মার্কেটিং</div>
      <a href="#" class="nav-item" onclick="showPage('offers',this)">
        <i class="fas fa-tags"></i><span>অফার ও কুপন</span>
      </a>
      <a href="#" class="nav-item" onclick="showPage('pixel',this)">
        <i class="fab fa-facebook"></i><span>Facebook Pixel</span>
      </a>
      <a href="#" class="nav-item" onclick="showPage('reports',this)">
        <i class="fas fa-chart-line"></i><span>রিপোর্ট ও অ্যানালিটিক্স</span>
      </a>

      <div class="nav-section-label">সেটিংস</div>
      <a href="#" class="nav-item" onclick="showPage('settings',this)">
        <i class="fas fa-cog"></i><span>সাইট সেটিংস</span>
      </a>
      <a href="{{ route('landingpage.jeans') }}" class="nav-item" target="_blank">
        <i class="fas fa-external-link-alt"></i><span>ল্যান্ডিং পেজ দেখুন</span>
      </a>
      <div class="nav-section-label">প্রতিষ্ঠান সেটিংস</div>
      <a href="{{ route('admin.orgsetup') }}" class="nav-item {{ request()->routeIs('admin.orgsetup*') ? 'active' : '' }}">
        <i class="fas fa-building"></i><span>প্রতিষ্ঠান সেটাপ</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="d-flex align-items-center gap-2">
        <div class="admin-avatar">A</div>
        <div>
          <div class="admin-name">Admin User</div>
          <div class="admin-role">Super Admin</div>
        </div>
      </div>
      <button class="btn-logout" title="লগআউট"><i class="fas fa-sign-out-alt"></i></button>
    </div>
  </aside>
