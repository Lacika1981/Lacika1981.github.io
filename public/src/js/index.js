var windowHeight = $(window).height();

function menuControll() {
  return {
    openMenu: function() {
      TweenMax.to('.wrapper', 0.33, {
        y: windowHeight,
        onStart: function() {
          $('body').addClass('open-menu');
        },
      });
    },
    closeMenu: function() {
      TweenMax.to('.wrapper', 0.33, {
        y: 0,
        onStart: function() {
          $('body').removeClass('open-menu');
        },
      });
    },
  };
}

var toggleMenu = $('.header--right');
var menuController = menuControll();

toggleMenu.click(function() {
  !$('body').hasClass('open-menu')
    ? menuController.openMenu()
    : menuController.closeMenu();
});

/**
 * @function scrambleText
 * @description scramble text on introduction section
 */

var words = ['HTML', 'CSS', 'JavaScript'];
var count = 0;
var duration = null;

function hideScrambleText() {
  TweenMax.to('.scramble', 0.25, {
    onStart: function() {},
    opacity: 0,
    delay: duration * words.length - 2,
    onComplete: function() {
      createParagraphs();
    },
  });
}

function createParagraphs() {
  if ($('.float p').length) return;
  var p = $('<p />');
  words.forEach(function(word) {
    var pc = p.clone();
    pc.text(word);
    $('.float').append(pc);
  });
  showMainSkills();
}

function animateSkills() {
  TweenMax.to($('.float p:first-child'), 0.33, {
    left: 0,
  });
  TweenMax.to($('.float p:last-child'), 0.33, {
    right: 0,
  });
}

function showMainSkills() {
  $('.float').addClass('show');
  $('.scramble').addClass('hide');
  TweenMax.to('.float', 0.25, {
    opacity: 1,
  });
  animateSkills();
}

var tlScramble = new TimelineMax();
tlScramble.pause();

function scrambleText() {
  tlScramble.play();
  console.log('called');
  if (count >= words.length) return;
  tlScramble.to('.scramble p', 2, {
    scrambleText: words[count],
    onStart: function() {},
    onComplete: function() {
      count++;
      scrambleText();
    },
  });
  tlScramble.to('.scramble', 0, {
    onStart: function() {
      !duration ? (duration = tlScramble.totalTime()) : duration;
    },
    onComplete: function() {
      hideScrambleText();
    },
  });
}

/* end of scrambleText functions */

$(function() {
  var tl = new TimelineMax();
  tl.fromTo(
    '.preloader p',
    0.5,
    {
      opacity: 0.5,
    },
    {
      opacity: 1,
      repeat: -1,
      yoyo: true,
    }
  );
  tl.to('.preloader', 0.5, {
    opacity: 0,
    onComplete: function() {
      TweenMax.set(this.target, {
        display: 'none',
      });
      scrambleText();
      tl.pause();
    },
  });
});
