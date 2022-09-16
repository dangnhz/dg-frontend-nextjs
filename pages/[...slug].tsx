import React, {useEffect} from 'react'
import PostDetail from '@components/ui/PostDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import {fetchBasicPage} from '@lib/api/basicpage.service';
import { useUI } from '@context/UIContext';
import { GreenDetailCloud } from '@lib/detail-page-clouds'



const BasicPage = ({post} : {post: any}) => {
  const {setCurrentTheme} = useUI()

  useEffect(() => {setCurrentTheme('green')}, [setCurrentTheme])
  return (
    <PostDetail post={post} cloudBackground={GreenDetailCloud} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: 'blocking'
  };
}


export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  try {
    if (!slug)  return {
      notFound: true
    }
    const post = await fetchBasicPage(slug);

    return {
      props: {
        post,
        revalidate: 60,
      }
    };

  } catch (error) {
    return {
      notFound: true
    }
  }
  
}



export default BasicPage