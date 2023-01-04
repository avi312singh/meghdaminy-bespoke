import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Section, Text, SuperHeading, HomepageImage } from "./ui"
import * as styles from "./about-hero.css"

export interface AboutHeroProps {
  heading: string
  text?: string
  image?: HomepageImage
}

export default function AboutHero({ heading, text, image }: AboutHeroProps) {
  return (
    <Section>
      <Container>
        {heading && (
          <SuperHeading className={styles.aboutHeroHeader}>
            {heading}
          </SuperHeading>
        )}
        {text && <Text className={styles.aboutHeroText}>{text}</Text>}
      </Container>
      <Container width="wide">
        {image && (
          <GatsbyImage
            alt={image.alt}
            image={getImage(image.gatsbyImageData)}
            className={styles.aboutHeroImage}
          />
        )}
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment AboutHeroContent on AboutHero {
    id
    heading
    text
    image {
      id
      ... on ContentfulAsset {
        id
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AVIF, WEBP, AUTO]
        )
      }
      alt
    }
  }
`
