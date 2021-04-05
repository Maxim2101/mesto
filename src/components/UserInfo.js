export default class UserInfo{
    constructor(userName, userInfo) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo)
    }
    getUserInfo(){
        return{
            heading: this._userName.textContent,
            subheading: this._userInfo.textContent
        }
    }
    setUserInfo(data){
        this._userName.textContent = data.heading;
        this._userInfo.textContent = data.subheading;
    }
}