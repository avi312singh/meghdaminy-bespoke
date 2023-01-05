import * as React from "react"
import Layout from "../components/layout"
import {
  Container,
  Box,
  Text,
  Flex,
  FlexList,
  IconLink,
  VisuallyHidden,
} from "../components/ui"
import ChevronRight from "../components/chevron-right"
import * as styles from "../components/contact.css"
import SEOHead from "../components/head"
import { graphql, useStaticQuery } from "gatsby"
import {
  Instagram,
  Facebook,
  MapPin,
  BookOpen,
  Phone,
  Mail,
} from "react-feather"
import { Wrapper, Status } from "@googlemaps/react-wrapper"

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

interface socialLinksData {
  layout: {
    footer: {
      id: string
      socialLinks: { id: string; service: string; username: string }[]
    }
  }
}

export default function contact() {
  const data: socialLinksData = useStaticQuery(graphql`
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

  const MyMapComponent = ({
    center,
    zoom,
  }: {
    center: google.maps.LatLngLiteral
    zoom: number
  }) => {
    const ref = React.useRef()

    React.useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      })
    })

    return <div ref={ref} id="map" />
  }

  const { socialLinks } = data.layout.footer
  return (
    <Layout>
      <Box paddingY={4}>
        <Container>
          <Flex variant="column">
            <Text variant="heading" className={styles.heading}>
              CONTACT ME
            </Text>
            <FlexList>
              {socialLinks &&
                socialLinks.map((link) => {
                  const url = getSocialURL(link)
                  return (
                    url && (
                      <li className={styles.socialLink} key={link.id}>
                        <IconLink to={url}>
                          <VisuallyHidden>{getSocialName(link)}</VisuallyHidden>
                          {getSocialIcon(link)}
                        </IconLink>
                      </li>
                    )
                  )
                })}
            </FlexList>
            <Wrapper apiKey={"AIzaSyB5t_6kK6yDMPV1Xf9zZpcd7_6i4dh6ap0"}>
              <MyMapComponent center={{ lat: -50, lng: 60 }} zoom={8} />
            </Wrapper>
            <Flex className={styles.email}>
              <Mail />
              <a href={"mailto:MEGHBESPOKETAILORING@OUTLOOK.COM"}>
                MEGHBESPOKETAILORING@OUTLOOK.COM
              </a>
            </Flex>
            <Flex className={styles.number}>
              <Phone />
              <a href={"tel:07376 092484"}>07376 092484</a>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Layout>
  )
}
export const Head = () => {
  return <SEOHead title="Contact Kaya" />
}
