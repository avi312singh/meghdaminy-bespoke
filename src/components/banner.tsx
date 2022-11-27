import * as React from "react"
import { graphql } from "gatsby"
import { Section, Container, Heading, Text, Flex } from "./ui"

interface IBannerProps {
  heading: string
  text: string
  html: string
}

export default function Banner({ heading, text, html }: IBannerProps) {
  return (
    <Section>
      <Flex variant="center">
        <Container>
          <Heading>{heading}</Heading>
          <Text bold>{text}</Text>
          <Text variant="globalComicSans">{text}</Text>
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </Container>
      </Flex>
    </Section>
  )
}

export const query = graphql`
  fragment BannerContent on Banner {
    id
    heading
    text
    html
  }
`
