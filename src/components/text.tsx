import * as React from "react"
import { graphql } from "gatsby"
import { Section, Container, Heading, Text } from "./ui"

export default function CustomText({ heading, text }) {
  return (
    <Section>
      <Container>
        <Heading>{heading}</Heading>
        <Text>{text}</Text>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment TextContent on Banner {
    id
    heading
    text
    longerText
  }
`
