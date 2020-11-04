import popupFunc from "./components/popupFunc";

if (document.querySelector('section.rent .slider')){
    let slider = document.querySelector('section.rent .slider');
    let siema = new Siema({
        selector: slider.querySelector('.wrapper'),
        duration: 400,
        easing: 'ease-out',
        perPage: {
            0: 1,
            480: 2,
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

document.querySelectorAll('[data-popup]').forEach( elem => {
    new popupFunc(elem, document.querySelector(`.${elem.dataset.popup}`));
});

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
        customSelectField.querySelector('select').addEventListener('change', function (event){
            console.log(event.target.value)
        });
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
