import { useRouter } from "next/router"
import Hero from "@/components/sections/hero"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import CTAbanner from "@/components/sections/cta-banner"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"
import Partners from "./sections/Partners/Partners"
import Article from "./elements/Article/Article"
import BannerCarousel from "./sections/BannerCarousel/BannerCarousel"

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsBannerCarousel: BannerCarousel,
  ComponentSectionsLargeVideo: LargeVideo,
  ComponentSectionsFeatureColumnsGroup: FeatureColumnsGroup,
  ComponentSectionsFeatureRowsGroup: FeatureRowsGroup,
  ComponentSectionsBottomActions: CTAbanner,
  ComponentSectionsTestimonialsGroup: TestimonialsGroup,
  ComponentSectionsRichText: RichText,
  ComponentSectionsPricing: Pricing,
  ComponentSectionsLeadForm: LeadForm,
  ComponentSectionsPartners: Partners,
  ComponentSectionsArticle: Article,
}

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__typename]

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent data={sectionData} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__typename}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
