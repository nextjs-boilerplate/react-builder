
import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types'
import getNavigation from 'next-navigation'

import { default as routes, Link } from '../tools/routes'
import i18nHelper from '../tools/i18n-helper'

const MyNav = getNavigation(routes)


class Header extends React.Component {

  handleChangeLanguage(e){
    i18nHelper.setCurrentLanguage(e.target.value);
  }

  render(){
    const { url, t } = this.props

    var tprops = {
      ulProps: {
        className: 'nav nav-tabs',
      },
      liProps: {
        className: 'nav-item',
      },
      links: this.getLinks(t),
      activeClassName: 'active',
      url,
    }
    return (<div className="clearfix">
      <select value={i18nHelper.getCurrentLanguage()} onChange={this.handleChangeLanguage.bind(this)} className="pull-right">
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
      <MyNav {...tprops} />
    </div>
    )
  }

  getLinks(t){
    var that = this
    var {user, logout} = this.props
    return [{
      linkProps: { route: "index" },
      children: <a className="nav-link">{t('Project List')}</a>,
    }, {
      linkProps: { route: "about" },
      children: <a className="nav-link">{t('About')}</a>,
      activeStyle: { color: 'blue', },
    }, {
      linkProps: { route: "posts" },
      children: <a className="nav-link">{t('Posts')}</a>,
      checkIsActive: ({ pathname }) => {
        return ('/post' === pathname) || ('/posts' === pathname)
      }
    }]
  }

  
}

export default translate(['common'])(Header)
