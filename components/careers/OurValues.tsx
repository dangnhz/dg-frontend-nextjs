import React from 'react';

import classNames from 'classnames/bind'
import styles from './OurValues.module.scss';

const cx = classNames.bind(styles)

const LogoNoText = ({ color = '#3fb91e' }) => {
	return (
		<svg className="dg-logo" width="100" height="80" viewBox="0 0 150 121">
			<defs>
				<polygon id="path-1" points="149.476973 0.394554499 149.476973 119.807787 0.000124981269 119.807787 0.000124981269 0.394554499"></polygon>
			</defs>
			<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
				<g transform="translate(-39.000000, -20.000000)">
					<g id="Page-1" transform="translate(39.000000, 20.000000)">
						<g id="Group-3" transform="translate(0.000000, 0.229632)">
							<path
								d="M132.51339,0.394554499 C102.779097,0.394554499 0.000124981269,1.6899762 0.000124981269,64.298905 C0.000124981269,93.3485494 21.118835,119.807974 58.8231843,119.807974 C98.6690877,119.807974 149.477098,90.5954663 149.477098,0.394554499 L132.51339,0.394554499 Z"
								id="logo-background"
								fill={color}
								mask="url(#mask-2)"></path>
						</g>
					</g>
				</g>
			</g>
		</svg>
	);
};

export const ValueItem = ({ logoColor, text }: {logoColor: string, text: string}) => {
	return (
		<div className={cx("value-item")}>
			<LogoNoText color={logoColor} />
			<h6 className={cx("value-item-text" , "text-center")} dangerouslySetInnerHTML={{__html: text}}></h6>
		</div>
	);
};

const OurValues = ({ data }: {data:any}) => {
	return (
		<div className={cx("our-values" , "margin-t-10 margin-b-3 padding-horizontal")}>
			<div className="container max-width-5">
				{data.heading && <h3 className="text-center">{data.heading}</h3>}
				{data.items && (
					<div className={cx("our-values-listing", "margin-t-5")}>
						{data.items.map((item:any, index:number) => (
							<ValueItem logoColor={item.color} text={item.label} key={index} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default OurValues;