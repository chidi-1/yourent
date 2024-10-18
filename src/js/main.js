import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
import Choices from "choices.js";
import {Fancybox} from "@fancyapps/ui";
import IMask from 'imask';

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

    if (document.querySelectorAll('.js--products-slider-cart .swiper-slide').length > 0) {
        document.querySelectorAll('.js--products-slider-cart').forEach(item => {
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
                        slidesPerView: 3,
                    },
                    780: {
                        slidesPerView: 5,
                    },
                    1024: {
                        slidesPerView: 7,
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
            if (event.detail.element.dataset.url) {
                window.location.href = event.detail.element.dataset.url;
            }
        })
    })

    Fancybox.bind("[data-fancybox]", {});

    document.querySelector('.js--toggle-description') && document.querySelector('.js--toggle-description').addEventListener('click', (e) => {
        let link = e.target;
        let cropText = document.querySelector('.description__crop-text');
        cropText.classList.toggle('visible');
        link.innerText = cropText.classList.contains('visible') ? link.dataset.hide : link.dataset.show;
    })

    // календарь
    flatpickr(".calendar-inline", {
        inline: true,
        "locale": "ru"
    });
    flatpickr(".calendar-inline.range", {
        inline: true,
        mode: "range",
        "locale": "ru"
    });

    // маска телефон
    if (document.querySelectorAll('.js--input-phone').length) {
        document.querySelectorAll('.js--input-phone').forEach(input => {
            const mask = IMask(input, {mask: '+{7} (000) 000-00-00'});
        })
    }

    // карты
    // карта расположения офиса
    if (document.querySelector('#officeMap')) {
        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map('officeMap', {
                center: [55.683857, 37.725741],
                zoom: 12
            });

            var myPlacemark = new ymaps.Placemark([55.683857, 37.725741], {
                iconContent: 'Офис-шоурум tur-arenda.ru',
            }, {
                preset: 'islands#blueStretchyIcon'
            });

            myMap.geoObjects.add(myPlacemark)
        }
    }

    // карта расположения точек самовывоза
    if (document.querySelector('#pointsMap')) {
        ymaps.ready(init2);
        var myMap2;

        let pointsList = document.querySelector('.js--control-map');
        let points = []

        pointsList.querySelectorAll('.address__container').forEach((item) => {
            points.push([item.dataset['lat'], item.dataset['lan']])
            item.addEventListener('click', (e) => {
                if (!item.classList.contains('active')) {
                    if (document.querySelector('.address__container.active')) {
                        document.querySelector('.address__container.active').classList.remove('active')
                    }
                    item.classList.add('active')
                    myMap2.setCenter([item.dataset['lat'], item.dataset['lan']])
                    myMap2.setZoom(14)
                }
            })
        })

        function init2() {
            myMap2 = new ymaps.Map('pointsMap', {
                center: [55.683857, 37.725741],
                zoom: 12
            });

            var clusterer = new ymaps.Clusterer({
                preset: 'islands#blueClusterIcons',
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
            })

            /*var points = [
                    [55.831903,37.411961], [55.763338,37.565466], [55.763338,37.565466], [55.744522,37.616378], [55.780898,37.642889], [55.793559,37.435983], [55.800584,37.675638], [55.716733,37.589988], [55.775724,37.560840], [55.822144,37.433781], [55.874170,37.669838], [55.716770,37.482338], [55.780850,37.750210], [55.810906,37.654142], [55.865386,37.713329], [55.847121,37.525797], [55.778655,37.710743], [55.623415,37.717934], [55.863193,37.737000], [55.866770,37.760113], [55.698261,37.730838], [55.633800,37.564769], [55.639996,37.539400], [55.690230,37.405853], [55.775970,37.512900], [55.775777,37.442180], [55.811814,37.440448], [55.751841,37.404853], [55.627303,37.728976], [55.816515,37.597163], [55.664352,37.689397], [55.679195,37.600961], [55.673873,37.658425], [55.681006,37.605126], [55.876327,37.431744], [55.843363,37.778445], [55.875445,37.549348], [55.662903,37.702087], [55.746099,37.434113], [55.838660,37.712326], [55.774838,37.415725], [55.871539,37.630223], [55.657037,37.571271], [55.691046,37.711026], [55.803972,37.659610], [55.616448,37.452759], [55.781329,37.442781], [55.844708,37.748870], [55.723123,37.406067], [55.858585,37.484980]
                ]*/
            var geoObjects = [];

            for (var i = 0, len = points.length; i < len; i++) {
                geoObjects[i] = new ymaps.Placemark(points[i]);
            }

            clusterer.add(geoObjects);
            myMap2.geoObjects.add(clusterer);

            myMap2.setBounds(clusterer.getBounds(), {
                checkZoomRange: true
            });
        }
    }

})
