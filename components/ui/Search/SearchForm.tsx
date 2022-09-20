import React, { useEffect, useRef } from 'react'
import CloseIcon from '@components/icons/CloseIcon'

import { useRouter } from 'next/router'
import { useSearch } from '@context/SearchContext'
import SearchIcon from '../../icons/SearchIcon'
import classNames from 'classnames/bind'
import styles from './SearchForm.module.scss'

const cx = classNames.bind(styles)

const SearchForm = ({ from, className }: { from?: string; className?: string }) => {
  const { query, setQuery, setSearchResults } = useSearch()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (from === 'menu') {
      router.push('/search')
    }
  }

  const handleKeyEnterPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleClearInput = () => {
    setQuery('')
    setSearchResults([])
  }


  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyEnterPress}
      className={cx(className, 'search-form')}
      action="."
      data-cursor-type="none"
    >
      <div className={cx('input-wrapper')}>
        <input
          id="search-input"
          type="search"
          autoFocus
          autoComplete="off"
          placeholder="Enter keywords..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          ref={inputRef}
        />
        <div className={cx('search-form-icon-mobile')}>
          <SearchIcon />
        </div>
        {query.length > 0 && (
          <button className={cx('btn-clear-input')} onClick={handleClearInput}>
            <CloseIcon />
          </button>
        )}
      </div>
      <button type="submit" className={cx('btn-search-submit')}>
        <SearchIcon />
      </button>
    </form>
  )
}

export default SearchForm
