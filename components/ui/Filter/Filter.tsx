import React, { useState, useEffect, useRef } from 'react'
import FilterIcon from '@components/icons/Filter'
import classNames from 'classnames/bind'
import styles from './Filter.module.scss'

interface Term {
  id: string
  text: string
}

interface Props {
  filterTerms: Array<Term>
  setFilterTerm: React.Dispatch<React.SetStateAction<Term>>
  filterTerm: Term
}

const cx = classNames.bind(styles)

const Filter: React.FC<Props> = ({ filterTerms, setFilterTerm, filterTerm }) => {
  const [isOpen, setIsOpen] = useState(false)

  const filterMobileRef = useRef<HTMLUListElement>(null)

  const toggleFilter = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleFilterTermClick = (term: Term) => {
    setFilterTerm(term)
    setIsOpen(false)
  }

  useEffect(() => {
    if (filterMobileRef.current) {
      if (isOpen) {
        filterMobileRef.current.style.maxHeight = filterMobileRef.current?.scrollHeight + 'px'
      } else {
        filterMobileRef.current.style.maxHeight = '0'
      }
    }
  }, [isOpen])

  return (
    <div className={cx('filter', 'padding-horizontal')}>
      <div className="max-width-5 mx-auto">
        <div className={cx('filter-desktop')}>
          <ul className={cx('filter-terms-listing')}>
            <li
              key="all-desktop"
              data-cursor-type="medium"
              className={cx('filter-term', { active: filterTerm.text === 'All' })}
              onClick={() => handleFilterTermClick({ id: '0', text: 'All' })}
            >
              <span>All</span>
            </li>
            {filterTerms?.length > 0 &&
              filterTerm &&
              filterTerms.map((term: Term) => (
                <li
                  key={term.id}
                  data-cursor-type="medium"
                  className={cx('filter-term', { active: filterTerm.id === term.id })}
                  onClick={() => handleFilterTermClick(term)}
                >
                  <span>{term.text}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className={cx("filter-mobile")}>
          <button className={cx("button-trigger")} onClick={toggleFilter}>
            <FilterIcon />
            <span className={cx("button-trigger-text")}>{filterTerm && filterTerm.text}</span>
          </button>
          <ul ref={filterMobileRef} className={cx("filter-terms-listing", "filter-terms-listing-mobile")}>
            <li
              key="all-mobile"
              className={cx('filter-term', { active: filterTerm.text === 'All' })}
              onClick={() => handleFilterTermClick({ id: '0', text: 'All' })}
            >
              <span>All</span>
            </li>
            {filterTerms?.length > 0 &&
              filterTerm &&
              filterTerms.map((term) => (
                <li
                  key={term.id}
                  className={cx('filter-term', { active: filterTerm.id === term.id })}
                  onClick={() => handleFilterTermClick(term)}
                >
                  <span>{term.text}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Filter
