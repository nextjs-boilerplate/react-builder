
import i18nHelper from '../../tools/i18n-helper'
import { SplitButton, MenuItem } from 'react-bootstrap'

const langNames = {
  en: 'English',
  zh: '中文'
}

const Language = () => (<SplitButton
  id="language_select"
  bsStyle="default"
  title={langNames[i18nHelper.getCurrentLanguage()]}
  onSelect={(lang) => i18nHelper.setCurrentLanguage(lang)}>

  {Object.keys(langNames).map((lang) => <MenuItem eventKey={lang} key={lang}>{langNames[lang]}</MenuItem>)}

</SplitButton>)

export default Language