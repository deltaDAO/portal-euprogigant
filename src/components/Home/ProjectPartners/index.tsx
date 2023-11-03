import { ReactElement } from 'react'
import styles from './index.module.css'
import { Carousel } from '@components/@shared/Carousel'
import Container from '@components/@shared/atoms/Container'
import Button from '@components/@shared/atoms/Button'

export const ProjectPartners = (): ReactElement => {
  const projectPartnersList = require
    .context(
      '../../../../public/images/projectPartners',
      false,
      /\.(png|jpe?g)$/
    )
    .keys()
    .filter((e) => e.startsWith('./'))
    .map((x) => x.replace('./', ''))

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <h3 className={styles.title}>These partners work with us</h3>
        <Carousel show={4}>
          {projectPartnersList.map((logo) => (
            <div key={logo} className={styles.logoContainer}>
              <img
                src={`/images/projectPartners/${logo}`}
                className={styles.logo}
                alt="Partner logo"
              />
            </div>
          ))}
        </Carousel>
        <div className={styles.footer}>
          <Button
            style="text"
            href="https://euprogigant.com/en/partners/project-partners/"
            target="_blank"
            rel="noopener noreferrer"
          >
            All project partners
          </Button>
        </div>
      </Container>
    </div>
  )
}
