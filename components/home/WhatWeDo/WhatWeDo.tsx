import React, { useState, useEffect } from 'react';
import {greenCloud, pinkCloud, blueCloud} from '@lib/cloud-images';
import Grid from '@components/ui/Grid';
import ServiceCardIcon from '../../ui/ServiceCardIcon/ServiceCardIcon';
import { ServiceCardType } from 'types/service';
import classNames from 'classnames/bind';
import styles from './WhatWeDo.module.scss';

const cx = classNames.bind(styles)


interface Props {
	title: string
	tiles: Array<ServiceCardType>
	backgroundColor?: string
}

const WhatWeDo:React.FC<Props> = ({ title, tiles, backgroundColor }) => {
	const [servicesItems, setServicesItems] = useState<Array<any>>([]);

	useEffect(() => {
		if (tiles) {
			const formattedItems = tiles.map((item, index) => {
				switch (index % 3) {
					case 0:
						return { ...item, cloud: pinkCloud };
					case 1:
						return { ...item, cloud: greenCloud };
					case 2:
						return { ...item, cloud: blueCloud };
					default:
						return { ...item, cloud: pinkCloud };
				}
			});

			setServicesItems(formattedItems);
		}
	}, [tiles]);

	return (
		<section className={cx("what-we-do" ,"padding-t-5 padding-b-8 padding-horizontal", backgroundColor)}>
			<div className="max-width-5 mx-auto">
				<h2 className="my-0 text-center homepage-title"> {title} </h2>
				<div className="margin-t-5">
				<Grid className='grid-service'>
				{servicesItems?.length > 0 &&
						servicesItems.map((item:any, index:number) => (
							<ServiceCardIcon
								key={index}
								id={item.id}
								cloud={item.cloud.src}
								icon={item.icon}
								title={item.title}
								description={item.blurb}
								alias={item.alias}
								isActive={item.is_active}
								extraClass={item.extraClass}
							/>
						))}
				</Grid>
				</div>
			</div>
		</section>
	);
};

export default WhatWeDo;
