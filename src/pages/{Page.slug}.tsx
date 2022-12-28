import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container, Box, Heading } from "../components/ui"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

interface PageProps {
  data: {
    page: {
      id: string
      title: string
      slug: string
      description: string
      image: { id: string; url: string }
      showBody: boolean
      html: string
      blocks: sections.HomepageBlock[]
    }
  }
}

export default function Page(props: PageProps) {
  const { page } = props.data
  const { title, showBody, html, blocks } = page

  return (
    <Layout>
      {title && showBody ? (
        <Box paddingY={5}>
          <Container width="narrow">
            <Heading as="h1">{title}</Heading>
            <div
              dangerouslySetInnerHTML={{
                __html: html,
              }}
            />
          </Container>
        </Box>
      ) : (
        title &&
        !showBody && (
          <Box paddingY={3}>
            <Container width="narrow">
              <Heading as="h1">{title}</Heading>
            </Container>
          </Box>
        )
      )}

      {blocks &&
        blocks.map((block) => {
          const { id, blocktype, ...componentProps } = block
          const Component = sections[blocktype] || Fallback
          return <Component key={id} {...(componentProps as any)} />
        })}
    </Layout>
  )
}
export const Head = (props: PageProps) => {
  const { page } = props.data
  return <SEOHead {...page} />
}
export const query = graphql`
  query PageContent($id: String!) {
    page(id: { eq: $id }) {
      id
      title
      slug
      description
      image {
        id
        url
      }
      showBody
      html
      blocks: content {
        id
        blocktype
        ...BannerContent
        ... on ContentfulCarousel {
          id
          carouselSlides {
            image {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        ... on ContentfulHomepageHero {
          image {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        ... on ContentfulAboutHero {
          image {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        ...MultipleImagesContent
        ...TestimonialListContent
      }
    }
  }
`
