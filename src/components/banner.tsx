import * as React from "react"
import { graphql } from "gatsby"
import { Section, Container, Heading, Text, Flex } from "./ui"

interface IBannerProps {
  heading: string
  text: string
  longerText: string
  children: [{ internal: { content: string } }]
}

export default function Banner({ heading, text, children }: IBannerProps) {
  return (
    <Section>
      <Flex variant="center">
        <Container>
          <Heading>{heading}</Heading>
          <Text bold variant="medium">
            {text}
          </Text>
          {children[0] && (
            <Text variant="leadBanner">{children[0].internal.content}</Text>
          )}
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
    children {
      ... on contentfulBannerLongerTextTextNode {
        id
        internal {
          content
        }
      }
    }
  }
`
