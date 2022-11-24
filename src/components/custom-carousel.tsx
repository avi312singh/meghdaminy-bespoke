import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import * as React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index"
import { Section, Text } from "./ui"

export interface CustomCarouselProps {
  carouselSlides: [
    {
      id: string
      imageText: string
      hasText: boolean
      image: IGatsbyImageData
      description: string
    }
  ]
}

export default function CustomCarousel(props: CustomCarouselProps) {
  return (
    <Section>
      <Carousel
        autoPlay
        emulateTouch
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        animationHandler="fade"
        swipeable={false}
      >
        {props.carouselSlides.map(
          ({ hasText, image, description, id, imageText }) => {
            const carouselImage = getImage(image as unknown as IGatsbyImageData)
            return (
              <div key={id}>
                {hasText && <Text variant="carouselHeading">{imageText}</Text>}
                <GatsbyImage image={carouselImage} alt={description} />
              </div>
            )
          }
        )}
      </Carousel>
    </Section>
  )
}

export const query = graphql`
  fragment CarouselContent on Carousel {
    carouselSlides {
      id
      description
      hasText
      imageText
      image {
        ... on ContentfulAsset {
          id
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: WEBP
          )
        }
      }
    }
  }
`
