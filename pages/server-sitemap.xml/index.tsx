import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";

import { fetchAllTeamMembers } from "@lib/api/about.service";
import { fetchAllProjects } from "@lib/api/project.service";
import { fetchAllServices } from "@lib/api/services.service";
import { fetchAllBlogPosts } from "@lib/api/blog.service";

const SITE_URL =
  process.env.NEXT_PUBLIC_DOMAIN_URL || "https://www.digitalgarden.com.au";

export const createAboutSitemap = async () => {
  const res = await fetchAllTeamMembers();

  return res.team.map((item: any) => ({
    loc: `${SITE_URL}/about${item.alias}`,
    lastmod: new Date().toISOString(),
  }));
};

export const createProjectSitemap = async () => {
  let allProjects: Array<any> = [];

  const res = await fetchAllProjects(0, "0");

  const totalPages = res?.pager?.total_pages;

  for (let page = 0; page < totalPages; page++) {
    const res = await fetchAllProjects(page, "0");
    allProjects = [...allProjects, ...res.projects];
  }

  return allProjects.map((item: any) => ({
    loc: `${SITE_URL}/work${item.alias}`,
    lastmod: new Date().toISOString(),
  }));
};

export const createBlogSitemap = async () => {
  let allPosts: Array<any> = [];

  const res = await fetchAllBlogPosts(0, "0");

  const totalPages = res?.pager?.total_pages;

  for (let page = 0; page < totalPages; page++) {
    const res = await fetchAllBlogPosts(page, "0");
    allPosts = [...allPosts, ...res.posts];
  }

  return allPosts.map((item: any) => ({
    loc: `${SITE_URL}/blog${item.alias}`,
    lastmod: new Date().toISOString(),
  }));
};

export const createServiceSitemap = async () => {
  const res = await fetchAllServices();

  return res.services.map((item: any) => ({
    loc: `${SITE_URL}/services${item.alias}`,
    lastmod: new Date().toISOString(),
  }));
};

export const createServiceItemsSitemap = async () => {
  const data = await fetchAllServices();

  const services = data?.services;

  const paths = services.reduce((acc: any, current: any) => {
    const slug = current.alias;
    const serviceItemsPaths = current.serviceItems
      ?.filter((item: any) => item.link != null)
      .map((item: any) => ({ slug, sid: item.link.alias }));
    return [...acc, ...serviceItemsPaths];
  }, []);

  return paths.map((item: any) => ({
    loc: `${SITE_URL}/services${item.slug}${item.sid}`,
    lastmod: new Date().toISOString(),
  }));
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [
    aboutSitemap,
    projectSitemap,
    blogSitemap,
    serviceSitemap,
    serviceItemsSitemap,
  ]: Array<ISitemapField[]> = await Promise.all([
    createAboutSitemap(),
    createProjectSitemap(),
    createBlogSitemap(),
    createServiceSitemap(),
    createServiceItemsSitemap(),
  ]);

  const fields = [
    ...aboutSitemap,
    ...projectSitemap,
    ...blogSitemap,
    ...serviceSitemap,
    ...serviceItemsSitemap,
  ];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
