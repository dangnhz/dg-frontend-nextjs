import Container from '@components/ui/Container'
import { Column, Flex } from '@components/ui/Flex'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './ProjectBody.module.scss'

const cx = classNames.bind(styles)

interface Props {
  title: string
  body: string
  intro: string
}

const ProjectBody: React.FC<Props> = ({ title, body, intro }) => {
  return (
    <div className={cx('project-body')}>
      <Container padding="padding-horizontal" margin="margin-v-7">
        <Flex gap="lg">
          <Column>
            <div className={cx('title')}><h3>{title}</h3></div>
          </Column>
          <Column width="60%">
            <div className={cx('intro-text', 'body-copy')} dangerouslySetInnerHTML={{ __html: intro }}></div>
            <div className={cx('body-text', 'body-copy')} dangerouslySetInnerHTML={{ __html: body }}></div>
          </Column>
        </Flex>
      </Container>
    </div>
  )
}

export default ProjectBody
