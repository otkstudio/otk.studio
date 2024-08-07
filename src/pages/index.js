import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Project from "../components/Project"
import Carousel from "../components/Carousel"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const [projectIsOpen, setProjectIsOpen] = useState(null)
  const [currentProjectHeight, setCurrentProjectHeight] = useState(0)
  const [bioHeight, setBioHeight] = useState(1000)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [images, setImages] = useState(null)
  const [projectBreakPoints, setProjectBreakPoints] = useState(null)
  const [photoCount, setPhotoCount] = useState(null)
  const [viewportWidth, setViewportWidth] = useState(null)
  const [rendered, setRendered] = useState(false)
  const topOfProject = useRef(null)

  // Handle Screen Resize
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setViewportWidth(e.target.innerWidth)
    })
    setTimeout(() => setRendered(true), 600)
  }, [])

  // Prepare Images and their MetaData
  useEffect(() => {
    // const homeImages = [{ url: "la-skate.jpg", cover: true, color: "#333" }]
    const homeImages = [{ url: "studio-2.jpg", cover: true, color: "#333" }]
    const allImages = [...homeImages]
    const breakpoints = [homeImages.length]
    let numberOfPhotos = 0

    edges
      .filter((edge) => !!edge.node.frontmatter.date)
      .map((project, index) => {
        const projectImages = project.node.frontmatter.images
        const length = projectImages.length
        numberOfPhotos = numberOfPhotos + length
        breakpoints.push(breakpoints[index] + length)
        allImages.push(...projectImages)
      })

    setPhotoCount(numberOfPhotos)
    setProjectBreakPoints(breakpoints)
    setImages(allImages)
  }, [edges])

  // Handle Slide Change
  useEffect(() => {
    if (projectBreakPoints && setProjectIsOpen) {
      const arr = projectBreakPoints.map((position, index) => {
        if (position > currentSlide) {
          return index - 1
        } else {
          return null
        }
      })

      const newArr = arr.filter((val) => val !== null)
      if (newArr[0] > -1) {
        setProjectIsOpen(newArr[0])
      } else {
        setProjectIsOpen(null)
      }

      if (topOfProject && currentSlide !== 0) {
        topOfProject.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [
    currentSlide,
    projectBreakPoints,
    setProjectIsOpen,
    projectIsOpen,
    topOfProject,
  ])

  // Measure Bio
  const measuredBio = useCallback(
    (node) => {
      if (node !== null) {
        setTimeout(
          () => setBioHeight(node.getBoundingClientRect().height + 10),
          200
        )
      }
    },
    [viewportWidth]
  )

  return (
    <Layout>
      <SEO title="OTK Studio" />
      <Grid>
        <Navigation rendered={rendered} projectIsOpen={projectIsOpen}>
          <NavItem>Est. 2019</NavItem>
          <NavItem>
            <Link href="mailto:office@otk.studio">Contact</Link>,
            <Link href="https://instagram.com/otk.studio" target="_blank">
              Instagram
            </Link>
          </NavItem>
          <NavItem>Paris—Fr</NavItem>
        </Navigation>

        <Title
          rendered={rendered}
          ref={topOfProject}
          onClick={() => setCurrentSlide(0)}
          projectIsOpen={projectIsOpen}
          viewBox="0 0 1418.634 201.272"
        >
          <path
            d="M103.972,224.336c58.936,0,92.018-41.144,92.018-100.636,0-58.658-33.082-100.636-92.018-100.636-59.77,0-92.3,41.7-92.3,100.636C11.676,188.474,45.036,224.336,103.972,224.336Zm0-21.684c-21.962,0-39.2-7.784-50.04-21.684-7.506-9.73-13.9-30.3-13.9-57.268,0-25.02,5.282-45.592,14.734-58.1,8.34-10.842,25.02-20.85,50.318-20.85,21.962,0,37.53,7.506,47.538,21.962,9.73,13.9,15.012,31.692,15.012,56.99,0,25.02-5.282,43.368-15.012,57.268C142.614,195.424,127.046,202.652,103.972,202.652ZM250.2,221h25.3V48.362h64.774V26.4H185.426V48.362H250.2Zm224.9,0h31.414L424.228,107.02,504.57,26.4H470.932l-92.574,93.686V26.4h-25.3V221h25.3V153.446l27.8-28.078Zm139.278,3.336c37.53,0,78.4-12.788,78.4-60.048,0-41.422-33.082-48.372-71.724-54.488-26.41-4.17-55.878-11.12-55.878-33.082,0-22.8,23.63-32.8,42.534-32.8,31.97,0,51.43,16.68,51.986,45.87l26.132-4.726c-4.17-46.148-37.252-61.994-77.562-61.994-31.692,0-68.944,15.012-68.944,54.766,0,37.252,33.36,47.816,63.662,55.044,29.19,6.95,63.662,6.394,63.662,33.36,0,28.356-24.464,36.974-53.1,36.974-30.024,0-52.82-17.236-52.82-48.372l-26.688,2.78C534.038,202.93,571.568,224.336,614.38,224.336ZM752.546,221h25.3V48.362h64.774V26.4H687.772V48.362h64.774Zm179.588,3.336c49.484,0,76.172-23.908,76.172-67.554V26.4h-25.3V156.782c0,30.858-23.908,45.314-50.874,45.314s-50.6-14.456-50.6-45.314V26.4h-25.3V156.782C856.24,200.428,882.65,224.336,932.134,224.336ZM1028.878,221h66.164c57.824,0,92.3-36.418,92.3-97.3,0-58.38-33.36-97.3-92.3-97.3h-66.164Zm25.02-21.684V48.084h38.364c24.186,0,43.368,7.228,52.82,20.85,9.73,13.9,13.9,29.19,13.9,54.766,0,25.3-4.17,41.144-13.9,55.044-8.9,13.066-27.522,20.572-52.82,20.572ZM1204.018,221h25.3V26.4h-25.3Zm134.274,3.336c58.936,0,92.018-41.144,92.018-100.636,0-58.658-33.082-100.636-92.018-100.636-59.77,0-92.3,41.7-92.3,100.636C1246,188.474,1279.356,224.336,1338.292,224.336Zm0-21.684c-21.962,0-39.2-7.784-50.04-21.684-7.506-9.73-13.9-30.3-13.9-57.268,0-25.02,5.282-45.592,14.734-58.1,8.34-10.842,25.02-20.85,50.318-20.85,21.962,0,37.53,7.506,47.538,21.962,9.73,13.9,15.012,31.692,15.012,56.99,0,25.02-5.282,43.368-15.012,57.268C1376.934,195.424,1361.366,202.652,1338.292,202.652Z"
            transform="translate(-11.676 -23.064)"
          />
        </Title>

        <Images rendered={rendered} id="images">
          {images && (
            <Carousel
              selected={projectIsOpen === null}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              images={images}
              photoCount={photoCount}
            />
          )}
        </Images>

        <Content
          rendered={rendered}
          id="content"
          projectIsOpen={projectIsOpen}
          currentProjectHeight={currentProjectHeight}
          projectLength={
            edges.filter((edge) => !!edge.node.frontmatter.date).length
          }
        >
          {/* <Bio */}
          {/*   ref={measuredBio} */}
          {/*   id="bio" */}
          {/*   projectIsOpen={projectIsOpen} */}
          {/*   bioHeight={bioHeight} */}
          {/* > */}
          {/*   &#8195;&#8195;<SeoH1>OTK Studio</SeoH1> is a design & engineering */}
          {/*   office, developing software products and brands. */}
          {/*   <br /> */}
          {/*   <br /> */}
          {/*   We deliver product strategy, user experience and interface design, */}
          {/*   full-stack development, and brand identity systems, to create */}
          {/*   exceptional experiences for the customers we serve. */}
          {/* </Bio> */}
          <Bio
            ref={measuredBio}
            id="bio"
            projectIsOpen={projectIsOpen}
            bioHeight={bioHeight}
          >
            &#8195;&#8195;<SeoH1>OTK Studio</SeoH1> is a design and engineering
            office, led by Oliver Thomas Klein. The studio engages in ongoing
            partnerships with founders, creative leaders, and early stage
            companies. We have a proven history of delivering uncompromising
            brand identities, products and websites.
          </Bio>
          <WorkContainer
            id="work"
            bioHeight={bioHeight}
            projectIsOpen={projectIsOpen}
          >
            {edges
              .filter((edge) => !!edge.node.frontmatter.date)
              .map((edge, index) => (
                <Project
                  key={edge.node.id}
                  index={index}
                  project={edge.node}
                  projectIsOpen={projectIsOpen}
                  setProjectIsOpen={setProjectIsOpen}
                  setCurrentProjectHeight={setCurrentProjectHeight}
                  currentProjectHeight={currentProjectHeight}
                  setCurrentSlide={setCurrentSlide}
                  projectBreakPoints={projectBreakPoints}
                  bioHeight={bioHeight}
                  viewportWidth={viewportWidth}
                />
              ))}
          </WorkContainer>
          {/* <Legend projectIsOpen={projectIsOpen}> */}
          {/*   <LegendContainer> */}
          {/*     <LegendColor name="Strategy" /> */}
          {/*     <LegendName>Strategy</LegendName> */}
          {/*   </LegendContainer> */}
          {/*   <LegendContainer> */}
          {/*     <LegendColor name="Design" /> */}
          {/*     <LegendName>Design</LegendName> */}
          {/*   </LegendContainer> */}
          {/*   <LegendContainer> */}
          {/*     <LegendColor name="Engineering" /> */}
          {/*     <LegendName>Engineering</LegendName> */}
          {/*   </LegendContainer> */}
          {/*   <LegendContainer> */}
          {/*     <LegendColor name="Art Direction" /> */}
          {/*     <LegendName>Art Direction</LegendName> */}
          {/*   </LegendContainer> */}
          {/* </Legend> */}
        </Content>
      </Grid>
    </Layout>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: min-content min-content 1fr;
  overflow: hidden;
  // grid-column-gap: 10px;
  // padding: 10px 0 0;
  background: #f6f6f5;
  z-index: -2;
  height: 100vh;
  align-content: flex-start;
  margin: 0;
  grid-template-areas:
    "n n n n"
    "t t i i"
    "c c i i";
  font-family: Monument;
  font-weight: normal;

  @media (max-width: 800px) {
    display: block;
    height: auto;
    padding: 0px;
    grid-template-columns: 1fr;
    grid-template-rows: min-content 200px auto 100px;
    grid-row-gap: 10px;
    grid-template-areas:
      "t"
      "i"
      "c"
      "n";
  }
`

const Navigation = styled.div`
  transition: 1.6s cubic-bezier(0.24, 1, 0.32, 1);

  grid-area: n;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  z-index: 4;
  font-size: 28px;
  line-height: 22px;
  height: 38px;
  text-align: center;
  overflow: hidden;
  margin: 0 5px;
  max-width: 100%;
  padding-top: ${(props) => (props.projectIsOpen !== null ? 10 : 5)}px;
  max-height: ${(props) => (props.projectIsOpen !== null ? 0 : 38)}px;
  opacity: ${(props) =>
    props.projectIsOpen !== null || !props.rendered ? 0 : 1};

  @media (max-width: 800px) {
    h2:first-child {
      display: none;
    }

    padding-top: 3px;

    grid-template-columns: 1fr;
    height: 36px;
    max-height: 36px;
    opacity: ${(props) => (!props.rendered ? 0 : 1)};
    transition: 1s cubic-bezier(0.24, 1, 0.32, 1);

    h2:nth-child(2) {
      font-size: 20px;
      line-height: 28px;
      a:first-child {
        padding-left: 0;
      }
    }

    h2:last-child {
      display: none;
    }
  }

  h2:first-child {
    text-align: left;
  }

  h2:last-child {
    text-align: right;
  }
`

// For SEO Purposes
const NavItem = styled.h2`
  font-size: inherit;
  display: inline;
  margin: inherit;
  padding: inherit;
  letter-spacing: -0.01em;
`

const Link = styled.a`
  color: black;
  text-decoration: none;
  padding: 0 0 0 10px;
  &:hover {
    text-decoration: underline;
  }
`

const Title = styled.svg`
  opacity: ${({ rendered }) => (rendered ? 1 : 1)};
  transform: translateY(${({ rendered }) => (rendered ? 0 : -38)}px);
  grid-area: t;
  margin: 0 10px;
  z-index: 4;
  background: transparent;
  width: calc(${(props) => (props.projectIsOpen !== null ? 50 : 100)}vw - 20px);
  padding: ${(props) => (props.projectIsOpen !== null ? 0 : 10)}px 0 10px;
  transition: width 1.0s cubic-bezier(0.24, 1, 0.32, 1),
    padding 1.0s cubic-bezier(0.24, 1, 0.32, 1),
    margin 1.0s cubic-bezier(0.24, 1, 0.32, 1),
    transform 1.0s cubic-bezier(0.24, 1, 0.32, 1);
  @media (max-width: 800px) {
    transform: translateY(${({ rendered }) => (rendered ? 0 : -24)}px);
    padding: 8px 10px 4px;
    padding-bottom: 5px;
    width: calc(100vw);
    margin: 0;
  }
  cursor: ${(props) => (props.projectIsOpen !== null ? "pointer" : "auto")};
`

const Content = styled.div`
  transition: opacity 1.0s cubic-bezier(0.8, 1, 0.32, 1) 0.3s;
  opacity: ${({ rendered }) => (rendered ? 1 : 0)};
  grid-area: c;
  z-index: 4;
  position: relative;
  padding: 0;
  width: 100%;
  overflow: scroll;

  @media (max-width: 800px) {
    padding: 0;
    overflow: hidden;
    height: ${({ projectIsOpen, currentProjectHeight, projectLength }) =>
      projectIsOpen !== null
        ? `${currentProjectHeight + projectLength * 32}px`
        : "auto"};
  }
`

const Bio = styled.div`
  font-size: 28px;
  line-height: 32px;
  margin: 0;
  padding: 0 10px;
  position: absolute;
  width: calc(50vw - 20px);

  @media (max-width: 800px) {
    font-size: 24px;
    line-height: 28px;
    position: static;
    padding: 10px 10px 0;
    width: calc(100vw);
  }
`

// For SEO Purposes
const SeoH1 = styled.h1`
  font-size: inherit;
  display: inline;
  line-height: inherit;
  margin: 0;
  padding: 0;
`

const WorkContainer = styled.div`
  position: relative;
  margin: 0 10px;
  padding-top: ${({ projectIsOpen, bioHeight }) =>
    projectIsOpen !== null ? 0 : bioHeight}px;
  transition: 1.0s cubic-bezier(0.24, 1, 0.32, 1);
  border-bottom: 1px solid black;
  margin-bottom: 32px;
  @media (max-width: 800px) {
    margin: 0;
    padding-top: 10px;
    top: ${({ projectIsOpen, bioHeight }) =>
      projectIsOpen !== null ? -bioHeight : 0}px;
  }
  @media (max-width: 500px) {
    margin-bottom: 20px;
  }
`

const Images = styled.div`
  transition: 1.0s cubic-bezier(0.24, 1, 0.32, 1) 0.3s;
  opacity: ${({ rendered }) => (rendered ? 1 : 0)};
  overflow: scroll;
  grid-column-start: 3 !important;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 4;
  background-size: cover;
  background-position: center center;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  // width: calc(100%);
  height: calc(100%);
  // max-height: 100vh;
  position: relative;

  @media (max-width: 800px) {
    top: 0px;
    height: 520px;
    grid-row-start: 2;
    grid-row-end: span 1;
    grid-column-start: 1;
    grid-column-end: span 1;
    width: 100vw;
  }

  @media (max-width: 500px) {
    height: 380px;
  }
`

const Legend = styled.div`
  position: ${({ projectIsOpen }) =>
    projectIsOpen === null ? "absolute" : "static"};
  position: fixed;
  margin: 0 10px;
  padding: 0 10px 0 0;
  width: calc(50vw - 10px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 32px;
  background: #f6f6f5;
  bottom: 0px;
  transform: translateY(
    ${({ projectIsOpen }) => (projectIsOpen === null ? 0 : 32)}px
  );
  transition: 1.0s cubic-bezier(0.24, 1, 0.32, 1);

  @media (max-width: 800px) {
    width: 100%;
    padding: 0 10px 0px;
    margin: 0;
    position: relative;
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 0 10px 0px;
    position: relative;
    top: -20px;
  }
`

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background: ${({ name }) => {
    let color
    if (name === "Strategy") {
      color = "#aaaaaa"
    }
    if (name === "Design") {
      color = "#ffaf00"
    }
    if (name === "Engineering") {
      color = "#ff0000"
    }
    if (name === "Art Direction") {
      color = "#0092ff"
    }
    return color
  }};
  @media (max-width: 500px) {
    width: 8px;
    height: 8px;
  }
`

const LegendName = styled.div`
  font-size: 14px;
  font-family: MonumentMono;
  letter-spacing: -0.025em;
  color: black;
  margin-left: 4px;
  @media (max-width: 800px) {
    font-size: 11px;
    letter-spacing: -0.05em;
    padding-bottom: 2px;
  }
`

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
            deliverable
            practice
            partner
            url
            ongoing
            images {
              url
              cover
              height
              width
              color
            }
            new
          }
        }
      }
    }
  }
`
