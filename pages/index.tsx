import Head from "next/head"
import { ToggleHeader } from "../components/toggleHeader"
import { Button, Carousel, CarouselItem, Col, Container, Image, Row } from "react-bootstrap"
import { useTranslation, Trans } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getSchedule, getFeaturedTopic } from "../services/featuredTopicSelector"
import Footer from "../components/footer"
import FeaturedTopic from "../components/landing/FeaturedTopic"
import { IconContext } from "react-icons"
import { RiMic2Fill, RiSlideshowLine, RiDonutChartFill, RiImageFill, RiFile3Line } from "react-icons/ri"
import { FaPrayingHands } from "react-icons/fa"
import DownloadLinkCard from "../components/landing/DownloadLinkCard"
import { ReactNode } from "react"
import Link from "next/link"
import OrderBook from "../components/common/OrderBook"

export const getStaticProps = async ({ locale }: { locale: string }) => {
  // schedule is from featured-topics.json
  const featuredTopicRef: string = "topics/" + getFeaturedTopic(getSchedule())

  return {
    props: {
      featuredTopicRef,
      ...(await serverSideTranslations(locale, ["common", "home", featuredTopicRef])),
      // Will be passed to the page component as props
    },
  }
}

export interface OrderRegionType {
  text: string
  url: string
}

const Home = ({ featuredTopicRef }: { featuredTopicRef: string }) => {
  const { t: commonTranslation, i18n } = useTranslation("common")
  const { t: homePageTranslation } = useTranslation("home")
  const { t: featuredTranslation } = useTranslation(featuredTopicRef)

  const webpageTitle: string = homePageTranslation("webpageTitle")
  const heroHeading: string = homePageTranslation("heroHeading")
  const heroSubheading: string = homePageTranslation("heroSubheading")
  const heroViewTopicsBtn: string = homePageTranslation("titleButton")

  const introText2Subheading: string = homePageTranslation("introText2Subheading")

  const bibleVerse: string = homePageTranslation("bibleVerse")
  const bibleRef: string = homePageTranslation("bibleRef")

  const introText2b: string = homePageTranslation("introText2b")
  const callToAction: string = homePageTranslation("introText2bCallToAction")

  const featuredTopicTitle: string = homePageTranslation("featuredTopicTitle")

  const purchaseTitle: string = homePageTranslation("purchaseTitle")
  const purchasePreview: string = homePageTranslation("purchasePreview")

  const orderTitle: string = commonTranslation("order.title")
  const orderBlurb: string = commonTranslation("order.blurb")
  const orderRegions: OrderRegionType[] = commonTranslation("order.regions", { returnObjects: true })
  const orderEBook: string = commonTranslation("order.prompt")
  const orderJapan: string = commonTranslation("order.japan")
  const orderWarning: string = commonTranslation("order.warning")
  const orderBooklet: string = commonTranslation("order.form")

  const downloadTitle: string = homePageTranslation("downloadTitle")
  const downloadBlurb: string = homePageTranslation("downloadBlurb")
  const downloadList: string[] = homePageTranslation("downloadList", { returnObjects: true })
  const comingSoon: string = homePageTranslation("comingSoon")

  const prayerPoints: string[] = featuredTranslation("prayerSummary", { returnObjects: true })
  const prayerTitle: string = featuredTranslation("title")

  const learnMoreAbout: string = homePageTranslation("learnMoreAbout")

  const iconList: ReactNode[] = [
    <RiDonutChartFill key={0} />,
    <RiFile3Line key={1} />,
    <RiImageFill key={2} />,
    <FaPrayingHands key={3} />,
    <RiMic2Fill key={4} />,
    <RiSlideshowLine key={5} />,
  ]

  return (
    <div>
      <Head>
        <title>{webpageTitle}</title>
        <meta name="description" content="Japan prayer guide" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="home">
        <ToggleHeader />

        {/* Hero banner section */}
        <div id="heroBannerSection" className="w-100 bg-secondary position-relative text-center">
          <Image alt="home page hero" src="/photos/home/hp_hero.png" className="home-hero" />
          <div className="home-hero-text-group d-flex flex-column align-items-start justify-content-center px-lg-5 px-md-4 px-3 position-absolute w-100">
            <Container className="d-flex flex-column align-items-start w-100">
              <h2 className="text-white">{heroSubheading}</h2>
              <h1 className="text-white">{heroHeading}</h1>
              <Button href="/topics/all" className="text-white my-3 bg-secondary-5 border-secondary-5">
                {heroViewTopicsBtn}
              </Button>
            </Container>
          </div>
        </div>

        {/* Main blurb */}
        <Container fluid id="mainBlurbSection" className="py-1 home-main-blurb d-flex align-items-center">
          <p className="px-3 text-primary py-4 py-md-5 mb-0">
            <Trans t={homePageTranslation} i18nKey="introText1" components={{ bold: <b /> }} />
          </p>
        </Container>

        {/* Bible Verse */}
        <Container className="home-verse-container d-flex flex-column w-100 mx-0 px-0">
          <div className="d-flex flex-column w-100 bg-grey-7 px-4 py-4">
            <h2 className="w-100 text-white text-center mt-5">{bibleVerse}</h2>
            <h3 className="w-100 text-white mt-3 pb-4 text-center">{bibleRef}</h3>
          </div>
        </Container>

        {/* Invitation to prayer */}
        <div className="home-invitation d-flex flex-column align-items-center position-relative w-100">
          <div className="home-invite-inner mb-0 mb-md-5">
            <Carousel
              controls={true}
              fade={true}
              interval={3000}
              className="w-100 d-flex flex-column justify-content-center align-items-center mt-5"
            >
              <CarouselItem className="w-100 d-flex justify-content-center">
                <Image className="home-carousel-image" alt="hero image 1" src="/photos/home/hp_slider-1.png" />
              </CarouselItem>
              <CarouselItem className="w-100 d-flex justify-content-center">
                <Image className="home-carousel-image" alt="hero image 2" src="/photos/home/hp_slider-2.png" />
              </CarouselItem>
              <CarouselItem className="w-100 d-flex justify-content-center">
                <Image className="home-carousel-image" alt="hero image 3" src="/photos/home/hp_slider-3.png" />
              </CarouselItem>
            </Carousel>
          </div>
        </div>

        <Container className="home-call-to-action d-flex flex-column align-items-center justify-content-center px-4 mb-5">
          <h1 className="text-center mt-5">{introText2Subheading}</h1>
          <p className="mt-4">
            <Trans t={homePageTranslation} i18nKey="introText2a" components={{ italic: <i /> }} />
          </p>
          <p className="w-100 mt-3">
            {introText2b} <strong>{callToAction}</strong>
          </p>
        </Container>

        {/* Featured topic */}
        <Container fluid id="featuredTopicSection" className="py-5 bg-secondary-2">
          <Container className="d-flex flex-column align-items-center justify-content-center">
            <h3>{featuredTopicTitle}</h3>
          </Container>
          <FeaturedTopic
            featuredImg="/photos/topic-nav/church/church-leadership.png"
            title={prayerTitle}
            prayerPoints={prayerPoints}
          />
        </Container>

        {/* Purchase snippet */}
        <Container className="home-purchase-section py-3 py-md-5 px-2 d-flex align-items-center justify-content-center flex-column flex-md-row">
          <Image alt="book-cover" src="/photos/home/hp_cover.png" className="mt-3 mx-3 shadow" />
          <div className="w-100 align-items-center align-items-md-start d-flex flex-column purchase-text-container mx-2 me-md-5 ms-md-2">
            <h1 className="mt-5 mb-0">{purchaseTitle}</h1>
            <p className="my-3 px-3 px-md-0">
              <Trans t={homePageTranslation} i18nKey="purchaseBlurb" components={{ italic: <i /> }} />
            </p>
            <Link href={"/purchase"} locale={i18n.language} className="text-secondary-5 mb-2 mb-md-5">
              {purchasePreview}
            </Link>
          </div>
        </Container>

        {/* Order snippet */}
        <OrderBook
          title={orderTitle}
          blurb={orderBlurb}
          orderRegionsMap={orderRegions}
          orderPrompt={orderEBook}
          orderJapan={orderJapan}
          orderWarning={orderWarning}
          orderBooklet={orderBooklet}
          language={i18n.language}
        />

        {/* Downloads snippet */}
        <div
          className="bg-secondary-2 w-100 d-flex align-items-center flex-column justify-content-center p-4"
          style={{ height: "auto" }}
        >
          {/* Placeholder for future image */}
          {/* <div
            className="mt-3"
            style={{ backgroundColor: "#BCC3CF", width: "100%", maxWidth: "442px", aspectRatio: 1.8 }}
          ></div> */}
          <h1 className="mt-4 w-100 text-center home-common-h1">{downloadTitle}</h1>
          <h2 className="fw-normal w-100 text-center home-common-blurb my-2">{downloadBlurb}</h2>
          <Container className="d-none d-xl-block">
            <IconContext.Provider value={{ size: "30px" }}>
              <Row xl={6} className="w-100 my-4">
                {downloadList.map((downloadText, idx) => (
                  <Col key={idx + downloadText}>
                    <DownloadLinkCard downloadText={downloadText}>{iconList[idx]}</DownloadLinkCard>
                  </Col>
                ))}
              </Row>
            </IconContext.Provider>
          </Container>

          <Button className="coming-soon-button bg-grey-4 text-white px-3 text-center border-0 mt-3 mb-3 w-100">
            {comingSoon}
          </Button>
        </div>

        {/* Beneath the Surface initiative - About snippet */}
        <div className="w-100 bg-grey-7 p-3 p-md-5 d-flex flex-column align-items-center">
          <div className="d-flex gap-3 align-items-center justify-content-center w-100 mt-2">
            <Image alt="BTS Crane" src={`/photos/home/hp_crane.png`} className="home-logo-crane" />
            <Image alt="BTS Logo" src={`/photos/home/hp_logo_${i18n.language}.png`} className="home-logo-text" />
          </div>
          <div className="home-common-blurb text-center text-white my-3 w-100">
            <Trans t={homePageTranslation} i18nKey="learnBlurb" components={{ italic: <i /> }} />
          </div>
          <Button className="fs-5 text-nowrap border-white px-4 py-2 text-white text-center bg-grey-7 mt-2 mb-4">
            {learnMoreAbout}
          </Button>
        </div>

        <Footer />
      </main>
    </div>
  )
}

export default Home
