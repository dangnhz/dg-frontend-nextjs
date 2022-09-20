import SEO from '@components/common/SEO'
import { useUI } from '@context/UIContext'
import React, { useEffect } from 'react'
import PreFooter from '@components/common/PreFooter'
import Container from '@components/ui/Container'
import { useSearch } from 'context/SearchContext'
import { useRouter } from 'next/router'
import { SearchForm } from '@components/ui/Search'
import { BeatLoader } from 'react-spinners'
import classNames from 'classnames/bind'
import styles from '@components/ui/Search/Search.module.scss'
import ResultItem from '@components/ui/Search/ResultItem'

const cx = classNames.bind(styles)

const Search: React.FC = () => {
  const { theme, setCurrentTheme } = useUI()

  useEffect(() => {
    setCurrentTheme('green')
  }, [setCurrentTheme])

  const { query, searchResults, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearch()

  return (
    <>
      <SEO title="Search" />

      <Container padding="padding-horizontal">
        <div className="padding-t-3 margin-b-3">
          <h2>Search</h2>
        </div>
        <SearchForm />
        <h6 className={cx({ hidden: !query || searchResults?.length === 0 })}>Results for "{query}"</h6>
      </Container>

      <div className={cx('post-listing', 'padding-horizontal margin-t-2 margin-b-10 padding-t-7')}>
        {query && <div className={cx('background')}></div>}
        {query && searchResults?.length === 0 && (
          <h6 className="padding-b-7 text-center">
            Searching for "{query}" <BeatLoader color="#000" size={5} margin={3} />
          </h6>
        )}
        <div className={cx('wrapper', 'mx-auto max-width-5')}>
          <div className={cx('items')}>
            {query && searchResults?.map((item) => <ResultItem key={item.id} data={item} />)}
          </div>
          {query.length > 0 && hasNextPage && fetchNextPage && (
            <div className={cx('load-more', 'padding-b-10')}>
              {!isFetchingNextPage && <button onClick={() => fetchNextPage()}>Load more</button>}
              {isFetchingNextPage && <BeatLoader color={theme.primaryColor} size={8} margin={3} />}
            </div>
          )}
        </div>
      </div>

      <PreFooter />
    </>
  )
}

export default Search
