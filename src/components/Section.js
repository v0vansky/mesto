export class Section {
  constructor({ renderer }, selector) {

    this._renderer = renderer;
    this._selector = selector;
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(item) {
    this._selector.prepend(item)
  }
};
