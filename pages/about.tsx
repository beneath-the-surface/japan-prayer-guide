import Head from "next/head";
import React from "react";
import { ToggleHeader } from "../components/toggleHeader";
import { Container } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "../components/footer"
import MissionVision from "../components/About/MissionVision";
import WhyTheName from "../components/About/WhyTheName";
import MeetOurTeam from "../components/About/MeetOurTeam";
import Partners from "../components/About/Partners";
import { useWindowSize } from "../components/helper";

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about", "common"])),
      // Will be passed to the page component as props
      // About used in content, common used in header
    },
  };
}

const About: React.FC = () => {
  const { t } = useTranslation("about");

  const {width, height} = useWindowSize()

  return (
    <div>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="Japan prayer guide" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ToggleHeader />
        <div id="about-landing-image" className="w-100 mx-0 px-0">
            temporary image placeholder
        </div>
        <Container id="who-are-we" className="text-center">
            <h1>{t("content.who.title")}</h1>
            <p className="py-3">{t("content.who.content")[0]}</p>
        </Container>
        <MissionVision/>
        <WhyTheName/>
        <MeetOurTeam/>
        <Partners/>
        <Footer/>
      </main>
    </div>
  );
}

export default About