import React from 'react'
import Head from 'next/head'
import { THEMES, THEMES_HASH } from '../lib/constants'
import Reset from './style/Reset'
import Font from './style/Font'
import Typography from './style/Typography'

const HIGHLIGHTS_ONLY = ['shades-of-purple', 'vscode']
const LOCAL_STYLESHEETS = ['one-light', 'one-dark', 'verminal', 'night-owl', 'nord', 'synthwave-84']
const CDN_STYLESHEETS = THEMES.filter(
  t => LOCAL_STYLESHEETS.indexOf(t.id) < 0 && HIGHLIGHTS_ONLY.indexOf(t.id) < 0
)

export function Link({ href }) {
  return (
    <Head>
      <link rel="preload" as="style" href={href} />
      <link rel="stylesheet" href={href} />
    </Head>
  )
}

export const StylesheetLink = ({ theme }) => {
  let href
  if (LOCAL_STYLESHEETS.indexOf(theme) > -1) {
    href = `/static/themes/${theme}.min.css`
  } else {
    const themeDef = THEMES_HASH[theme]
    href = `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.2/theme/${themeDef &&
      (themeDef.link || themeDef.id)}.min.css`
  }

  return <Link href={href} />
}

export const CodeMirrorLink = () => (
  <Link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.2/codemirror.min.css" />
)

const title = 'Carbon'
const description =
  'Carbon is the easiest way to create and share beautiful images of your source code.'
export const MetaTags = React.memo(() => (
  <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content={description} />
    <meta name="application-name" content={title} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@carbon_app" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="https://carbon.now.sh/static/brand/banner.png" />
    <meta name="og:title" content={title} />
    <meta name="og:description" content={description} />
    <meta name="og:image" content="/static/brand/banner.png" />
    <meta name="theme-color" content="#121212" />
    <title>{title}</title>
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="manifest" href="/static/manifest.json" />
  </Head>
))

export const MetaLinks = React.memo(() => {
  return (
    <React.Fragment>
      <Link href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.2/theme/seti.min.css" />
      <CodeMirrorLink />
      {LOCAL_STYLESHEETS.map(id => (
        <Link key={id} href={`/static/themes/${id}.min.css`} />
      ))}
      {CDN_STYLESHEETS.map(themeDef => {
        const href = `//cdnjs.cloudflare.com/ajax/libs/codemirror/5.48.2/theme/${themeDef &&
          (themeDef.link || themeDef.id)}.min.css`
        return <Link key={themeDef.id} href={href} />
      })}
    </React.Fragment>
  )
})

export default React.memo(function Meta() {
  return (
    <React.Fragment>
      <MetaTags />
      <Reset />
      <Font />
      <Typography />
    </React.Fragment>
  )
})
