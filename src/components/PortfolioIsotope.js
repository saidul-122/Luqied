import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
const PortfolioIsotope = ({ noViewMore,projects }) => {
  // Sort the 'projects' array based on the 'sequence' property
    projects = projects.sort((a, b) => a.sequence - b.sequence); 

  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    isotope.current = new Isotope(".works-items", {
      itemSelector: ".works-col",
      //    layoutMode: "fitRows",
      percentPosition: true,
      masonry: {
        columnWidth: ".works-col",
      },
      animationOptions: {
        duration: 750,
        easing: "linear",
        queue: false,
      },
    });
    return () => isotope.current.destroy();
  });
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  const activeBtn = (value) => (value === filterKey ? "active" : "");
  return (
    <Fragment>
      <div className="works-box">
        <div
          className="filter-links scrolla-element-anim-1 scroll-animate"
          data-animate="active"
        >
          <a
            className={`c-pointer lui-subtitle ${activeBtn("*")}`}
            onClick={handleFilterKeyChange("*")}
            data-href=".works-col"
          >
            All
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn(
              "sorting-ui-ux-design"
            )}`}
            onClick={handleFilterKeyChange("sorting-ui-ux-design")}
            data-href=".sorting-ui-ux-design"
          >
            UI UX Design
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn("sorting-photo")}`}
            onClick={handleFilterKeyChange("sorting-photo")}
            data-href=".sorting-photo"
          >
            Photography
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn(
              "sorting-development"
            )}`}
            onClick={handleFilterKeyChange("sorting-development")}
            data-href=".sorting-development"
          >
            Development
          </a>
          <a
            className={`c-pointer lui-subtitle ${activeBtn(
              "sorting-branding"
            )}`}
            onClick={handleFilterKeyChange("sorting-branding")}
            data-href=".sorting-branding"
          >
            Branding
          </a>
        </div>
        <div className="works-items works-masonry-items row">
          {projects.map((project)=>{
            return (
              project.enabled && <div className="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 sorting-ui-ux-design sorting-development sorting-branding sorting-photo ">
              <div
                className="works-item scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <div className="image">
                  <div className="img">
                    <Link legacyBehavior href="/work-single">
                      <a>
                        <img
                          decoding="async"
                          src={project.image.url}
                          alt="Zorro"
                        />
                        <span className="overlay" />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="desc">
                  <span className="category"> Branding, Photography </span>
                  <h5 className="name">
                    <Link legacyBehavior href="/work-single">
                      <a>{project.title}</a>
                    </Link>
                  </h5>
                  <div className="text">
                    <p>
                      {project.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore.`}
                    </p>
                  </div>
                  <Link legacyBehavior href="/work-single">
                    <a className="lnk">See project</a>
                  </Link>
                </div>
                <div
                  className="bg-img"
                  style={{
                    backgroundImage: "url(assets/images/pat-2.png)",
                  }}
                />
              </div>
            </div>
            )
          })
          }
        </div>
        {!noViewMore && (
          <div className="load-more-link">
            <Link legacyBehavior href="/works">
              <a
                className="btn scrolla-element-anim-1 scroll-animate"
                data-animate="active"
              >
                <span>View More</span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default PortfolioIsotope;
