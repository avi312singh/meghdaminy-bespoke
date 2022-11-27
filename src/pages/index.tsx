import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"

interface HomepageProps {
  data: {
    homepage: {
      id: string
      title: string
      description: string
      image: { id: string; url: string }
      blocks: sections.HomepageBlock[]
    }
  }
}

export default function Homepage({ data }: HomepageProps) {
  const { homepage } = data
  console.log(homepage)

  return (
    <Layout>
      {homepage.blocks.map((block) => {
        console.log(block)
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        return <Component key={id} {...(componentProps as any)} />
      })}
    </Layout>
  )
}
export const Head = ({ data }: HomepageProps) => {
  const { homepage } = data
  return <SEOHead {...homepage} />
}
export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...CarouselContent
        ...HomepageHeroContent
        ...BannerContent
        ...MultipleImagesContent
        ...TestimonialListContent
      }
    }
  }
`
