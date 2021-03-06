import React, { useEffect, useState } from 'react';
import Cube from './Components/Cube';
import Main from './Components/Main';
import SidePage from './Components/SidePage';
import SideNav from './Components/Nav';
import ProjectModal from './Components/ProjectModal';
import About from './Pages/About';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import Projects from './Pages/Projects';
import { Row, Col } from './Components/Grid';
import ProjectsData from './assets/data/projects.json';
import './App.scss';


function App() {
  const [section, setSection] = useState(0);
  const [slide, setSlide] = useState(true);
  const [category, setCategory] = useState(0);
  const [project, setProject] = useState();
  const [open, setOpen] = useState(false);
  const [bounceNav, setBounceNav] = useState(false);
  const [navClass, setNavClass] = useState("side-menu");

  useEffect(() => {
    setProject(ProjectsData);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      toggleBounce();
    }, 72192);
  });

  function switchPage(event, page) {
    event.preventDefault();
    setSection(page);
    setSlide(true);
    setTimeout(() => {
      setSlide(false);
    }, 500);
  }
  function changeProjectCategory(event, category) {
    event.preventDefault();
    setCategory(category);
    setProject("");
    let filteredProducts = [];
    switch (category) {
      case 0:
        setProject(ProjectsData);
        break;
      case 1:
        for (let i = 0; i < ProjectsData.length; i++) {
          for (let j = 0; j < ProjectsData[i].type.length; j++) {
            if (ProjectsData[i].type[j] === "Front End" || ProjectsData[i].type[j] === "Full Stack") {
              filteredProducts.push(ProjectsData[i]);
            }
          }
        }
        setProject(filteredProducts);
        break;
      case 2:
        for (let i = 0; i < ProjectsData.length; i++) {
          for (let j = 0; j < ProjectsData[i].type.length; j++) {
            if (ProjectsData[i].type[j] === "Back End" || ProjectsData[i].type[j] === "Full Stack") {
              filteredProducts.push(ProjectsData[i]);
            }
          }
        }
        setProject(filteredProducts);
        break;
      case 3:
        for (let i = 0; i < ProjectsData.length; i++) {
          for (let j = 0; j < ProjectsData[i].type.length; j++) {
            if (ProjectsData[i].type[j] === "Data Analytics" || ProjectsData[i].type[j] === "Game") {
              filteredProducts.push(ProjectsData[i]);
            }
          }
        }
        setProject(filteredProducts);
        break;
      default:
        setProject(ProjectsData);
        return;
    }
  }
  function openModal(event, name) {
    event.preventDefault();
    const openedProject = ProjectsData.filter(project => project.name === name);
    setProject(openedProject);
    setOpen(true);
  }
  function closeModal(event) {
    event.preventDefault();
    setOpen(false);
    setProject(ProjectsData);
  }
  function navBounce(event) {
    event.preventDefault();
    setBounceNav(true);
  }
  function toggleBounce() {
    if (bounceNav) {
      setNavClass("side-menu");
      setTimeout(() => {
        setBounceNav(false);
        toggleBounce();
      }, 72192);
    } else {
      setNavClass("side-menu-bounce");
    }
  }
  return (
    <div className="app-background">
      <Cube />
      <div className="container">
        <Row>
          <Col size="lg-1 12">
            <SideNav
              switchPage={switchPage}
              navBounce={navBounce}
              navClass={navClass}
            />
          </Col>
          {window.screen.availWidth < 769 ? (
            <Col size="12">
              <div style={{ height: "2.5vh" }} />
            </Col>
          ) : (<></>)}
          <Col size="lg-11 12">
            <Row>
              <Col size="lg-6 12">
                <Main
                  switchPage={switchPage}
                />
              </Col>
              <Col size="lg-6 12">
                {section === 0 ? (
                  <SidePage
                    slide={slide}
                    section={<About

                    />}
                  />
                ) : section === 1 ? (
                  <SidePage
                    slide={slide}
                    section={<Projects
                      changeProjectCategory={changeProjectCategory}
                      category={category}
                      ProjectsData={project}
                      openModal={openModal}
                    />}
                  />
                ) : section === 2 ? (
                  <SidePage
                    slide={slide}
                    section={<Blog

                    />}
                  />
                ) : section === 3 ? (
                  <SidePage
                    slide={slide}
                    section={<Contact

                    />}
                  />
                ) : (<div />)}
              </Col>
              {window.screen.availWidth < 769 ? (
                <Col size="12">
                  <div style={{ height: "2.5vh" }} />
                </Col>
              ) : (<></>)}
            </Row>
          </Col>
        </Row>
      </div>
      {open ? (
        <ProjectModal
          project={project}
          open={open}
          closeModal={closeModal}
        />
      ) : (<div />)}
    </div>
  );
}

export default App;

