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
// 매장 클릭 시 지도 변경

document.addEventListener("DOMContentLoaded", function () {
  const mapFrame = document.querySelector(".map");
  const accessBoxes = document.querySelectorAll(".access_box");

  const mapLinks = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9569220204808!2d126.91894418885497!3d37.5560787!...",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.626583643525!2d126.98054566095344!3d37.5638606...",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12650.506415588916!2d126.97279401708684!3d37.5638601...",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.423665055676!2d128.07887976083057!3d35.1959146..."
  ];

  accessBoxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      mapFrame.src = mapLinks[index];
    });
  });
});

// 수동 슬라이드 이동 컨트롤

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