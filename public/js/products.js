/* =========================================================================
   BazaarX - Products Catalog & Filter Engine
   Filters: Category, Price Slider, Rating, Search, Flash Deals, Free Delivery
   Sorting: Price Asc/Desc, Rating, Discount, Featured
========================================================================= */

$(document).ready(function () {
  // Master Product Database (12 items)
  const masterProducts = [
    {
      id: 101,
      title: "Ultra 9 Max Smartwatch 2.0 (৭টি স্ট্র্যাপ কম্বো)",
      category: "gadgets",
      categoryName: "গ্যাজেট ও টেক",
      price: 1690,
      oldPrice: 3200,
      discount: 50,
      rating: 4.9,
      reviews: 1840,
      img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80",
      flashDeal: true,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 201,
      title: "৪-ওয়ে সুপার স্ট্রেচেবল ডেনিম জিন্স (২ পিস কম্বো)",
      category: "fashion",
      categoryName: "মেনস ফ্যাশন",
      price: 1790,
      oldPrice: 3300,
      discount: 45,
      rating: 4.9,
      reviews: 2350,
      img: "https://images.unsplash.com/photo-1542272604-780c96856592?w=400&auto=format&fit=crop&q=80",
      flashDeal: true,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 301,
      title: "Pro Wireless ANC Earbuds (৪০ ঘণ্টা ব্যাকআপ)",
      category: "gadgets",
      categoryName: "গ্যাজেট ও টেক",
      price: 1290,
      oldPrice: 2400,
      discount: 46,
      rating: 4.8,
      reviews: 720,
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80",
      flashDeal: true,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 302,
      title: "65W GaN ফাস্ট চার্জার কম্বো (ক্যাবল সহ)",
      category: "gadgets",
      categoryName: "গ্যাজেট ও টেক",
      price: 990,
      oldPrice: 1650,
      discount: 40,
      rating: 4.7,
      reviews: 640,
      img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=80",
      flashDeal: true,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 401,
      title: "প্রিমিয়াম জেনুইন লেদার অটো-লক বেল্ট",
      category: "fashion",
      categoryName: "মেনস ফ্যাশন",
      price: 750,
      oldPrice: 1150,
      discount: 35,
      rating: 4.8,
      reviews: 920,
      img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: false,
      inStock: true
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
      img: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: true,
      inStock: true
    },
    {
      id: 202,
      title: "১০০% কম্বড কটন স্লিম-ফিট পোলো শার্ট",
      category: "fashion",
      categoryName: "মেনস ফ্যাশন",
      price: 590,
      oldPrice: 990,
      discount: 40,
      rating: 4.6,
      reviews: 1120,
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: false,
      inStock: true
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
      img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 102,
      title: "Z8 Ultra 4G স্মার্টওয়াচ (সিম কার্ড সাপোর্টেড)",
      category: "gadgets",
      categoryName: "গ্যাজেট ও টেক",
      price: 2490,
      oldPrice: 3800,
      discount: 34,
      rating: 4.9,
      reviews: 310,
      img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: true,
      inStock: true
    },
    {
      id: 203,
      title: "ক্যাজুয়াল সলিড কালার চিনো প্যান্ট (৩টি কালার)",
      category: "fashion",
      categoryName: "মেনস ফ্যাশন",
      price: 1150,
      oldPrice: 1750,
      discount: 34,
      rating: 4.7,
      reviews: 430,
      img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 503,
      title: "মাল্টি-ফাংশনাল হ্যান্ড ব্লেন্ডার ও চপার সেট",
      category: "home",
      categoryName: "হোম ও কিচেন",
      price: 1890,
      oldPrice: 2800,
      discount: 32,
      rating: 4.8,
      reviews: 290,
      img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: false,
      inStock: true
    },
    {
      id: 504,
      title: "পোর্টেবল রিচার্জেবল মিনি জুসার ব্লেন্ডার",
      category: "home",
      categoryName: "হোম ও কিচেন",
      price: 850,
      oldPrice: 1350,
      discount: 37,
      rating: 4.4,
      reviews: 670,
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80",
      flashDeal: false,
      freeDelivery: false,
      inStock: true
    }
  ];

  let viewMode = 'grid'; // 'grid' or 'list'

  // URL Query Parameters check (e.g. ?cat=gadgets or ?search=watch)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('cat');
  const initialSearch = urlParams.get('search');

  if (initialCat) {
    $('.filter-cat-cb').prop('checked', false);
    $(`.filter-cat-cb[value="${initialCat}"]`).prop('checked', true);
  }
  if (initialSearch) {
    $('#catalogSearchInput').val(initialSearch);
  }

  // -----------------------------------------------------------------------
  // 1. Filter Execution Logic
  // -----------------------------------------------------------------------
  window.applyFilters = function () {
    const searchVal = $('#catalogSearchInput').val().toLowerCase().trim();
    const maxPrice = parseInt($('#priceRangeSlider').val()) || 7000;
    const minRating = parseFloat($('input[name="ratingFilter"]:checked').val()) || 0;
    const onlyFlash = $('#switchFlashDeals').is(':checked');
    const onlyFreeDeliv = $('#switchFreeDelivery').is(':checked');
    const onlyInStock = $('#switchInStock').is(':checked');
    const sortBy = $('#sortSelect').val();

    // Collect Selected Categories
    let selectedCats = [];
    $('.filter-cat-cb:checked').each(function () {
      selectedCats.push($(this).val());
    });

    const isAllCat = selectedCats.includes('all') || selectedCats.length === 0;

    // Filter Items
    let filtered = masterProducts.filter(p => {
      // Search
      if (searchVal && !p.title.toLowerCase().includes(searchVal) && !p.categoryName.toLowerCase().includes(searchVal)) {
        return false;
      }
      // Category
      if (!isAllCat && !selectedCats.includes(p.category)) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      // Rating
      if (p.rating < minRating) {
        return false;
      }
      // Flash deal toggle
      if (onlyFlash && !p.flashDeal) {
        return false;
      }
      // Free Delivery toggle
      if (onlyFreeDeliv && !p.freeDelivery) {
        return false;
      }
      // Stock toggle
      if (onlyInStock && !p.inStock) {
        return false;
      }
      return true;
    });

    // Sorting Logic
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    } // 'featured' keeps original array order

    renderCatalogProducts(filtered);
    updateFilterHeaderTags(isAllCat, selectedCats, maxPrice, filtered.length);
  };

  // -----------------------------------------------------------------------
  // 2. Render Products into DOM
  // -----------------------------------------------------------------------
  function renderCatalogProducts(items) {
    const $container = $('#catalogProductsContainer');
    $container.empty();

    $('#totalFilteredCount, #totalItemsText').text(items.length);
    $('#showingCountText').text(items.length > 0 ? `১-${items.length}` : '০');

    if (items.length === 0) {
      $('#noProductsFound').removeClass('d-none');
      $('#paginationArea').addClass('d-none');
      return;
    }

    $('#noProductsFound').addClass('d-none');
    $('#paginationArea').removeClass('d-none');

    items.forEach(p => {
      const colClass = (viewMode === 'grid') ? 'col' : 'col-12';
      const cardClass = (viewMode === 'list') ? 'product-card list-view-mode' : 'product-card';

      $container.append(`
        <div class="${colClass} font-bn">
          <div class="${cardClass} h-100 p-3 rounded-4 bg-white border position-relative d-flex flex-column shadow-xs">
            <span class="product-discount-badge">-${p.discount}%</span>
            <button class="btn-wishlist-heart" onclick="toggleCatalogWishlist(${p.id}, this)"><i class="far fa-heart"></i></button>

            <a href="product-details.html?id=${p.id}" class="product-img-wrap mb-2 text-center d-block">
              <img src="${p.img}" alt="${p.title}" class="img-fluid product-main-thumb">
            </a>

            <div class="product-meta mt-auto">
              <span class="product-cat-tag">${p.categoryName}</span>
              <h6 class="product-title mb-1">
                <a href="product-details.html?id=${p.id}" class="text-dark text-decoration-none">${p.title}</a>
              </h6>
              
              <div class="d-flex align-items-center gap-1 text-warning small mb-2">
                <i class="fas fa-star"></i><span class="fw-bold text-dark small">${p.rating}</span>
                <span class="text-muted ms-1">(${p.reviews})</span>
                ${p.freeDelivery ? '<span class="badge bg-success-subtle text-success ms-auto small">ফ্রি ডেলিভারি</span>' : ''}
              </div>

              <div class="d-flex align-items-baseline gap-2 mb-3 font-monospace">
                <span class="fs-5 fw-bold text-danger">৳ ${p.price.toLocaleString('en-US')}</span>
                <span class="text-muted text-decoration-line-through small">৳ ${p.oldPrice.toLocaleString('en-US')}</span>
              </div>

              <div class="d-flex gap-2">
                <a href="product-details.html?id=${p.id}" class="btn btn-outline-primary flex-grow-1 py-2 font-bn small fw-bold">
                  বিস্তারিত
                </a>
                <button class="btn btn-add-cart py-2 px-3 font-bn quick-add-btn" data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-img="${p.img}" title="কার্টে যোগ করুন">
                  <i class="fas fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `);
    });
  }

  // -----------------------------------------------------------------------
  // 3. Category & Price Synchronizer
  // -----------------------------------------------------------------------
  window.handleCategoryCheck = function (elem) {
    if ($(elem).val() === 'all' && $(elem).is(':checked')) {
      $('.filter-cat-cb').not('[value="all"]').prop('checked', false);
    } else {
      $('.filter-cat-cb[value="all"]').prop('checked', false);
    }
    applyFilters();
  };

  window.syncAndApplyMobileCat = function (elem) {
    $('.filter-cat-cb').prop('checked', false);
    $(`.filter-cat-cb[value="${$(elem).val()}"]`).prop('checked', true);
  };

  window.updatePriceSlider = function (val) {
    $('#priceRangeDisplay, #mobilePriceVal').text(`৳ ০ - ৳ ${parseInt(val).toLocaleString('en-US')}`);
    $('#mobilePriceSlider').val(val);
    applyFilters();
  };

  window.syncMobilePrice = function (val) {
    $('#priceRangeSlider').val(val);
    $('#priceRangeDisplay, #mobilePriceVal').text(`৳ ০ - ৳ ${parseInt(val).toLocaleString('en-US')}`);
  };

  window.resetAllFilters = function () {
    $('#catalogSearchInput').val('');
    $('.filter-cat-cb').prop('checked', false);
    $('.filter-cat-cb[value="all"]').prop('checked', true);
    $('#priceRangeSlider, #mobilePriceSlider').val(7000);
    $('#priceRangeDisplay, #mobilePriceVal').text('৳ ০ - ৳ ৭,০০০');
    $('input[name="ratingFilter"][value="0"]').prop('checked', true);
    $('#switchFlashDeals, #switchFreeDelivery').prop('checked', false);
    $('#switchInStock').prop('checked', true);
    $('#sortSelect').val('featured');
    applyFilters();
  };

  function updateFilterHeaderTags(isAll, cats, maxPrice, count) {
    if (isAll) {
      $('#tagCategoryPill').text('ক্যাটাগরি: সকল');
    } else {
      $('#tagCategoryPill').text(`ক্যাটাগরি: ${cats.join(', ')}`);
    }
    $('#tagPricePill').text(`সর্বোচ্চ ৳${maxPrice.toLocaleString('en-US')}`);
  }

  // -----------------------------------------------------------------------
  // 4. View Mode Switcher (Grid vs List)
  // -----------------------------------------------------------------------
  window.switchViewMode = function (mode) {
    viewMode = mode;
    if (mode === 'grid') {
      $('#btnGridView').addClass('active');
      $('#btnListView').removeClass('active');
      $('#catalogProductsContainer').removeClass('row-cols-1').addClass('row-cols-sm-2 row-cols-md-3');
    } else {
      $('#btnListView').addClass('active');
      $('#btnGridView').removeClass('active');
      $('#catalogProductsContainer').removeClass('row-cols-sm-2 row-cols-md-3').addClass('row-cols-1');
    }
    applyFilters();
  };

  // -----------------------------------------------------------------------
  // 5. Wishlist & Cart Actions
  // -----------------------------------------------------------------------
  window.toggleCatalogWishlist = function (id, elem) {
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

  // Live typing search listener
  $('#catalogSearchInput').on('input', function () {
    applyFilters();
  });

  // Cart Drawer counter update
  function updateCartHeader() {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    let count = 0;
    let subtotal = 0;
    cart.forEach(i => { count += i.qty; subtotal += i.price * i.qty; });
    $('#cartCountBadge, #cartDrawerCount').text(count);
    $('#cartTotalHeader').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#cartSubtotalText').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#cartTotalPayableText').text('৳ ' + (subtotal + 70).toLocaleString('en-US'));
  }

  // Quick Add Click Handler
  $(document).on('click', '.quick-add-btn', function () {
    const id = $(this).data('id');
    const title = $(this).data('title');
    const price = parseInt($(this).data('price'));
    const img = $(this).data('img');

    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    const existingIndex = cart.findIndex(c => c.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ id, title, price, img, qty: 1 });
    }
    localStorage.setItem('bazaarx_cart', JSON.stringify(cart));
    updateCartHeader();

    const cartCanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartCanvas.show();
  });

  // Initial Run
  applyFilters();
  updateCartHeader();
});

