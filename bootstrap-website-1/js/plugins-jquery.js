/* لو عاوز تعدل في حاجة في الكاروسل */
/*var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false
})*/

// و هتلاقي الكلام دا في صفحة البوت ستراب في الكومبونتنت في الكاروسيل بس مش شغال لكن الكود اللي شغال هوا التالي
// $(document).ready(function () {
//   $('.carousel').carousel(
//     {
//       interval: 1000,
//     }
//   );
// });

// FIXME: test
// TODO: test

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
   var colorLi = $('.color-option ul li'); // هكيشها علشان هستخدمها اكتر من مرة
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
      /* اف المختصرة */
      $(this).scrollTop() >= 800 ? scrollButton.show() : scrollButton.hide();
   });
   scrollButton.click(function () {
      $('html,body').animate({ scrollTop: 0 }, 100);
      // or
      // document.querySelector('#carouselExampleCaptions').scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
   });
   /* اول ما اعمل سكرول للويندو هيطبعلي السكرول اللي انا فية دلوقتي كام */
   /* console.log($(this).scrollTop()); */
});

// problem here in this code of comment
//loading screen
// $(window).load(function () {
//   // بس الطريقة دي مش شغالة مش عارف لية
// });
// or
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

// animat to progress
let sectionOurSkills = $('section[class="our-skills"]');
if (sectionOurSkills.length) {
   let ourSkills = document.querySelector('.our-skills');
   window.onscroll = function () {
      //skills offset top
      // الاوفسيت توب بيجيب المسافة اللي بين العنصر دا و الدوكيومينت من فوق
      let skillsoffsetTop = ourSkills.offsetTop; // علشان اجيب الزء اللي فوق السكشن بتاع السكلز و بتجبلك الطول   // الاوف سيت توب دي هتجبلك الجزء اللي فوق السكشن بتاع السكلز
      //skills outer height
      // كدا انا بجيب الطول المرئي بتاع العنصر دا كلو بالبادنج بالبوردر بكل حاجة ماعدا المارجين
      let skillsOuterHeight = ourSkills.offsetHeight; // هيجبلك طول السكشن دا كلو شامل البوردر و البادنج و كل حاجة
      // window height
      // كدا انا بجيب المساحة المرئية الحالية اللي قدامي في شاشة البروزر يعني لو النا عملت زوم او ظهرت الكونسول او كدا المساجة المرئية بتعت الطول اللي انا شايفة دي هتتغير
      let windowHeight = this.innerHeight; // بيجبلك الطول الحالي بتاع الويندو اللي انت جواها حتي لو عملت زوم اوت هتلاقية زودلك الهايت لانك عملت زوم اوت
      // window scrollTop
      // بجيب السكرول بتاعي الحالي اللي انا بعملو دلوقتي في الويندو
      let windowScrollTop = this.pageYOffset; // البكسيل اللي خاص بالسكرول الجزء اللي انت بتعملة سكرول

      if (windowScrollTop > skillsoffsetTop + skillsOuterHeight - windowHeight) {
         // المعادلة دي يعني بقولو لو السكرول وصل لمكان العنصر اللي بالظبط
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
      /* علشان اتشيك لو العنصر موود ولا لا */
      console.log(myRtlBootstrap.length);
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
