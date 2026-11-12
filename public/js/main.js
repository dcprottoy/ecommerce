/* =========================================================================
   Ultra 9 Max Smartwatch - High-Converting Facebook Product Landing Page
   Interactive Funnel Script (jQuery & Modern ES6 JavaScript)
========================================================================= */

$(document).ready(function () {
  // Global Package State
  const packageData = {
    pkg1: { name: "স্ট্যান্ডার্ড প্যাক (১টি ঘড়ি + ২টি স্ট্র্যাপ)", price: 1390, freeDelivery: false },
    pkg2: { name: "৭ স্ট্র্যাপ মেগা কম্বো (ঘড়ি + ৭ স্ট্র্যাপ + প্রটেক্টর)", price: 1690, freeDelivery: false },
    pkg3: { name: "ভিআইপি গিফট কম্বো (ঘড়ি + ৭ স্ট্র্যাপ + এয়ারপডস)", price: 2290, freeDelivery: true }
  };

  let currentPkg = "pkg2";
  let currentPrice = 1690;
  let deliveryFee = 70;

  // -----------------------------------------------------------------------
  // 1. Live Countdown Timer (Urgency Engine)
  // -----------------------------------------------------------------------
  function startCountdown() {
    let hours = 4;
    let minutes = 28;
    let seconds = 45;

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
            // Reset to prevent 00:00:00 stall (Evergreen Funnel technique)
            hours = 3;
            minutes = 59;
            seconds = 59;
          }
        }
      }

      $('#timer-hours').text(hours < 10 ? '0' + hours : hours);
      $('#timer-minutes').text(minutes < 10 ? '0' + minutes : minutes);
      $('#timer-seconds').text(seconds < 10 ? '0' + seconds : seconds);
    }, 1000);
  }
  startCountdown();

  // -----------------------------------------------------------------------
  // 2. Product Image Gallery Switcher
  // -----------------------------------------------------------------------
  window.switchImage = function (imgSrc, element) {
    $('#mainProductImg').fadeOut(120, function () {
      $(this).attr('src', imgSrc).fadeIn(180);
    });
    $('.thumb-item').removeClass('active');
    $(element).addClass('active');
  };

  // -----------------------------------------------------------------------
  // 3. Smooth Scroll to Checkout Form
  // -----------------------------------------------------------------------
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 40
      }, 500);

      // Track Facebook Pixel InitiateCheckout event
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Ultra 9 Max Smartwatch',
          value: currentPrice,
          currency: 'BDT'
        });
      }
    }
  });

  // -----------------------------------------------------------------------
  // 4. Package Selection & Recalculation
  // -----------------------------------------------------------------------
  function updateOrderCalculation() {
    const selectedPkgKey = $('input[name="packageSelect"]:checked').val() || "pkg2";
    const selectedPkg = packageData[selectedPkgKey];
    
    currentPkg = selectedPkgKey;
    currentPrice = selectedPkg.price;

    // Delivery fee check (Package 3 gets Free Delivery)
    if (selectedPkg.freeDelivery) {
      deliveryFee = 0;
      $('#summaryDeliveryTitle').text('ডেলিভারি চার্জ (মেগা অফার ফ্রি):');
      $('#summaryDeliveryCharge').html('<span class="badge bg-success text-white">ফ্রি (৳০)</span>');
    } else {
      const selectedAreaVal = parseInt($('input[name="deliveryArea"]:checked').val()) || 70;
      deliveryFee = selectedAreaVal;
      const areaName = selectedAreaVal === 70 ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে';
      $('#summaryDeliveryTitle').text(`ডেলিভারি চার্জ (${areaName}):`);
      $('#summaryDeliveryCharge').text(`৳ ${deliveryFee}`);
    }

    const totalAmount = currentPrice + deliveryFee;

    // Update Form Summary
    $('#summaryPkgName').text(selectedPkg.name + ':');
    $('#summarySubtotal').text('৳ ' + currentPrice.toLocaleString('en-US'));
    $('#summaryTotalAmount').text('৳ ' + totalAmount.toLocaleString('en-US'));
    $('#btnTotalText').text(totalAmount.toLocaleString('en-US'));

    // Update Hero & Mobile Sticky Price
    $('#displayHeroPrice').text('৳ ' + currentPrice.toLocaleString('en-US'));
    $('#stickyPriceText').text('৳ ' + currentPrice.toLocaleString('en-US'));

    // Update package radio styling
    $('.package-radio-label').removeClass('active border-danger border-2');
    $(`input[name="packageSelect"][value="${selectedPkgKey}"]`).closest('.package-radio-label').addClass('active border-danger border-2');

    // Update package card highlighting in the package section
    $('.package-card').removeClass('selected');
    $(`.package-card[data-package="${selectedPkgKey}"]`).addClass('selected');
  }

  // Listener for Package Radio Change
  $('input[name="packageSelect"]').on('change', function () {
    updateOrderCalculation();
  });

  // Listener for Delivery Area Radio Change
  $('input[name="deliveryArea"]').on('change', function () {
    $('.delivery-radio-card').removeClass('active');
    $(this).closest('.delivery-radio-card').addClass('active');
    updateOrderCalculation();
  });

  // Select Package from Package Card Click
  window.selectPackageFromCard = function (pkgKey, price) {
    $(`input[name="packageSelect"][value="${pkgKey}"]`).prop('checked', true).trigger('change');
    
    // Smooth scroll down to order form
    $('html, body').animate({
      scrollTop: $('#order-form-section').offset().top - 40
    }, 500);
  };

  // Run initial calculation
  updateOrderCalculation();

  // -----------------------------------------------------------------------
  // 5. Bangladeshi Phone Number Live Validation (013 - 019)
  // -----------------------------------------------------------------------
  $('#custPhone').on('input', function () {
    let phone = $(this).val().replace(/\D/g, ''); // Digits only
    $(this).val(phone);

    // Bangladeshi Mobile Pattern: 11 digits, starts with 01[3-9]
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (phone.length === 11) {
      if (bdPhoneRegex.test(phone)) {
        $(this).removeClass('is-invalid').addClass('is-valid');
        $('#phoneCheckIcon').html('<i class="fas fa-check-circle text-success"></i>');
      } else {
        $(this).removeClass('is-valid').addClass('is-invalid');
        $('#phoneCheckIcon').html('<i class="fas fa-times-circle text-danger"></i>');
        $('#phoneFeedback').text('অনুগ্রহ করে সঠিক ০১ দিয়ে শুরু হওয়া ১১ ডিজিটের নম্বর দিন।');
      }
    } else if (phone.length > 0) {
      $(this).removeClass('is-valid');
      $('#phoneCheckIcon').html('<i class="fas fa-phone text-muted"></i>');
    }
  });

  // -----------------------------------------------------------------------
  // 6. 1-Page Cash On Delivery Form Submission
  // -----------------------------------------------------------------------
  $('#productOrderForm').on('submit', function (e) {
    e.preventDefault();

    const name = $('#custName').val().trim();
    const phone = $('#custPhone').val().trim();
    const address = $('#custAddress').val().trim();
    const notes = $('#custNotes').val().trim() || 'কোনো স্পেশাল নোট নেই';
    const color = $('input[name="watchColor"]:checked').val() || 'টাইটেনিয়াম সিলভার';
    const pkg = packageData[currentPkg].name;
    const totalAmount = currentPrice + deliveryFee;

    // Validation checks
    let isValid = true;

    if (!name) {
      $('#custName').addClass('is-invalid');
      isValid = false;
    } else {
      $('#custName').removeClass('is-invalid');
    }

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(phone)) {
      $('#custPhone').addClass('is-invalid');
      $('#phoneFeedback').text('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)');
      isValid = false;
    } else {
      $('#custPhone').removeClass('is-invalid');
    }

    if (!address || address.length < 5) {
      $('#custAddress').addClass('is-invalid');
      isValid = false;
    } else {
      $('#custAddress').removeClass('is-invalid');
    }

    if (!isValid) {
      // Focus on first invalid element
      $('.is-invalid').first().focus();
      return;
    }

    // Submit Button Loading State
    const submitBtn = $('#submitOrderBtn');
    const originalBtnHtml = submitBtn.html();
    submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>অর্ডার প্রসেস হচ্ছে...');

    // Simulate instant secure order creation
    setTimeout(function () {
      submitBtn.prop('disabled', false).html(originalBtnHtml);

      // Generate Random BD Invoice ID
      const orderId = 'BD-' + Math.floor(100000 + Math.random() * 900000);

      // Store in localStorage for Order Management Preview
      const orderObj = {
        orderId: orderId,
        date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
        name: name,
        phone: phone,
        address: address,
        notes: notes,
        color: color,
        package: pkg,
        price: currentPrice,
        deliveryFee: deliveryFee,
        totalAmount: totalAmount
      };

      const existingOrders = JSON.parse(localStorage.getItem('bd_fb_orders') || '[]');
      existingOrders.push(orderObj);
      localStorage.setItem('bd_fb_orders', JSON.stringify(existingOrders));

      // Trigger Facebook Pixel Purchase Event
      if (typeof fbq === 'function') {
        fbq('track', 'Purchase', {
          content_name: pkg,
          content_type: 'product',
          value: totalAmount,
          currency: 'BDT'
        });
      }

      // Populate Success Modal Fields
      $('#invoiceName').text(name);
      $('#invoiceId').text(orderId);
      $('#invoicePkg').text(pkg);
      $('#invoiceColor').text(color);
      $('#invoicePhone').text(phone);
      $('#invoiceAddress').text(address);
      $('#invoiceTotal').text('৳ ' + totalAmount.toLocaleString('en-US'));

      // Construct Prefilled WhatsApp Message Link
      const waText = encodeURIComponent(
        `আসসালামু আলাইকুম SmartGadget BD!\nআমি মাত্র ওয়েবসাইট থেকে একটি অর্ডার প্লেস করেছি।\n\n` +
        `📦 ইনভয়েস আইডি: ${orderId}\n` +
        `👤 নাম: ${name}\n` +
        `📞 মোবাইল: ${phone}\n` +
        `📍 ঠিকানা: ${address}\n` +
        `⌚ প্যাকেজ: ${pkg} (${color})\n` +
        `💰 সর্বমোট টাকা: ৳ ${totalAmount} (ক্যাশ অন ডেলিভারি)\n\n` +
        `দয়া করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`
      );
      $('#whatsappConfirmBtn').attr('href', `https://wa.me/8801800000000?text=${waText}`);

      // Show Bootstrap Modal
      const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
      successModal.show();

      // Reset form fields
      $('#productOrderForm')[0].reset();
      $('#custPhone').removeClass('is-valid');
      $('#phoneCheckIcon').html('<i class="fas fa-phone text-muted"></i>');
      updateOrderCalculation();

    }, 1000);
  });

  // -----------------------------------------------------------------------
  // 7. Live Real-Time Social Proof Popups (Bangladeshi Market Proven)
  // -----------------------------------------------------------------------
  const bdRecentBuyers = [
    { name: "আব্দুল্লাহ আল মামুন", detail: "৭ স্ট্র্যাপ মেগা কম্বো অর্ডার করেছেন", location: "উত্তরা, ঢাকা", time: "২ মিনিট আগে" },
    { name: "তানজিল আহমেদ", detail: "ভিআইপি গিফট কম্বো + এয়ারপডস অর্ডার করেছেন", location: "জিইসি, চট্টগ্রাম", time: "৪ মিনিট আগে" },
    { name: "সাইফুল ইসলাম", detail: "৭ স্ট্র্যাপ মেগা কম্বো অর্ডার করেছেন", location: "উপশহর, সিলেট", time: "৭ মিনিট আগে" },
    { name: "মেহেদী হাসান", detail: "স্ট্যান্ডার্ড প্যাক ১টি ঘড়ি অর্ডার করেছেন", location: "বোয়ালিয়া, রাজশাহী", time: "১১ মিনিট আগে" },
    { name: "নুরুল করিম", detail: "৭ স্ট্র্যাপ মেগা কম্বো অর্ডার করেছেন", location: "সালেহপুর, বগুড়া", time: "১৪ মিনিট আগে" },
    { name: "ফারহানা সুলতানা", detail: "ভিআইপি গিফট কম্বো উপহারের জন্য অর্ডার করেছেন", location: "ধানমন্ডি, ঢাকা", time: "১৮ মিনিট আগে" }
  ];

  let toastIndex = 0;
  function triggerSocialProofToast() {
    const buyer = bdRecentBuyers[toastIndex];
    $('#toastCustName').text(buyer.name);
    $('#toastCustDetail').text(buyer.detail);
    $('#toastCustTime').html(`<i class="fas fa-check-circle me-1"></i>${buyer.location} • ${buyer.time}`);

    $('#liveOrderToast').addClass('show');

    setTimeout(function () {
      $('#liveOrderToast').removeClass('show');
    }, 5500);

    toastIndex = (toastIndex + 1) % bdRecentBuyers.length;
  }

  // Trigger social proof after initial delay and interval
  setTimeout(function () {
    triggerSocialProofToast();
    setInterval(triggerSocialProofToast, 13000);
  }, 3500);

  // -----------------------------------------------------------------------
  // 8. Mock Video Overlay Click Handler
  // -----------------------------------------------------------------------
  window.playMockVideo = function (elem) {
    $(elem).html(`
      <div class="ratio ratio-16x9 w-100 h-100 bg-black">
        <iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" title="Product Video Review" allowfullscreen allow="autoplay"></iframe>
      </div>
    `);
  };
});
