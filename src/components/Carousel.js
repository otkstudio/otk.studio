import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components';
import Arrows from './Arrows';

function Imagery({ images, setCurrentSlide, currentSlide }) {
  return (
    <Container>
      <Carousel
        id="carousel"
        slidesPerPage={1}
        width="100%"
        withoutControls
        swiping={false}
        dragging={false}
        afterSlide={index => setCurrentSlide(index)}
        slideIndex={currentSlide}
        disableAnimation
        disableEdgeSwiping
      >
        {
          images.map((image, index) => <Image key={index} {...image} />)
        }
      </Carousel>
      <Arrows next={() => setCurrentSlide(current => current + 1)} previous={() => setCurrentSlide(current => current - 1)} />
    </Container>
  );
}

// const ImageSlide = ({ url, cover, index }) =>  <Image cover={cover} url={url} ></Image>;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Image = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ color }) => color || 'black'};
  background-image: ${({ url }) => `url(${require(`../images/${url}`)})`};
  background-size: ${({ cover, height, width }) => cover ? "cover" : height ? `auto ${height}` : `${width} auto`};
  background-repeat: no-repeat;
  background-position: center;
  @media(max-width: 800px) {
    height: 520px;
    background-size: ${({ cover, height, width }) => cover ? "cover" : height ? "auto 90%" : "90% auto"};
  }
  @media(max-width: 500px) {
    height: 380px;
  }
`;

export default Imagery;