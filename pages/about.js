import Cookies from 'js-cookie'
import { translate } from 'react-i18next'

import Layout from '../components/MyLayout.js'
import fetch from '../tools/fetch'
import apiUrls from '../tools/api-urls'

const About = (props) => (
    <div>
       <p>{props.t('If you run into problems')} <a className="btn btn-default" href="https://github.com/nextjs-boilerplate/react-builder/issues/new">{props.t('new issue')}</a></p>
    </div>
)


export default Layout(translate(['about'])(About))