import * as React from "react"
import { graphql } from "gatsby"
import { Section, Container, Heading, Text } from "./ui"

interface IBannerProps {
  heading: string
  text: string
  html: string
}

export default function Banner({ heading, text, html }: IBannerProps) {
  return (
    <Section>
      <Container>
        <Heading>{heading}</Heading>
        <Text>{text}</Text>
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </Container>
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
