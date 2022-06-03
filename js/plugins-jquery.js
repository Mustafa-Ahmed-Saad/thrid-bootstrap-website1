$(document).ready(function () {
  if (localStorage.getItem('path_theme_style')) {
    $('link[href*="theme"]').attr('href', localStorage.getItem('path_theme_style'));
  }
  if (localStorage.getItem('path_logo_img')) {
    $('img[src*="./img/my-logo"]').attr('src', localStorage.getItem('path_logo_img'));
  }

  // control the carousel time to chang the background img
  $('.carousel').carousel({
    interval: 6000,
  });

  //show color option div when click the gear
  $('.gear-check').click(function () {
    document.querySelector('.div-gear i').classList.toggle('fa-spin');
    $('.color-option').fadeToggle();
    $('.lang-option').fadeToggle();
  });

  // change theme color on click
  var colorLi = $('.color-option ul li');
  colorLi.eq(0).css('backgroundColor', '#e41b17').end().eq(1).css('backgroundColor', '#e426d5').end().eq(2).css('backgroundColor', '#009aff').end().eq(3).css('backgroundColor', '#9fa600');

  colorLi.click(function () {
    $('link[href*="theme"]').attr('href', $(this).attr('data-value'));
    localStorage.setItem('path_theme_style', $(this).attr('data-value'));
    $('img[src*="img/my-logo"]').attr('src', $(this).attr('data-logo'));
    localStorage.setItem('path_logo_img', $(this).attr('data-logo'));
  });

  // scroll button
  var scrollButton = $('#scroll-top');
  $(window).scroll(function () {
    $(this).scrollTop() >= 800 ? scrollButton.show() : scrollButton.hide();
  });
  scrollButton.click(function () {
    $('html,body').animate({ scrollTop: 0 }, 100);
    // or with vanilla js
    // document.querySelector('#carouselExampleCaptions').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  });
});

// loading screen
window.onload = function (e) {
  // feadw out for please waite..
  $('.my-class').fadeOut(1000, function () {
    $(this).remove();
  });
  // feadw out for loading div
  $('.loading-overlay div.sk-cube-grid').fadeOut(1000, function () {
    $(this)
      .parent()
      .fadeOut(1000, function () {
        $(this).remove();
      });
    // to show scroll
    $('body').css('overflow', 'auto');
  });
};

// animate to progress
let sectionOurSkills = $('section[class="our-skills"]');
if (sectionOurSkills.length) {
  let ourSkills = document.querySelector('.our-skills');
  window.onscroll = function () {
    //skills offset top
    // the value of distance from this element and the start page of document
    let skillsoffsetTop = ourSkills.offsetTop;
    //skills outer height
    // get the visible hight of this element with all thing like padding and border but without margin
    let skillsOuterHeight = ourSkills.offsetHeight;
    // window height to get the visible area in browser
    let windowHeight = this.innerHeight;
    // window scrollTop to get the value of the scroll i do it now
    let windowScrollTop = this.pageYOffset;

    // if scroll === the place the element is in it
    if (windowScrollTop > skillsoffsetTop + skillsOuterHeight - windowHeight) {
      let allSkills = document.querySelectorAll('.progress div.progress-bar');
      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    }
  };
}
/* start language button */
document.querySelector('.lang-button').onclick = function () {
  let myRtlBootstrap = $('link[href*="my-rtl-bootstrap"]');
  if (myRtlBootstrap.length) {
    // to check if element exist or not
    myRtlBootstrap.remove();
  } else {
    $('link[href*="master"]').after('<link rel="stylesheet" href="css/my-rtl-bootstrap.css" />');
  }
};
/* end language button */

// moving letter
// Wrap every letter in a span
$('.ml3').each(function () {
  $(this).html(
    $(this)
      .text()
      .replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")
  );
});

ml.timelines['ml3'] = anime
  .timeline({ loop: true })
  .add({
    targets: '.ml3 .letter',
    opacity: [0, 1],
    easing: 'easeInOutQuad',
    duration: 2250,
    delay: function (el, i) {
      return 150 * (i + 1);
    },
  })
  .add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 1000,
  });
