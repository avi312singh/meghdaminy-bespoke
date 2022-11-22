import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import * as React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import Carousel from "react-responsive-carousel/lib/js/components/Carousel/index"
import { Section, Text } from "./ui"

interface CustomCarouselData {
  contentfulCarousel: {
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
}

export default function CustomCarousel() {
  const data: CustomCarouselData = useStaticQuery(graphql`
    query customCarousel {
      contentfulCarousel(contentful_id: { eq: "56hniFmrkeQDh3Tqcy6ZpT" }) {
        carouselSlides {
          id
          hasText
          imageText
          image {
            gatsbyImageData(
              placeholder: BLURRED
              layout: FULL_WIDTH
              formats: [AVIF, WEBP, AUTO]
            )
          }
        }
        description
      }
    }
  `)

  let { contentfulCarousel } = data

  return (
    <Section>
      <Carousel
        // className={classes.indicatorDots}
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
        {contentfulCarousel.carouselSlides.map(
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
