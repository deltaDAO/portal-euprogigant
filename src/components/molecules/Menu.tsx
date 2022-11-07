import React, { ReactElement } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import loadable from '@loadable/component'
import styles from './Menu.module.css'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import UserPreferences from './UserPreferences'
import Logo from '../atoms/Logo'
import SearchBar from './SearchBar'
import Container from '../atoms/Container'
import Network from './Wallet/Network'
import Networks from './UserPreferences/Networks'
import classNames from 'classnames/bind'

const Wallet = loadable(() => import('./Wallet'))

const cx = classNames.bind(styles)

export function MenuLink({
  name,
  link,
  className
}: {
  name: string
  link: string
  className?: string
}): ReactElement {
  const location = useLocation()

  const basePath = location?.pathname.split(/[/?]/)[1]
  const baseLink = link.split(/[/?]/)[1]

  const classes = cx({
    link: true,
    active: link.startsWith('/') && basePath === baseLink,
    [className]: className
  })

  return link.startsWith('/') ? (
    <Link key={name} to={link} className={classes}>
      {name}
    </Link>
  ) : (
    <a
      href={link}
      className={classes}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name} &#8599;
    </a>
  )
}

export default function Menu(): ReactElement {
  const { menu } = useSiteMetadata()

  return (
    <div className={styles.wrapper}>
      <Container>
        <nav className={styles.menu}>
          <Link to="/" className={styles.logo}>
            <Logo branding />
          </Link>
          <div className={styles.navigationContainer}>
            <div className={styles.actions}>
              <SearchBar />
              <Networks />
              <Network />
            </div>
            <ul className={styles.navigation}>
              {menu.map((item) => (
                <li key={item.name}>
                  <MenuLink name={item.name} link={item.link} />
                </li>
              ))}
              <li>
                <Wallet />
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </div>
  )
}
