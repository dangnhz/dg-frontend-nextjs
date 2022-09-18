import { ClientLogo } from '@components/ui/ClientLogo'
import React from 'react'
import { ClientType } from 'types/client'
import Grid from '../Grid'

interface Props {
  title?: string
  clients: Array<ClientType>
  alignCenter?: boolean
}

const ClientListing: React.FC<Props> = ({ title, clients, alignCenter }) => {
  const clientListing = clients?.map((item: ClientType, index: number) => (
    <ClientLogo logo={item.logo} project={item.project} external_link={item.external_link} key={index} />
  ))
  return (
    <>
      {title && <h3 className="text-center margin-b-4">{title}</h3>}
      <Grid className="grid-clients" alignCenter={alignCenter}>
        {clientListing}
      </Grid>
    </>
  )
}

export default ClientListing
