import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {fetchGatedProject} from '@lib/api/project.service'
import Project from '@components/ui/Project'
import Container from '@components/ui/Container'
import LoginForm from '@components/ui/LoginForm'

const GatedContent = () => {
  const router = useRouter()
  const slug = router.query.slug || ''

  const [project, setProject] = useState(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {

    fetchGatedProject(slug)
      .then((res) => {
        console.log(res.data)
        setProject(res.data)
      })
      .catch((err : any) => {
        setError(err)
      })
  }, [slug])

  if (error) {
    console.log(error.response.status)
    return (
      <Container>
        <LoginForm projectPath={`gated/${slug}`}/>
      </Container>
    )
  }

  return <>{project && <Project data={project} />}</>
}

export default GatedContent
