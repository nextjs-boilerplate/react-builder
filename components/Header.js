
import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types'
import getNavigation from 'next-navigation'
import { connect } from 'react-redux'

import { default as routes, Link } from '../tools/routes'
import { getUser, logout } from '../tools/store/user'
import { getContextedFetch } from '../tools/fetch'
import Language from './molecules/Language'

const MyNav = getNavigation(routes)

class Header extends React.Component {

  handleLogout() {
    var { dispatch } = this.props
    dispatch(logout())
  }

  render() {
    const { url, t, user } = this.props

    var tprops = {
      ulProps: {
        className: 'nav nav-tabs',
      },
      links: this.getLinks(t),
      activeStyle: {},
      activeClassName: 'active',
      url,
    }
    return (
      <div className="nav-wrap">
        <MyNav {...tprops} />
        <p>{JSON.stringify(user)}</p>
      </div>
    )
  }

  getLinks(t) {
    var that = this
    var { user, dispatch } = this.props
    return [
      {
        linkProps: { route: "index" },
        children: <a >{t('Home')}</a>,
      }, {
        linkProps: { route: "about" },
        children: <a >{t('About')}</a>,
        activeStyle: { color: 'blue', },
      },
    ]
  }



  static translateNS = ['common']
}

export default connect(state => state)(translate(Header.translateNS)(Header))
