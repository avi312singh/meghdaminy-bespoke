import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  InteractiveIcon,
  Nudge,
  VisuallyHidden,
  Text,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css"
import NavItemGroup, { NavItemGroupNavItem } from "./nav-item-group"

type NavItem = {
  id: string
  navItemType: "Link"
  href: string
  text: string
}

type NavItemGroup = {
  id: string
  navItemType: "Group"
  name: string
  navItems: NavItemGroupNavItem[]
}

interface HeaderData {
  layout: {
    header: {
      id: string
      navItems: NavItem[] | NavItemGroup[]
      cta: {
        id: string
        href: string
        text: string
      }
    }
  }
}

export default function Header() {
  const data: HeaderData = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
          navItems {
            id
            navItemType
            ... on NavItem {
              href
              text
            }
            ... on NavItemGroup {
              name
              navItems {
                id
                href
                text
                description
                icon {
                  alt
                  gatsbyImageData
                }
              }
            }
          }
          cta {
            id
            href
            text
          }
        }
      }
    }
  `)

  const { navItems, cta } = data.layout.header
  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        <Flex variant="start">
          <Space size={2} />
          <div className={desktopHeaderNavWrapper}>
            <nav>
              <FlexList responsive variant="center">
                {navItems?.map((navItem) => (
                  <li key={navItem.id}>
                    {navItem.navItemType === "Group" ? (
                      <NavItemGroup
                        name={navItem.name.toUpperCase()}
                        navItems={navItem.navItems}
                      />
                    ) : (
                      <NavLink to={navItem.href}>
                        {navItem.text.toUpperCase()}
                      </NavLink>
                    )}
                  </li>
                ))}
              </FlexList>
            </nav>
          </div>
        </Flex>
        <Flex variant="end">
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
          </NavLink>
          <nav>
            <span className={mobileNavSVGColorWrapper["primary"]}>
              <NavLink to="/">
                <VisuallyHidden>Home</VisuallyHidden>
                <Text variant="heading">Megh Da Miny Bespoke</Text>
                <Text variant="medium">Kaya Sharma</Text>
              </NavLink>
            </span>
          </nav>
        </Flex>
      </Container>
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <Nudge right={3}>
            <InteractiveIcon
              title="Toggle menu"
              onClick={() => setOpen(!isOpen)}
              className={
                mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
              }
            >
              {isOpen ? <X /> : <Menu />}
            </InteractiveIcon>
          </Nudge>
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
          >
            <NavLink to="/">
              <VisuallyHidden>Home</VisuallyHidden>
              <Text variant="kicker">Megh Da Miny Bespoke</Text>
              <Text variant="small">Kaya Sharma</Text>
            </NavLink>
          </span>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {navItems?.map((navItem) => (
                <li key={navItem.id}>
                  {navItem.navItemType === "Group" ? (
                    <NavItemGroup
                      name={navItem.name}
                      navItems={navItem.navItems}
                    />
                  ) : (
                    <NavLink to={navItem.href} className={mobileNavLink}>
                      {navItem.text}
                    </NavLink>
                  )}
                </li>
              ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
