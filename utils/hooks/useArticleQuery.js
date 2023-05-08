import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchData } from "utils/api"

const pageSize = 10
const useArticleQuery = () => {
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ["articles"],
    ({ pageParam = 1 }) => {
      return fetchData("/articles", {
        populate: "*",
        locale: "en",
        fields: ["slug", "title", "summary", "media", "publishedAt"],
        pagination: {
          start: pageParam * pageSize,
          limit: pageSize,
        },
        sort: "publishedAt:desc",
      }).then((res) => res.json())
    },
    {
      getNextPageParam: (lastPage) => {
        console.log("LastPAGE", lastPage)
        
        const nextPage = (lastPage.meta.pagination.start / pageSize) + 1
        if (Math.ceil(lastPage.meta.pagination.total / pageSize) < nextPage) return false
        return nextPage
      },
    }
  )
  const articles = useMemo(
    () =>
      data?.pages.reduce((prev, curr) => ({
        meta: curr.meta,
        data: [...prev.data, ...curr.data],
      })),
    [data]
  )
  return { articles, error, fetchNextPage, status, hasNextPage }
}

export default useArticleQuery
