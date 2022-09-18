import React from 'react'

import { ServiceCardType } from '../../../types/service'
import Container from '../Container'
import ServiceCardIconListing from '../ServiceCardLIconListing';

interface Props {
  title: string
  tiles: Array<ServiceCardType>
}

const OtherServices: React.FC<Props> = ({ title, tiles }) => {
  return (
      <Container padding="padding-horizontal" maxWidth="max-width-5" margin="margin-v-7">
        {title && <h3 className="text-center">{title}</h3>}
       <div className="margin-t-4"> <ServiceCardIconListing tiles={tiles} extraClass='other-services'/></div>
      </Container>
  )
}

export default OtherServices
