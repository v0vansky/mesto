export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
      this._name = document.querySelector(profileNameSelector);
      this._about = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
      const userInfo = {
          name: this._name.textContent,
          about: this._about.textContent,
      }
      return userInfo
  }

  setUserInfo(data) {
      if (data.name) this._name.textContent = data.name;
      if (data.about) this._about.textContent = data.about;
  }
}
