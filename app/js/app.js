$(document).ready(function () {
    ymaps.ready(init);
    var myMap,
        myPlacemark,
        myPlacemarks = [
            {
                latitude: 59.915038,
                longitude: 30.486096,
                hintContent: "Вкуснейшие бургеры на Товарищеском",
                balloonContent: "Товарищеский проспект, 20/27"
            },
            {
                latitude: 59.94708381,
                longitude: 30.38481688,
                hintContent: "Вкуснейшие бургеры на Тверской",
                balloonContent: "Тверская улица, 16"
            },
            {
                latitude: 59.891295,
                longitude: 30.316907,
                hintContent: "Вкуснейшие бургеры на Московском",
                balloonContent: "Московский проспект, 103к2"
            },
            {
                latitude: 59.973999,
                longitude: 30.311091,
                hintContent: "Вкуснейшие бургеры на Чапыгина",
                balloonContent: "улица Чапыгина, 13А"
            }
        ];

    function init() {
        myMap = new ymaps.Map("map", {
            center: [55.7538,37.5247],
            zoom: 15.5
        });

        myPlacemarks.forEach(function(obj) {
            myPlacemark = new ymaps.Placemark(
                [obj.latitude, obj.longitude],
                {
                    hintContent: obj.hintContent,
                    hintContent: obj.balloonContent
                },
                {
                    iconLayout: "default#image",
                    iconImageHref: "img/map/map-marker.svg",
                    iconImageSize: [46, 57],
                    iconImageOffset: [-15, -50]
                }
            );

            myMap.geoObjects.add(myPlacemark);
        });

        myMap.behaviors.disable("scrollZoom");
    }

})

