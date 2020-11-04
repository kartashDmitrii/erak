export default class popupFunc {
    constructor(button,popup) {
        this.button = button;
        this.popup = popup;
        this.openPopupFunc = this.openPopup.bind(this);
        this.closePopupFunc = this.closePopup.bind(this);
        if ( Array.isArray(this.button)){
            this.button.forEach( elem => {
                elem.addEventListener('click', this.openPopupFunc);
            })
        } else {
            this.button.addEventListener('click', this.openPopupFunc);
        }
        this.popup.querySelectorAll('.close').forEach( elem => elem.addEventListener('click', this.closePopupFunc));
        if (this.popup.parentNode.classList.contains('wrapper')) {
            this.popup.parentNode.addEventListener('click', this.closePopupFunc);
        }
    }
    openPopup(event){
        event.preventDefault();
        this.popup.classList.add('active');
        if (this.popup.parentNode.classList.contains('wrapper')) {
            this.popup.parentNode.classList.add('active');
        }
        if (window.screen.width < 768) {
            document.body.classList.add('hidden')
        }
    }
    closePopup(event){
        if (!event.target.classList.contains('close') && event.target.closest(`.${this.button.dataset.popup}`) !== null){
            event.stopPropagation();
        } else {
            this.popup.classList.remove('active');
            if (this.popup.parentNode.classList.contains('wrapper')) {
                this.popup.parentNode.classList.remove('active');
            }
            if (window.screen.width < 768) {
                document.body.classList.remove('hidden')
            }
        }
    }
}