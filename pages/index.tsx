
import type { NextPage } from 'next'
import SEO from '../components/common/SEO'
import { fetchHomepageData } from '@lib/api/homepage.service'
import PreFooter from '@components/common/PreFooter';
import HomeHero from '@components/home/HomeHero';
import HomeProjectListing from '@components/home/HomeProjectListing/HomeProjectListing';


interface Props {
  data: any
}

const Home: NextPage<Props> = ({data}) => {

  return (
    <>
      <SEO
        title={data.meta.tags.title}
        description={data.meta.tags.description}
        // openGraph={{
        //   type: 'website',
        //   title: 'test',
        //   description: 'test',
        //   images: [
        //     {
        //       url: product.images[0]?.url!,
        //       width: '800',
        //       height: '600',
        //       alt: product.name,
        //     },
        //   ],
        // }}
      />

      {data.banner && <HomeHero banner={data.banner} />}
      {data.our_work && data.banner?.body && <HomeProjectListing title='Who we are' subtitle={data.our_work.title} intro={data.banner.body} projects={data.our_work.projects} />}

      <PreFooter />
    </>
  )
}

export const getStaticProps = async () => {
 
  const data = await fetchHomepageData()

  return {
    props: {
      data,
    },
    revalidate: 60, 
  };
};

export default Home
