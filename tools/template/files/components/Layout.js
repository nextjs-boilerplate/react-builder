import React from 'react'
import Head from 'next/head'
import wrapper from '../tools/wrapper'

const layout = (Page) => wrapper(class Layout extends React.Component {
  render() {
    return (<div className="wrapper">
      <Head>
        <link rel="stylesheet" type="text/css" href="/static/css/bootstrap.min.css" />
      </Head>
      <Page {...this.props} />
    </div>)
  }
  static translateNS = Page.translateNS
  static getInitialProps = async (ctx) => {
    return await Promise.all([
      Page.getInitialProps ? Page.getInitialProps(ctx) : Promise.resolve(true),
    ])
  }
})

export default layout