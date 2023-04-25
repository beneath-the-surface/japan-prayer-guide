import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type TeamDetails = {
    title: string;
    number: number;
    subtext: string;
};

const MeetOurTeam: React.FC = () => {
    const { t } = useTranslation("about");
    const contentArray: TeamDetails[] = [
        t("team.content1", { returnObjects: true }),
        t("team.content2", { returnObjects: true }),
        t("team.content3", { returnObjects: true }),
    ];

    return (
        <section className="p-0 text-center">
            <Container id="team-container" data-testid="meet-our-team">
                <div id="team-image">temporary image placeholder</div>
                <h4>{t("team.title")}</h4>
                <Row md={3} sm={1} xs={1} className="w-100 m-0 pt-4 pb-5">
                    {contentArray.map((teamDetails: TeamDetails) => (
                        <Col key={teamDetails.title} className="p-2">
                            <div className="team-box p-3">
                                <p className="fs-6 fw-bold">{teamDetails.title}</p>
                                <h1>{teamDetails.number}</h1>
                                <p className="fs-6">{teamDetails.subtext}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default MeetOurTeam;