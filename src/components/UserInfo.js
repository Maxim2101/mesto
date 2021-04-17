export default class UserInfo{
    constructor(userName, userInfo, avatar) {
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
        this._avatar = document.querySelector(avatar)
    }
    getUserInfo(){
        return{
            name: this._userName.textContent,
            about: this._userInfo.textContent
        }
    }
    setUserInfo(data){
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._avatar.src = data.avatar
    }
}

