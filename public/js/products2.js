/* =========================================================================
   BazaarX 2.0 - Ultra-Modern Product Logic
   Modern Card Rendering with Color Swatches, Live Stock Meters,
   Interactive Filtering, Toast Alerts & Cart Synchronization
========================================================================= */

$(document).ready(function () {
  // Ultra-Modern Products Catalog (12 Products with Color Swatches & Stock metrics)
  const v2ProductCatalog = [
    {
      id: 101,
      title: "Ultra 9 Max Smartwatch 2.0 (৭টি স্ট্র্যাপ কম্বো)",
      category: "gadgets",
      categoryName: "স্মার্ট গ্যাজেট",
      price: 1690,
      oldPrice: 3200,
      discount: 50,
      rating: 4.9,
      reviews: 1840,
      tag: "বেস্ট সেলার 🔥",
      stockPercent: 82,
      soldCount: 74,
      swatches: [
        { color: "সিলভার", hex: "#cbd5e1", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80" },
        { color: "ব্ল্যাক", hex: "#0f172a", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80" },
        { color: "অরেঞ্জ", hex: "#ea580c", img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 201,
      title: "৪-ওয়ে সুপার স্ট্রেচেবল ডেনিম জিন্স (২ পিস কম্বো)",
      category: "fashion",
      categoryName: "মেনস ডেনিম",
      price: 1790,
      oldPrice: 3300,
      discount: 45,
      rating: 4.9,
      reviews: 2350,
      tag: "১০০% এক্সপোর্ট 🏆",
      stockPercent: 78,
      soldCount: 92,
      swatches: [
        { color: "ডিপ ব্লু", hex: "#1e3a8a", img: "https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80" },
        { color: "জেট ব্ল্যাক", hex: "#020617", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80" },
        { color: "স্কাই ব্লু", hex: "#38bdf8", img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1542272604-780c96856592?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 301,
      title: "Pro Wireless ANC Earbuds (৪০ ঘণ্টা ব্যাকআপ)",
      category: "audio",
      categoryName: "অডিও ও সাউন্ড",
      price: 1290,
      oldPrice: 2400,
      discount: 46,
      rating: 4.8,
      reviews: 720,
      tag: "নয়েজ ফ্রি 🎧",
      stockPercent: 65,
      soldCount: 48,
      swatches: [
        { color: "হোয়াইট", hex: "#f8fafc", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80" },
        { color: "ডার্ক ব্ল্যাক", hex: "#0f172a", img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 302,
      title: "65W GaN ফাস্ট চার্জার কম্বো (ক্যাবল সহ)",
      category: "gadgets",
      categoryName: "চার্জার ও এক্সেসরিজ",
      price: 990,
      oldPrice: 1650,
      discount: 40,
      rating: 4.7,
      reviews: 640,
      tag: "সুপার ফাস্ট ⚡",
      stockPercent: 90,
      soldCount: 115,
      swatches: [
        { color: "হোয়াইট", hex: "#ffffff", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 401,
      title: "প্রিমিয়াম জেনুইন লেদার অটো-লক বেল্ট",
      category: "fashion",
      categoryName: "ফ্যাশন এক্সেসরিজ",
      price: 750,
      oldPrice: 1150,
      discount: 35,
      rating: 4.8,
      reviews: 920,
      tag: "১০০% লেদার 💼",
      stockPercent: 72,
      soldCount: 85,
      swatches: [
        { color: "ডার্ক ব্রাউন", hex: "#451a03", img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 501,
      title: "স্মার্ট ডিজিটাল এয়ার ফ্রায়ার (৪.৫ লিটার)",
      category: "home",
      categoryName: "হোম ও কিচেন",
      price: 4490,
      oldPrice: 6400,
      discount: 30,
      rating: 4.8,
      reviews: 480,
      tag: "ফ্রি ডেলিভারি 🚚",
      stockPercent: 58,
      soldCount: 42,
      swatches: [
        { color: "ম্যাট ব্ল্যাক", hex: "#0f172a", img: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 202,
      title: "১০০% কম্বড কটন স্লিম-ফিট পোলো শার্ট",
      category: "fashion",
      categoryName: "মেনস পোলো",
      price: 590,
      oldPrice: 990,
      discount: 40,
      rating: 4.6,
      reviews: 1120,
      tag: "কমফোর্ট কটন",
      stockPercent: 88,
      soldCount: 140,
      swatches: [
        { color: "নেভি ব্লু", hex: "#1e3a8a", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 502,
      title: "এলইডি টেম্পারেচার ডিসপ্লে ভ্যাকুয়াম ফ্লাস্ক",
      category: "home",
      categoryName: "হোম ও কিচেন",
      price: 490,
      oldPrice: 750,
      discount: 35,
      rating: 4.5,
      reviews: 590,
      tag: "স্মার্ট সেন্সর 🌡️",
      stockPercent: 92,
      soldCount: 210,
      swatches: [
        { color: "সিলভার", hex: "#94a3b8", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 102,
      title: "Z8 Ultra 4G স্মার্টওয়াচ (সিম কার্ড সাপোর্টেড)",
      category: "gadgets",
      categoryName: "স্মার্ট গ্যাজেট",
      price: 2490,
      oldPrice: 3800,
      discount: 34,
      rating: 4.9,
      reviews: 310,
      tag: "4G কলিং 📲",
      stockPercent: 50,
      soldCount: 30,
      swatches: [
        { color: "সিলভার", hex: "#cbd5e1", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 203,
      title: "ক্যাজুয়াল সলিড কালার চিনো প্যান্ট (৩টি কালার)",
      category: "fashion",
      categoryName: "মেনস বটমস",
      price: 1150,
      oldPrice: 1750,
      discount: 34,
      rating: 4.7,
      reviews: 430,
      tag: "স্ট্রেচ ফিট",
      stockPercent: 68,
      soldCount: 55,
      swatches: [
        { color: "খাকি", hex: "#a38259", img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 503,
      title: "মাল্টি-ফাংশনাল হ্যান্ড ব্লেন্ডার ও চপার সেট",
      category: "home",
      categoryName: "কিচেন টেক",
      price: 1890,
      oldPrice: 2800,
      discount: 32,
      rating: 4.8,
      reviews: 290,
      tag: "হেভি মোটর 🌪️",
      stockPercent: 62,
      soldCount: 38,
      swatches: [
        { color: "মেটালিক", hex: "#64748b", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: 504,
      title: "পোর্টেবল রিচার্জেবল মিনি জুসার ব্লেন্ডার",
      category: "home",
      categoryName: "স্মার্ট কিচেন",
      price: 850,
      oldPrice: 1350,
      discount: 37,
      rating: 4.4,
      reviews: 670,
      tag: "ইউএসবি চার্জ 🔋",
      stockPercent: 80,
      soldCount: 95,
      swatches: [
        { color: "পিংক", hex: "#f472b6", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80" }
      ],
      currentImg: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80"
    }
  ];

  let activeCategory = 'all';
  let maxPriceLimit = 7000;

  // -----------------------------------------------------------------------
  // 1. Render Products in Brand New Modern Cards
  // -----------------------------------------------------------------------
  function renderModernGrid(products) {
    const $container = $('#v2ProductsContainer');
    $container.empty();

    $('#v2ProductCount').text(products.length);

    if (products.length === 0) {
      $('#v2EmptyState').removeClass('d-none');
      return;
    }
    $('#v2EmptyState').addClass('d-none');

    products.forEach((p, idx) => {
      // Swatches HTML
      let swatchesHtml = '';
      if (p.swatches && p.swatches.length > 1) {
        swatchesHtml = '<div class="card-swatches-strip">';
        p.swatches.forEach((sw, sIdx) => {
          swatchesHtml += `
            <div class="swatch-circle ${sIdx === 0 ? 'active' : ''}" 
                 style="background: ${sw.hex};" 
                 title="${sw.color}" 
                 onclick="switchCardPhoto(${p.id}, '${sw.img}', this, event)">
            </div>
          `;
        });
        swatchesHtml += `<span class="swatch-more-tag">+${p.swatches.length} কালার</span></div>`;
      }

      $container.append(`
        <div class="col font-bn">
          <div class="modern-product-card h-100" id="card-${p.id}">
            
            <!-- Media Container -->
            <div class="modern-card-media">
              <!-- Floating Top Badges -->
              <div class="card-floating-badges">
                <span class="badge-pill-discount">-${p.discount}% OFF</span>
                <span class="badge-pill-tag">${p.tag}</span>
              </div>

              <!-- Floating Quick Actions -->
              <div class="card-hover-actions">
                <button type="button" class="btn-card-action" onclick="toggleV2Wishlist(${p.id}, this, event)" title="উইশলিস্টে রাখুন">
                  <i class="far fa-heart"></i>
                </button>
                <a href="product-details.html?id=${p.id}" class="btn-card-action" title="ডিটেইলস ভিউ">
                  <i class="fas fa-eye"></i>
                </a>
              </div>

              <!-- Main Image -->
              <a href="product-details.html?id=${p.id}" class="w-100 h-100 d-block">
                <img src="${p.currentImg}" alt="${p.title}" class="modern-card-img" id="img-${p.id}">
              </a>
            </div>

            <!-- Card Body -->
            <div class="modern-card-body">
              ${swatchesHtml}

              <div class="card-category-text mt-1">${p.categoryName}</div>
              <h5 class="card-product-heading">
                <a href="product-details.html?id=${p.id}" class="text-decoration-none text-dark">${p.title}</a>
              </h5>

              <!-- Rating Row -->
              <div class="card-rating-row">
                <i class="fas fa-star"></i>
                <span class="fw-bold text-dark">${p.rating}</span>
                <span class="text-muted small">(${p.reviews.toLocaleString('en-US')})</span>
                <span class="text-success small ms-auto fw-bold"><i class="fas fa-check-circle me-1"></i>ইন স্টক</span>
              </div>

              <!-- Price Row -->
              <div class="card-price-row">
                <span class="price-current">৳ ${p.price.toLocaleString('en-US')}</span>
                <span class="price-original">৳ ${p.oldPrice.toLocaleString('en-US')}</span>
                <span class="save-percent-tag">৳ ${(p.oldPrice - p.price).toLocaleString('en-US')} ছাড়</span>
              </div>

              <!-- Micro Stock Bar -->
              <div class="micro-stock-bar" title="${p.soldCount}টি বিক্রি হয়েছে">
                <div class="micro-stock-fill" style="width: ${p.stockPercent}%;"></div>
              </div>

              <!-- Dual Action Buttons -->
              <div class="card-action-btns">
                <a href="product-details.html?id=${p.id}" class="btn-modern-details font-bn">
                  <i class="fas fa-circle-info me-1"></i> বিস্তারিত
                </a>
                <button type="button" class="btn-modern-add-cart font-bn" onclick="addModernToCart(${p.id})">
                  <i class="fas fa-bag-shopping me-1"></i> অর্ডার করুন
                </button>
              </div>

            </div>

          </div>
        </div>
      `);
    });
  }

  // -----------------------------------------------------------------------
  // 2. Interactive Color Swatch Click
  // -----------------------------------------------------------------------
  window.switchCardPhoto = function (productId, imgSrc, elem, event) {
    if (event) event.stopPropagation();
    $(`#img-${productId}`).fadeOut(100, function () {
      $(this).attr('src', imgSrc).fadeIn(150);
    });
    $(`#card-${productId} .swatch-circle`).removeClass('active');
    $(elem).addClass('active');
  };

  // -----------------------------------------------------------------------
  // 3. Filter Execution Logic
  // -----------------------------------------------------------------------
  window.filterV2Products = function () {
    const searchVal = $('#v2SearchInput').val().toLowerCase().trim();
    const sortBy = $('#v2SortSelect').val();

    let filtered = v2ProductCatalog.filter(p => {
      // Search check
      if (searchVal && !p.title.toLowerCase().includes(searchVal) && !p.categoryName.toLowerCase().includes(searchVal)) {
        return false;
      }
      // Category check
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Price limit
      if (p.price > maxPriceLimit) {
        return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    }

    renderModernGrid(filtered);

    // Update Tag Pills
    const catLabels = { all: "সকল পণ্য", gadgets: "গ্যাজেট ও টেক", fashion: "ডেনিম ও ফ্যাশন", home: "হোম ও কিচেন", audio: "অডিও ও সাউন্ড" };
    $('#v2ActiveCatTag').text(`ক্যাটাগরি: ${catLabels[activeCategory] || "সকল পণ্য"}`);
    $('#v2ActivePriceTag').text(`সর্বোচ্চ ৳ ${maxPriceLimit.toLocaleString('en-US')}`);
  };

  window.selectQuickCategory = function (category, elem) {
    $('.btn-cat-v2').removeClass('active');
    $(elem).addClass('active');
    activeCategory = category;
    filterV2Products();
  };

  window.handlePriceSlider = function (val) {
    maxPriceLimit = parseInt(val);
    $('#v2SliderPriceDisplay').text(`৳ ${maxPriceLimit.toLocaleString('en-US')}`);
    filterV2Products();
  };

  window.resetV2Filters = function () {
    $('#v2SearchInput').val('');
    $('#clearSearchBtn').addClass('d-none');
    activeCategory = 'all';
    $('.btn-cat-v2').removeClass('active');
    $('.btn-cat-v2[data-cat="all"]').addClass('active');
    maxPriceLimit = 7000;
    $('#v2PriceSlider').val(7000);
    $('#v2SliderPriceDisplay').text('৳ ৭,০০০');
    $('#v2SortSelect').val('featured');
    filterV2Products();
  };

  // Search Input live typing
  $('#v2SearchInput').on('input', function () {
    const val = $(this).val();
    if (val.length > 0) {
      $('#clearSearchBtn').removeClass('d-none');
    } else {
      $('#clearSearchBtn').addClass('d-none');
    }
    filterV2Products();
  });

  window.clearSearchInput = function () {
    $('#v2SearchInput').val('');
    $('#clearSearchBtn').addClass('d-none');
    filterV2Products();
  };

  // -----------------------------------------------------------------------
  // 4. Cart Engine & Toast Notification
  // -----------------------------------------------------------------------
  window.addModernToCart = function (productId) {
    const p = v2ProductCatalog.find(item => item.id === productId);
    if (!p) return;

    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    const existingIndex = cart.findIndex(c => c.id === p.id);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: p.id,
        title: p.title,
        price: p.price,
        img: p.currentImg,
        qty: 1
      });
    }

    localStorage.setItem('bazaarx_cart', JSON.stringify(cart));
    updateV2CartUI();

    // Show Toast
    $('#v2ToastTitle').text(`${p.title} কার্টে যোগ হয়েছে!`);
    const toast = new bootstrap.Toast(document.getElementById('v2CartToast'));
    toast.show();
  };

  function updateV2CartUI() {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    let count = 0;
    let subtotal = 0;

    cart.forEach(c => {
      count += c.qty;
      subtotal += c.price * c.qty;
    });

    $('#v2CartBubble, #v2DrawerCount').text(count);
    $('#v2CartTotalText').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#v2SubtotalText').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#v2TotalPayableText').text('৳ ' + (subtotal + 70).toLocaleString('en-US'));

    renderDrawerList(cart);
  }

  function renderDrawerList(cart) {
    const $list = $('#v2CartItemsList');
    $list.empty();

    if (cart.length === 0) {
      $('#v2CartEmpty').removeClass('d-none');
      $('#v2CartFooter').addClass('d-none');
      return;
    }

    $('#v2CartEmpty').addClass('d-none');
    $('#v2CartFooter').removeClass('d-none');

    cart.forEach((item, idx) => {
      $list.append(`
        <div class="cart-item-row font-bn">
          <img src="${item.img}" alt="${item.title}" class="cart-item-thumb">
          <div class="flex-grow-1 overflow-hidden">
            <h6 class="mb-1 text-truncate text-dark small fw-bold">${item.title}</h6>
            <div class="text-danger fw-bold font-monospace small mb-1">৳ ${item.price.toLocaleString('en-US')}</div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="small text-muted font-monospace">পরিমাণ: x${item.qty}</span>
              <button class="btn btn-sm text-danger p-0 border-0" onclick="removeModernCartItem(${idx})">
                <i class="far fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `);
    });
  }

  window.removeModernCartItem = function (idx) {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    cart.splice(idx, 1);
    localStorage.setItem('bazaarx_cart', JSON.stringify(cart));
    updateV2CartUI();
  };

  window.toggleV2Wishlist = function (id, elem, event) {
    if (event) event.stopPropagation();
    let wishlist = JSON.parse(localStorage.getItem('bazaarx_wishlist') || '[]');
    const idx = wishlist.indexOf(id);

    if (idx > -1) {
      wishlist.splice(idx, 1);
      $(elem).removeClass('active');
    } else {
      wishlist.push(id);
      $(elem).addClass('active');
    }
    localStorage.setItem('bazaarx_wishlist', JSON.stringify(wishlist));
  };

  // Initial Run
  filterV2Products();
  updateV2CartUI();
});

