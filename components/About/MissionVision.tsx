import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import BibleVerse from "./BibleVerse";
import { useTranslation } from "next-i18next";

const MissionVision: React.FC = () => {
    const { t } = useTranslation("about");
    const missionStatements: string[] = t("mission.content", { returnObjects: true });
    const visionStatements: string[] = t("vision.content", { returnObjects: true });

    return (
        <section id="mission-vision-section" className="position-relative">
            <Container id="mission-vision" className="py-5">
                <div id="about-landing-image" className="w-100 p-3">
                    temporary image placeholder
                </div>
                <Container className="d-flex flex-wrap justify-content-center align-items-center p-4">
                    <Row md={2} sm={1}>
                        <Container>
                            <h4>{t("mission.title")}</h4>
                            {missionStatements.map((text: string) => (
                                <p key={text} className="fs-6">
                                    {text}
                                </p>
                            ))}
                        </Container>
                        <Container>
                            <h4>{t("vision.title")}</h4>
                            {visionStatements.map((text: string) => (
                                <p key={text} className="fs-6">
                                    {text}
                                </p>
                            ))}
                        </Container>
                    </Row>
                </Container>
                <BibleVerse verse={t("bible.content")} chapter={t("bible.title")} />
            </Container>
        </section>
    );
};

export default MissionVision;
