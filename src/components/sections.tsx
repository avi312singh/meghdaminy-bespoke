import { HeroProps } from "./hero"
import { AboutHeroProps } from "./about-hero"

export { default as HomepageHero } from "./hero"
export { default as AboutHero } from "./about-hero"

export type SectionProps = HeroProps | AboutHeroProps

type Blocktypes = "HomepageHero" | "AboutHero" | "AboutLogoList"

type WithBlocktype<B = Blocktypes, P = SectionProps> = {
  id: string
  blocktype: B
} & P

export type HomepageBlock =
  | WithBlocktype<"HomepageHero", HeroProps>
  | WithBlocktype<"AboutHero", AboutHeroProps>
