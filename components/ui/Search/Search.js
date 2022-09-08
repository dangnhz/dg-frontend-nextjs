import React, { useEffect } from "react";
import SearchForm from "./components/SearchForm";
import ButtonLoadMore from "components/atoms/Buttons/ButtonLoadMore";
import { useLocation } from "react-router-dom";
import { useSearch } from "context/SearchContext";
import queryString from "query-string";
import PageTransition from "components/organisms/AnimationLayout/PageTransition";
import ResultItem from "./components/ResultItem";
import "./Search.scss";
import MetaDecorator from "components/atoms/MetaDecorator/MetaDecorator";
import PreFooter from "components/organisms/PreFooter/PreFooter";
import { footerGreen } from 'constants/footerImages';
import { BeatLoader } from "react-spinners";

const Search = () => {
  const location = useLocation();
  const { query, setQuery, searchResults, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearch();
  const queryParam = queryString.parse(location.search);

  // set search query from url params
  useEffect(() => {
    if (queryParam && queryParam.q) {
      setQuery(queryParam.q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTransition className="page page-search">
      <MetaDecorator title="Search" />
      <div className="page-inner">
        <div className="search-header padding-horizontal">
          <div className="mx-auto max-width-5">
            <h2 className="padding-t-3 margin-b-3">Search</h2>
            <SearchForm />
            <h6 className={(!query || searchResults?.length === 0) ? "hidden" : undefined}>Results for "{query}"</h6>
          </div>
        </div>
        <div className="blog-post-listing padding-horizontal margin-t-3 margin-b-10 padding-t-7">
          {searchResults && query && <div className="blog-post-listing__background"></div>}
          <div className="blog-post-listing__wrapper mx-auto max-width-5">
            {searchResults?.length === 0 && query && <h6 className="padding-b-7 text-center">Search for "{query}" <BeatLoader color="#000" size={5} margin={3} /></h6>}
            {searchResults?.length > 0 && query && searchResults.map((item) => <ResultItem key={item.id} data={item} />)}
            {hasNextPage && query.length > 0 && (
              <div className="padding-b-10 blog-post-loadmore">
                <ButtonLoadMore onClick={fetchNextPage} text={isFetchingNextPage ? "Loading..." : "Load more"} color="green" hoverColor="black" />
              </div>
            )}
          </div>
        </div>
      </div>
      <PreFooter showContactForm={false} backgroundImage={footerGreen}></PreFooter>
    </PageTransition>
  );
};

export default Search;
