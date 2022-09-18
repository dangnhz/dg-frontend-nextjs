import React from 'react'
import Container from '../Container'
import { ProjectCardType } from 'types/project';
import { useUI } from '@context/UIContext';
import Grid from '../Grid';
import ProjectCard from '../ProjectCard';

interface Props {
    title: string,
    projects: Array<ProjectCardType>
}

const RelatedProjects:React.FC<Props> = ({title, projects}) => {
    const {theme} = useUI()
    
  return (
    <Container padding="padding-horizontal" maxWidth="max-width-6" margin="margin-v-8">
        {title && <h3 className="text-center">{title}</h3>}
       <div className="margin-t-5">
       <Grid>{projects?.length > 0 && projects.map((item) => <ProjectCard key={item.id} data={item} hoverColor={theme.primaryColor}/>)}</Grid>
       </div>
      </Container>
  )
}

export default RelatedProjects