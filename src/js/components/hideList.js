export default class hideList{
    constructor(listBlock) {
        this.listBlock = listBlock;
        this.list = this.listBlock.querySelector('[data-block]');
        this.listBlock.querySelector('[data-btn]').addEventListener('click', ()=>{this.showBlock()});
        if (this.list.classList.contains('active')) {
            this.list.style.height = `${this.list.scrollHeight}px`;
        }
    }
    showBlock(){
        let blockHeight = parseInt(window.getComputedStyle(this.list).getPropertyValue('height'));
        if (blockHeight === 0){
            this.list.style.height = `${this.list.scrollHeight}px`;
            this.listBlock.querySelector('[data-btn]').classList.add('active');
        } else {
            this.listBlock.querySelector('[data-btn]').classList.remove('active');
            this.list.style.height = `0`
        }
    }
}