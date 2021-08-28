import './h5peditor-info-wall-passive-list.scss';

/** Class for Boilerplate H5P widget */
export default class InfoWallPassiveList {

  /**
   * @constructor
   * @param {H5PEditor.List} list List.
   */
  constructor(list) {
    this.list = list;
    this.items = [];

    // DOM
    this.$container = H5P.jQuery('<div>', {
      class: 'h5peditor-info-wall-passive-list'
    });

    // Once all items have been added we toggle the state of the order buttons
    list.once('changeWidget', () => {
      this.updateDOM();
    });

    list.on('removedItem', () => {
      this.updateDOM();
    });
  }

  getItems() {
    const items = [];
    this.list.forEachChild(child => {
      items.push(child);
    });

    return items;
  }

  updateDOM() {
    this.$container.get(0).innerHTML = '';
    this.getItems().forEach(item => {
      item.appendTo(this.$container);
      item.$item.get(0).querySelector('.h5peditor-label').innerText = item.infoWallLabel;
    });
  }

  /**
   * Add UI item to the widget.
   * @param {object} item Item.
   */
  addItem() {
    this.updateDOM();
  }

  /**
   * Append field to wrapper. Invoked by H5P core.
   * @param {H5P.jQuery} $wrapper Wrapper.
   */
  appendTo($wrapper) {
    this.$container.appendTo($wrapper);
  }

  /**
   * Remove self. Invoked by H5P core.
   */
  remove() {
    this.$container.remove();
  }
}
