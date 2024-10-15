import React from "react"
import { RiArrowDownSLine } from "react-icons/ri"

// Define the shape of the event data
export interface Event {
    year: number
    title: string
    description: string
    images: string[]
}

// Props for the Timeline component
interface TimelineProps {
    events: Event[]
}

// Timeline Component
export const Timeline: React.FC<TimelineProps> = ({ events }) => {

    const scrollToCustomPosition = (id: string) => {
        setSelected(id)
        isScrolling.current = true // block the listener from triggering while we scroll
        const targetElement = document.getElementById(id)

        if (targetElement) {
            const topPosition = targetElement.getBoundingClientRect().top
            const offset = 2 * scrollOffset // main nav + sticky nav
            window.scrollTo({ top: topPosition + window.pageYOffset + offset, behavior: "smooth" })

            setTimeout(() => {
                isScrolling.current = false
            }, 1500)
        }
    }

    return (
        <div className="timeline">
            {events.map((event, index) => (
                <TimelineEvent key={index} event={event} />
            ))}
        </div>
    )
}

// Props for the TimelineEvent component
interface TimelineEventProps {
    event: Event
}

// Timeline Event Component
const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
    return (
        <div className="timeline-event" id={event.title}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
                <h2>
                    {event.year} | {event.title} <RiArrowDownSLine />
                </h2>
                <p>{event.description}</p>
                <TimelineImages images={event.images} />
            </div>
        </div>
    )
}

// Props for the TimelineImages component
interface TimelineImagesProps {
    images: string[]
}

// Timeline Images Component
const TimelineImages: React.FC<TimelineImagesProps> = ({ images }) => {
    return (
        <div className="timeline-images">
            {images.map((image, index) => (
                <div key={index} className="timeline-image">
                    <img src={image} alt={`Event image ${index + 1}`} />
                </div>
            ))}
        </div>
    )
}
