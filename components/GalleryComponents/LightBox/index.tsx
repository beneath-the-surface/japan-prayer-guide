import React from "react"
import { Left, Cross, LeftArrow, RightArrow } from "../../icons"
import { Image } from "react-bootstrap"

interface LightBoxProps {
    index: number
    setImage: React.Dispatch<React.SetStateAction<number>>
    images: {
        src: string
        title: string
    }[]
    setGallery: React.Dispatch<React.SetStateAction<boolean>>
    setLightBox: React.Dispatch<React.SetStateAction<boolean>>
    lightBox: boolean
}

const LightBox = ({ index, setImage, images, lightBox, setLightBox, setGallery }: LightBoxProps) => {
    const handleSwitch = (type: string) => {
        if (type === "inc" && index + 1 !== images.length) {
            setImage(index + 1)
        }
        if (type === "dec" && index !== 0) {
            setImage(index - 1)
        }
    }

    const handleClose = () => {
        setGallery(false)
        setLightBox(!lightBox)
    }

    return (
        <div className="lightbox">
            <div className="lightbox-container">
                <div className="lightbox-header">
                    <span onClick={() => setLightBox(!lightBox)} className="headLeft">
                        <span style={{ marginTop: "6px" }}>
                            <Left />
                        </span>
                    </span>
                    <span>
                        {index + 1}/{images.length}
                    </span>
                    <span onClick={handleClose} className="headRight">
                        <Cross />
                    </span>
                </div>
                <div className="lightbox-body">
                    <div className="lightbox-auto lightbox-leftArrow">
                        {index !== 0 && (
                            <span className="lightbox-arrow" onClick={() => handleSwitch("dec")}>
                                <LeftArrow />
                            </span>
                        )}
                    </div>
                    <div className="lightbox-box">
                        <Image src={images[index].src} alt="light box" />
                        <h1>{images[index].title}</h1>
                    </div>
                    <div className="lightbox-auto lightbox-rightArrow">
                        {index + 1 !== images.length && (
                            <span className="lightbox-arrow" onClick={() => handleSwitch("inc")}>
                                <RightArrow />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LightBox