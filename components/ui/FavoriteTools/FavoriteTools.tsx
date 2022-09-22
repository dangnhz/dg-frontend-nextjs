import React from 'react'
import Image from 'next/future/image'
import Grid from '../Grid'
import Container from '../Container'

interface Tool {
  title: string
  image: string
}

interface Props {
  title?: string
  tools: Array<Tool>
  alignCenter?: boolean,
  itemPerRow?: number
}

const FavoriteTools: React.FC<Props> = ({ title, tools, alignCenter, itemPerRow }) => {
  return (
    <Container padding="padding-horizontal" maxWidth="max-width-6" margin="margin-t-7">
      {title && <h3 className="text-center margin-b-3">{title}</h3>}
      <Grid alignCenter={alignCenter} itemPerRow={itemPerRow} >
        {tools?.map((item) => (
          <div key={item.title} className="logo-item">
            <Image src={item.image} alt={item.title} title={item.title} width={300} height={150} style={{width: '100%', height: 'auto',  objectFit: 'contain'}} />
          </div>
        ))}
      </Grid>
    </Container>
  )
}

export default FavoriteTools
