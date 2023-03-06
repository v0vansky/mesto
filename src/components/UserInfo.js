export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
      this._name = document.querySelector(profileNameSelector);
      this._about = document.querySelector(profileAboutSelector);
      this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
      const userInfo = {
          name: this._name.textContent,
          about: this._about.textContent,
          avatar: this._avatar.src,
          _id: this._id
      }
      return userInfo
  }

  setUserInfo( { name, about, avatar, _id } ) {
      if (name) this._name.textContent = name;
      if (about) this._about.textContent = about;
      if (avatar) this._avatar.src = avatar;
      if (_id) this._id = _id;
  }
}
