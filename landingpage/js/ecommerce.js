/* =========================================================================
   BazaarX - E-Commerce Home Page Interactive Logic
   Cart Engine, Search Autocomplete, Quick View, Checkout & Tracking
========================================================================= */

$(document).ready(function () {
  // Global Product Catalog
  const productCatalog = {
    101: {
      id: 101,
      title: "Ultra 9 Max Smartwatch (৭টি স্ট্র্যাপ কম্বো)",
      category: "স্মার্ট গ্যাজেট",
      price: 1690,
      oldPrice: 3200,
      img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80",
      desc: "২.২ ইঞ্চি এইচডি AMOLED ডিসপ্লে, ফুল ব্লুটুথ কলিং, হার্টরেট মনিটর এবং ৭টি প্রিমিয়াম স্ট্র্যাপ সহ বিশেষ কম্বো প্যাক।"
    },
    201: {
      id: 201,
      title: "৪-ওয়ে সুপার স্ট্রেচেবল ডেনিম জিন্স (২ পিস কম্বো)",
      category: "মেনস ফ্যাশন",
      price: 1790,
      oldPrice: 3300,
      img: "https://images.unsplash.com/photo-1542272604-780c96856592?w=400&auto=format&fit=crop&q=80",
      desc: "১০০% প্রিমিয়াম এক্সপোর্ট কটন ও লাইক্রা ব্লেন্ড। পরলে দারুণ আরাম এবং ১০০% পাকা কালার গ্যারান্টি।"
    },
    301: {
      id: 301,
      title: "Pro Wireless ANC Earbuds (৪০ ঘণ্টা ব্যাকআপ)",
      category: "অডিও ও সাউন্ড",
      price: 1290,
      oldPrice: 2400,
      img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80",
      desc: "অ্যাক্টিভ নয়েজ ক্যানসেলেশন, গেমিং আল্ট্রা-লো লেটেন্সি এবং ক্রিস্টাল ক্লিয়ার কলিং মাইক।"
    },
    302: {
      id: 302,
      title: "65W GaN ফাস্ট চার্জার কম্বো (ক্যাবল সহ)",
      category: "চার্জার ও এক্সেসরিজ",
      price: 990,
      oldPrice: 1650,
      img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=80",
      desc: "একসাথে ফোন ও ল্যাপটপ চার্জ করার নিরাপদ ও আধুনিক GaN টেকনোলজি চার্জার।"
    },
    401: {
      id: 401,
      title: "প্রিমিয়াম জেনুইন লেদার অটো-লক বেল্ট",
      category: "ফ্যাশন এক্সেসরিজ",
      price: 750,
      oldPrice: 1150,
      img: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&auto=format&fit=crop&q=80",
      desc: "১০০% আসল লেদার, মরিচারোধক অ্যালয় মেটাল অটোমেটিক বাকেল।"
    },
    501: {
      id: 501,
      title: "স্মার্ট ডিজিটাল এয়ার ফ্রায়ার (৪.৫ লিটার)",
      category: "হোম ও কিচেন",
      price: 4490,
      oldPrice: 6400,
      img: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&auto=format&fit=crop&q=80",
      desc: "তেল ছাড়া স্বাস্থ্যকর ফ্রাই ও বেকিং করার জন্য ৮টি প্রি-সেট টাচস্ক্রিন মেনু।"
    },
    202: {
      id: 202,
      title: "১০০% কম্বড কটন স্লিম-ফিট পোলো শার্ট",
      category: "মেনস ফ্যাশন",
      price: 590,
      oldPrice: 990,
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80",
      desc: "প্রিমিয়াম ড্রপ-নিডল কটন ফেব্রিক, কোনো রুক্ষতা নেই, অত্যন্ত আরামদায়ক।"
    },
    502: {
      id: 502,
      title: "এলইডি টেম্পারেচার ডিসপ্লে ভ্যাকুয়াম ফ্লাস্ক",
      category: "হোম ও কিচেন",
      price: 490,
      oldPrice: 750,
      img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80",
      desc: "১২ ঘণ্টা গরম ও ২৪ ঘণ্টা ঠান্ডা রাখার ডাবল-ওয়াল ইনসুলেশন।"
    }
  };

  // State Management (Cart & Wishlist)
  let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('bazaarx_wishlist') || '[]');
  let deliveryCharge = 70;

  // Initialize Cart with 1 Demo item if completely new (to show populated cart beauty)
  if (cart.length === 0) {
    cart.push({
      id: 101,
      title: productCatalog[101].title,
      price: productCatalog[101].price,
      img: productCatalog[101].img,
      qty: 1
    });
    saveCart();
  }

  // -----------------------------------------------------------------------
  // 1. Live Flash Sale Countdown Timer
  // -----------------------------------------------------------------------
  function runFlashCountdown() {
    let hours = 6;
    let minutes = 34;
    let seconds = 48;

    setInterval(function () {
      if (seconds > 0) {
        seconds--;
      } else {
        if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else {
            hours = 5;
            minutes = 59;
            seconds = 59;
          }
        }
      }

      $('#flashHours').text(hours < 10 ? '0' + hours : hours);
      $('#flashMins').text(minutes < 10 ? '0' + minutes : minutes);
      $('#flashSecs').text(seconds < 10 ? '0' + seconds : seconds);
    }, 1000);
  }
  runFlashCountdown();

  // -----------------------------------------------------------------------
  // 2. Global Search & Live Autocomplete
  // -----------------------------------------------------------------------
  const $searchInput = $('#globalSearchInput');
  const $searchAutocomplete = $('#searchAutocomplete');
  const $suggestionsList = $('#searchSuggestionsList');

  $searchInput.on('input focus', function () {
    const query = $(this).val().toLowerCase().trim();
    $suggestionsList.empty();

    let matches = [];
    Object.values(productCatalog).forEach(p => {
      if (query === '' || p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) {
        matches.push(p);
      }
    });

    if (matches.length > 0) {
      matches.slice(0, 5).forEach(m => {
        $suggestionsList.append(`
          <li class="search-autocomplete-item" onclick="openQuickView(${m.id})">
            <div class="d-flex align-items-center gap-2">
              <img src="${m.img}" alt="${m.title}" style="width:36px; height:36px; object-fit:cover; border-radius:6px;">
              <div>
                <div class="text-dark fw-bold small text-truncate" style="max-width:240px;">${m.title}</div>
                <small class="text-muted">${m.category}</small>
              </div>
            </div>
            <div class="text-danger fw-bold font-monospace small">৳ ${m.price.toLocaleString('en-US')}</div>
          </li>
        `);
      });
      $searchAutocomplete.removeClass('d-none');
    } else {
      $suggestionsList.append(`
        <li class="p-3 text-center text-muted small">কোনো পণ্য খুঁজে পাওয়া যায়নি।</li>
      `);
      $searchAutocomplete.removeClass('d-none');
    }
  });

  // Close autocomplete on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.header-search-wrap').length) {
      $searchAutocomplete.addClass('d-none');
    }
  });

  // -----------------------------------------------------------------------
  // 3. Category Filter Tabs
  // -----------------------------------------------------------------------
  window.filterProducts = function (category, element) {
    $('#productFilterTabs .nav-link').removeClass('active');
    $(element).addClass('active');

    if (category === 'all') {
      $('.product-item').fadeIn(200);
    } else {
      $('.product-item').each(function () {
        if ($(this).data('category') === category) {
          $(this).fadeIn(200);
        } else {
          $(this).fadeOut(150);
        }
      });
    }
  };

  // -----------------------------------------------------------------------
  // 4. Cart Engine (Add, Remove, Quantity Update & Free Delivery Bar)
  // -----------------------------------------------------------------------
  function saveCart() {
    localStorage.setItem('bazaarx_cart', JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    const $cartList = $('#cartItemsList');
    $cartList.empty();

    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
      $('#emptyCartView').removeClass('d-none');
      $('#cartFooterSection').addClass('d-none');
    } else {
      $('#emptyCartView').addClass('d-none');
      $('#cartFooterSection').removeClass('d-none');

      cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        totalItems += item.qty;

        $cartList.append(`
          <div class="cart-item-row font-bn">
            <img src="${item.img}" alt="${item.title}" class="cart-item-thumb">
            <div class="flex-grow-1 overflow-hidden">
              <h6 class="mb-1 text-truncate text-dark small fw-bold">${item.title}</h6>
              <div class="text-danger fw-bold font-monospace small mb-1">৳ ${item.price.toLocaleString('en-US')}</div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center gap-1">
                  <button class="btn-qty-mini" onclick="updateItemQty(${index}, -1)">-</button>
                  <span class="px-2 small fw-bold font-monospace">${item.qty}</span>
                  <button class="btn-qty-mini" onclick="updateItemQty(${index}, 1)">+</button>
                </div>
                <button class="btn btn-sm text-danger p-0 border-0" onclick="removeCartItem(${index})" title="মুছে ফেলুন">
                  <i class="far fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        `);
      });
    }

    // Delivery Area Selection from Radio
    deliveryCharge = parseInt($('input[name="cartDeliveryArea"]:checked').val()) || 70;

    // Free delivery threshold: If subtotal >= 2500, delivery is FREE
    const freeDeliveryThreshold = 2500;
    const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

    $('#freeDeliveryProgressBar').css('width', progressPercent + '%');

    if (subtotal >= freeDeliveryThreshold && subtotal > 0) {
      deliveryCharge = 0;
      $('#freeDeliveryText').html('<i class="fas fa-circle-check text-success me-1"></i> অভিনন্দন! আপনি <strong>ফ্রি ডেলিভারি</strong> পাচ্ছেন!');
      $('#cartDeliveryChargeText').html('<span class="badge bg-success text-white">ফ্রি (৳০)</span>');
    } else {
      const remaining = freeDeliveryThreshold - subtotal;
      $('#freeDeliveryText').html(`<i class="fas fa-truck-fast text-primary me-1"></i> আর <strong>৳ ${remaining.toLocaleString('en-US')}</strong> এর কেনাকাটা করলেই <strong>ফ্রি ডেলিভারি!</strong>`);
      $('#cartDeliveryChargeText').text('৳ ' + deliveryCharge);
    }

    const totalPayable = subtotal + (subtotal > 0 ? deliveryCharge : 0);

    // Update Badges & Counters
    $('#cartCountBadge, #mobileBottomCartBadge, #cartDrawerCount').text(totalItems);
    $('#cartTotalHeader').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#cartSubtotalText').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#cartTotalPayableText').text('৳ ' + totalPayable.toLocaleString('en-US'));
  }

  window.updateItemQty = function (index, delta) {
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      saveCart();
    }
  };

  window.removeCartItem = function (index) {
    cart.splice(index, 1);
    saveCart();
  };

  window.updateCartCalculations = function () {
    renderCart();
  };

  // Quick Add Button Listener
  $(document).on('click', '.quick-add-btn', function () {
    const id = $(this).data('id');
    const title = $(this).data('title');
    const price = parseInt($(this).data('price'));
    const img = $(this).data('img');

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({ id, title, price, img, qty: 1 });
    }

    saveCart();

    // Visual Feedback button animation
    const $btn = $(this);
    const originalText = $btn.html();
    $btn.html('<i class="fas fa-check text-success me-1"></i>কার্টে যুক্ত!');
    setTimeout(() => { $btn.html(originalText); }, 1000);

    // Open Cart Offcanvas automatically
    const cartCanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartCanvas.show();
  });

  // -----------------------------------------------------------------------
  // 5. Quick View Modal
  // -----------------------------------------------------------------------
  let activeQvProduct = null;
  let qvQty = 1;

  window.openQuickView = function (productId) {
    const p = productCatalog[productId];
    if (!p) return;

    activeQvProduct = p;
    qvQty = 1;

    $('#qvImg').attr('src', p.img);
    $('#qvCategory').text(p.category);
    $('#qvTitle').text(p.title);
    $('#qvPrice').text('৳ ' + p.price.toLocaleString('en-US'));
    $('#qvOldPrice').text('৳ ' + p.oldPrice.toLocaleString('en-US'));
    $('#qvDesc').text(p.desc);
    $('#qvQtyInput').val(qvQty);

    $('#searchAutocomplete').addClass('d-none');

    const modal = new bootstrap.Modal(document.getElementById('quickViewModal'));
    modal.show();
  };

  window.adjustQvQty = function (delta) {
    qvQty = Math.max(1, qvQty + delta);
    $('#qvQtyInput').val(qvQty);
  };

  $('#qvAddToCartBtn').on('click', function () {
    if (!activeQvProduct) return;

    const existingIndex = cart.findIndex(item => item.id === activeQvProduct.id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qvQty;
    } else {
      cart.push({
        id: activeQvProduct.id,
        title: activeQvProduct.title,
        price: activeQvProduct.price,
        img: activeQvProduct.img,
        qty: qvQty
      });
    }

    saveCart();
    bootstrap.Modal.getInstance(document.getElementById('quickViewModal')).hide();

    // Show Cart drawer
    const cartCanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartCanvas.show();
  });

  // -----------------------------------------------------------------------
  // 6. 1-Page Express Checkout Modal Handler
  // -----------------------------------------------------------------------
  window.openDirectCheckoutModal = function () {
    if (cart.length === 0) {
      alert('আপনার কার্ট খালি! অনুগ্রহ করে আগে পণ্য যোগ করুন।');
      return;
    }

    // Populate mini items list
    const $briefList = $('#checkoutItemsBrief');
    $briefList.empty();

    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.qty;
      $briefList.append(`
        <div class="d-flex justify-content-between mb-1">
          <span class="text-truncate" style="max-width: 180px;">• ${item.title} (x${item.qty})</span>
          <span class="font-monospace">৳ ${(item.price * item.qty).toLocaleString('en-US')}</span>
        </div>
      `);
    });

    const totalPayable = subtotal + deliveryCharge;

    $('#modalSubtotal').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#modalDelivery').text('৳ ' + deliveryCharge);
    $('#modalTotalPayable').text('৳ ' + totalPayable.toLocaleString('en-US'));

    // Close Cart Offcanvas and Open Modal
    bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas')).hide();
    const checkoutModal = new bootstrap.Modal(document.getElementById('expressCheckoutModal'));
    checkoutModal.show();
  };

  // Express Checkout Form Submit
  $('#expressCheckoutForm').on('submit', function (e) {
    e.preventDefault();

    const name = $('#orderCustName').val().trim();
    const phone = $('#orderCustPhone').val().trim();
    const address = $('#orderCustAddress').val().trim();
    const notes = $('#orderCustNotes').val().trim() || 'কোনো নির্দেশনা নেই';

    let valid = true;

    if (!name) {
      $('#orderCustName').addClass('is-invalid');
      valid = false;
    } else {
      $('#orderCustName').removeClass('is-invalid');
    }

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(phone)) {
      $('#orderCustPhone').addClass('is-invalid');
      valid = false;
    } else {
      $('#orderCustPhone').removeClass('is-invalid');
    }

    if (!address || address.length < 5) {
      $('#orderCustAddress').addClass('is-invalid');
      valid = false;
    } else {
      $('#orderCustAddress').removeClass('is-invalid');
    }

    if (!valid) {
      $('.is-invalid').first().focus();
      return;
    }

    const $btn = $('#btnPlaceOrder');
    const origText = $btn.html();
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>অর্ডার প্রসেস হচ্ছে...');

    setTimeout(function () {
      $btn.prop('disabled', false).html(origText);

      // Generate Invoice Code
      const invoiceId = 'BX-' + Math.floor(100000 + Math.random() * 900000);

      let subtotal = 0;
      let itemsSummary = [];
      cart.forEach(item => {
        subtotal += item.price * item.qty;
        itemsSummary.push(`${item.title} (${item.qty}টি)`);
      });
      const totalAmount = subtotal + deliveryCharge;

      // Save Order History in LocalStorage
      const orderRecord = {
        invoiceId: invoiceId,
        date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
        name: name,
        phone: phone,
        address: address,
        notes: notes,
        items: itemsSummary.join(', '),
        total: totalAmount,
        status: "অর্ডার গ্রহণ করা হয়েছে (Processing)"
      };

      const existingOrders = JSON.parse(localStorage.getItem('bazaarx_orders_db') || '[]');
      existingOrders.unshift(orderRecord);
      localStorage.setItem('bazaarx_orders_db', JSON.stringify(existingOrders));

      // Populate Success Modal
      $('#successCustName').text(name);
      $('#successInvoiceId').text(invoiceId);
      $('#successCustPhone').text(phone);
      $('#successCustAddress').text(address);
      $('#successTotalAmount').text('৳ ' + totalAmount.toLocaleString('en-US'));

      // Construct WhatsApp Message
      const waText = encodeURIComponent(
        `আসসালামু আলাইকুম BazaarX BD!\nআমি মাত্র একটি অর্ডার প্লেস করেছি।\n\n` +
        `📦 ইনভয়েস আইডি: ${invoiceId}\n` +
        `👤 নাম: ${name}\n` +
        `📞 মোবাইল: ${phone}\n` +
        `📍 ঠিকানা: ${address}\n` +
        `🛍️ পণ্যসমূহ: ${itemsSummary.join(', ')}\n` +
        `💰 সর্বমোট টাকা: ৳ ${totalAmount} (ক্যাশ অন ডেলিভারি)\n\n` +
        `দয়া করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`
      );
      $('#successWhatsAppBtn').attr('href', `https://wa.me/8801800000000?text=${waText}`);

      // Hide Checkout Modal & Show Success Modal
      bootstrap.Modal.getInstance(document.getElementById('expressCheckoutModal')).hide();
      const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
      successModal.show();

      // Clear Cart
      cart = [];
      saveCart();
      $('#expressCheckoutForm')[0].reset();

    }, 1100);
  });

  // -----------------------------------------------------------------------
  // 7. Live Order Tracking Engine
  // -----------------------------------------------------------------------
  window.trackOrderLive = function () {
    const input = $('#trackSearchInput').val().trim().toUpperCase();
    const $resultBox = $('#trackResultBox');

    if (!input) {
      alert('অনুগ্রহ করে আপনার ইনভয়েস আইডি বা মোবাইল নম্বর দিন।');
      return;
    }

    const orders = JSON.parse(localStorage.getItem('bazaarx_orders_db') || '[]');
    const found = orders.find(o => o.invoiceId.toUpperCase() === input || o.phone === input);

    if (found) {
      $resultBox.removeClass('d-none').html(`
        <div class="fw-bold text-dark border-bottom pb-1 mb-2">
          <i class="fas fa-check-circle text-success me-1"></i> অর্ডার পাওয়া গেছে!
        </div>
        <div><strong>ইনভয়েস:</strong> <span class="text-danger font-monospace">${found.invoiceId}</span></div>
        <div><strong>গ্রাহক:</strong> ${found.name} (${found.phone})</div>
        <div><strong>পণ্য:</strong> ${found.items}</div>
        <div><strong>মোট টাকা:</strong> ৳ ${found.total.toLocaleString('en-US')} (COD)</div>
        <div class="mt-2 p-2 bg-success-subtle text-success rounded-2 fw-bold">
          <i class="fas fa-truck-ramp-box me-1"></i> স্ট্যাটাস: ${found.status}
        </div>
      `);
    } else {
      $resultBox.removeClass('d-none').html(`
        <div class="text-danger fw-bold">
          <i class="fas fa-circle-exclamation me-1"></i> দুঃখিত! এই নম্বরে কোনো অ্যাক্টিভ অর্ডার পাওয়া যায়নি।
        </div>
        <div class="text-muted mt-1 small">দয়া করে ইনভয়েস আইডি নিশ্চিত করুন অথবা আমাদের হেল্পলাইনে কল করুন।</div>
      `);
    }
  };

  // -----------------------------------------------------------------------
  // 8. Wishlist Toggle Engine
  // -----------------------------------------------------------------------
  window.toggleWishlist = function (productId, element) {
    const idx = wishlist.indexOf(productId);
    if (idx > -1) {
      wishlist.splice(idx, 1);
      $(element).removeClass('active');
    } else {
      wishlist.push(productId);
      $(element).addClass('active');
    }
    localStorage.setItem('bazaarx_wishlist', JSON.stringify(wishlist));
    $('#wishlistCountBadge').text(wishlist.length);
  };

  // -----------------------------------------------------------------------
  // 9. Real-Time Social Proof Popups (Bangladesh Market Realism)
  // -----------------------------------------------------------------------
  const buyerActivityStream = [
    { name: "নাজমুল হাসান", item: "Ultra 9 Smartwatch অর্ডার করেছেন", location: "উত্তরা, ঢাকা", time: "২ মিনিট আগে" },
    { name: "আহমেদ সাদিক", item: "৪-ওয়ে স্ট্রেচ জিন্স (২ পিস কম্বো) কিনেছেন", location: "জিইসি, চট্টগ্রাম", time: "৪ মিনিট আগে" },
    { name: "ফারজানা ইসলাম", item: "Pro Wireless ANC Earbuds অর্ডার করেছেন", location: "উপশহর, সিলেট", time: "৭ মিনিট আগে" },
    { name: "শাকিল মাহমুদ", item: "65W GaN ফাস্ট চার্জার কম্বো অর্ডার করেছেন", location: "বোয়ালিয়া, রাজশাহী", time: "১১ মিনিট আগে" },
    { name: "মেহেদী হাসান", item: "স্মার্ট ডিজিটাল এয়ার ফ্রায়ার অর্ডার করেছেন", location: "ধানমন্ডি, ঢাকা", time: "১৪ মিনিট আগে" }
  ];

  let streamIdx = 0;
  function triggerSocialProofToast() {
    const data = buyerActivityStream[streamIdx];
    $('#toastName').text(data.name);
    $('#toastItem').text(data.item);
    $('#toastTime').text(`${data.location} • ${data.time}`);

    $('#homeLiveToast').addClass('show');

    setTimeout(function () {
      $('#homeLiveToast').removeClass('show');
    }, 5500);

    streamIdx = (streamIdx + 1) % buyerActivityStream.length;
  }

  setTimeout(function () {
    triggerSocialProofToast();
    setInterval(triggerSocialProofToast, 14000);
  }, 4000);

  // Initial cart render
  renderCart();
  $('#wishlistCountBadge').text(wishlist.length);
});

