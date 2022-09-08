import useDebounce from 'hooks/useDebounce'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { InfiniteQueryObserverResult, useInfiniteQuery } from 'react-query'

import { fetchSearch } from '@lib/api/search.service'

interface InitialSearchState {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>
  searchResults: Array<any> | null
  isLoading: boolean
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage?: () => Promise<InfiniteQueryObserverResult<any, unknown>>
}

const initialSearchState: InitialSearchState = {
  query: '',
  setQuery: () => {},
  isLoading: false,
  searchResults: null,
  setSearchResults: () => {},
  hasNextPage: undefined,
  isFetchingNextPage: false,
  
}

const SearchContext = createContext(initialSearchState)

export const useSearch = () => {
  return useContext(SearchContext)
}

const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useState('')
  const debouncedSearchTerm = useDebounce(query, 500)
  const [searchResults, setSearchResults] = useState<Array<any>>([])

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['fetchSearch', debouncedSearchTerm],
    ({ pageParam = 0 }) => fetchSearch(debouncedSearchTerm, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (parseInt(lastPage.pager.current_page) < parseInt(lastPage.pager.total_pages) - 1)
          return parseInt(lastPage.pager.current_page) + 1
        return
      },
      keepPreviousData: true,
      enabled: debouncedSearchTerm.length > 0,
    }
  )

  useEffect(() => {
    if (data && data.pages) {
      const paginatedData: Array<any> = []
      data.pages.forEach((page) => {
        page.results.forEach((result: any) => {
          paginatedData.push(result)
        })
      })
      setSearchResults(paginatedData)
    }
  }, [data])

  const value = {
    query,
    setQuery,
    isLoading,
    searchResults,
    setSearchResults,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export default SearchProvider
