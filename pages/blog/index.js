import { fetchAPI } from "utils/api"
import ContentCard from "@/components/elements/ContentCard/ContentCard"

const ArticleIndex = ({ articles }) => {
  console.log("Articles list", articles)
  return (
    <div className="container my-10">
      {articles.data.length > 0 && (
        <>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="col-span-1">
              <ContentCard
                key={articles.data[0].id}
                data={articles.data[0].attributes}
                variants="top"
              />
            </div>
            <div className="col-span-1">
              {articles.data[1] && (
                <ContentCard
                  key={articles.data[1].id}
                  data={articles.data[1].attributes}
                />
              )}
              {articles.data[2] && (
                <ContentCard
                  key={articles.data[2].id}
                  data={articles.data[2].attributes}
                />
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3">
              {articles.data.slice(3).map((article, index) => (
                <ContentCard key={article.id} data={article.attributes} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const articles = await fetchAPI("/articles", {
    populate: "*",
    locale: context.locale,
    fields: ["slug", "title", "summary", "media", "publishedAt"],
    sort: "publishedAt:desc",
  })
  return {
    props: {
      articles,
    }, // will be passed to the page component as props
  }
}

export default ArticleIndex
