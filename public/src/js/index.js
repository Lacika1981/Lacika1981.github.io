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

function drawCircle(elem, ability, counter) {
  var obj = {
    value: 0,
  };
  var ellipseMax = TweenMax.fromTo(
    $(elem).find('ellipse'),
    10,
    {
      drawSVG: '0%',
    },
    {
      drawSVG: ability + '%',
    }
  );

  var counterMax = TweenMax.to(obj, 10, {
    value: ability,
    roundProps: {
      value: 1,
    },
    onUpdate: function() {
      counter[0].innerHTML = obj.value;
    },
  });
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
      'data-title': skills[skill]['title'],
    });
    var abilityBarContainer = $('<div />', {
      class: 'ability-bar-container flex flex-justify-left flex-align-center',
    });
    var svgContainer = $('<div />', {
      class: 'svgContainer',
    });
    var ellipse = $(
      '<svg width="100" height="100"><ellipse cx="50" cy="50" rx="46" ry="46" /></svg>'
    );
    var counter = $('<p>', { class: 'counter' });
    counter.text(0);
    var abilityBar = $('<span />', { class: 'ability-bar' });
    title.text(skills[skill]['title']);
    svgContainer.append(ellipse);
    svgContainer.append(counter);
    abilityContainer.append(svgContainer);
    abilityContainer.append(title);
    abilityContainer.append(abilityBarContainer);
    abilityBarContainer.append(abilityBar);
    $('.skill-wrapper--inner').append(abilityContainer);
    var barWidth = abilityBarContainer.width();

    drawCircle(ellipse[0], skills[skill]['ability'], counter);

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

// drawSkills();

/**
 * @function showMap - show workplace on click
 */
var map;

function initMap() {
  console.log('initMap right');
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 51.221115, lng: -1.146825 },
    zoom: 16,
  });
}

function animateButton() {
  var tl = new TimelineMax();
  var initmap = false;

  function animate(e) {
    tl.to('.show-map', 0.3, {
      transform: 'scale(1.3)',
      ease: Elastic.easeOut.config(1, 0.3),
    });
    tl.to('.show-map', 0.3, {
      transform: 'scale(0)',
      ease: Elastic.easeOut.config(1, 0.3),
      onComplete: function() {
        this.target.display = 'none';
      },
    });
    tl.to('.map', 0.3, {
      height: '240px',
    });
    tl.to('.map-container', 0.3, {
      transform: 'scale(1)',
      height: '200px',
    });
    tl.to('.map', 0.3, {
      opacity: 1,
    });
  }

  animate();
  tl.pause();

  return {
    play: function(e) {
      tl.play();
    },
    reverse: function(e) {
      console.log('reverse');
      tl.reverse();
    },
  };
}

var animateBtn = animateButton();

$('.show-map').click(function(e) {
  animateBtn.play(e);
});
$('.close-icon').click(function() {
  animateBtn.reverse();
});

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

function changeSiteTitle(elem) {
  document.title = $(elem).attr('data-title');
}

function addClickToAbilityContainers() {
  $('.ability-container').click(function(e) {
    changeSiteTitle(e.target);
  });
}

$('.show-skills').one('click', function(e) {
  drawSkills();
  addClickToAbilityContainers();
});

$('#skill').mouseleave(function() {
  document.title = 'Laszlo Varga - Web Developer';
});

// var scroll = new LocomotiveScroll({
//   el: document.querySelector('#js-scroll'),
//   smooth: true,
// });

// scroll.on('call', function(instance) {
//   drawSkills();
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
