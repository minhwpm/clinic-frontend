import App from "next/app"
import Head from "next/head"
import { DefaultSeo } from "next-seo"
import { getStrapiMedia } from "utils/media"
import { getGlobalData } from "utils/api"
import { useEffect } from "react"
import Layout from "@/components/layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@/styles/index.css"

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }) => {
  // Extract the data we need
  const { global, pageContext } = pageProps

  useEffect(() => {
    console.log(global?.attributes.stylingSettings)
    if (global && global.attributes.stylingSettings) {
      global.attributes.stylingSettings?.primaryColor &&
        document.documentElement.style.setProperty(
          "--primary-color",
          global.attributes.stylingSettings?.primaryColor
        )
      global.attributes.stylingSettings?.primaryFont &&
        document.documentElement.style.setProperty(
          "--font-sans",
          global.attributes.stylingSettings?.primaryFont
        )
    }
  }, [
    global,
    global?.attributes.stylingSettings?.primaryColor,
    global?.attributes.stylingSettings?.primaryFont,
  ])

  if (!global) {
    return <Component {...pageProps} />
  }
  const { metadata, favicon, metaTitleSuffix } = global.attributes
  return (
    <QueryClientProvider client={queryClient}>
      {/* Favicon */}
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(favicon.data?.attributes.url)}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
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
      <Layout global={global} pageContext={pageContext}>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
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

  return {
    ...appProps,
    pageProps: {
      global: globalLocale?.data,
    },
  }
}

export default MyApp
