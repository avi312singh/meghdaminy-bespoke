import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Instagram, Facebook, BookOpen, MapPin } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  IconLink,
  VisuallyHidden,
} from "./ui"
import BrandLogo from "./brand-logo"

const socialMedia = {
  INSTAGRAM: {
    url: "https://instagram.com",
    name: "Instagram",
    icon: <Instagram />,
  },
  FACEBOOK: {
    url: "https://facebook.com",
    name: "Facebook",
    icon: <Facebook />,
  },
  GOOGLE: {
    url: "https://maps.app.goo.gl",
    name: "Google",
    icon: <MapPin />,
  },
  YELL: {
    url: "https://yell.com/biz",
    name: "Yell",
    icon: <BookOpen />,
  },
}

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url
  if (!domain) return false
  return `${domain}/${username}`
}

const getSocialIcon = ({ service }) => {
  return socialMedia[service]?.icon
}

const getSocialName = ({ service }) => {
  return socialMedia[service]?.name
}

interface FooterData {
  layout: {
    footer: {
      id: string
      socialLinks: { id: string; service: string; username: string }[]
    }
  }
}

export default function Footer() {
  const data: FooterData = useStaticQuery(graphql`
    query {
      layout {
        footer {
          id
          socialLinks {
            id
            service
            username
          }
        }
      }
    }
  `)

  const { socialLinks } = data.layout.footer

  return (
    <Box as="footer" paddingY={4}>
      <Container>
        <Flex variant="start" responsive>
          <NavLink to="/">
            <VisuallyHidden>Home</VisuallyHidden>
          </NavLink>
          <Space />
          <FlexList>
            {socialLinks &&
              socialLinks.map((link) => {
                const url = getSocialURL(link)
                return (
                  url && (
                    <li key={link.id}>
                      <IconLink to={url}>
                        <VisuallyHidden>{getSocialName(link)}</VisuallyHidden>
                        {getSocialIcon(link)}
                      </IconLink>
                    </li>
                  )
                )
              })}
          </FlexList>
        </Flex>
        <Space size={2} />
        <Flex variant="start" responsive>
          <FlexList variant="start" responsive></FlexList>
          <Space />
        </Flex>
      </Container>
      <Space size={3} />
    </Box>
  )
}
