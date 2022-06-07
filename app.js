const addForm = document.querySelector('.add');
const search = document.querySelector('.search input');
const list = document.querySelector('.todos');

const generateTemplate = todo => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

const filterTodos = term => {
  // add filtered class
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));

  // remove filtered class
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

// add todos event
addForm.addEventListener('submit', e => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todos event
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

// filter todos event
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
//SHOPPING

$(function () {
  var goToCartIcon = function ($addTocartBtn) {
    var $cartIcon = $('.my-cart-icon');
    var $image = $(
      '<img width="30px" height="30px" src="' +
        $addTocartBtn.data('image') +
        '"/>'
    ).css({ position: 'fixed', 'z-index': '999' });
    $addTocartBtn.prepend($image);
    var position = $cartIcon.position();
    $image.animate(
      {
        top: position.top,
        left: position.left,
      },
      500,
      'linear',
      function () {
        $image.remove();
      }
    );
  };

  $('.my-cart-btn').myCart({
    classCartIcon: 'my-cart-icon',
    classCartBadge: 'my-cart-badge',
    affixCartIcon: true,
    checkoutCart: function (products) {
      $.each(products, function () {
        console.log(this);
      });
    },
    clickOnAddToCart: function ($addTocart) {
      goToCartIcon($addTocart);
    },
    getDiscountPrice: function (products) {
      var total = 0;
      $.each(products, function () {
        total += this.quantity * this.price;
      });
      return total * 0.5;
    },
  });
});
//SHOPPING
var promoCode;
var promoPrice;
var fadeTime = 300;

/* Assign actions */
$('.quantity input').change(function () {
  updateQuantity(this);
});

$('.remove button').click(function () {
  removeItem(this);
});

$(document).ready(function () {
  updateSumItems();
});

$('.promo-code-cta').click(function () {
  promoCode = $('#promo-code').val();

  if (promoCode == '10off' || promoCode == '10OFF') {
    //If promoPrice has no value, set it as 10 for the 10OFF promocode
    if (!promoPrice) {
      promoPrice = 10;
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != '') {
    alert('Invalid Promo Code');
    promoPrice = 0;
  }
  //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
  if (promoPrice) {
    $('.summary-promo').removeClass('hide');
    $('.promo-value').text(promoPrice.toFixed(2));
    recalculateCart(true);
  }
});

/* Recalculate cart */
function recalculateCart(onlyTotal) {
  var subtotal = 0;

  /* Sum up row totals */
  $('.basket-product').each(function () {
    subtotal += parseFloat($(this).children('.subtotal').text());
  });

  /* Calculate totals */
  var total = subtotal;

  //If there is a valid promoCode, and subtotal < 10 subtract from total
  var promoPrice = parseFloat($('.promo-value').text());
  if (promoPrice) {
    if (subtotal >= 10) {
      total -= promoPrice;
    } else {
      alert('Order must be more than £10 for Promo code to apply.');
      $('.summary-promo').addClass('hide');
    }
  }

  /*If switch for update only total, update only total display*/
  if (onlyTotal) {
    /* Update total display */
    $('.total-value').fadeOut(fadeTime, function () {
      $('#basket-total').html(total.toFixed(2));
      $('.total-value').fadeIn(fadeTime);
    });
  } else {
    /* Update summary display. */
    $('.final-value').fadeOut(fadeTime, function () {
      $('#basket-subtotal').html(subtotal.toFixed(2));
      $('#basket-total').html(total.toFixed(2));
      if (total == 0) {
        $('.checkout-cta').fadeOut(fadeTime);
      } else {
        $('.checkout-cta').fadeIn(fadeTime);
      }
      $('.final-value').fadeIn(fadeTime);
    });
  }
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.subtotal').each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });

  productRow.find('.item-quantity').text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $('.quantity input').each(function () {
    sumItems += parseInt($(this).val());
  });
  $('.total-items').text(sumItems);
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
    updateSumItems();
  });
}
//CLOCK
$(document).ready(function () {
  clockUpdate();
  setInterval(clockUpdate, 1000);
});

function clockUpdate() {
  var date = new Date();
  $('.digital-clock').css({ color: 'black' });
  function addZero(x) {
    if (x < 10) {
      return (x = '0' + x);
    } else {
      return x;
    }
  }

  function twelveHour(x) {
    if (x > 12) {
      return (x = x - 12);
    } else if (x == 0) {
      return (x = 12);
    } else {
      return x;
    }
  }

  var h = addZero(twelveHour(date.getHours()));
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());

  $('.digital-clock').text(h + ':' + m + ':' + s);
}
$(document).ready(function () {
  $('#toggle').click(function () {
    $('#clock').toggle();
  });
});
function main() {
  (function () {
    'use strict';

    $('a.page-scroll').click(function () {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate(
            {
              scrollTop: target.offset().top - 40,
            },
            900
          );
          return false;
        }
      }
    });

    // Show Menu on Book
    $(window).bind('scroll', function () {
      var navHeight = $(window).height() - 500;
      if ($(window).scrollTop() > navHeight) {
        $('.navbar-default').addClass('on');
      } else {
        $('.navbar-default').removeClass('on');
      }
    });

    $('body').scrollspy({
      target: '.navbar-default',
      offset: 80,
    });

    // Hide nav on click
    $('.navbar-nav li a').click(function (event) {
      // check if window is small enough so dropdown is created
      var toggle = $('.navbar-toggle').is(':visible');
      if (toggle) {
        $('.navbar-collapse').collapse('hide');
      }
    });

    // Portfolio isotope filter
    $(window).load(function () {
      var $container = $('.portfolio-items');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false,
        },
      });
      $('.cat a').click(function () {
        $('.cat .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
          },
        });
        return false;
      });
    });

    // Nivo Lightbox
    $('.portfolio-item a').nivoLightbox({
      effect: 'slideDown',
      keyboardNav: true,
    });
  })();
}
main();
