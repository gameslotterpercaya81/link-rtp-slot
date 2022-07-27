'use babel';

import LinkRtpSlotView from './link-rtp-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  linkRtpSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linkRtpSlotView = new LinkRtpSlotView(state.linkRtpSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linkRtpSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'link-rtp-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linkRtpSlotView.destroy();
  },

  serialize() {
    return {
      linkRtpSlotViewState: this.linkRtpSlotView.serialize()
    };
  },

  toggle() {
    console.log('LinkRtpSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
