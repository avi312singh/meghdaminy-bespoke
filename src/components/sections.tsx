import { HeroProps } from "./hero"
import { AboutHeroProps } from "./about-hero"
import { CustomCarouselProps } from "./custom-carousel"

export { default as HomepageHero } from "./hero"
export { default as AboutHero } from "./about-hero"
export { default as Banner } from "./banner"
export { default as Carousel } from "./custom-carousel"

export type SectionProps = HeroProps | AboutHeroProps | CustomCarouselProps

type Blocktypes = "HomepageHero" | "AboutHero" | "Banner" | "Carousel"

type WithBlocktype<B = Blocktypes, P = SectionProps> = {
  id: string
  blocktype: B | null
} & P

export type HomepageBlock =
  | WithBlocktype<"HomepageHero", HeroProps>
  | WithBlocktype<"AboutHero", AboutHeroProps>
  | WithBlocktype<"Banner", null>
  | WithBlocktype<"Carousel", CustomCarouselProps>
