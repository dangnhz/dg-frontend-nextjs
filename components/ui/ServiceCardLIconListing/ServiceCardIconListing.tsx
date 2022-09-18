import React, {useState, useEffect} from 'react'
import { ServiceCardType } from 'types/service'
import { greenCloud, pinkCloud, blueCloud } from '@lib/cloud-images'
import ServiceCardIcon from '../ServiceCardIcon'
import Grid from '../Grid'

interface Props {
    title?: string
    tiles: Array<ServiceCardType>
    extraClass?:string
  }

const ServiceCardIconListing:React.FC<Props> = ({tiles, extraClass}) => {
    const [servicesItems, setServicesItems] = useState<Array<any>>([])

  useEffect(() => {
    if (tiles) {
      const formattedItems = tiles.map((item, index) => {
        switch (index % 3) {
          case 0:
            return { ...item, cloud: pinkCloud }
          case 1:
            return { ...item, cloud: greenCloud }
          case 2:
            return { ...item, cloud: blueCloud }
          default:
            return { ...item, cloud: pinkCloud }
        }
      })

      setServicesItems(formattedItems)
    }
  }, [tiles])
  return (
    <Grid className="grid-service">
    {servicesItems?.length > 0 &&
      servicesItems.map((item: any, index: number) => (
        <ServiceCardIcon
          key={index}
          id={item.id}
          cloud={item.cloud.src}
          icon={item.icon}
          title={item.title}
          description={item.blurb}
          alias={item.alias}
          isActive={item.is_active}
          extraClass={extraClass}
        />
      ))}
  </Grid>
  )
}

export default ServiceCardIconListing