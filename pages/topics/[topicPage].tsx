import Head from "next/head"
import { getTopicPageIds } from "../../services/staticTopicLoader"
import { GetStaticProps, GetStaticPaths } from "next"
import { Container, Image } from "react-bootstrap"
import { ToggleHeader } from "../../components/toggleHeader"
import TopicDownloadables from "../../components/topic/TopicDownloadables"
import Footer from "../../components/footer"
import { Trans, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"
import PrayerPoints, { PrayerDisplayStyle } from "../../components/common/PrayerPoints"
import CollapseBlock from "../../components/topic/CollapseBlock"
import { PhotosWrapper } from "../../components/GalleryComponents/PhotosWrapper/PhotosWrapper"
import PrayerResponse from "../../components/topic/PrayerResponse"
import { StickyNav, Tab } from "../../components/topic/StickyNav"
import { Event, Timeline } from "../../components/Timeline/Timeline"

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getTopicPageIds()

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }: any) => {
    if (!params) {
        return {
            props: {},
        }
    }

    // const topicId: string = params.topicPage
    const localeRef: string = "topics/" + params.topicPage
    return {
        props: {
            localeRef,
            ...(await serverSideTranslations(locale, ["common", "topic-pages", localeRef])),
        },
    }
}

const JsonLink = ({ children = "" }: { children?: string }) => {
    const url = children
    const onClick = () => window.open(url, "_blank")
    return (
        <a href={url} onClick={onClick}>
            {url}
        </a>
    )
}

export default function TopicPage({ localeRef }: { localeRef: string }) {
    const { t } = useTranslation(localeRef)
    const { t: topicCommon } = useTranslation("topic-pages")

    // Objects holding translations
    let textContent: string[] = t("textBody", { returnObjects: true })
    textContent = Array.isArray(textContent) ? textContent : []

    let textAsterisk: string[] = t("textBodyAsterisk", { returnObjects: true })
    textAsterisk = Array.isArray(textAsterisk) ? textAsterisk : []

    const navTabs: Tab[] = topicCommon("nav", { returnObjects: true })

    const galleryLabel: string = topicCommon("galleryLabel")
    //const factsLabel: string = topicCommon("factsLabel")
    const galleryClickInstructions: string = topicCommon("galleryClickInstructions")
    const galleryImageText: string = topicCommon("galleryImageText")
    const localeImages: any[] = t("photos", { returnObjects: true })
    const images = Array.isArray(localeImages) && localeImages.length > 0 ? localeImages : null
    const timeline: string = t("timeline")
    const galleryType: string = t("galleryType")
    const blockOrder: number[] = t("blockOrder", { returnObjects: true })
    const uncropped: any[] = t("uncroppedPhotos", { returnObjects: true })

    const heroPhoto: string = t("heroPhoto")
    const heroFocus: string = t("heroFocus")

    const events: Event[] = [
        {
            year: 1500,
            title: 'Title of Era',
            description: '',
            images: [],
        },
        {
            year: 1550,
            title: 'Title of event',
            description: "“Can I ask what you believe in?” Carlos asked his Japanese friend Takeshi after watching him pray at the Shinto shrine. It’s hard to explain,” Takeshi replied slowly. “It’s been part of my life since I was young.”",
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
        },
        {
            year: 1570,
            title: 'Title of event',
            description: "“Can I ask what you believe in?” Carlos asked his Japanese friend Takeshi after watching him pray at the Shinto shrine. It’s hard to explain,” Takeshi replied slowly. “It’s been part of my life since I was young.”",
            images: ['image4.jpg'],
        },
    ];
    return (
        <>
            <Head>
                <title>{t("title")}</title>
                <meta name="description" content="Japan prayer guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* Header Component */}
                <ToggleHeader hideShadow={true} />

                {/* Component to Hold image, as well as title and Prayer Summary */}
                <div className="w-100 mx-0 px-0 position-relative hero-section">
                    <Image
                        src={heroPhoto}
                        alt="topic hero image"
                        className="hero-photo"
                        style={{ objectPosition: heroFocus }}
                    />
                    <Container className="d-flex flex-column align-items-start justify-content-end h-100 py-5 px-0">
                        <h1 className="text-white px-3 hero-title">{t("title")}</h1>
                        <PrayerPoints topicTrans={t} displayStyle={PrayerDisplayStyle.TopicTop} />
                    </Container>
                </div>

                {/* Topic Nav Component */}
                <StickyNav tabs={navTabs} />

                <Container className="main-section-container">
                    {/* Placeholder for a quote */}
                    <Container
                        id="about-topic"
                        className="d-flex flex-column justify-content-center align-items-center py-4 mt-4"
                    >
                        <p className="text-primary-blue quote text-center">
                            <Trans t={t} i18nKey="quote.content" />
                        </p>
                        <p className="text-primary-blue fs-5 text-center">
                            <Trans t={t} i18nKey="quote.source" />
                        </p>
                    </Container>

                    {/* Placeholder text */}
                    <Container className="main-content mt-4">
                        {textContent.map((text: string, idx: number) => (
                            <p key={idx + text}>
                                <Trans components={{ url: <JsonLink /> }}> {text} </Trans>
                            </p>
                        ))}
                    </Container>
                    <Container className="fs-5">
                        {textAsterisk.map((text: string, idx: number) => (
                            <p key={idx + text}>
                                <Trans components={{ url: <JsonLink /> }}> {text} </Trans>
                            </p>
                        ))}
                    </Container>

                    {/* Images */}
                    {images && (
                        <CollapseBlock title={galleryLabel} startOpened={true} galleryType={galleryType}>
                            <PhotosWrapper
                                images={images}
                                type={galleryType}
                                blocks={blockOrder}
                                subTitle={galleryClickInstructions}
                                galleryTitle={galleryLabel}
                                imageText={galleryImageText}
                                uncropped={uncropped}
                            />
                        </CollapseBlock>
                    )}

                    {/* Infographics Placeholder */}
                    {/* <CollapseBlock title={factsLabel} startOpened={true} galleryType={galleryType}>
                        <Container>
                            <div id="placeholder-image" className="w-100 my-3">
                                Infographics Placeholder
                            </div>
                            <div id="placeholder-image" className="w-100 my-5">
                                Placeholder
                            </div>
                        </Container>
                    </CollapseBlock> */}
                    <Container className="bottom-spacing">
                        <hr />
                    </Container>
                </Container>
                {/* Timeline */}
                <Container fluid className="timeline-container">
                    <Container className="main-section-container">
                        {timeline && (
                            <Timeline events={events} />
                        )}
                    </Container>
                </Container>

                <Container fluid className="bg-grey-2 px-0">
                    <Container className="main-section-container px-0">
                        {/* Responding in Prayer */}
                        <PrayerResponse topicTrans={t} />
                    </Container>
                </Container>

                <Container className="main-section-container px-0">
                    {/* Downloads and Related */}
                    <TopicDownloadables topicTrans={t} />
                    {/* <RelatedContent topicTrans={t} /> */}
                </Container>
                {/* Footer */}
                <Footer />
            </main>
        </>
    )
}
