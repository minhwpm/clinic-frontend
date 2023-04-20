import App from "next/app"
import Head from "next/head"
import ErrorPage from "next/error"
import { DefaultSeo } from "next-seo"
import { getStrapiMedia } from "utils/media"
import { getGlobalData } from "utils/api"
import { useEffect } from "react"
import "@/styles/index.css"

const MyApp = ({ Component, pageProps }) => {
  // Extract the data we need
  const { global } = pageProps

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      global?.attributes.stylingSettings?.primaryColor
    )
    document.documentElement.style.setProperty(
      "--font-sans",
      global?.attributes.stylingSettings?.primaryFont
    )
  }, [
    global?.attributes.stylingSettings?.primaryColor,
    global?.attributes.stylingSettings?.primaryFont,
  ])

  if (!global) {
    return null
  }
  const { metadata, favicon, metaTitleSuffix } = global?.attributes
  return (
    <>
      {/* Favicon */}
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(favicon.data?.attributes.url)}
        />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(
            metadata.shareImage.data?.attributes.formats
          ).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            }
          }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />
      {/* Display the content */}
      <Component {...pageProps} />
    </>
  )
}

// @TODO use `getStaticProps` instead of `getInitialProps`
// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const globalLocale = await getGlobalData(appContext.router.locale)
  console.log(
    "app globalLocale",
    globalLocale?.data?.attributes.stylingSettings
  )

  return {
    ...appProps,
    pageProps: {
      global: globalLocale?.data,
    },
  }
}

export default MyApp
