import { TFunction, Trans } from "next-i18next"
import React from "react"
import Button from "react-bootstrap/Button"

interface feedbackProps {
    topicTrans: TFunction
}

const Feedback = ({ topicTrans }: feedbackProps) => {
    return (
        <section
            data-testid={"feedback-sect"}
            className="text-center m-0 p-4 w-100"
            style={{ backgroundColor: "#EAF4FF" }}
        >
            <h1 data-testid={"feedback-title"} className="text-primary fs-2">
                <Trans t={topicTrans} i18nKey="feedback.title" />
            </h1>
            <Button className="bg-secondary text-white border-0 p-2 w-100 mt-4" style={{ maxWidth: "300px" }}>
                <p data-testid={"feedback-button"} className="m-0">
                    <Trans t={topicTrans} i18nKey="feedback.button" />
                </p>
            </Button>
        </section>
    )
}

export default Feedback
