import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
import Choices from "choices.js";
import {Fancybox} from "@fancyapps/ui";

document.addEventListener("DOMContentLoaded", () => {
    // слайдеры

    if (document.querySelectorAll('.js--products-slider .swiper-slide').length > 0) {
        document.querySelectorAll('.js--products-slider').forEach(item => {
            let prevButton = item.closest('section').querySelector('.swiper-button-prev')
            let nextButton = item.closest('section').querySelector('.swiper-button-next')

            var slider = new Swiper(item, {
                loop: true,
                spaceBetween: 25,
                slidesPerView: 3,
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 3,
                    },
                    780: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                },
            });
        })
    }

    if (document.querySelectorAll('.js--products-horisontal-slider .swiper-slide').length > 0) {
        document.querySelectorAll('.js--products-horisontal-slider').forEach(item => {
            let prevButton = item.closest('section').querySelector('.swiper-button-prev')
            let nextButton = item.closest('section').querySelector('.swiper-button-next')

            var slider = new Swiper(item, {
                loop: true,
                spaceBetween: 20,
                slidesPerView: 1,
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                },
            });
        })
    }

    if (document.querySelectorAll('.js--media-slider .swiper-slide').length > 0) {
        document.querySelectorAll('.js--media-slider').forEach(item => {
            let prevButton = item.closest('section').querySelector('.swiper-button-prev')
            let nextButton = item.closest('section').querySelector('.swiper-button-next')

            var slider = new Swiper(item, {
                loop: true,
                spaceBetween: 20,
                slidesPerView: 3,
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                    },
                    780: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
            });
        })
    }

    if (document.querySelectorAll('.js--item-photos .swiper-slide').length > 0) {
        document.querySelectorAll('.js--item-photos').forEach(item => {
            let prevButton = item.closest('section').querySelector('.swiper-button-prev')
            let nextButton = item.closest('section').querySelector('.swiper-button-next')
            let thumbs = item.closest('section').querySelector('.js--item-thumbs')

            var sliderThumbs = new Swiper(thumbs, {
                loop: true,
                spaceBetween: 0,
                slidesPerView: "auto",
                freeMode: true,
                watchSlidesProgress: true,
            });

            var slider = new Swiper(item, {
                loop: true,
                navigation: {
                    nextEl: nextButton,
                    prevEl: prevButton,
                },
                thumbs: {
                    swiper: sliderThumbs,
                },
            });
        })
    }

    // селекты
    document.querySelectorAll('.js--select-style').forEach(item => {
        let select = new Choices(item, {
            allowHTML: true,
            allowHtmlUserInput: true,
            searchEnabled: false
        });

        item.addEventListener('choice', (event) => {
            if(event.detail.element.dataset.url) {
                window.location.href = event.detail.element.dataset.url;
            }
        })
    })

    Fancybox.bind("[data-fancybox]", {});

    document.querySelector('.js--toggle-description').addEventListener('click', (e) => {
        let link = e.target;
        let cropText = document.querySelector('.description__crop-text');
        cropText.classList.toggle('visible');
        link.innerText = cropText.classList.contains('visible') ? link.dataset.hide : link.dataset.show;
    })
})
