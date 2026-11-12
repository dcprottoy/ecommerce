/* =========================================================================
   DenimCraft BD - Jeans Pant Funnel Scripts (jQuery & ES6)
   Optimized for High-Converting Meta Ads in Bangladesh
========================================================================= */

$(document).ready(function () {
  // Global Jeans Package Data
  const jeansBundles = {
    pkg1: { name: "১ পিস ট্রায়াল প্যাক", price: 990, freeDelivery: false },
    pkg2: { name: "২ পিস মেগা সেভার কম্বো", price: 1790, freeDelivery: false },
    pkg3: { name: "৩ পিস আল্টিমেট কম্বো (৩টি কালার + লেদার বেল্ট ফ্রি)", price: 2490, freeDelivery: true }
  };

  let currentPkg = "pkg2";
  let currentPrice = 1790;
  let deliveryFee = 70;
  let selectedWaistSize = "30";

  // -----------------------------------------------------------------------
  // 1. Live Countdown Timer
  // -----------------------------------------------------------------------
  function runJeansCountdown() {
    let hours = 5;
    let minutes = 42;
    let seconds = 19;

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
            hours = 4;
            minutes = 59;
            seconds = 59;
          }
        }
      }

      $('#timerHours').text(hours < 10 ? '0' + hours : hours);
      $('#timerMinutes').text(minutes < 10 ? '0' + minutes : minutes);
      $('#timerSeconds').text(seconds < 10 ? '0' + seconds : seconds);
    }, 1000);
  }
  runJeansCountdown();

  // -----------------------------------------------------------------------
  // 2. Color Swatch & Thumbnail Switcher
  // -----------------------------------------------------------------------
  window.selectJeansColor = function (imgSrc, colorTitle, element) {
    $('#jeansMainImg').fadeOut(120, function () {
      $(this).attr('src', imgSrc).fadeIn(180);
    });
    $('.color-thumb').removeClass('active');
    $(element).addClass('active');
    $('#currentColorLabel').text(colorTitle);

    // Sync with form color select if matching
    $("#selectedColor option").each(function () {
      if ($(this).text().indexOf(colorTitle) !== -1) {
        $(this).prop('selected', true);
      }
    });
  };

  // -----------------------------------------------------------------------
  // 3. Quick Waist Size Pills Selector
  // -----------------------------------------------------------------------
  window.selectQuickSize = function (sizeNum, element) {
    $('.btn-size-pill').removeClass('active');
    $(element).addClass('active');
    selectedWaistSize = sizeNum;

    // Sync with checkout form dropdown
    $('#selectedWaist').val(sizeNum);
  };

  // Dropdown change updates pills
  $('#selectedWaist').on('change', function () {
    const val = $(this).val();
    selectedWaistSize = val;
    $('.btn-size-pill').removeClass('active');
    $(`.btn-size-pill:contains('${val}')`).addClass('active');
  });

  // -----------------------------------------------------------------------
  // 4. Smooth Scrolling for Anchor Links
  // -----------------------------------------------------------------------
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 40
      }, 500);

      // Facebook Pixel InitiateCheckout
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Denim Jeans Pant',
          value: currentPrice,
          currency: 'BDT'
        });
      }
    }
  });

  // -----------------------------------------------------------------------
  // 5. Package Selection & Price Calculations
  // -----------------------------------------------------------------------
  function updateJeansCalculation() {
    const selectedKey = $('input[name="jeansPackage"]:checked').val() || "pkg2";
    const bundle = jeansBundles[selectedKey];

    currentPkg = selectedKey;
    currentPrice = bundle.price;

    // Delivery fee calculation
    if (bundle.freeDelivery) {
      deliveryFee = 0;
      $('#jSummaryDeliveryTitle').text('ডেলিভারি চার্জ (৩ পিস অফারে ফ্রি):');
      $('#jSummaryDeliveryCharge').html('<span class="badge bg-success text-white">ফ্রি (৳০)</span>');
    } else {
      const areaVal = parseInt($('input[name="jeansDelivery"]:checked').val()) || 70;
      deliveryFee = areaVal;
      const areaTitle = areaVal === 70 ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে';
      $('#jSummaryDeliveryTitle').text(`ডেলিভারি চার্জ (${areaTitle}):`);
      $('#jSummaryDeliveryCharge').text(`৳ ${deliveryFee}`);
    }

    const total = currentPrice + deliveryFee;

    // Update Summary Box
    $('#jSummaryPkgName').text(bundle.name + ':');
    $('#jSummarySubtotal').text('৳ ' + currentPrice.toLocaleString('en-US'));
    $('#jSummaryTotal').text('৳ ' + total.toLocaleString('en-US'));
    $('#jBtnTotal').text(total.toLocaleString('en-US'));

    // Update Top & Mobile Sticky Price
    $('#heroPriceDisplay').text('৳ ' + currentPrice.toLocaleString('en-US'));
    $('#mobileStickyPrice').text('৳ ' + currentPrice.toLocaleString('en-US'));

    // Radio Card Styling
    $('.package-radio-box').removeClass('active border-indigo border-2');
    $(`input[name="jeansPackage"][value="${selectedKey}"]`).closest('.package-radio-box').addClass('active border-indigo border-2');

    // Package Section Cards Styling
    $('.jeans-pkg-card').removeClass('selected');
    $(`.jeans-pkg-card[data-package="${selectedKey}"]`).addClass('selected');
  }

  $('input[name="jeansPackage"]').on('change', updateJeansCalculation);

  $('input[name="jeansDelivery"]').on('change', function () {
    $('.delivery-radio-card').removeClass('active');
    $(this).closest('.delivery-radio-card').addClass('active');
    updateJeansCalculation();
  });

  window.chooseJeansBundle = function (bundleKey, price) {
    $(`input[name="jeansPackage"][value="${bundleKey}"]`).prop('checked', true).trigger('change');
    
    // Smooth scroll down to order form
    $('html, body').animate({
      scrollTop: $('#order-form-section').offset().top - 40
    }, 500);
  };

  // Initial calculation
  updateJeansCalculation();

  // -----------------------------------------------------------------------
  // 6. Bangladeshi Mobile Phone Live Validation
  // -----------------------------------------------------------------------
  $('#jPhone').on('input', function () {
    let num = $(this).val().replace(/\D/g, '');
    $(this).val(num);

    const bdRegex = /^01[3-9]\d{8}$/;
    if (num.length === 11) {
      if (bdRegex.test(num)) {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $('#jPhoneIcon').html('<i class="fas fa-check-circle text-success"></i>');
      } else {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $('#jPhoneIcon').html('<i class="fas fa-times-circle text-danger"></i>');
        $('#jPhoneFeedback').text('অনুগ্রহ করে সঠিক ০১ দিয়ে শুরু হওয়া ১১ ডিজিটের নম্বর দিন।');
      }
    } else if (num.length > 0) {
      $(this).removeClass('is-valid');
      $('#jPhoneIcon').html('<i class="fas fa-phone text-muted"></i>');
    }
  });

  // -----------------------------------------------------------------------
  // 7. 1-Page Checkout Form Submission
  // -----------------------------------------------------------------------
  $('#jeansOrderForm').on('submit', function (e) {
    e.preventDefault();

    const name = $('#jName').val().trim();
    const phone = $('#jPhone').val().trim();
    const address = $('#jAddress').val().trim();
    const notes = $('#jNotes').val().trim() || 'কোনো নোট নেই';
    const waist = $('#selectedWaist').val() || '৩০';
    const color = $('#selectedColor').val() || 'ডিপ ইন্ডিগো ব্লু';
    const pkg = jeansBundles[currentPkg].name;
    const totalAmount = currentPrice + deliveryFee;

    let valid = true;

    if (!name) {
      $('#jName').addClass('is-invalid');
      valid = false;
    } else {
      $('#jName').removeClass('is-invalid');
    }

    const bdRegex = /^01[3-9]\d{8}$/;
    if (!bdRegex.test(phone)) {
      $('#jPhone').addClass('is-invalid');
      $('#jPhoneFeedback').text('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)');
      valid = false;
    } else {
      $('#jPhone').removeClass('is-invalid');
    }

    if (!address || address.length < 5) {
      $('#jAddress').addClass('is-invalid');
      valid = false;
    } else {
      $('#jAddress').removeClass('is-invalid');
    }

    if (!valid) {
      $('.is-invalid').first().focus();
      return;
    }

    // Submit button state
    const submitBtn = $('#jSubmitBtn');
    const originalText = submitBtn.html();
    submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>অর্ডার প্রসেস হচ্ছে...');

    setTimeout(function () {
      submitBtn.prop('disabled', false).html(originalText);

      // Generate invoice code
      const invoiceId = 'DENIM-' + Math.floor(100000 + Math.random() * 900000);

      // Save order to LocalStorage
      const orderData = {
        invoiceId: invoiceId,
        date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
        name: name,
        phone: phone,
        address: address,
        notes: notes,
        waist: waist + ' ইঞ্চি',
        color: color,
        package: pkg,
        price: currentPrice,
        deliveryFee: deliveryFee,
        total: totalAmount
      };

      const orders = JSON.parse(localStorage.getItem('bd_jeans_orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('bd_jeans_orders', JSON.stringify(orders));

      // Facebook Pixel Purchase Event
      if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
          content_name: pkg,
          content_type: 'product',
          value: totalAmount,
          currency: 'BDT'
        });
      }

      // Populate Success Modal
      $('#jInvoiceName').text(name);
      $('#jInvoiceId').text(invoiceId);
      $('#jInvoicePkg').text(pkg);
      $('#jInvoiceWaist').text(waist + ' ইঞ্চি');
      $('#jInvoiceColor').text(color);
      $('#jInvoicePhone').text(phone);
      $('#jInvoiceAddress').text(address);
      $('#jInvoiceTotal').text('৳ ' + totalAmount.toLocaleString('en-US'));

      // WhatsApp Message
      const waMessage = encodeURIComponent(
        `আসসালামু আলাইকুম DenimCraft BD!\nআমি মাত্র ওয়েবসাইট থেকে জিন্স প্যান্ট অর্ডার করেছি।\n\n` +
        `📦 ইনভয়েস আইডি: ${invoiceId}\n` +
        `👤 নাম: ${name}\n` +
        `📞 মোবাইল: ${phone}\n` +
        `📍 ঠিকানা: ${address}\n` +
        `👖 সাইজ: ${waist} ইঞ্চি | কালার: ${color}\n` +
        `🎁 প্যাকেজ: ${pkg}\n` +
        `💰 সর্বমোট টাকা: ৳ ${totalAmount} (ক্যাশ অন ডেলিভারি)\n\n` +
        `দয়া করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`
      );
      $('#jWaConfirmBtn').attr('href', `https://wa.me/8801700000000?text=${waMessage}`);

      // Show Bootstrap Modal
      const successModal = new bootstrap.Modal(document.getElementById('jeansSuccessModal'));
      successModal.show();

      // Reset form
      $('#jeansOrderForm')[0].reset();
      $('#jPhone').removeClass('is-valid');
      $('#jPhoneIcon').html('<i class="fas fa-phone text-muted"></i>');
      updateJeansCalculation();
    }, 1000);
  });

  // -----------------------------------------------------------------------
  // 8. Bangladeshi Live Recent Order Toast Popups
  // -----------------------------------------------------------------------
  const recentJeansOrders = [
    { name: "সাব্বির আহমেদ", detail: "২ পিস মেগা সেভার কম্বো অর্ডার করেছেন", location: "মিরপুর, ঢাকা", time: "২ মিনিট আগে" },
    { name: "মাহমুদুল হাসান", detail: "৩ পিস কম্বো + ফ্রি লেদার বেল্ট অর্ডার করেছেন", location: "আগ্রাবাদ, চট্টগ্রাম", time: "৪ মিনিট আগে" },
    { name: "আরিফুল ইসলাম", detail: "২ পিস কম্বো (ব্ল্যাক + ডিপ ব্লু) অর্ডার করেছেন", location: "উপশহর, সিলেট", time: "৭ মিনিট আগে" },
    { name: "সোহেল রানা", detail: "১ পিস সিঙ্গেল ট্রায়াল প্যাক অর্ডার করেছেন", location: "বোয়ালিয়া, রাজশাহী", time: "১০ মিনিট আগে" },
    { name: "জাহিদ হাসান", detail: "৩ পিস কম্বো (সাইজ ৩২) অর্ডার করেছেন", location: "সালেহপুর, বগুড়া", time: "১৪ মিনিট আগে" }
  ];

  let toastIdx = 0;
  function showNextJeansOrderToast() {
    const item = recentJeansOrders[toastIdx];
    $('#jToastName').text(item.name);
    $('#jToastDetail').text(item.detail);
    $('#jToastTime').html(`<i class="fas fa-check-circle me-1"></i>${item.location} • ${item.time}`);

    $('#jeansOrderToast').addClass('show');

    setTimeout(function () {
      $('#jeansOrderToast').removeClass('show');
    }, 5500);

    toastIdx = (toastIdx + 1) % recentJeansOrders.length;
  }

  setTimeout(function () {
    showNextJeansOrderToast();
    setInterval(showNextJeansOrderToast, 13000);
  }, 3500);
});

