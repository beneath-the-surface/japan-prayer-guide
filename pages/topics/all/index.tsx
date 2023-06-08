import Head from "next/head";
import { ToggleHeader } from "../../../components/toggleHeader";
import { useTranslation } from "next-i18next";
import { Container } from "react-bootstrap";
import { OverviewNav } from "../../../components/overview/OverviewNav";
import React from "react";
import Footer from "../../../components/footer";
import { TopicOverviewSection } from "../../../components/overview/TopicOverviewSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["overview", "common"])),
            // Will be passed to the page component as props
            // About used in content, common used in header
        },
    };
}

export default function Overview() {

    const { t } = useTranslation("overview")
    
    // States
    const [selected, setSelected] = React.useState<string>("culture");

    const cultureTopics:string[] = t("cultureTopics", { returnObjects: true })
    const churchTopics:string[] = t("churchTopics", { returnObjects: true })

    const title1 = t("culture")
    const title2 = t("church")

    return (
        <>
            <Head>
                <title>{t("pageTitle")}</title>
                <meta name="description" content="Japan prayer guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {/* Header component */}
                <ToggleHeader/>

                {/* Placeholder for landing image */}
                <div id="placeholder-image" className="w-100 mx-0 px-0 position-relative" style={{ height: "470px" }}>
                    temporary image placeholder
                    <Container className="d-flex flex-column align-items-center justify-content-start h-100 py-5">
                        <h1 className="fs-1 text-white px-3 mt-5">{t("pageTitle")}</h1>
                        <p className="fs-5 text-white text-center" style={{maxWidth: '400px'}}>
                            {t("pageSubtitle")}
                        </p>
                    </Container>
                </div>

                {/* Overview Nav Component */}
                <OverviewNav selected={selected} setSelected={setSelected}/>

                {/* Culture and Society Section */}
                <TopicOverviewSection title={title1} section={"culture"} links={cultureTopics}/>

                {/* Church and Missions Section */}
                <TopicOverviewSection title={title2} section={"church"} links={churchTopics}/>

                <Footer/>
            </main>
        </>
    )
}