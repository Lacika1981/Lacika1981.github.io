var windowWidth = $(window).width();
var windowHeight = $(window).height();

function followImageMouse() {}

function animateMenuElems() {
  var split = new SplitText('ul li', { type: 'words, chars' });
  return {
    shakeWordsIn: function() {
      TweenMax.staggerFromTo(
        split.words,
        0.5,
        { y: windowHeight * -1 },
        {
          y: 0,
          delay: 0.33,
        },
        0.02
      );
    },
    shakeWordsOut: function() {
      TweenMax.staggerFromTo(
        split.words,
        0.5,
        { y: 0 },
        {
          y: windowHeight,
        },
        0
      );
    },
  };
}

function menuControll() {
  var menuAnim = animateMenuElems();
  return {
    openMenu: function() {
      TweenMax.to('.wrapper', 0.33, {
        x: windowWidth,
        onStart: function() {
          $('body').addClass('open-menu');
          menuAnim.shakeWordsIn();
        },
      });
    },
    closeMenu: function() {
      menuAnim.shakeWordsOut();
      TweenMax.to('.wrapper', 0.33, {
        x: 0,
        delay: 0.5,
        onStart: function() {
          $('body').removeClass('open-menu');
        },
      });
    },
  };
}

var toggleMenu = $('.header--right');
var menuController = menuControll();
var menuLink = $('nav button');
var scrollElem = $('.scroll-container');

toggleMenu.click(function() {
  !$('body').hasClass('open-menu')
    ? menuController.openMenu()
    : menuController.closeMenu();
});

menuLink.click(function(e) {
  menuController.closeMenu();
  var a = $(e.target)[0].parentNode.dataset.toscroll;
  console.log(a);
  TweenMax.to(window, 1, {
    scrollTo: {
      y: '#' + a,
      offsetY: 100,
    },
    delay: 1,
  });
});

scrollElem.click(function() {
  console.log('called scroll');
  TweenMax.to(window, 1, {
    scrollTo: {
      y: '#skill',
      offsetY: 100,
    },
  });
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
  var split = new SplitText('.float p', { type: 'chars' });
  var tl = new TimelineMax();
  tl.to($('.float p:first-child'), 0.33, {
    left: 0,
  });
  tl.to($('.float p:last-child'), 0.33, {
    right: 0,
  });
  tl.staggerFromTo(
    split.chars,
    0.5,
    { y: windowHeight * -1 },
    {
      y: 0,
      delay: 0.33,
    },
    0.02
  );
  tl.staggerFromTo(
    split.chars,
    0.5,
    { x: 0 },
    {
      x: windowWidth * 1,
      delay: 0.33,
      onComplete: function() {
        $('.scramble').addClass('hide');
        TweenMax.set(this.target, {
          display: 'none',
        });
      },
    },
    0.02
  );
  tl.to('.end-of-intro', 0.5, {
    opacity: 1,
    delay: 0.15,
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

function changeGradient() {
  var gradientArray = [
    '135deg, black 0%, #0d49c4 100%',
    '135deg, black 0%, #29d3c1 100%',
    '135deg, black 0%, #d1d329 100%',
  ];
  return function(count) {
    TweenMax.to('.section.introduction', 0.4, {
      background: 'linear-gradient(' + gradientArray[count] + ')',
    });
  };
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
      // changeGradient()(count);
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

function drawCircle(elem, ability) {
  console.log(elem);
  TweenMax.fromTo(
    $(elem).find('ellipse'),
    10,
    {
      drawSVG: '0%',
    },
    {
      drawSVG: ability + '%',
    }
  );
}

// drawCircle();

/**
 * @function drawSkills
 */

function drawSkills() {
  Object.keys(skills).forEach(function(skill, index) {
    var title = $('<h3 />', { class: 'title white' });
    var abilityContainer = $('<div />', {
      class: 'ability-container flex',
    });
    var abilityBarContainer = $('<div />', {
      class: 'ability-bar-container flex flex-justify-left flex-align-center',
    });
    var svgContainer = $('<svg width="100" height="100"/>');
    var ellipse = $(
      '<svg width="100" height="100"><ellipse cx="50" cy="50" rx="46" ry="46" /></svg>'
    );
    // svgContainer.append(ellipse);
    var abilityBar = $('<span />', { class: 'ability-bar' });
    title.text(skills[skill]['title']);
    abilityContainer.append(ellipse);
    abilityContainer.append(title);
    abilityContainer.append(abilityBarContainer);
    abilityBarContainer.append(abilityBar);
    $('.skill-wrapper--inner').append(abilityContainer);
    var barWidth = abilityBarContainer.width();

    drawCircle(ellipse[0], skills[skill]['ability']);

    TweenMax.to(abilityBar, 1, {
      width: skills[skill]['ability'] + '%',
      background:
        'linear-gradient(to right, #d53535 0%, #e6c058 ' +
        barWidth * 0.5 +
        'px, #2cd04b ' +
        barWidth +
        'px, white ' +
        barWidth +
        'px, white 100%)',
    });
  });
}

drawSkills();

/* enf of drawSkills function */

$(this).scrollTop(0);

$(function() {
  var tl = new TimelineMax();
  $(window).on('beforeunload', function() {
    $(window).scrollTop(0);
  });
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

// var scroll = new LocomotiveScroll({
//   el: document.querySelector('#js-scroll'),
//   smooth: true,
// });

/**
 *
 * @function handleFirstTab - add focus ring back for users using tab
 */

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}

window.addEventListener('keydown', handleFirstTab);
