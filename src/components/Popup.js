export default  class Popup{
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose(event){
        if (event.key === 'Escape'){
            this.close()
        }
    }
    setEventListeners(){
        this._popup.addEventListener('click', (event)=> {
            if(event.target.classList.contains('popup_opened')){
                this.close(event.target)
            }
            if(event.target.classList.contains('popup__closes')){
                this.close()
            }
            if(event.target.classList.contains('popup__overlay')){
                this.close(event.target)
            }
        })
    }
}