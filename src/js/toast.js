String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const toast = function (text) {
    let defaultConfig = {
        autoDismiss: false,
        autoDismissDelay: 5000,
        limitSymbols: 25,
        numberOfNotifications: 3,
        sound: false,
        changeColor: true,
        setColor: '#fff',
        changePosition: true,
        positions: "LeftTop", //Available positions (LeftTop , RightTop)
        currentPosition: "",
        enableCensorWords: true,
        censorWords: ['сука', 'бля']
    };

    const regExp = /^#([0-9a-f]{3}){1,2}$/i
    const regExpColor = defaultConfig.setColor.match(regExp)

    if (text.length != 0 && regExpColor && defaultConfig.limitSymbols >= text.length) {
        let newToast = function (text) {
            let toast = $([
                '<div class="notification_block">',
                    '<span class="notification_msg">' + text + '</span>',
                    '<span class="notification_close">&times</span>',
                '</div>',
            ].join(''))

            $('.notification').append(toast)

            $(document).on('click', '.notification_close', function () {
                let toast = $(this).parent()
                toast.remove()

                if ($('.notification_block').length <= 1) {
                    $('.notification_hide').removeClass('show')
                }
            })

            $(document).on('click', '.notification_hide', function () {
                toast.remove()
                $('.notification_hide').removeClass('show')
            })

            function setColor() {
                $('.notification_hide').css({
                    "background": defaultConfig.setColor,
                    "border": defaultConfig.setColor
                })
                $('.notification_block').css({
                    "background": defaultConfig.setColor,
                    "border": defaultConfig.setColor
                })
            }

            if (defaultConfig.changeColor) {
                setColor()
            }

            if (defaultConfig.autoDismiss) {
                setTimeout(() => {
                    toast.remove()

                    if ($('.notification_block').length <= 1) {
                        $('.notification_hide').removeClass('show')
                    }
                }, defaultConfig.autoDismissDelay)
            }
            $('.radio').on('click', function () {
                for (let i = 0; i < radio.length; i++) {
                    if (radio[i].checked) {
                        console.log(radio[i])
                    }
                    break;
                }
            })

            return newToast;
        }

        let regArray = /([а-ї-яa-z1-90]+|([\"\#\@\$\%\^\`\~\(\)\_\&\,\:\№\!\?\.\;\-\+\=\s]+))/gi

        text = text.match(regArray);

        for (let i = 0; i < text.length; i++) {
            if (defaultConfig.censorWords.includes(text[i].toLowerCase()) && defaultConfig.enableCensorWords) {
                text[i] = '*****'
            } else {
                text[i] = text[i]
            }
        }
        text = text.join('')

        function positionTopLeft() {
            $('.notification').css({'top': '20px', 'left': '10px'});
        }

        function positionTopRight() {
            $('.notification').css({'top': '20px', 'left': '1580px'});
        }

        if ($('.notification_block').length >= 1) {
            $('.notification_hide').addClass('show')
        }

        if ($('.notification_block').length > defaultConfig.numberOfNotifications) {
            let hide = document.querySelector('.notification_block')
            hide.remove()
        }

        if (defaultConfig.sound) {
            var audio = new Audio('./src/assets/sound/tg.mp3');
            audio.play();
        }

        if(defaultConfig.positions.toLowerCase() == "LeftTop".toLowerCase()) {
            positionTopLeft()
        }

        if (defaultConfig.positions.toLowerCase() == "RightTop".toLowerCase()) {
            positionTopRight()
        }

        newToast(text);
    } else {
        console.error('Error! You didn\'t enter anything or you have the wrong parameters set!')
    }
}

$(document).on('click', '#btn', function () {
    let text = document.querySelector('#msg').value
    toast(text)
    text = document.querySelector('#msg').value = ''
})


$(document).ready(function () {
    $('body').append('<div class="notification"><div class="notification_hide"><span class="notification_msg">Hide all</span></div></div>')
})

function charCount(text) {
    return text.replace(/[\.,!?;]*/g, '').length;
}

function getElement(el) {
    return document.getElementById(el);
}

getElement('msg').onkeyup = function () {
    getElement('label').innerHTML = charCount(this.value);
}
