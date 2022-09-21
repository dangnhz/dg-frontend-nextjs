import Project from '@components/ui/Project'
import React from 'react'
import { fetchAllProjects, fetchProject } from '@lib/api/project.service'
import { GetStaticPaths, GetStaticProps } from 'next'


const WorkDetail = ({ data }: any) => {
  return <Project data={data} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchAllProjects(0, '0')

  const paths = data.projects.map((item: any) => ({ params: { slug: item.alias } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  try {
    if (!slug)
      return {
        notFound: true,
      }

    const data = await fetchProject(slug)    

    if (data?.gated_content) 

      return {
        redirect: {
          permanent: false,
          destination: `/gated/${slug}`,
        },
      }

    return {
      props: {
        data,
        revalidate: 60,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default WorkDetail
