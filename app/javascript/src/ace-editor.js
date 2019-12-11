class AceEditor {
  constructor(element, settings, filename) {
    this.element = element
    this.settings = settings
    this.filename = filename

    $(this._setup.bind(this));
  }

  setTheme(theme) {
    switch(theme) {
      case 'dark':
        this.editor.setTheme('ace/theme/tomorrow_night_bright');

        break;
      case 'light':
        this.editor.setTheme('ace/theme/textmate');

        break;
    }
  }

  setKeybinding(keybinding) {
    switch(keybinding) {
      case 'ace':
        this.editor.setKeyboardHandler(null);

        break;
      case 'vim':
        this.editor.setKeyboardHandler('ace/keyboard/vim');

        break;
      case 'emacs':
        this.editor.setKeyboardHandler('ace/keyboard/emacs');

        break;
    }
  }

  exportFile() {
    const file = {}
    file[this.filename] = this.editor.getValue();

    return file;
  }

  focus() {
    this.editor.focus();
  }

  isFocused() {
    return this.editor.isFocused();
  }

  addCommand(opts) {
    this.editor.commands.addCommand(opts);
  }

  _setup() {
    this.editor = ace.edit(this.element[0]);

    this.editor.setShowPrintMargin(false);
    this.editor.session.setOptions({
      mode: `ace/mode/${this.settings.language}`,
      tabSize: this.settings.tab_width,
      useSoftTabs: this.settings.soft_tabs,
    });

    this.onSetup(this);
  }
}

export default AceEditor;