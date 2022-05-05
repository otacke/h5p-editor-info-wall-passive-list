import he from "he";

/** Class for Passive List Widget */
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
      this.updateLabels();
    });
  }

  /**
   * Get all items.
   */
  getItems() {
    const items = [];
    this.list.forEachChild(child => {
      items.push(child);
    });

    return items;
  }

  /**
   * Add UI item to the widget.
   * @param {object} item Item.
   */
  addItem(item) {
    item.appendTo(this.$container);
    item.$item.get(0).querySelector('.h5peditor-label').innerText = he.decode(item.infoWallLabel || '');
  }

  /**
   * Update order of items
   */
  updateOrder() {
    this.list.forEachChild(item => {
      item.remove();
      this.addItem(item);
    });
  }

  /**
   * Update the labels for each item
   */
  updateLabels() {
    this.list.forEachChild(item => {
      item.$item.get(0).querySelector('.h5peditor-label').innerText = he.decode(item.infoWallLabel || '');
    });
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
