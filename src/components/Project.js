import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"

const PostLink = ({
  index,
  project,
  projectIsOpen,
  currentProjectHeight,
  setCurrentProjectHeight,
  setCurrentSlide,
  projectBreakPoints,
  bioHeight,
  viewportWidth,
}) => {
  const [contentHeight, setContentHeight] = useState(0)
  const projectContainer = useRef(null)

  // When the project renders get the height of all the content in this project
  useEffect(() => {
    setContentHeight(projectContainer.current.scrollHeight + 48)
  }, [projectContainer, setContentHeight, viewportWidth])

  // When the project is opened, set the height so other project can handle their position
  useEffect(() => {
    if (index === projectIsOpen) {
      setCurrentProjectHeight(contentHeight)
    }
  }, [contentHeight, projectIsOpen, setCurrentProjectHeight, index])

  const openProject = () => setCurrentSlide(projectBreakPoints[index])

  const closeProject = () => setCurrentSlide(0)

  return (
    <Container
      ref={projectContainer}
      contentHeight={contentHeight}
      index={index}
      currentProjectHeight={currentProjectHeight}
      projectIsOpen={projectIsOpen}
      bioHeight={bioHeight}
    >
      <Header
        onClick={() => {
          projectIsOpen === null
            ? openProject()
            : projectIsOpen === index
            ? closeProject()
            : openProject()
        }}
      >
        <GridItem>
          <InlineContainer>
            {project.frontmatter.deliverable}{" "}
            {project.frontmatter.new && <NewIndicator>New</NewIndicator>}
          </InlineContainer>
          <PracticeContainer>
            {project.frontmatter.practice.map((practice) => (
              <PracticeIndicator
                key={practice}
                practice={practice}
                projectIsOpen={projectIsOpen}
              />
            ))}
          </PracticeContainer>
        </GridItem>

        <GridItem>
          <Deliverable>{project.frontmatter.title}</Deliverable>
          <InlineContainer>
            <Year>{project.frontmatter.date.slice(-4)}</Year>
            <Arrow
              projectIsOpen={projectIsOpen}
              index={index}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <g>
                <g transform="translate(19.584 19.584) rotate(180)">
                  <rect
                    width="20"
                    height="20"
                    rx="10"
                    transform="translate(0 0)"
                    fill="transparent"
                  />
                  <g transform="translate(3.112 17.143) rotate(-90)">
                    <image
                      width="10.102"
                      height="10.102"
                      transform="translate(7.143 0) rotate(45)"
                      href="data:image/png;base64,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"
                    />
                  </g>
                </g>
              </g>
            </Arrow>
          </InlineContainer>
        </GridItem>
      </Header>
      <MetaData>
        <InfoContainer>
          <span>Partner</span> <span>{project.frontmatter.partner}</span>
        </InfoContainer>
        <InfoContainer>
          <span>Practice</span>{" "}
          <span>
            {project.frontmatter.practice.map((practice, index) =>
              index === project.frontmatter.practice.length - 1
                ? `${practice}.`
                : `${practice}, `
            )}
          </span>
        </InfoContainer>
        <InfoContainer>
          <span>{project.frontmatter.ongoing && "Last"} Release</span>{" "}
          <span>{project.frontmatter.date}</span>
        </InfoContainer>
        <InfoContainer>
          <span>Status</span>{" "}
          <span>{project.frontmatter.ongoing ? "Ongoing" : "Complete"}</span>
        </InfoContainer>
        {project.frontmatter.url && (
          <InfoContainer>
            <span>Access</span>{" "}
            <span>
              <a href={project.frontmatter.url} target="_blank">
                See The Project
              </a>
            </span>
          </InfoContainer>
        )}
      </MetaData>
      <Content dangerouslySetInnerHTML={{ __html: project.html }} />
    </Container>
  )
}

const Container = styled.div`
  height: ${({ projectIsOpen, index, contentHeight }) =>
    index === projectIsOpen ? contentHeight : 32}px;
  position: relative;
  top: ${({ projectIsOpen, index, currentProjectHeight }) =>
    // IF THIS IS THE PROJECT THAT IS OPEN
    index === projectIsOpen
      ? // MOVE IT ABOVE ALL THE PROJECTS
        32 * -index
      : // IF NO PROJECT IS OPEN
      projectIsOpen === null
      ? // LEAVE THEM ALL ALONE
        0
      : index < projectIsOpen
      ? // IF BEFORE THE CURRENT OPEN PROJECT, MOVE BELOW THE OPEN PROJECT
        currentProjectHeight
      : 0}px;
  min-height: 32px;
  overflow: hidden;
  border-top: 1px solid black;
  background: #f6f6f5;
  transition: 0.7s cubic-bezier(0.24, 1, 0.32, 1);
  @media (max-width: 800px) {
    padding: 0 10px;
  }
`

const Header = styled.div`
  display: grid;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  grid-template-columns: 7fr 8fr;
  grid-column-gap: 5px;
  align-items: center;
  cursor: pointer;
  &:hover {
    > div {
      color: blue;
    }
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr min-content;
  }
`

const GridItem = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  line-height: 22px;
  font-family: "MonumentMono";
  letter-spacing: -0.025em;
  padding: 4px 0 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 500px) {
    &:nth-child(1) {
      justify-content: space-between;
    }
    &:nth-child(2) {
      justify-content: flex-end;
    }
  }
`

const InlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Deliverable = styled.span`
  @media (max-width: 500px) {
    text-align: right;
  }
`

const Year = styled.span`
  @media (max-width: 500px) {
    display: none;
  }
`

const Arrow = styled.svg`
  transform: rotate(
    ${({ projectIsOpen, index }) => (index === projectIsOpen ? 90 : 0)}deg
  );
  background-color: ${({ projectIsOpen, index }) =>
    index === projectIsOpen ? "red" : "#cccccc"};
  border-radius: 100px;
  padding-top: 1px;
  padding-left: 1px;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  @media (max-width: 800px) {
    display: none;
  }
`

const Content = styled.div`
  background: #f6f6f5;
  img {
    width: 100%;
  }
  h3 {
    width: 100%;
    margin: 0 0 10px;
    font-family: "Monument";
    font-size: 24px;
    line-height: 30px;
  }
  p {
    font-size: 16px;
    line-height: 20px;
    font-family: "MonumentMono";
    letter-spacing: -0.025em;
    margin: 15px 0;
  }
  a {
    color: black;
    &:visited {
      color: black;
    }
  }
`

const MetaData = styled.div`
  background: #f6f6f5;
  font-family: MonumentMono;
  letter-spacing: -0.025em;
  margin-bottom: 10px;
  border-bottom: 1px dotted black;
`

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 8fr;
  border-top: 1px dotted black;
  padding: 3px 0 1px;
  grid-column-gap: 5px;
  span {
    font-size: 16px;
    line-height: 18px;
    padding-bottom: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  a {
    color: blue;
  }
  a:visited {
    color: #ff0000;
  }
`

const PracticeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 500px) {
    // display: none;
  }
`

const PracticeIndicator = styled.div`
  width: 8px;
  height: 8px;
  padding: 0px;
  border-radius: 20px;
  background: ${({ practice }) => {
    let color
    if (practice === "Strategy") {
      color = "#aaaaaa"
    }
    if (practice === "Design") {
      color = "#ffaf00"
    }
    if (practice === "Engineering") {
      color = "#ff0000"
    }
    if (practice === "Art Direction") {
      color = "#0092ff"
    }
    if (practice === "Photography") {
      color = "#05e900"
    }
    return color
  }};
  margin-left: 2px;
`

const NewIndicator = styled.div`
  padding: 1px 3px 2px 2px;
  margin-left: 5px;
  border-radius: 2px;
  background: #0092ff;
  color: white;
  font-size: 14px;
  line-height: 14px;
  height: 17px;
  align-self: center;
  @media (max-width: 500px) {
    display: none;
  }
`

export default PostLink
