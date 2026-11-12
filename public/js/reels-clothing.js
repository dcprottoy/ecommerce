/* Interactive Script for Viral Reels Clothing Landing Page (jQuery) */

$(document).ready(function () {
  // Base Product Configurations
  var unitPrice = 1290;
  var currentQty = 1;
  var selectedColor = "রয়্যাল নেভি ব্লু (Navy Blue)";
  var selectedSize = "L (Chest 40\")";
  var deliveryFee = 70; // Default Inside Dhaka

  // 1. Live Countdown Timer (Simulated 3-hour flash sale)
  function startCountdown(durationMinutes) {
    var timer = durationMinutes * 60;
    var interval = setInterval(function () {
      var hours = Math.floor(timer / 3600);
      var minutes = Math.floor((timer % 3600) / 60);
      var seconds = Math.floor(timer % 60);

      var hStr = (hours < 10 ? "0" : "") + hours;
      var mStr = (minutes < 10 ? "0" : "") + minutes;
      var sStr = (seconds < 10 ? "0" : "") + seconds;

      $('#reelsCountdown').text(hStr + ":" + mStr + ":" + sStr);

      if (--timer < 0) {
        timer = 3 * 3600; // Reset
      }
    }, 1000);
  }
  startCountdown(165); // 2 hrs 45 mins

  // 2. Color Swatch Selector
  $('.color-swatch').on('click', function () {
    $('.color-swatch').removeClass('active');
    $(this).addClass('active');

    selectedColor = $(this).data('color-name');
    var colorHex = $(this).data('color-hex');
    var dressPreviewImg = $(this).data('image');

    $('#selectedColorName').text(selectedColor);
    $('#orderFormColor').text(selectedColor);
    $('#inputColor').val(selectedColor);

    // Update hero reels dress preview
    if (dressPreviewImg) {
      $('#mainReelImg').css('opacity', '0.4');
      setTimeout(function() {
        $('#mainReelImg').attr('src', dressPreviewImg).css('opacity', '1');
      }, 200);
    }
  });

  // 3. Size Pill Selector
  $('.size-pill').on('click', function () {
    $('.size-pill').removeClass('active');
    $(this).addClass('active');

    selectedSize = $(this).data('size');
    $('#selectedSizeName').text(selectedSize);
    $('#orderFormSize').text(selectedSize);
    $('#inputSize').val(selectedSize);
  });

  // 4. Quantity Adjuster & Bundle Calculation
  function updateOrderTotals() {
    var subtotal = unitPrice * currentQty;
    var bundleDiscount = 0;
    var actualDelivery = deliveryFee;

    // Bundle Deal logic:
    // 2 or more pcs -> Free Delivery!
    // 3 or more pcs -> Free Delivery + ৳200 special combo discount!
    if (currentQty >= 2) {
      actualDelivery = 0; // Free delivery
      $('#bundleAlert').removeClass('d-none');
      $('#deliveryFeeRow').html('<span class="text-success fw-bold">ফ্রি ডেলিভারি (অফার!)</span>');
    } else {
      $('#bundleAlert').addClass('d-none');
      $('#deliveryFeeRow').text('৳ ' + deliveryFee);
    }

    if (currentQty >= 3) {
      bundleDiscount = 200;
      $('#comboDiscountRow').removeClass('d-none');
      $('#comboDiscountVal').text('- ৳ ' + bundleDiscount);
    } else {
      $('#comboDiscountRow').addClass('d-none');
    }

    var grandTotal = subtotal + actualDelivery - bundleDiscount;

    // Update labels
    $('.qty-input').val(currentQty);
    $('#orderFormQty').text(currentQty + ' পিস');
    $('#inputQty').val(currentQty);
    $('#summarySubtotal').text('৳ ' + subtotal.toLocaleString('en-US'));
    $('#summaryGrandTotal').text('৳ ' + grandTotal.toLocaleString('en-US'));
    $('#mobileBarPrice').text('৳ ' + grandTotal.toLocaleString('en-US'));
    $('#mobileBarQty').text(currentQty + ' পিস');
  }

  $('#qtyMinus').on('click', function () {
    if (currentQty > 1) {
      currentQty--;
      updateOrderTotals();
    }
  });

  $('#qtyPlus').on('click', function () {
    if (currentQty < 10) {
      currentQty++;
      updateOrderTotals();
    }
  });

  // 5. Delivery Location Selector
  $('#deliveryZone').on('change', function () {
    deliveryFee = parseInt($(this).val());
    updateOrderTotals();
  });

  // 6. Smooth Jump to Checkout Form
  $('.jump-to-order').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('#order-section').offset().top - 40
    }, 500);

    // Flash border
    $('.checkout-box').css('border-color', '#FF2E63');
    $('#clientName').focus();
  });

  // 7. Interactive Reels Heart Like button
  var liked = false;
  var baseLikes = 42800;
  $('#reelsLikeBtn').on('click', function () {
    liked = !liked;
    var count = liked ? baseLikes + 1 : baseLikes;
    var kCount = (count / 1000).toFixed(1) + 'k';

    if (liked) {
      $(this).find('i').removeClass('far').addClass('fas text-danger');
      $(this).find('.like-num').text(kCount);
      // Floating heart burst
      $('#heartBurst').show().addClass('animate-burst');
      setTimeout(function () {
        $('#heartBurst').hide().removeClass('animate-burst');
      }, 700);
    } else {
      $(this).find('i').removeClass('fas text-danger').addClass('far');
      $(this).find('.like-num').text(kCount);
    }
  });

  // 8. Order Form Submission (Cash on Delivery)
  $('#orderForm').on('submit', function (e) {
    e.preventDefault();

    var name = $('#clientName').val().trim();
    var phone = $('#clientPhone').val().trim();
    var address = $('#clientAddress').val().trim();
    var zoneName = $('#deliveryZone option:selected').text();
    var note = $('#orderNote').val().trim() || 'কোনো বিশেষ নোট নেই';

    // BD Phone validation
    var bdPhoneRegex = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(phone.replace(/[\s-]/g, ''))) {
      alert('দয়া করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)');
      $('#clientPhone').focus();
      return;
    }

    var submitBtn = $(this).find('button[type="submit"]');
    var originalHtml = submitBtn.html();
    submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i> অর্ডার কনফার্ম হচ্ছে...');

    var orderNumber = 'RS-' + Math.floor(100000 + Math.random() * 900000);
    var finalAmount = $('#summaryGrandTotal').text();

    setTimeout(function () {
      submitBtn.prop('disabled', false).html(originalHtml);

      // Create Success Order Modal
      var modalHtml = `
        <div class="modal fade" id="orderConfirmModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background:#161A26; border: 2px solid #FF2E63; color:#fff; border-radius:18px;">
              <div class="modal-body text-center p-4">
                <div style="width:72px; height:72px; background:rgba(0, 230, 118, 0.15); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; color:#00E676; font-size:36px; margin-bottom:15px;">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h3 class="fw-bold text-white font-bn mb-1">অর্ডার সফলভাবে গৃহীত হয়েছে! 🎉</h3>
                <p class="text-white-50 small font-bn mb-3">ধন্যবাদ <strong>${name}</strong>! আপনার অর্ডার নাম্বার: <span class="badge bg-secondary font-monospace">${orderNumber}</span></p>

                <div class="p-3 text-start mb-3" style="background:rgba(255,255,255,0.04); border-radius:12px; font-size:0.9rem;">
                  <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted font-bn">প্রোডাক্ট:</span>
                    <span class="text-white fw-bold font-bn">ভাইরাল প্রিমিয়াম কুর্তি / ড্রেস</span>
                  </div>
                  <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted font-bn">কালার ও সাইজ:</span>
                    <span class="text-white font-bn">${selectedColor} | ${selectedSize}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted font-bn">পরিমাণ:</span>
                    <span class="text-white font-bn">${currentQty} পিস</span>
                  </div>
                  <div class="d-flex justify-content-between mb-1">
                    <span class="text-muted font-bn">ডেলিভারি এলাকা:</span>
                    <span class="text-white font-bn">${zoneName}</span>
                  </div>
                  <div class="border-top border-secondary border-opacity-25 pt-2 mt-2 d-flex justify-content-between fs-6 fw-bold">
                    <span class="text-white font-bn">সর্বমোট মূল্য (ক্যাশ অন ডেলিভারি):</span>
                    <span class="text-pink-gradient font-monospace">${finalAmount}</span>
                  </div>
                </div>

                <div class="alert alert-success border-0 small text-start font-bn mb-4 py-2" style="background:rgba(0,230,118,0.12); color:#A7F3D0;">
                  <i class="fas fa-truck-fast me-1"></i> ডেলিভারি ম্যান আসার পর আপনি প্যাকেট খুলে কোয়ালিটি চেক করে টাকা পরিশোধ করতে পারবেন।
                </div>

                <div class="d-grid gap-2">
                  <a href="https://wa.me/8801800000000?text=${encodeURIComponent('Hi ReelStyle BD! I just placed order: ' + orderNumber + ' for ' + currentQty + ' pcs (' + selectedColor + ', ' + selectedSize + '). Total: ' + finalAmount)}" target="_blank" class="btn btn-success py-2 font-bn fw-bold">
                    <i class="fab fa-whatsapp me-2 fs-5"></i> হোয়াটসঅ্যাপে ট্র্যাকিং আপডেট নিন
                  </a>
                  <button type="button" class="btn btn-outline-light py-2 font-bn" data-bs-dismiss="modal">সম্পন্ন হয়েছে</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      $('#orderConfirmModal').remove();
      $('body').append(modalHtml);
      var confirmModal = new bootstrap.Modal(document.getElementById('orderConfirmModal'));
      confirmModal.show();

      // Reset form
      $('#orderForm')[0].reset();
      currentQty = 1;
      updateOrderTotals();
    }, 1200);
  });

  // 9. Live Social Proof Purchase Popups (Reels conversion booster)
  var recentPurchases = [
    { name: "মালিহা খানম (Maliha)", location: "উত্তরা, ঢাকা", item: "২ পিস (রয়্যাল নেভি ও অলিভ)", time: "৪ মিনিট আগে" },
    { name: "নুসরাত জাহান (Nusrat)", location: "জিইসি, চট্টগ্রাম", item: "১ পিস (মেরুন ওয়াইন, সাইজ L)", time: "৯ মিনিট আগে" },
    { name: "ফারহানা রহমান (Farhana)", location: "ধানমন্ডি, ঢাকা", item: "২ পিস (ফ্রি ডেলিভারি অফার)", time: "১৫ মিনিট আগে" },
    { name: "সামিয়া আক্তার (Samia)", location: "সিলেট সদর", item: "১ পিস (মিডনাইট ব্ল্যাক, M)", time: "২৩ মিনিট আগে" },
    { name: "তানজিনা ইসলাম", location: "মিরপুর ২, ঢাকা", item: "৩ পিস (স্পেশাল কম্বো অফার)", time: "৩১ মিনিট আগে" }
  ];

  var purchaseIndex = 0;
  function showNextPurchase() {
    var p = recentPurchases[purchaseIndex];
    $('#toastCustomer').text(p.name);
    $('#toastDetails').text(p.item + ' • ' + p.location);
    $('#toastTime').text(p.time);

    $('#reelsLiveToast').addClass('show');

    setTimeout(function () {
      $('#reelsLiveToast').removeClass('show');
    }, 5000);

    purchaseIndex = (purchaseIndex + 1) % recentPurchases.length;
  }

  setTimeout(function () {
    showNextPurchase();
    setInterval(showNextPurchase, 15000);
  }, 3500);

  // Initial calculation run
  updateOrderTotals();
});

