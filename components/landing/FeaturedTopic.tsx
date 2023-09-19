import React from "react"
import { Container, Card } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useTranslation } from "next-i18next"
import { Image } from "react-bootstrap"
import { useRouter } from "next/router"

interface Props {
  title: string
  prayerPoints: string[]
  featuredImg?: string
}

export default function FeaturedTopic({ title, prayerPoints, featuredImg }: Props) {
  const { t, i18n } = useTranslation("common")
  const router = useRouter()

  const subtitle: string = t("prayerSummary.subtitle")
  const read: string = t("prayerSummary.readMore")
  const view: string = t("prayerSummary.viewAll")

  return (
    <Container className="d-flex justify-content-center featured-topic-container">
      <Card className="my-4 shadow d-md-flex flex-md-row">
        {/* temporary height for image, before we finalize images */}
        <Card.Img variant="top" src={featuredImg} className="home-feature-img" />
        <Card.Body className="p-4 featured-topic-card">
          <Card.Text className="featuredTopicTitle px-2 pb-2 fs-2 border-bottom border-grey">{title}</Card.Text>
          <Card.Text className="fs-3 featuredTopicSubtitle d-flex align-items-center gap-2 text-secondary-5">
            {/* TODO: Icon still a little weird, come back to this later */}
            {/* <IconContext.Provider value={{ size: "20px" }}>
              <FaPrayingHands></FaPrayingHands>
            </IconContext.Provider> */}
            <Image alt="praying hands" src="/icons/prayer.png" style={{ height: "20px" }} />
            {subtitle}
          </Card.Text>
          <ul className="bullet-points">
            {prayerPoints.map((point: string, idx: number) => (
              <li key={idx + point} className="my-2 bullet-point">
                {point}
              </li>
            ))}
          </ul>
          <Button
            className="feature-button fs-4 fw-bold bg-grey-4 text-white text-center border-0 mt-3 mb-2 w-100"
            variant="primary"
          >
            {read}
          </Button>
          <Card.Text
            className="mt-3 w-100 mx-auto text-center text-decoration-underline text-secondary-5 fw-bold fs-4 feature-view-all"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("topics/all", "topics/all", { locale: i18n.language })}
          >
            {view}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}
