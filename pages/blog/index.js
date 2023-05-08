import { fetchAPI } from "utils/api";
import ContentCard from "@/components/elements/ContentCard/ContentCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import useArticleQuery from "utils/hooks/useArticleQuery";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = (props) => {
  const { firstList } = props

  const { articles, error, fetchNextPage, status, hasNextPage } =
    useArticleQuery()
  console.log("useAritcleQuery", articles);

  // console.log("Articles list", articles)
  return (
    <div className="container my-10">
      {firstList.data.length > 0 && (
        <>
          <div className="grid lg:grid-cols-12 gap-10 border-b">
            <div className="lg:col-span-7">
              <ContentCard
                key={firstList.data[0].id}
                data={firstList.data[0].attributes}
                variants="top"
              />
            </div>
            <div className="lg:col-span-5">
              {firstList.data[1] && (
                <ContentCard
                  key={firstList.data[1].id}
                  data={firstList.data[1].attributes}
                />
              )}
              {firstList.data[2] && (
                <ContentCard
                  key={firstList.data[2].id}
                  data={firstList.data[2].attributes}
                />
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              {firstList.data.slice(3).map((article) => (
                <ContentCard key={article.id} data={article.attributes} />
              ))}
              <InfiniteScroll
                dataLength={articles ? articles.data.length : 0}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={"Loading..."}
                endMessage={"NO MORE RESULT"}
              >
                {articles &&
                  articles.data.map((article) => (
                    <ContentCard key={article.id} data={article.attributes} />
                  ))}
              </InfiniteScroll>
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
    pagination: {
      start: 0,
      limit: 10,
    },
  })
  return {
    props: {
      firstList: articles,
    }, // will be passed to the page component as props
  }
}

export default Blog;
