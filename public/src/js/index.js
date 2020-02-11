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
    var abilityBar = $('<span />', { class: 'ability-bar' });
    title.text(skills[skill]['title']);
    abilityContainer.append(title);
    abilityContainer.append(abilityBarContainer);
    abilityBarContainer.append(abilityBar);
    $('.skill-wrapper--inner').append(abilityContainer);
    var barWidth = abilityBarContainer.width();
    console.log(barWidth);
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

// var scroll = new LocomotiveScroll({
//   el: document.querySelector('#js-scroll'),
//   smooth: true,
// });
