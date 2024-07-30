import Head from "next/head"
import React from "react"
import { ToggleHeader } from "../components/ToggleHeader"
import { Button, Container } from "react-bootstrap"
import { TFunction, Trans, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Footer from "../components/Footer"
import Link from "next/link"
import resources from "../public/locales/en/resources.json"
import { LowHighImage } from "../components/LowHighImage"
import Image from "next/image"
import ImageWithContentFlexCol from "../components/resources/ImageWithContentFlexCol/ImageWithContentFlexCol"

import bannerHeroHighRes from "../public/photos/about/about_hero.jpg"
import bannerHeroLowRes from "../public/photos/about/about_hero_LowRes.jpg"
import byMediaType from "../public/photos/about/about_02.png"
import byTopic from "../public/photos/about/about_03.png"
import tutImg1 from "../public/photos/about/about_02.png"
import tutImg2 from "../public/photos/about/about_03.png"
import tutImg3 from "../public/photos/about/about_02.png"
import NextImage from "../components/common/NextImage/NextImage"
import TopicDownloadables from "../components/topic/TopicDownloadables/TopicDownloadables"
import DownloadablesGrid from "../components/common/DownloadablesGrid/DownloadablesGrid"

export const getStaticProps = async ({ locale }: { locale: string }) => {
    const isPageReady: boolean = resources.enabled

    return {
        props: {
            isPageReady,
            ...(await serverSideTranslations(locale, ["resources", "common"])),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
    }
}

const Downloads = ({ isPageReady }: { isPageReady: boolean }) => {
    const { t } = useTranslation("resources")

    return (
        <div>
            <Head>
                <title>{t("webpageTitle")}</title>
                <meta name="description" content="Japan prayer guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main id="resources">
                <ToggleHeader />

                {isPageReady ? <Resources t={t} /> : <PageNotReady t={t} />}
                <Footer />
            </main>
        </div>
    )
}

function LinkFromJson({ href, children }: { href: string; children?: React.ReactNode }) {
    return (
        <Link className="fst-normal" href={href || ""}>
            {children}
        </Link>
    )
}

const Resources: React.FC<{ t: TFunction }> = ({ t }) => {
    const heroHeader: string = t("heroHeader")
    const heroSubtitle: string[] = t("heroSubtitle", { returnObjects: true })
    const copyrightText: string = t("copyrightText")

    const infographicsUrl = t("byMediaUrls.infographicsUrl", "")
    const photographyUrl = t("byMediaUrls.photographyUrl", "")
    const pdfUrl = t("byMediaUrls.pdfUrl", "")
    const prayerPtsUrl = t("byMediaUrls.prayerPtsUrl", "")
    const prayerVidUrl = t("byMediaUrls.prayerVidUrl", "")
    const slidesUrl = t("byMediaUrls.slidesUrl", "")

    const downloadSectionTitle: string = t("downloadSectionTitle")
    const downloadBlurb: string = t("downloadBlurb")

    const bookletImgAltText: string = t("bookletImgAlt", "background picture of calm waves")

    return (
        <>
            {/* Hero Section */}
            <div
                id="resources-banner"
                className="w-100 mx-0 d-flex align-items-center justify-content-center flex-column position-relative"
                style={{ marginTop: "60px" }}
            >
                <LowHighImage
                    alt="about hero image"
                    highSrc={bannerHeroHighRes}
                    src={bannerHeroLowRes}
                    className="position-absolute top-0"
                    isMainImage={true}
                />

                <h1 className="px-4 px-md-5 px-lg-4 text-white text-center w-100">
                    <Trans>{heroHeader}</Trans>
                </h1>
                {heroSubtitle.map((text, idx) => (
                    <p key={text + idx} className="px-4 px-md-5 px-lg-4 text-white text-center w-75">
                        <Trans>{text}</Trans>
                    </p>
                ))}

                <p className="px-4 px-md-5 px-lg-4 text-grey-6 text-center fst-italic w-100">
                    <Trans components={[<LinkFromJson key={copyrightText.substring(0, 5)} href="/"></LinkFromJson>]}>
                        {copyrightText}
                    </Trans>
                </p>
            </div>

            {/* 'Download by' section */}
            <div id="downloadBy" className="w-100 pb-4 pb-md-5 pt-5 d-flex align-items-center flex-column px-4 px-md-4">
                <Container className="d-flex flex-row">
                    <ImageWithContentFlexCol
                        src={byMediaType}
                        imgAltKey="byMediaTypeAltText"
                        headingClass="fs-1"
                        headingKey="byMediaTypeHeading"
                        descriptionArrayKey="byMediaTypeDescriptions"
                    >
                        <p className="px-4 px-md-5 px-lg-4 text-center w-100">
                            <Trans t={t} i18nKey="mediaTypesDisclaimer" />
                        </p>
                        <DownloadablesGrid
                            infographicsUrl={infographicsUrl}
                            photographyUrl={photographyUrl}
                            pdfUrl={pdfUrl}
                            prayerPtsUrl={prayerPtsUrl}
                            prayerVidUrl={prayerVidUrl}
                            slidesUrl={slidesUrl}
                        />

                        <p className="px-4 px-md-5 px-lg-4 text-center w-100">
                            <Trans
                                t={t}
                                i18nKey="switchLanguage"
                                components={[<LinkFromJson key="switchLang" href="/"></LinkFromJson>]}
                            />
                        </p>
                    </ImageWithContentFlexCol>
                    <ImageWithContentFlexCol
                        src={byTopic}
                        imgAltKey="byTopicAltText"
                        headingClass="fs-1"
                        headingKey="byTopicHeading"
                        descriptionArrayKey="byTopicDescriptions"
                    >
                        <div className="d-inline-flex">
                            <Link
                                className="text-white my-3 bg-secondary-5 border-secondary-5 btn btn-primary"
                                href="/"
                            >
                                <Trans t={t} i18nKey="byTopicBtn" />
                            </Link>
                        </div>
                    </ImageWithContentFlexCol>
                </Container>
            </div>

            {/* 'How to' section */}
            <div className="bg-secondary-2 w-100 pb-4 pb-md-5 pt-5 d-flex align-items-center flex-column px-4 px-md-4">
                <Container className="align-items-center">
                    <h1 className="mt-2 mb-4 pb-2 text-primary about-h1-header text-center">
                        <Trans>{downloadSectionTitle}</Trans>
                    </h1>
                    <p className="common-p text-center about-body-text">
                        <Trans>{downloadBlurb}</Trans>
                    </p>

                    <Container id="tutorial" className="d-flex flex-column flex-md-row">
                        <ImageWithContentFlexCol
                            src={tutImg1}
                            imgAltKey="tut1AltText"
                            headingClass="fs-2"
                            headingKey="tut1Heading"
                            descriptionArrayKey="tut1Descriptions"
                        />
                        <ImageWithContentFlexCol
                            src={tutImg2}
                            imgAltKey="tut2AltText"
                            headingClass="fs-2"
                            headingKey="tut2Heading"
                            descriptionArrayKey="tut2Descriptions"
                        />
                        <ImageWithContentFlexCol
                            src={tutImg3}
                            imgAltKey="tut3AltText"
                            headingClass="fs-2"
                            headingKey="tut3Heading"
                            descriptionArrayKey="tut3Descriptions"
                        />
                    </Container>
                </Container>
            </div>

            {/* Booklet banner section */}
            <div className="w-100 mx-0 d-flex align-items-center justify-content-center flex-column position-relative">
                <NextImage src={bannerHeroLowRes} alt={bookletImgAltText} className="booklet-banner"></NextImage>
            </div>
        </>
    )
}

const PageNotReady: React.FC<{ t: TFunction }> = ({ t }) => {
    return (
        <Container className="w-100 d-flex flex-column align-items-center justify-content-center gap-4 sorryContainer text-center">
            <Image alt={"We're sorry"} src="/sorry.png" height="150" />
            <div className="text-center sorryTitle">
                <Trans t={t} i18nKey="title" />
            </div>
            <div className="text-center sorryMsg">
                <Trans t={t} i18nKey="message" />
            </div>
            <Link href={"/"}>
                <Button className="text-secondary-5 border-secondary-5 bg-white">
                    <Trans t={t} i18nKey="back" />
                </Button>
            </Link>
        </Container>
    )
}

export default Downloads
