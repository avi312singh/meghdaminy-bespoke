import { HeroProps } from "./hero"
import { AboutHeroProps } from "./about-hero"
// import { BannerProps } from "./banner"
import { CustomCarouselProps } from "./custom-carousel"
import { ImageBlockProps as MultipleImagesProps } from "./image-block"

export { default as HomepageHero } from "./hero"
export { default as AboutHero } from "./about-hero"
export { default as Banner } from "./banner"
export { default as Carousel } from "./custom-carousel"
export { default as MultipleImages } from "./image-block"

export type SectionProps =
  | HeroProps
  | AboutHeroProps
  | CustomCarouselProps
  | MultipleImagesProps

type Blocktypes =
  | "HomepageHero"
  | "AboutHero"
  | "Banner"
  | "Carousel"
  | "MultipleImages"

type WithBlocktype<B = Blocktypes, P = SectionProps> = {
  id: string
  blocktype: B | null
} & P

export type HomepageBlock =
  | WithBlocktype<"HomepageHero", HeroProps>
  | WithBlocktype<"AboutHero", AboutHeroProps>
  | WithBlocktype<"Banner", null>
  | WithBlocktype<"Carousel", CustomCarouselProps>
  | WithBlocktype<"MultipleImages", MultipleImagesProps>
