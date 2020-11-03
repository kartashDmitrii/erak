if (document.querySelector('section.rent .slider')){
    let slider = document.querySelector('section.rent .slider');
    let siema = new Siema({
        selector: slider.querySelector('.wrapper'),
        duration: 400,
        easing: 'ease-out',
        perPage: {
            0: 3,
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