import React from "react"
import Carousel from "nuka-carousel"
import styled from "styled-components"
import Arrows from "./Arrows"

function Imagery({ images, setCurrentSlide, currentSlide, photoCount }) {
  return (
    <Container>
      <Carousel
        id="carousel"
        slidesPerPage={1}
        width="100%"
        withoutControls
        swiping={false}
        dragging={false}
        afterSlide={(index) => setCurrentSlide(index)}
        slideIndex={currentSlide}
        disableAnimation
        disableEdgeSwiping
      >
        {images.map((image, index) =>
          image.url.includes("vimeo") ? (
            <Video
              style={{
                position: "relative",
                backgroundColor: image.color,
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <iframe
                src={
                  image.url +
                  "?autoplay=1&loop=1&autopause=0&muted=1&background=1"
                }
                frameborder="0"
                allow="autoplay; fullscreen; autoplay; loop; picture-in-picture; clipboard-write"
                controls="false"
                style={{
                  position: "absolute",
                  top: -1,
                  bottom: -1,
                  right: 0,
                  left: ((image.width - 100) * -1) / 2 + "%",
                  width: image.width + "%",
                  height: "100%",
                }}
              ></iframe>
            </Video>
          ) : (
            <Image key={index} {...image} />
          )
        )}
        <script src="https://player.vimeo.com/api/player.js"></script>
      </Carousel>
      <Arrows
        next={() => {
          setCurrentSlide((current) => {
            if (current === photoCount) {
              return 1
            } else {
              return current + 1
            }
          })
        }}
        previous={() => {
          setCurrentSlide((current) => {
            if (current === 0) {
              return photoCount
            } else {
              return current - 1
            }
          })
        }}
      />
    </Container>
  )
}

// const ImageSlide = ({ url, cover, index }) =>  <Image cover={cover} url={url} ></Image>;

const Container = styled.div`
  height: 100vh
  width: 100%;
`

const Image = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ color }) => color || "black"};
  background-image: ${({ url }) => `url(${require(`../images/${url}`)})`};
  background-size: ${({ cover, height, width }) =>
    cover ? "cover" : height ? `auto ${height}` : `${width} auto`};
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 800px) {
    height: 520px;
    background-size: ${({ cover, height, width }) =>
      cover ? "cover" : height ? "auto 90%" : "90% auto"};
  }
  @media (max-width: 500px) {
    height: 380px;
  }
`

const Video = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  @media (max-width: 800px) {
    height: 520px;
  }
  @media (max-width: 500px) {
    height: 380px;
  }
`

export default Imagery
