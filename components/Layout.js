import React from 'react'
import Head from 'next/head'
import Header from './Header'
import wrapper from '../tools/wrapper'

const layout = (Page) => wrapper(class Layout extends React.Component {
  render() {
    return (<div className="wrapper">
      <Head>
          <title>React Builder</title>
          <link rel="stylesheet" type="text/css" href="/static/css/bootstrap.min.css" />
      </Head>
      <Header />
      <Page {...this.props}/>
    </div>)
  }
  static translateNS = [...Header.translateNS, ...Page.translateNS || []]
  static getInitialProps = async (ctx) => {
    return await Promise.all([
      Header.getInitialProps(ctx),
      Page.getInitialProps ? Page.getInitialProps(ctx) : Promise.resolve(true),
    ])
  }
})

export default layout