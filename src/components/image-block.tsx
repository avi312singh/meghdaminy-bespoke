import { graphql } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import * as React from "react"
import { Box, Container, Flex, Section } from "./ui"

export interface ImageBlockProps {
  images?: IGatsbyImageData[]
}

export default function ImageBlock({ images }: ImageBlockProps) {
  return (
    <Section>
      <Container>
        <Box width="full">
          <Flex variant="imageBlock">
            {images &&
              images.map((image) => (
                <GatsbyImage
                  alt={"props.image.alt"}
                  image={getImage(image.gatsbyImageData)}
                />
              ))}
          </Flex>
        </Box>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment MultipleImagesContent on MultipleImages {
    images {
      id
      alt
      ... on ContentfulAsset {
        id
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          formats: [AVIF, WEBP, AUTO]
          width: 370
          height: 669
        )
      }
    }
  }
`
