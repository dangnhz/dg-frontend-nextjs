import Project from '@components/ui/Project'
import React from 'react'
import { fetchAllProjects, fetchProject } from '@lib/api/project.service'
import { GetStaticPaths, GetStaticProps } from 'next'


const WorkDetail = ({ data }: any) => {
  return <Project data={data} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  let allProjects : Array<any> = []

  const res = await fetchAllProjects(0, '0');

  const totalPages = res?.pager?.total_pages;

  for (let page = 0; page < totalPages; page++) {
   const res = await fetchAllProjects(page, '0');
    allProjects = [...allProjects, ...res.projects]
  }

  const paths = allProjects.map((item: any) => ({ params: { slug: item.alias } }))

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
        revalidate: 60*2,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default WorkDetail
