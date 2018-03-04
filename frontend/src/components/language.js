import Dropdown from 'react-dropdown'
import React, {Component} from 'react';
import LanguageStore from '../store/languageStore';
import * as LngAction from '../actions/languageActions';

class Language extends Component {
  constructor(props) {
    super(props);
    this.updateSrc = this.updateSrc.bind(this);
    this.updateTrgt = this.updateTrgt.bind(this);
    var { src_lang, trgt_lang } = LanguageStore.getDefault();
    this.state = {
      src_lang: src_lang,
      trgt_lang: trgt_lang
    };
  }

  componentWillMount() {
    LanguageStore.on("change", () => {
      var { src_lang, trgt_lang } = LanguageStore.getLanguage()
      this.state.src_lang= src_lang;
      this.state.trgt_lang=trgt_lang;
    })
  }

  getState() {
    return this.state;
  }

  updateSrc(option) {
    LngAction.updateSrc(option.value);
  }

  updateTrgt(option) {
    LngAction.updateTrgt(option.value);
  }

  render() {
    const options = [
      {value: 'en', label: 'English-US'},
      {value: 'hi', label: 'Hindi'}
    ];
    const defaultOptn = {value: 'en', label: 'English-US'};
    return (
      <div>
        <Dropdown options={options} onChange={this.updateSrc} value={defaultOptn} placeholder="Source" />
        <Dropdown options={options} onChange={this.updateTrgt} value={defaultOptn} placeholder="Target" />
      </div>
    );
  }
}

export default Language;
