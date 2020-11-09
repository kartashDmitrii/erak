export default class horizontalScroll {
    constructor(elem) {
        this.elem = elem;
        if (this.elem.offsetWidth > this.elem.parentNode.offsetWidth) {
            this.elem.classList.add('slider');
            this.oldXVal = 0;
            this.newVal = 0;
            this.moveFunc = this.mouseMove.bind(this);
            this.maxValue = this.elem.offsetWidth - this.elem.parentElement.offsetWidth;
            this.elem.style.setProperty('transition', 'all 200ms ease-out 0s');
            this.elem.addEventListener('mousedown', (event) => {
                this.mouseDown(event)
            });
            this.elem.addEventListener('mouseup', (event) => {
                this.mouseUp(event)
            });
            this.elem.addEventListener('mouseleave', (event) => {
                this.mouseUp(event)
            });
            this.elem.addEventListener("touchstart", (event) => {
                this.mouseDown(event)
            });
            this.elem.addEventListener("touchend", (event) => {
                this.mouseUp(event)
            });
            this.elem.addEventListener("touchcancel", (event) => {
                this.mouseUp(event)
            });

            const CONTAINER = this.elem.parentNode;
            const LINKS = CONTAINER.querySelectorAll('a');
            LINKS.forEach(el => {
                let firstMouseX = 0;

                el.addEventListener('mousedown', (e) => {
                    firstMouseX = e.clientX;
                });

                el.addEventListener('click', (e) => {
                    let lastMouseX = e.clientX;
                    let diffMouseX = firstMouseX - lastMouseX;

                    if (diffMouseX > 1 || diffMouseX < -1) {
                        e.preventDefault();
                    }
                });
            });
        }
    }
    mouseDown(event){
        this.elem.style.setProperty('cursor', 'grabbing');
        this.elem.style.setProperty('transition','all 0ms ease-out 0s');
        this.oldXVal = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
        this.elem.addEventListener('mousemove', this.moveFunc);
        this.elem.addEventListener("touchmove", this.moveFunc, false);
    }
    mouseMove(event){
        let countVal = event.clientX !== undefined ? event.clientX : event.touches[0].clientX;
        this.newVal -= this.oldXVal - countVal;
        this.elem.style.setProperty('transform', `translate3d(${this.newVal}px, 0px, 0px)`);
        this.oldXVal = countVal;
    }
    mouseUp(event){
        this.elem.style.setProperty('transition','all 200ms ease-out 0s');
        if (this.newVal > 0){
            this.newVal = 0;
        }
        if (this.newVal < `-${this.maxValue}`){
            this.newVal = `-${this.maxValue}`
        }
        this.elem.style.setProperty('transform', `translate3d(${this.newVal}px, 0px, 0px)`);
        this.elem.style.setProperty('cursor', 'grab');
        this.elem.removeEventListener('mousemove', this.moveFunc);
    }
}