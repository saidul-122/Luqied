import dynamic from "next/dynamic";
import Layout from "../src/layouts/Layout";
const PortfolioIsotope = dynamic(
  () => import("../src/components/PortfolioIsotope"),
  {
    ssr: false,
  }
);
const Works = ({data}) => {
  return (
    <Layout>
      {/* Section Started Heading */}
      <section className="section section-inner started-heading">
        <div className="container">
          {/* Heading */}
          <div className="m-titles align-center">
            <h1
              className="m-title splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span> Portfolio </span>
            </h1>
            <div
              className="m-subtitle splitting-text-anim-1 scroll-animate"
              data-splitting="words"
              data-animate="active"
            >
              <span>
                {" "}
                my <b>Cases</b>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Section - Works */}
      <section className="lui-section">
        {/* Works */}
        <div className="v-line v-line-right v-line-top">
          <div className="container">
            <PortfolioIsotope noViewMore projects={data.user.projects}/>
            <div className="lui-bgtitle">
              <span> Portfolio </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = (async () => {
  // Fetch data from your server or any other API
  const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
  const data = await response.json();
  
  // Return the data
  return { props: { data } };
})

export default Works;
