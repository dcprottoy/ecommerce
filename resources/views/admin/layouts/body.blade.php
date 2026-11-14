@include('admin.layouts.header')
<body>

<div class="admin-wrapper">

@include('admin.layouts.sidebar')
  <!-- ══════════════════════════════════════
       MAIN CONTENT
  ══════════════════════════════════════ -->
  <div class="main-content" id="mainContent">

    @include('admin.layouts.navbar')
    @yield('content')
    
  </div><!-- /main-content -->
</div><!-- /admin-wrapper -->

<!-- Toast Notification -->
<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:9999">
  <div id="adminToast" class="toast align-items-center border-0" role="alert">
    <div class="d-flex">
      <div class="toast-body" id="toastMsg">সফলভাবে সেভ হয়েছে!</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</div>

<!-- Auth Guard -->
<script>
//   if (!sessionStorage.getItem('admin_logged_in')) {
//     window.location.href = 'admin-login.html';
//   }
</script>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"></script>
<!-- Admin JS -->
<script src="{{asset('js/admin.js')}}"></script>
</body>
</html>

