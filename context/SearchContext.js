import useDebounce from 'hooks/useDebounce';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchSearch } from '../api/search.service';

const SearchContext = createContext({
	query: '',
});

export const useSearch = () => {
	return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
	const [query, setQuery] = useState('');
	const debouncedSearchTerm = useDebounce(query, 500);
	const [searchResults, setSearchResults] = useState(null);

	const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
		['fetchSearch', debouncedSearchTerm],
		({ pageParam = 0 }) => fetchSearch(debouncedSearchTerm, pageParam),
		{
			getNextPageParam: (lastPage) => {
				if (parseInt(lastPage.pager.current_page) < parseInt(lastPage.pager.total_pages - 1)) return parseInt(lastPage.pager.current_page) + 1;
				return;
			},
			keepPreviousData: true,
			enabled: debouncedSearchTerm.length > 0,
		}
	);

	useEffect(() => {
		if (data && data.pages) {
			const paginatedData = [];
			data.pages.forEach((page) => {
				page.results.forEach((result) => {
					paginatedData.push(result);
				});
			});
			setSearchResults(paginatedData);
		}
	}, [data]);

	const value = {
		query,
		setQuery,
		isLoading,
		searchResults,
		setSearchResults,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	};
	return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
