$(document).ready(function () {
    ymaps.ready(init);
    var myMap;
    // настройка яндекс-карты
    function init () {
        myMap = new ymaps.Map("map", {
            center: [55.7538,37.5247],
            zoom: 16,
            controls: ["smallMapDefaultSet"]
        });

        myMap.controls
            .remove('geolocationControl')
            .remove('searchControl')
            .remove('typeSelector')
       /* const mapConf = {};
        [15,16,17].forEach(function (zoom) {
            mapConf[zoom] = new ymaps.Placemark([55.7547,37.5239], {
                hintContent: "Жилой квартал Headliner",
                balloonContent: "Шмитовский проезд, вл. 39к1"
            }, {
                iconLayout: "default#image",
                iconImageHref: "img/map-object1.svg",
                iconImageSize: [90*Math.pow((1/16)*zoom, 20), 87*Math.pow((1/16)*zoom, 20)],
                iconImageOffset: [-45, -15]
            });
        })*/
        myPlacemark1 = new ymaps.Placemark([55.7547,37.5239], {
            hintContent: "Жилой квартал Headliner",
            balloonContent: "Шмитовский проезд, вл. 39к1"
        },{iconLayout: "default#image",
            iconImageHref: "img/map-object1.svg",
            /*iconImageSize: [90*Math.pow((1/16)*zoom, 10), 87*Math.pow((1/16)*zoom, 10)],*/
            iconImageSize: [90, 87],
            iconImageOffset: [-45, -15]
        });
        myPlacemark2 = new ymaps.Placemark([55.7543,37.5248], {
            hintContent: "Шмитовский проезд, вл. 39к1",
            balloonContent: "Шмитовский проезд, вл. 39к2"
        }, {
            iconLayout: "default#image",
            iconImageHref: "img/map-object2.svg",
            iconImageSize: [14, 70],
            iconImageOffset: [-8, -17]
        });
        myPlacemark3 = new ymaps.Placemark([55.7537,37.5240], {
            hintContent: "Жилой квартал Headliner",
            balloonContent: "Шмитовский проезд, вл. 39с4"
        }, {
            iconLayout: "default#image",
            iconImageHref: "img/map-object3.svg",
            iconImageSize: [40, 40],
            iconImageOffset: [-26, -18]
        });
        myPlacemark4 = new ymaps.Placemark([55.7533,37.5247], {
            hintContent: "Жилой квартал Headliner",
            balloonContent: "Шмитовский проезд, вл. 39с4"
        }, {
            iconLayout: "default#image",
            iconImageHref: "img/map-object4.svg",
            iconImageSize: [38, 31],
            iconImageOffset: [-29, -19]
        });
        myMap.behaviors.disable("scrollZoom");
        myMap.geoObjects.add(myPlacemark1).add(myPlacemark2).add(myPlacemark3).add(myPlacemark4);
        // Получим размер метки в зависимости от уровня зума.
        myMap.events.add('boundschange', function (e) {
            console.log(e.get('oldZoom'));
            console.log(e.get('newZoom'));
            //myMap.geoObjects.remove(mapConf[e.get('oldZoom')]);
            //myMap.geoObjects.add(mapConf[e.get('newZoom')])
            var oz = e.originalEvent.oldZoom;
            var nz = e.originalEvent.newZoom;
            if (nz===16) {
                myMap.geoObjects.add(myPlacemark1).add(myPlacemark2).add(myPlacemark3).add(myPlacemark4);
            }
            else myMap.geoObjects.remove(myPlacemark1).remove(myPlacemark2).remove(myPlacemark3).remove(myPlacemark4);
        })

        /*Hamburger menu*/
        let hamburger = (options => {
            let button = document.querySelector(options.button);
            let menu = document.querySelector(options.menu);
            let body = document.querySelector("body");

            let itemsList = document.getElementById("nav__list--hamburger").children;
            itemsList = Array.prototype.slice.call(itemsList);

            const items = $(".nav__item", menu);
            let counter = 0;

            let startMenuAnimation = function startMenuAnimation() {
                let item = items.eq(counter);
                item.toggleClass("pulse");
                counter++;
                if (counter < items.length) {
                    setTimeout(startMenuAnimation, 100);
                }
                if (counter === items.length) counter = 0;
            };

            let _toggleMenu = function(e) {
                button.classList.toggle("is-active");
                menu.classList.toggle("is-active");
                body.classList.toggle("locked");
                startMenuAnimation();
            };

            var closeMenu = function closeMenu() {
                button.classList.remove("is-active");
                menu.classList.remove("is-active");
                body.classList.remove("locked");
                startMenuAnimation();
            };

            let addListeners = function() {
                button.addEventListener("click", _toggleMenu);

                for (i = 0; i < itemsList.length; i++) {
                    itemsList[i].addEventListener("click", closeMenu);
                }
            };

            document.addEventListener("keydown", function(e) {
                if (e.keyCode == 27) closeMenu();
            });

            return {
                init: addListeners
            };
        })({
            button: "#hamburger-menu-link",
            menu: "#hamburger-menu"
        });

        hamburger.init();

    }

    // Обработка значений формы
    // По клику на кнопку записываем значения полей формы в переменные
    $('#mess_send').click(function () {
/*        var name = $('#username').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var phone = $('#phone').val();
        var remind = $('#remind').val();*/
        $('.form__input').css({'border-color':'#EE4713'});
        // Вызов функции AJAX
        /*$.ajax(
            {

                url: 'ajax/mail.php', // задаём путь к стрипту кторый примет данные
                type: 'POST',
                cache: false,
                data: {'username' : name, 'date' : date, 'time' : time, 'phone' : phone, 'remind' : remind}, // передаваемы данные
                dataType: 'html',
                // Функция проверки отправки данных
                success: function(data)
                {
                    // Если PHP-скрипт отработал, то очишаем форму, прячем блок ошибки и
                    // выводим сообщение об успешной отправке, в противном случае показываем блок ошибки
                    if (data == 'Готово')
                    {
                        $('#mess_send').text('Successfully');
                        $('#form__input').css('border-color','$hover-line');
                        $('#username').val("");
                        $('#date').val("");
                        $('#time').val("");
                        $('#phone').val("");
                        $('#remind').val("");
                    }
                    else {
                        $('#form__input').css('border-color','$crown-icon');
                    }
                }
            });*/
    });
})

