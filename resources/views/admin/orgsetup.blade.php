@extends('admin.layouts.body')

@section('page_title', 'প্রতিষ্ঠান সেটাপ')

@section('content')
<div class="page-content" id="page-orgsetup">

  <!-- Header Banner -->
  <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
    <div>
      <h4 class="fw-bold mb-1" style="color: var(--denim-dark2);">
        <i class="fas fa-building text-primary me-2"></i>প্রতিষ্ঠান সেটাপ
      </h4>
      <p class="text-muted small mb-0">প্রতিষ্ঠানের প্রোফাইল, লোগো, কারেন্সি ও এসইও সেটিংস পরিচালনা করুন</p>
    </div>
    <div>
      @if($orgSetup)
        <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill fs-7">
          <i class="fas fa-check-circle me-1"></i> তথ্য সংরক্ষিত আছে
        </span>
      @else
        <span class="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill fs-7">
          <i class="fas fa-info-circle me-1"></i> নতুন তথ্য তৈরি করুন
        </span>
      @endif
    </div>
  </div>

  <!-- Notification Alerts -->
  @if(session('success'))
    <div class="alert alert-success alert-dismissible fade show d-flex align-items-center mb-4" role="alert">
      <i class="fas fa-check-circle fs-5 me-2"></i>
      <div>{{ session('success') }}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  @endif

  @if(isset($errors) && $errors->any())
    <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
      <div class="d-flex align-items-center mb-1">
        <i class="fas fa-exclamation-triangle fs-5 me-2"></i>
        <strong>অনুগ্রহ করে ত্রুটিগুলো সংশোধন করুন:</strong>
      </div>
      <ul class="mb-0 ps-4 small">
        @foreach($errors->all() as $error)
          <li>{{ $error }}</li>
        @endforeach
      </ul>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  @endif

  <!-- Current Record Show / Summary Overview (Single Form Show Part) -->
  @if($orgSetup)
    <div class="card-panel mb-4">
      <div class="panel-header mb-3">
        <div class="panel-title">
          <i class="fas fa-id-card me-2 text-primary"></i>বর্তমান প্রতিষ্ঠানের প্রোফাইল সারাংশ (Show Overview)
        </div>
        <small class="text-muted">সর্বশেষ আপডেট: {{ $orgSetup->updated_at ? $orgSetup->updated_at->format('d M, Y h:i A') : 'N/A' }}</small>
      </div>

      <div class="row g-3 align-items-center">
        <div class="col-auto">
          @if($orgSetup->org_logo && file_exists(public_path($orgSetup->org_logo)))
            <img src="{{ asset($orgSetup->org_logo) }}" alt="Logo" class="rounded border p-1" style="width: 70px; height: 70px; object-fit: contain; background: #f8fafc;">
          @else
            <div class="rounded border d-flex align-items-center justify-content-center text-primary" style="width: 70px; height: 70px; background: #eff6ff; font-size: 28px;">
              <i class="fas fa-building"></i>
            </div>
          @endif
        </div>
        <div class="col">
          <h5 class="fw-bold mb-1">{{ $orgSetup->org_name }}</h5>
          <div class="text-muted small d-flex flex-wrap gap-3">
            @if($orgSetup->org_phone)
              <span><i class="fas fa-phone-alt me-1 text-primary"></i>{{ $orgSetup->org_phone }}</span>
            @endif
            @if($orgSetup->org_email)
              <span><i class="fas fa-envelope me-1 text-primary"></i>{{ $orgSetup->org_email }}</span>
            @endif
            @if($orgSetup->org_address)
              <span><i class="fas fa-map-marker-alt me-1 text-primary"></i>{{ $orgSetup->org_address }}</span>
            @endif
            @if($orgSetup->org_currency_symbol || $orgSetup->org_currency_code)
              <span><i class="fas fa-coins me-1 text-primary"></i>কারেন্সি: {{ $orgSetup->org_currency_symbol }} ({{ $orgSetup->org_currency_code }})</span>
            @endif
            @if($orgSetup->org_timezone)
              <span><i class="fas fa-clock me-1 text-primary"></i>টাইমজোন: {{ $orgSetup->org_timezone }}</span>
            @endif
          </div>
        </div>
      </div>
    </div>
  @endif

  <!-- Single Form for Create & Edit/Update -->
  <form action="{{ $orgSetup ? route('admin.orgsetup.update', $orgSetup->id) : route('admin.orgsetup.store') }}" 
        method="POST" 
        enctype="multipart/form-data">
    @csrf
    @if($orgSetup)
      @method('PUT')
    @endif

    <div class="row g-4">
      
      <!-- ১. সাধারণ তথ্য -->
      <div class="col-lg-6">
        <div class="card-panel h-100">
          <div class="panel-header">
            <div class="panel-title">
              <i class="fas fa-info-circle me-2 text-primary"></i>১. সাধারণ তথ্য
            </div>
          </div>
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label fw-semibold">প্রতিষ্ঠানের নাম <span class="text-danger">*</span></label>
              <input type="text" 
                     name="org_name" 
                     class="form-control @error('org_name') is-invalid @enderror" 
                     placeholder="যেমন: DenimCraft BD" 
                     value="{{ old('org_name', $orgSetup->org_name ?? '') }}" 
                     required>
              @error('org_name')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">ইমেইল ঠিকানা</label>
              <input type="email" 
                     name="org_email" 
                     class="form-control @error('org_email') is-invalid @enderror" 
                     placeholder="info@example.com" 
                     value="{{ old('org_email', $orgSetup->org_email ?? '') }}">
              @error('org_email')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">ফোন নম্বর</label>
              <input type="text" 
                     name="org_phone" 
                     class="form-control @error('org_phone') is-invalid @enderror" 
                     placeholder="017XXXXXXXX" 
                     value="{{ old('org_phone', $orgSetup->org_phone ?? '') }}">
              @error('org_phone')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-12">
              <label class="form-label fw-semibold">ঠিকানা</label>
              <input type="text" 
                     name="org_address" 
                     class="form-control @error('org_address') is-invalid @enderror" 
                     placeholder="প্রতিষ্ঠানের সম্পূর্ণ ঠিকানা" 
                     value="{{ old('org_address', $orgSetup->org_address ?? '') }}">
              @error('org_address')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-12">
              <label class="form-label fw-semibold">প্রতিষ্ঠানের বিবরণ</label>
              <textarea name="org_description" 
                        class="form-control @error('org_description') is-invalid @enderror" 
                        rows="3" 
                        placeholder="প্রতিষ্ঠান সম্পর্কে সংক্ষিপ্ত তথ্য">{{ old('org_description', $orgSetup->org_description ?? '') }}</textarea>
              @error('org_description')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>
          </div>
        </div>
      </div>

      <!-- ২. লোগো ও ব্র্যান্ডিং -->
      <div class="col-lg-6">
        <div class="card-panel h-100">
          <div class="panel-header">
            <div class="panel-title">
              <i class="fas fa-image me-2 text-primary"></i>২. লোগো ও ব্র্যান্ডিং
            </div>
          </div>
          <div class="row g-3">
            <!-- লোগো -->
            <div class="col-12">
              <label class="form-label fw-semibold">প্রতিষ্ঠানের লোগো</label>
              <div class="d-flex align-items-center gap-3 mb-2">
                <div id="logoPreviewWrapper" class="border rounded p-2 text-center" style="width: 90px; height: 90px; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
                  @if($orgSetup && $orgSetup->org_logo && file_exists(public_path($orgSetup->org_logo)))
                    <img id="logoPreview" src="{{ asset($orgSetup->org_logo) }}" alt="Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                  @else
                    <img id="logoPreview" src="" alt="Logo Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; display: none;">
                    <i id="logoIcon" class="fas fa-image text-muted fs-3"></i>
                  @endif
                </div>
                <div class="flex-grow-1">
                  <input type="file" 
                         name="org_logo" 
                         id="orgLogoInput" 
                         accept="image/*" 
                         class="form-control @error('org_logo') is-invalid @enderror"
                         onchange="previewImage(this, 'logoPreview', 'logoIcon')">
                  <small class="text-muted d-block mt-1">সমর্থিত ফরম্যাট: PNG, JPG, JPEG, WEBP, SVG (সর্বোচ্চ ২MB)</small>
                  @error('org_logo')
                    <div class="invalid-feedback">{{ $message }}</div>
                  @enderror
                </div>
              </div>
            </div>

            <!-- ফেভিকন -->
            <div class="col-12">
              <label class="form-label fw-semibold">ওয়েবসাইট ফেভিকন (Favicon)</label>
              <div class="d-flex align-items-center gap-3 mb-2">
                <div id="faviconPreviewWrapper" class="border rounded p-2 text-center" style="width: 50px; height: 50px; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
                  @if($orgSetup && $orgSetup->org_favicon && file_exists(public_path($orgSetup->org_favicon)))
                    <img id="faviconPreview" src="{{ asset($orgSetup->org_favicon) }}" alt="Favicon" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                  @else
                    <img id="faviconPreview" src="" alt="Favicon Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; display: none;">
                    <i id="faviconIcon" class="fas fa-globe text-muted fs-4"></i>
                  @endif
                </div>
                <div class="flex-grow-1">
                  <input type="file" 
                         name="org_favicon" 
                         id="orgFaviconInput" 
                         accept="image/*,.ico" 
                         class="form-control @error('org_favicon') is-invalid @enderror"
                         onchange="previewImage(this, 'faviconPreview', 'faviconIcon')">
                  <small class="text-muted d-block mt-1">সমর্থিত ফরম্যাট: ICO, PNG, JPG (সর্বোচ্চ ১MB)</small>
                  @error('org_favicon')
                    <div class="invalid-feedback">{{ $message }}</div>
                  @enderror
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ৩. এসইও মেটা সেটিংস -->
      <div class="col-lg-6">
        <div class="card-panel h-100">
          <div class="panel-header">
            <div class="panel-title">
              <i class="fas fa-search me-2 text-primary"></i>৩. এসইও মেটা সেটিংস
            </div>
          </div>
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label fw-semibold">মেটা টাইটেল (Meta Title)</label>
              <input type="text" 
                     name="org_meta_title" 
                     class="form-control @error('org_meta_title') is-invalid @enderror" 
                     placeholder="এসইও ফ্রেন্ডলি টাইটেল" 
                     value="{{ old('org_meta_title', $orgSetup->org_meta_title ?? '') }}">
              @error('org_meta_title')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-12">
              <label class="form-label fw-semibold">মেটা কিওয়ার্ড (Meta Keywords)</label>
              <input type="text" 
                     name="org_meta_keywords" 
                     class="form-control @error('org_meta_keywords') is-invalid @enderror" 
                     placeholder="কমা দিয়ে কিওয়ার্ড লিখুন (যেমন: denim, jeans, clothing)" 
                     value="{{ old('org_meta_keywords', $orgSetup->org_meta_keywords ?? '') }}">
              @error('org_meta_keywords')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-12">
              <label class="form-label fw-semibold">মেটা বিবরণ (Meta Description)</label>
              <textarea name="org_meta_description" 
                        class="form-control @error('org_meta_description') is-invalid @enderror" 
                        rows="3" 
                        placeholder="সার্চ ইঞ্জিনে প্রদর্শনের জন্য বিবরণ">{{ old('org_meta_description', $orgSetup->org_meta_description ?? '') }}</textarea>
              @error('org_meta_description')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>
          </div>
        </div>
      </div>

      <!-- ৪. লোকালাইজেশন ও মুদ্রা সেটিংস -->
      <div class="col-lg-6">
        <div class="card-panel h-100">
          <div class="panel-header">
            <div class="panel-title">
              <i class="fas fa-globe-asia me-2 text-primary"></i>৪. লোকালাইজেশন ও কারেন্সি সেটিংস
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">টাইমজোন (Timezone)</label>
              <input type="text" 
                     name="org_timezone" 
                     class="form-control @error('org_timezone') is-invalid @enderror" 
                     placeholder="যেমন: Asia/Dhaka" 
                     value="{{ old('org_timezone', $orgSetup->org_timezone ?? 'Asia/Dhaka') }}">
              @error('org_timezone')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">তারিখ ফরম্যাট</label>
              <select name="org_date_format" class="form-select @error('org_date_format') is-invalid @enderror">
                @php $dateFormat = old('org_date_format', $orgSetup->org_date_format ?? 'd-m-Y'); @endphp
                <option value="d-m-Y" {{ $dateFormat == 'd-m-Y' ? 'selected' : '' }}>DD-MM-YYYY ({{ date('d-m-Y') }})</option>
                <option value="Y-m-d" {{ $dateFormat == 'Y-m-d' ? 'selected' : '' }}>YYYY-MM-DD ({{ date('Y-m-d') }})</option>
                <option value="d M, Y" {{ $dateFormat == 'd M, Y' ? 'selected' : '' }}>DD Mon, YYYY ({{ date('d M, Y') }})</option>
                <option value="m/d/Y" {{ $dateFormat == 'm/d/Y' ? 'selected' : '' }}>MM/DD/YYYY ({{ date('m/d/Y') }})</option>
              </select>
              @error('org_date_format')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">সময় ফরম্যাট</label>
              <select name="org_time_format" class="form-select @error('org_time_format') is-invalid @enderror">
                @php $timeFormat = old('org_time_format', $orgSetup->org_time_format ?? '12'); @endphp
                <option value="12" {{ $timeFormat == '12' ? 'selected' : '' }}>১২ ঘণ্টা (03:30 PM)</option>
                <option value="24" {{ $timeFormat == '24' ? 'selected' : '' }}>২৪ ঘণ্টা (15:30)</option>
              </select>
              @error('org_time_format')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">মুদ্রার প্রতীক (Symbol)</label>
              <input type="text" 
                     name="org_currency_symbol" 
                     class="form-control @error('org_currency_symbol') is-invalid @enderror" 
                     placeholder="৳" 
                     value="{{ old('org_currency_symbol', $orgSetup->org_currency_symbol ?? '৳') }}">
              @error('org_currency_symbol')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">মুদ্রার কোড (Currency Code)</label>
              <input type="text" 
                     name="org_currency_code" 
                     class="form-control @error('org_currency_code') is-invalid @enderror" 
                     placeholder="BDT" 
                     value="{{ old('org_currency_code', $orgSetup->org_currency_code ?? 'BDT') }}">
              @error('org_currency_code')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">মুদ্রার অবস্থান</label>
              <select name="org_currency_position" class="form-select @error('org_currency_position') is-invalid @enderror">
                @php $currPos = old('org_currency_position', $orgSetup->org_currency_position ?? 'left'); @endphp
                <option value="left" {{ $currPos == 'left' ? 'selected' : '' }}>বামে (Left - ৳১০০)</option>
                <option value="right" {{ $currPos == 'right' ? 'selected' : '' }}>ডানে (Right - ১০০৳)</option>
              </select>
              @error('org_currency_position')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-4">
              <label class="form-label fw-semibold">দশমিক স্থান (Decimal)</label>
              <input type="number" 
                     name="org_currency_decimal_places" 
                     class="form-control @error('org_currency_decimal_places') is-invalid @enderror" 
                     min="0" 
                     max="4" 
                     value="{{ old('org_currency_decimal_places', $orgSetup->org_currency_decimal_places ?? '2') }}">
              @error('org_currency_decimal_places')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-4">
              <label class="form-label fw-semibold">প্রতীক অবস্থান</label>
              <select name="org_currency_symbol_position" class="form-select @error('org_currency_symbol_position') is-invalid @enderror">
                @php $symPos = old('org_currency_symbol_position', $orgSetup->org_currency_symbol_position ?? 'before'); @endphp
                <option value="before" {{ $symPos == 'before' ? 'selected' : '' }}>আগে (Before Amount)</option>
                <option value="after" {{ $symPos == 'after' ? 'selected' : '' }}>পরে (After Amount)</option>
              </select>
              @error('org_currency_symbol_position')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

            <div class="col-md-4">
              <label class="form-label fw-semibold">প্রতীক দশমিক</label>
              <input type="number" 
                     name="org_currency_symbol_decimal_places" 
                     class="form-control @error('org_currency_symbol_decimal_places') is-invalid @enderror" 
                     min="0" 
                     max="4" 
                     value="{{ old('org_currency_symbol_decimal_places', $orgSetup->org_currency_symbol_decimal_places ?? '2') }}">
              @error('org_currency_symbol_decimal_places')
                <div class="invalid-feedback">{{ $message }}</div>
              @enderror
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- Action Bar / Submit Button -->
    <div class="card-panel mt-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
      <div>
        <span class="text-muted small">
          <i class="fas fa-shield-alt text-success me-1"></i>
          সকল পরিবর্তন স্বয়ংক্রিয়ভাবে আপনার সিস্টেমে প্রযোজ্য হবে।
        </span>
      </div>
      <div class="d-flex align-items-center gap-2">
        @if($orgSetup)
          <button type="submit" class="btn btn-primary px-4 py-2">
            <i class="fas fa-save me-1"></i> তথ্য আপডেট করুন
          </button>
        @else
          <button type="submit" class="btn btn-primary px-4 py-2">
            <i class="fas fa-plus-circle me-1"></i> তথ্য সংরক্ষণ করুন
          </button>
        @endif
      </div>
    </div>

  </form>

</div>

<script>
function previewImage(input, previewId, iconId) {
  const preview = document.getElementById(previewId);
  const icon = document.getElementById(iconId);
  
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      if (icon) icon.style.display = 'none';
    };
    reader.readAsDataURL(input.files[0]);
  }
}
</script>
@endsection
