import { getArticleData, fetchAPI, getGlobalData } from "utils/api"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import { getLocalizedPaths } from "utils/localize"
import Custom404 from "../404"
import Article from "@/components/elements/Article/Article"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const ArticlePage = ({ metadata, preview, global, pageContext, article }) => {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !article) {
    return <Custom404 />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  if (metadata?.shareImage?.data == null) {
    delete metadata?.shareImage
  }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }

  return (
    <>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      <Article data={article} />
    </>
  )
}

export async function getStaticPaths(context) {
  // Get all pages from Strapi
  const pages = await context.locales.reduce(
    async (currentPagesPromise, locale) => {
      const currentPages = await currentPagesPromise
      const localePages = await fetchAPI("/articles", {
        locale,
        fields: ["slug", "locale"],
      })
      return [...currentPages, ...localePages.data]
    },
    Promise.resolve([])
  )

  const paths = pages.map((page) => {
    const { slug, locale } = page.attributes
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split("/")

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale,
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale, preview = null } = context

  try {
    // @TODO turn on Preview mode in CMS(backend)
    // Fetch pages. Include drafts if preview mode is on
    const pageData = await getArticleData({
      slug: params.slug.join("/"),
      locale,
      preview,
    })

    if (pageData == null) {
      // Giving the page no props will trigger a 404 page
      return { props: {} }
    }

    // We have the required page data, pass it to the page component
    const { title, summary, media, content, metadata, localizations, slug } =
      pageData.attributes

    const pageContext = {
      locale,
      locales,
      defaultLocale,
      slug,
      title,
      localizations,
    }

    const localizedPaths = getLocalizedPaths(pageContext)

    return {
      props: {
        preview,
        metadata,
        pageContext: {
          ...pageContext,
          localizedPaths,
        },
        article: {
          title,
          summary,
          content,
          media,
        },
      },
      revalidate: 10,
    }
  } catch (e) {
    console.log(e)
    return {
      props: {},
      revalidate: 10,
    }
  }
}

export default ArticlePage
