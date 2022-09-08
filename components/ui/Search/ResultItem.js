import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import slugify from 'slugify';

/**
 * 
 * @content_type
 * team_member
 * webform
 * service
 * client
 * blog_post
 * project
 * landing_page


 */

const ResultItem = ({ data }) => {
	const { id, title, type, snippet, alias } = data;
	const [path, setPath] = useState('/');
	const [contentType, setContentType] = useState('');

	const scrollWithOffset = (el) => {
		const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
		const yOffset = -120;
		window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
	};

	useEffect(() => {
		if (type) {
			switch (type) {
				case 'blog_post':
					setPath(`/blog${alias ? alias : '/' + id}`);
					setContentType('Blog');
					break;
				case 'project':
					setPath(`/work${alias ? alias : '/' + id}`);
					setContentType('Project');
					break;
				case 'service':
					setPath(`/services${alias ? alias : '/' + id}`);
					setContentType('Service');
					break;
				case 'service_item':
					setPath(`/services${alias ? alias : '/' + id}#${slugify(title, { lower: true })}`);
					setContentType('Service');
					break;
				case 'job_post':
					setPath(`/careers${alias ? alias : '/' + id}`);
					setContentType('Jobs');
					break;
				case 'team_member':
					setPath(`/about${alias ? alias : '/' + id}`);
					setContentType('Our team');
					break;
				case 'basic_page':
					setPath(alias);
					setContentType('Page');
					break;
				default:
			}
		}
	}, [type, id, title, alias]);
	return (
		<div className="blog-card search-result-item padding-horizontal padding-b-7">
			<div className="blog-card__wrapper mx-auto max-width-5">
				<div className="blog-card__left">
					<div className="blog-card__category">{contentType}</div>
				</div>
				<div className="blog-card__right">
					<HashLink to={path} smooth scroll={(el) => scrollWithOffset(el)} className="blog-card__title search-result-item__title">
						<h2 className="my-0">{title}</h2>
					</HashLink>
					{snippet['#markup'] && (
						<div className="blog-card__intro">
							<p dangerouslySetInnerHTML={{ __html: snippet['#markup'] }}></p>
						</div>
					)}
					{snippet['#plain_text'] && (
						<div className="blog-card__intro">
							<p dangerouslySetInnerHTML={{ __html: snippet['#plain_text'] }}></p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ResultItem;
