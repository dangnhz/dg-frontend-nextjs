import React, {useEffect} from 'react'
import PostDetail from '@components/ui/PostDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import {fetchPost, fetchAllPosts} from '@lib/api/career.service';
import { useUI } from '@context/UIContext';
import { redCloud } from '@lib/cloud-images';
import {animationType6} from '@lib/blob-animations'



const JobDetail = ({post} : {post: any}) => {
  const {setCurrentTheme} = useUI()

  useEffect(() => {setCurrentTheme('red')}, [setCurrentTheme])
  return (
    <PostDetail post={post} type="job-post" blobAnimation={animationType6} showBlobAnimation blobCloud={redCloud} />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const data  = await  fetchAllPosts(0)

  const paths = data.jobs.map((item:any) => ({ params: { slug: item.alias } }));

  return {
    paths,
    fallback: 'blocking'
  };
}


export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  try {
    if (!slug)  return {
      notFound: true
    }
    const post = await fetchPost(slug);

    return {
      props: {
        post,
        revalidate: 60*2,
      }
    };

  } catch (error) {
    return {
      notFound: true
    }
  }
  
}



export default JobDetail