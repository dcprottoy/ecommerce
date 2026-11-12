/* =========================================================================
   BazaarX - Product Details Interactive Scripts
   URL Parameter Parsing, Dynamic Product Loading, Gallery, Variants & Checkout
========================================================================= */

$(document).ready(function () {
  // Global Database of Products for the Detail Page
  const productsDB = {
    101: {
      id: 101,
      title: "Ultra 9 Max Smartwatch 2.0 (৭টি স্ট্র্যাপ সহ বিশেষ মেগা কম্বো)",
      category: "গ্যাজেট ও টেক",
      sku: "BX-101-WATCH",
      price: 1690,
      oldPrice: 3200,
      stockLeft: "আর মাত্র ১৮টি বাকি আছে",
      images: [
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
      ],
      features: [
        "বড় ২.২ ইঞ্চি ফুল এইচডি AMOLED ডিসপ্লে ও কাস্টম ওয়াচ ফেস",
        "ক্রিস্টাল ক্লিয়ার ব্লুটুথ কলিং (ঘড়ি থেকেই সরাসরি কথা বলা যায়)",
        "৭টি প্রিমিয়াম ডিজাইনার স্ট্র্যাপ (চেইন, সিলিকন, লেদার, ওশান ইত্যাদি)",
        "হার্টরেট, ব্লাড প্রেশার ও স্লিপ ট্র্যাকিং সেন্সর",
        "৩ থেকে ৫ দিনের লং-লাস্টিং ব্যাটারি ব্যাকআপ ও ওয়্যারলেস চার্জিং"
      ],
      colors: [
        { name: "টাইটেনিয়াম সিলভার", hex: "#cbd5e1" },
        { name: "ম্যাট ব্ল্যাক", hex: "#0f172a" },
        { name: "গোল্ডেন অরেঞ্জ", hex: "#ea580c" }
      ],
      packages: [
        { name: "১ ঘড়ি + ২টি স্ট্র্যাপ", price: 1390 },
        { name: "৭ স্ট্র্যাপ মেগা কম্বো", price: 1690 },
        { name: "ঘড়ি + স্ট্র্যাপ + এয়ারপডস", price: 2290 }
      ]
    },
    201: {
      id: 201,
      title: "৪-ওয়ে সুপার স্ট্রেচেবল ডেনিম জিন্স প্যান্ট (২ পিস মেগা কম্বো)",
      category: "মেনস ফ্যাশন",
      sku: "BX-201-JEANS",
      price: 1790,
      oldPrice: 3300,
      stockLeft: "আর মাত্র ২৩টি বাকি আছে",
      images: [
        "https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&auto=format&fit=crop&q=80"
      ],
      features: [
        "১০০% প্রিমিয়াম এক্সপোর্ট কটন ও লাইক্রা ৪-ওয়ে স্ট্রেচ ফ্যাব্রিক",
        "বসা, ওঠা বা বাইক ড্রাইভ করায় কোনো টান পড়বে না",
        "১০০% কালার পাকা ও স্থায়ী ওয়াশ গ্যারান্টি",
        "সাইজ না মিললে ৭ দিনের মধ্যে সম্পূর্ণ ফ্রি এক্সচেঞ্জ সুবিধা",
        "২ পিসের মেগা কম্বোতে সেরা ডিসকাউন্ট (প্রতি পিস মাত্র ৳ ৮৯৫)"
      ],
      colors: [
        { name: "ডিপ ইন্ডিগো ব্লু", hex: "#1e3a8a" },
        { name: "জেট ব্ল্যাক", hex: "#0f172a" },
        { name: "লাইট স্কাই ব্লু", hex: "#38bdf8" }
      ],
      packages: [
        { name: "১ পিস ট্রায়াল প্যাক", price: 990 },
        { name: "২ পিস মেগা সেভার কম্বো", price: 1790 },
        { name: "৩ পিস কম্বো + লেদার বেল্ট ফ্রি", price: 2490 }
      ]
    },
    301: {
      id: 301,
      title: "Pro Wireless ANC Earbuds (অ্যাক্টিভ নয়েজ ক্যানসেলেশন)",
      category: "অডিও ও সাউন্ড",
      sku: "BX-301-AUDIO",
      price: 1290,
      oldPrice: 2400,
      stockLeft: "আর মাত্র ১২টি বাকি আছে",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&auto=format&fit=crop&q=80"
      ],
      features: [
        "অ্যাক্টিভ নয়েজ ক্যানসেলেশন (ANC) টেকনোলজি",
        "গেমিং আল্ট্রা-লো লেটেন্সি মোড (কোনো অডিও ল্যাগ নেই)",
        "টোটাল ৪০ ঘণ্টা পর্যন্ত লং প্লে-টাইম ব্যাকআপ",
        "ব্লুটুথ ৫.৩ ফাস্ট অটো-কানেকশন",
        "আইপিএক্স৫ সোয়েট ও ওয়াটারপ্রুফ রেটিং"
      ],
      colors: [
        { name: "ম্যাট হোয়াইট", hex: "#f8fafc" },
        { name: "স্পেস ব্ল্যাক", hex: "#0f172a" }
      ],
      packages: [
        { name: "১ সেট এয়ারবাডস", price: 1290 },
        { name: "২ সেট কাপল কম্বো", price: 2390 }
      ]
    },
    302: {
      id: 302,
      title: "65W GaN ফাস্ট চার্জার কম্বো (ক্যাবল সহ)",
      category: "চার্জার ও এক্সেসরিজ",
      sku: "BX-302-CHARGER",
      price: 990,
      oldPrice: 1650,
      stockLeft: "আর মাত্র ৯টি বাকি আছে",
      images: [
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80"
      ],
      features: [
        "৬৫ ওয়াট সুপার ফাস্ট চার্জিং আউটপুট (GaN Tech)",
        "একসাথে মোবাইল ও ল্যাপটপ চার্জ করার ডুয়েল পোর্ট",
        "১০০ ওয়াট টাইপ-সি ফাস্ট চার্জিং ব্রেডেড ক্যাবল ফ্রি",
        "ওভারহিটিং ও শর্ট সার্কিট প্রটেকশন"
      ],
      colors: [
        { name: "স্নো হোয়াইট", hex: "#ffffff" },
        { name: "ডার্ক ব্ল্যাক", hex: "#0f172a" }
      ],
      packages: [
        { name: "চার্জার + ১টি ক্যাবল", price: 990 },
        { name: "চার্জার + ২টি ফাস্ট ক্যাবল", price: 1250 }
      ]
    }
  };

  // 1. Get Product ID from URL Query (?id=101)
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const requestedId = parseInt(getQueryParam('id')) || 101;
  const currentProduct = productsDB[requestedId] || productsDB[101];

  // State Variables
  let selectedColor = currentProduct.colors[0].name;
  let selectedPackage = currentProduct.packages[0].name;
  let activeUnitPrice = currentProduct.price;
  let currentQty = 1;

  // 2. Render Product Details Dynamically
  function populateProductDetails(prod) {
    // Title & Meta
    document.title = `${prod.title} | BazaarX BD`;
    $('#pageHeadTitle').text(`${prod.title} | BazaarX BD`);
    $('#bcCategory, #detailCatBadge').text(prod.category);
    $('#bcTitle, #detailTitle').text(prod.title);
    $('#detailSku').text(`SKU: ${prod.sku}`);

    // Prices
    activeUnitPrice = prod.price;
    updatePriceDisplay();

    // Stock
    $('#detailStockLeft').text(prod.stockLeft);

    // Gallery Images
    $('#detailMainImg').attr('src', prod.images[0]);
    const $thumbRow = $('#thumbGalleryRow');
    $thumbRow.empty();

    prod.images.forEach((imgUrl, i) => {
      $thumbRow.append(`
        <div class="thumb-item ${i === 0 ? 'active' : ''}" onclick="switchDetailPhoto(this, '${imgUrl}')">
          <img src="${imgUrl}" alt="Thumbnail ${i + 1}">
        </div>
      `);
    });

    // Features Bullets
    const $featureList = $('.detail-feature-bullets');
    $featureList.empty();
    prod.features.forEach(feat => {
      $featureList.append(`<li><i class="fas fa-circle-check text-success me-2"></i>${feat}</li>`);
    });

    // Colors
    const $colorGroup = $('#colorVariantGroup .d-flex');
    $colorGroup.empty();
    prod.colors.forEach((col, i) => {
      $colorGroup.append(`
        <button type="button" class="btn btn-variant-chip ${i === 0 ? 'active' : ''}" onclick="selectVariantColor('${col.name}', this)">
          <span class="color-dot" style="background: ${col.hex};"></span> ${col.name}
        </button>
      `);
    });
    selectedColor = prod.colors[0].name;
    $('#selectedColorName').text(selectedColor);

    // Packages
    const $packageGroup = $('#sizeVariantGroup .d-flex');
    $packageGroup.empty();
    prod.packages.forEach((pkg, i) => {
      $packageGroup.append(`
        <button type="button" class="btn btn-package-pill ${i === 0 ? 'active' : ''}" data-price="${pkg.price}" onclick="selectDetailPackage('${pkg.name}', ${pkg.price}, this)">
          ${pkg.name} (৳${pkg.price.toLocaleString('en-US')})
        </button>
      `);
    });
    selectedPackage = prod.packages[0].name;
    activeUnitPrice = prod.packages[0].price;

    updatePriceDisplay();
    renderRelatedProducts(prod.id);
  }

  function updatePriceDisplay() {
    const total = activeUnitPrice * currentQty;
    const save = (currentProduct.oldPrice - activeUnitPrice) * currentQty;

    $('#detailCurrentPrice, #mobileStickyPrice').text('৳ ' + activeUnitPrice.toLocaleString('en-US'));
    $('#detailOldPrice').text('৳ ' + currentProduct.oldPrice.toLocaleString('en-US'));
    $('#detailSaveTag').text(`৳ ${save.toLocaleString('en-US')} সাশ্রয়!`);
    $('#calculatedTotalAmount').text('৳ ' + total.toLocaleString('en-US'));
  }

  // 3. Gallery Photo Switcher
  window.switchDetailPhoto = function (elem, src) {
    $('#detailMainImg').fadeOut(100, function () {
      $(this).attr('src', src).fadeIn(150);
    });
    $('.thumb-item').removeClass('active');
    $(elem).addClass('active');
  };

  window.openFullscreenPreview = function () {
    const curImg = $('#detailMainImg').attr('src');
    window.open(curImg, '_blank');
  };

  // 4. Variant Selection
  window.selectVariantColor = function (colorName, elem) {
    $('.btn-variant-chip').removeClass('active');
    $(elem).addClass('active');
    selectedColor = colorName;
    $('#selectedColorName').text(colorName);
  };

  window.selectDetailPackage = function (packageName, price, elem) {
    $('.btn-package-pill').removeClass('active');
    $(elem).addClass('active');
    selectedPackage = packageName;
    activeUnitPrice = price;
    updatePriceDisplay();
  };

  // 5. Quantity Adjuster
  window.adjustProductQty = function (delta) {
    currentQty = Math.max(1, currentQty + delta);
    $('#productQtyInput').val(currentQty);
    updatePriceDisplay();
  };

  // 6. Add Current Product to Global Cart
  window.addCurrentProductToCart = function () {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    const existingIndex = cart.findIndex(c => c.id === currentProduct.id && c.variant === selectedColor);

    if (existingIndex > -1) {
      cart[existingIndex].qty += currentQty;
    } else {
      cart.push({
        id: currentProduct.id,
        title: `${currentProduct.title} (${selectedColor})`,
        price: activeUnitPrice,
        img: currentProduct.images[0],
        variant: selectedColor,
        qty: currentQty
      });
    }

    localStorage.setItem('bazaarx_cart', JSON.stringify(cart));
    updateCartCountBadge();

    // Open Cart Drawer
    const cartCanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartCanvas.show();
    renderCartDrawer();
  };

  function updateCartCountBadge() {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    let count = 0;
    let subtotal = 0;
    cart.forEach(i => { count += i.qty; subtotal += i.price * i.qty; });
    $('#cartCountBadge, #cartDrawerCount').text(count);
    $('#cartTotalHeader').text('৳ ' + subtotal.toLocaleString('en-US'));
  }

  function renderCartDrawer() {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    const $list = $('#cartItemsList');
    $list.empty();
    let subtotal = 0;

    if (cart.length === 0) {
      $('#emptyCartView').removeClass('d-none');
      $('#cartFooterSection').addClass('d-none');
      return;
    }

    $('#emptyCartView').addClass('d-none');
    $('#cartFooterSection').removeClass('d-none');

    cart.forEach((item, idx) => {
      subtotal += item.price * item.qty;
      $list.append(`
        <div class="cart-item-row font-bn">
          <img src="${item.img}" alt="${item.title}" class="cart-item-thumb">
          <div class="flex-grow-1 overflow-hidden">
            <h6 class="mb-1 text-truncate text-dark small fw-bold">${item.title}</h6>
            <div class="text-danger fw-bold font-monospace small mb-1">৳ ${item.price.toLocaleString('en-US')}</div>
            <div class="d-flex align-items-center justify-content-between">
              <span class="small text-muted font-monospace">পরিমাণ: x${item.qty}</span>
              <button class="btn btn-sm text-danger p-0 border-0" onclick="removeDrawerItem(${idx})"><i class="far fa-trash-can"></i></button>
            </div>
          </div>
        </div>
      `);
    });

    const total = subtotal + 70;
    $('#cartSubtotalText').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#cartTotalPayableText').text('৳ ' + total.toLocaleString('en-US'));
  }

  window.removeDrawerItem = function (idx) {
    let cart = JSON.parse(localStorage.getItem('bazaarx_cart') || '[]');
    cart.splice(idx, 1);
    localStorage.setItem('bazaarx_cart', JSON.stringify(cart));
    updateCartCountBadge();
    renderCartDrawer();
  };

  // 7. Direct 1-Click Order Modal
  window.triggerDirectOrderModal = function () {
    // Populate Modal preview
    $('#modalSummaryImg').attr('src', currentProduct.images[0]);
    $('#modalSummaryTitle').text(currentProduct.title);
    $('#modalSummaryVariant').text(`${selectedColor} • ${selectedPackage}`);
    $('#modalSummaryQty').text(`x${currentQty}`);
    $('#modalSummaryPrice').text('৳ ' + (activeUnitPrice * currentQty).toLocaleString('en-US'));

    updateModalTotal();

    const orderModal = new bootstrap.Modal(document.getElementById('productCheckoutModal'));
    orderModal.show();
  };

  window.updateModalTotal = function () {
    const areaVal = parseInt($('input[name="pDeliveryArea"]:checked').val()) || 70;
    const subtotal = activeUnitPrice * currentQty;
    const total = subtotal + areaVal;

    $('#modalSummaryDelivery').text(`৳ ${areaVal}`);
    $('#modalSummaryTotal').text(`৳ ${total.toLocaleString('en-US')}`);
  };

  // Form Submit for Direct Order
  $('#productCheckoutForm').on('submit', function (e) {
    e.preventDefault();

    const name = $('#pCustName').val().trim();
    const phone = $('#pCustPhone').val().trim();
    const address = $('#pCustAddress').val().trim();
    const area = $('input[name="pDeliveryArea"]:checked').val() === "70" ? "ঢাকার ভিতরে" : "ঢাকার বাইরে";
    const deliveryFee = parseInt($('input[name="pDeliveryArea"]:checked').val()) || 70;

    let valid = true;
    if (!name) { $('#pCustName').addClass('is-invalid'); valid = false; } else { $('#pCustName').removeClass('is-invalid'); }

    const bdRegex = /^01[3-9]\d{8}$/;
    if (!bdRegex.test(phone)) { $('#pCustPhone').addClass('is-invalid'); valid = false; } else { $('#pCustPhone').removeClass('is-invalid'); }

    if (!address || address.length < 5) { $('#pCustAddress').addClass('is-invalid'); valid = false; } else { $('#pCustAddress').removeClass('is-invalid'); }

    if (!valid) return;

    const $btn = $('#btnPlaceProductOrder');
    const orig = $btn.html();
    $btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>অর্ডার প্রসেস হচ্ছে...');

    setTimeout(function () {
      $btn.prop('disabled', false).html(orig);
      const invoiceId = 'BX-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = (activeUnitPrice * currentQty) + deliveryFee;

      // Populate Success Modal
      $('#successCustName').text(name);
      $('#successInvoiceId').text(invoiceId);
      $('#successProductBrief').text(`${currentProduct.title} (${selectedColor}, ${selectedPackage}) - x${currentQty}`);
      $('#successCustPhone').text(phone);
      $('#successCustAddress').text(`${address} (${area})`);
      $('#successTotalAmount').text('৳ ' + totalAmount.toLocaleString('en-US'));

      // WhatsApp URL
      const waText = encodeURIComponent(
        `আসসালামু আলাইকুম BazaarX BD!\nআমি মাত্র একটি অর্ডার করেছি।\n\n` +
        `📦 ইনভয়েস আইডি: ${invoiceId}\n` +
        `👤 নাম: ${name}\n` +
        `📞 মোবাইল: ${phone}\n` +
        `📍 ঠিকানা: ${address} (${area})\n` +
        `🛍️ পণ্য: ${currentProduct.title}\n` +
        `🎨 কালার: ${selectedColor} | প্যাকেজ: ${selectedPackage} | পরিমাণ: ${currentQty}\n` +
        `💰 সর্বমোট টাকা: ৳ ${totalAmount} (ক্যাশ অন ডেলিভারি)\n\n` +
        `দয়া করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`
      );
      $('#successWhatsAppBtn').attr('href', `https://wa.me/8801800000000?text=${waText}`);

      // Close Form Modal & Open Success Modal
      bootstrap.Modal.getInstance(document.getElementById('productCheckoutModal')).hide();
      const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
      successModal.show();

      $('#productCheckoutForm')[0].reset();
    }, 1000);
  });

  // 8. Render Related Products
  function renderRelatedProducts(currentId) {
    const $row = $('#relatedProductsRow');
    $row.empty();

    Object.values(productsDB).forEach(p => {
      if (p.id !== currentId) {
        $row.append(`
          <div class="col font-bn">
            <div class="product-card h-100 p-3 rounded-4 bg-white border position-relative d-flex flex-column">
              <a href="product-details.html?id=${p.id}" class="product-img-wrap mb-2 text-center d-block">
                <img src="${p.images[0]}" alt="${p.title}" class="img-fluid product-main-thumb">
              </a>
              <div class="product-meta mt-auto">
                <span class="product-cat-tag">${p.category}</span>
                <h6 class="product-title mb-1">
                  <a href="product-details.html?id=${p.id}" class="text-dark text-decoration-none">${p.title}</a>
                </h6>
                <div class="d-flex align-items-baseline gap-2 mb-2 font-monospace">
                  <span class="fs-5 fw-bold text-danger">৳ ${p.price.toLocaleString('en-US')}</span>
                  <span class="text-muted text-decoration-line-through small">৳ ${p.oldPrice.toLocaleString('en-US')}</span>
                </div>
                <a href="product-details.html?id=${p.id}" class="btn btn-add-cart w-100 py-2 small fw-bold">
                  বিস্তারিত দেখুন
                </a>
              </div>
            </div>
          </div>
        `);
      }
    });
  }

  // 9. Wishlist & Social Helpers
  window.toggleDetailWishlist = function () {
    let wishlist = JSON.parse(localStorage.getItem('bazaarx_wishlist') || '[]');
    const icon = $('#detailWishlistIcon');
    const idx = wishlist.indexOf(currentProduct.id);

    if (idx > -1) {
      wishlist.splice(idx, 1);
      icon.removeClass('fas text-danger').addClass('far');
    } else {
      wishlist.push(currentProduct.id);
      icon.removeClass('far').addClass('fas text-danger');
    }
    localStorage.setItem('bazaarx_wishlist', JSON.stringify(wishlist));
  };

  window.copyProductLink = function () {
    navigator.clipboard.writeText(window.location.href);
    alert('প্রোডাক্ট লিংক কপি হয়েছে!');
  };

  window.shareSocial = function (platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentProduct.title);
    if (platform === 'fb') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    if (platform === 'wa') window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

  window.scrollToReviews = function () {
    const triggerEl = document.querySelector('#reviews-tab');
    bootstrap.Tab.getInstance(triggerEl).show();
    $('html, body').animate({ scrollTop: $('#productTabs').offset().top - 90 }, 400);
  };

  // Initialize
  populateProductDetails(currentProduct);
  updateCartCountBadge();
});

