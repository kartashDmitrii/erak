import popupFunc from "./components/popupFunc";
import hideList from "./components/hideList";
import blockHorizontalScroll from "./components/blockHorizontalScroll";
import smoothscroll from 'smoothscroll-polyfill';
import tabs from "./components/tabs";
smoothscroll.polyfill();
function iOS() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
if (document.querySelector('section.product-info .image-block .slider')){
    let siema = new Siema({
        selector: document.querySelector('section.product-info .image-block .slider'),
        duration: 400,
        easing: 'ease-out',
        perPage: {
            0: 1,
            577: 6
        },
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        rtl: false,
        onInit: function () {
            setTimeout(() => {this.preventLinkClick('section.product-info .image-block .slider div.video', function(e){
                e.preventDefault();
                e.stopPropagation();
                this.dataset.stopEvent = 'false';
                setTimeout( ()=> delete this.dataset.stopEvent, 50)
            })}, 50);
            this.preventLinkClick('section.product-info .image-block .slider div.image', function(e){
                this.dataset.stopEvent = 'false';
                setTimeout( ()=> delete this.dataset.stopEvent, 50)
            });
            this.selector.querySelectorAll('.image').forEach( elem => {
                elem.addEventListener('click', function () {
                    if (this.dataset.stopEvent === undefined){
                        let image;
                        if(this.dataset.image === undefined){
                            image = this.querySelector('img').src
                        } else {
                            image = this.dataset.image
                        }
                        document.querySelector('section.product-info .image-block .current img').src = image
                    }
                })
            })
        }
    })
}
if (document.querySelector('[data-slider="custom"]')){
    let slider = document.querySelector('[data-slider="custom"]');
    let siema = new Siema({
        selector: slider.querySelector('.wrapper'),
        duration: 400,
        easing: 'ease-out',
        perPage: {
            0: 2,
            768: 3,
            1200: 4
        },
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        rtl: false,
        onInit: function(){
            setTimeout(() => {this.preventLinkClick('[data-slider="custom"] a', (e)=>{e.preventDefault()});}, 50);
            let dotCount = Math.ceil(this.selector.querySelectorAll('.slide').length / this.perPage);
            for (let i = 0; i < dotCount; i++){
                let dot = document.createElement('button');
                dot.classList.add('dot');
                slider.querySelector('.dots').appendChild(dot);
                dot.addEventListener('click', ()=>{siema.goTo(i * siema.perPage)});
            }
            slider.querySelector('.dots').querySelectorAll('.dot')[Math.ceil(this.currentSlide / this.perPage)].classList.add('active');
            slider.querySelector('.btns .prev').addEventListener('click', ()=>{siema.prev(this.perPage)});
            slider.querySelector('.btns .next').addEventListener('click', ()=>{siema.next(this.perPage)});
        },
        onChange: function(){
            if (slider.querySelector('.dots').querySelector('.dot.active')){
                slider.querySelector('.dots').querySelector('.dot.active').classList.remove('active')
            }
            slider.querySelector('.dots').querySelectorAll('.dot')[Math.ceil(siema.currentSlide / siema.perPage)].classList.add('active')
        },
    });
}



document.querySelectorAll('header nav>ul li.has-child').forEach( elem => {
    elem.addEventListener('click', function (event) {
        event.stopPropagation()
        if (event.target.classList.contains('has-child') || event.target.parentNode.classList.contains('has-child')) {
            elem.classList.toggle('active');
        }
    });
});

/*  tovar custom select    */

if (document.querySelector('.custom-select')){
    document.querySelectorAll('.custom-select').forEach( customSelectField=>{       // Выбираем все селекты на странице
        let originalSelectOptions = customSelectField.querySelectorAll('select option'),    // Опшены внутри текущего селекта
            customSelect = document.createElement('div');                                    //  Создаём новый селект
        customSelectField.querySelector('select').style.display = 'none';                    //  Скрываем старый
        customSelect.classList.add('select');
        if (customSelectField.dataset.theme) {
            customSelect.classList.add(customSelectField.dataset.theme);
        }
        // customSelectField.querySelector('select').addEventListener('change', function (event){
        //     console.log(event.target.value)
        // });
        let hideOptions = function (event){                                                         // Функция для скрытия селекта при нажатии мимо цели
            if (!event.target.closest('.custom-select')) {
                customSelect.classList.remove('active');
                customOptions.classList.remove('active');
                document.removeEventListener('click', hideOptions)
            }
        };
        let customSelected = document.createElement('p');                                   //  Создаём Р который будет показывать текущий выбранный элемент
        customSelected.classList.add('selected');
        customSelect.appendChild(customSelected);                                                    // Добавляем его в кастомный селект
        customSelected.addEventListener('click', ()=>{                                  // Функция для расскрытия селекта, переворота стрелки и нажатии
            if (customOptions.classList.contains('active')){                                        // мимо селекта
                customSelect.classList.remove('active');
                document.removeEventListener('click', hideOptions);
                customOptions.classList.remove('active')
            } else {
                customSelect.classList.add('active');
                customOptions.classList.add('active');
                setTimeout(()=>{
                    document.addEventListener('click', hideOptions)
                })
            }

        });

        let customOptions = document.createElement('div');                               // Создаём список Опшенов и добавление его в кастомный список
        customOptions.classList.add('options');
        customSelect.appendChild(customOptions);

        originalSelectOptions.forEach( (elem,index) => {                    // Создание кастомного опшена на основе оригинального
            let customOption = document.createElement('p');
            customOption.classList.add('option');
            if (customSelect.classList.contains('mobile')){
                customOption.classList.add('close');
            }
            customOption.innerText = elem.innerText;
            customOptions.appendChild(customOption);
            if (elem.selected){
                customSelected.innerText = elem.innerText                                           // Выбранный показываем в теге Р
            }
            customOption.addEventListener('click', (event) => {              // Собитие для передачи выбранного опшена в основной селект
                customSelectField.querySelector('select').value = elem.value;
                customSelectField.querySelector('select').dispatchEvent(new Event('change'));
                elem.selected = true;
                customSelected.innerText = customOption.innerText;
                customSelect.classList.remove('active');
                customOptions.classList.remove('active')
            })
        } );

        customSelectField.prepend(customSelect)
    } )
}

/*  tovar custom select    */

if (document.querySelector('.aside .field')){
    document.querySelectorAll('.aside .field').forEach( elem => {
        new hideList(elem)
    })
}

document.querySelectorAll('[data-popup]').forEach( elem => {
    setTimeout( ()=>{new popupFunc(elem, document.querySelector(`.${elem.dataset.popup}`));}, 50)
});

if (document.querySelector('.blog-links')) {
    setTimeout(() => new blockHorizontalScroll(document.querySelector('.blog-links')), 100);
}

if (document.querySelector('[data-href]')) {

    function SmoothVerticalScrolling(e) {
        let eTop;
        if (iOS()){
            eTop = e.offsetTop;
        } else {
            eTop = e.getBoundingClientRect().top;
        }
        console.log(eTop)
        window.scrollTo({
            top: eTop - 50,
            behavior: "smooth"
        })
    }

    document.querySelectorAll('[data-href]').forEach(link => {
        link.addEventListener('click', () => {
            SmoothVerticalScrolling(document.querySelector(`${link.dataset.href}`))
        })
    });
}

if (document.querySelector('section.product-tabs')){
    new tabs(document.querySelectorAll('section.product-tabs .tab-links .btn'), document.querySelectorAll('section.product-tabs .tabs .tab'));
}
if (document.querySelector('section.product-info .image-block .slider .video')) {
    setTimeout(()=>{
        document.querySelectorAll('section.product-info .image-block .slider .video').forEach( elem => {
          elem.addEventListener('click', function () {
              console.log(elem.dataset.stopEvent);
              if(elem.dataset.stopEvent === undefined) {
                  if (!(document.querySelector('.video-popup iframe').src === this.dataset.src)) {
                      document.querySelector('.video-popup iframe').src = this.dataset.src;
                  }
              }
          });
        });
        document.querySelectorAll('.video-popup .close').forEach( closeElem => {
            closeElem.addEventListener('click', ()=>{
                console.log(1);
                delete document.querySelector('.video-popup iframe').src
            })
        });
        document.querySelector('.video-popup').parentNode.addEventListener('click', ()=>{
            document.querySelector('.video-popup iframe').removeAttribute('src')
        });
    }, 50)
}

document.querySelectorAll('section.questions .question').forEach( elem => {
   new hideList(elem)
});

if (document.querySelector('.btn')){
    setTimeout( ()=> {
        document.querySelectorAll('.btn').forEach( elem => {
            elem.querySelector('span').style.borderRight = `${elem.offsetWidth}px solid transparent`
        })
    },50)
}
if (document.querySelector('.section-title')){
    setTimeout(()=> {
        document.querySelectorAll('.section-title').forEach( elem => {
            elem.querySelector('span').style.borderRight = `${elem.offsetWidth + 10}px solid transparent`;
        })
    }, 50)
}

window.addEventListener('resize', function () {
    if (document.querySelector('.btn')){
        setTimeout( ()=> {
            document.querySelectorAll('.btn').forEach( elem => {
                elem.querySelector('span').style.borderRight = `${elem.offsetWidth}px solid transparent`
            })
        },50)
    }
    if (document.querySelector('.section-title')){
        setTimeout(()=> {
            document.querySelectorAll('.section-title').forEach( elem => {
                elem.querySelector('span').style.borderRight = `${elem.offsetWidth + 10}px solid transparent`
            })
        }, 50)
    }
});