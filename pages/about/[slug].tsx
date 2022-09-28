import React, {useEffect} from 'react'
import PostDetail from '@components/ui/PostDetail'
import { GetStaticPaths, GetStaticProps } from 'next'
import {fetchAllTeamMembers, fetchMember} from '@lib/api/about.service';
import { useUI } from '@context/UIContext';
import { PurpleDetailCloud } from '@lib/detail-page-clouds'
import {animationType2} from '@lib/blob-animations'


const AboutDetail = ({post} : {post: any}) => {
  const {setCurrentTheme} = useUI()

  useEffect(() => {setCurrentTheme('purple')}, [setCurrentTheme])

  const formattedPost = {
    id: post.id,
    meta: post.meta,
    title: post.name,
    body: post.body,
    image: null,
    category: {
      text: post.role
    },
    author: {
      name: post.name,
      image: post.image
    }
  }
  return (
    <PostDetail type='about-post' post={formattedPost} cloudBackground={PurpleDetailCloud} blobAnimation={animationType2}/>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const data  = await fetchAllTeamMembers()

  const paths = data.team.map((item:any) => ({ params: { slug: item.alias } }));

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
    const post = await fetchMember(slug);

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



export default AboutDetail