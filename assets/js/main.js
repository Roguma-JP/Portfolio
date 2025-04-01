'use strict';

{
  $(function () {
    $('.header__btn').on('click', function () {
      $('.nav').toggleClass('active');
    });

    $('.nav__btn, .nav__item a').on('click', function () {
      $('.nav').removeClass('active');
    });
  });
}

// IntersectionObserver 기반 scroll 애니메이션

document.addEventListener("DOMContentLoaded", function () {
  const mainView = document.querySelector(".mainView");
  const sectionList = document.querySelector(".section--list");
  const lists = document.querySelectorAll(".list");
  const sectionSpac = document.querySelector(".section--spac");
  let currentIndex = 0;
  let isScrolling = false;

  if (window.innerWidth >= 769) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("list__show");
          } else {
            entry.target.classList.remove("list__show");
          }
        });
      },
      { threshold: 0.5 }
    );

    lists.forEach((list) => observer.observe(list));

    mainView.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        lists[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        currentIndex = 0;
        event.preventDefault();
      }
    });

    sectionList.addEventListener(
      "wheel",
      (event) => {
        if (isScrolling) return;
        isScrolling = true;

        requestAnimationFrame(() => {
          if (event.deltaY > 0) {
            if (currentIndex < lists.length - 1) {
              currentIndex++;
              lists[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
              });
            } else {
              sectionSpac.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
              });
            }
          } else {
            if (currentIndex > 0) {
              currentIndex--;
              lists[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
              });
            } else {
              mainView.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
              });
            }
          }

          setTimeout(() => {
            isScrolling = false;
          }, 800);
        });

        event.preventDefault();
      },
      { passive: false }
    );
  }
});

$(document).ready(function () {
  $('.slick-slider').slick({
    centerMode: true,
    centerPadding: '0px', // 가운데 여백 제거
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '20px'
          
        }
      }
    ]
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const mapFrame = document.querySelector(".map");
  const accessBoxes = document.querySelectorAll(".access_box");

  const mapLinks = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1581.4784610102404!2d126.9223559587219!3d37.5560787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c999f6eb8c605%3A0x7e3e628400a5f42a!2z7ZmN64yA7KCE64u0!5e0!3m2!1sko!2sjp!4v1743519170325!5m2!1sko!2sjp",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6325.419568217624!2d126.98002293488769!3d37.5619008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca33c00a5e129%3A0xcf8b2b8c1f62d00e!2z64m067mE7KCE7J6Q64u067CwKE5FV0IgVkFQRSBTSE9QKQ!5e0!3m2!1sko!2sjp!4v1743519464773!5m2!1sko!2sjp",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.2512820948177!2d126.99098!3d37.5727002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca372412a0fb7%3A0x1a522bb7c86b73ed!2z64m067mE7KCE7J6Q64u067Cw!5e0!3m2!1sko!2sjp!4v1743519549179!5m2!1sko!2sjp",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d815.1101094791616!2d128.08269921431008!3d35.195496720599145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356efd9ee1e08f85%3A0x3c43a038129bdc1c!2z64m067mE7J2Y7KCE7J6Q64u067Cw!5e0!3m2!1sko!2sjp!4v1743519772140!5m2!1sko!2sjp"
  ];

  accessBoxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      mapFrame.src = mapLinks[index];
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slide");
  const slideImages = document.querySelectorAll(".slide__img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let slideIndex = 0;
  const imgWidth = 663;
  const gap = 20;
  const totalSlides = slideImages.length;

  slides.style.width = `${(totalSlides * (imgWidth + gap))}px`;

  function moveSlide(index) {
    if (index < 0) {
      slideIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      slideIndex = 0;
    } else {
      slideIndex = index;
    }

    slides.style.transform = `translateX(-${slideIndex * (imgWidth + gap)}px)`;
  }

  prevButton.addEventListener("click", function () {
    moveSlide(slideIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    moveSlide(slideIndex + 1);
  });

  setInterval(() => moveSlide(slideIndex + 1), 3000);
});



document.addEventListener("DOMContentLoaded", function () { 
  const topBtn = document.getElementById("topBtn");
  // トップへスムーズ移動
  function handleTopBtnClick(event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        topBtn.classList.add("hidden");
  }
      // トップボタン表示/非表示
  function handleScroll() {
    if (window.scrollY === 0) {
      topBtn.classList.add("hidden");
    } else {
      topBtn.classList.remove("hidden");
    }
  }
  if (topBtn) {
    topBtn.addEventListener("click", handleTopBtnClick);
    window.addEventListener("scroll", handleScroll);
  }
});