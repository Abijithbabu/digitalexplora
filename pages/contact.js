import Layout from "../Components/landing/Layout";

function team() {
  return (
    <Layout
      title="Contact"
      canonicalUrl="https://www.digitalexplora.in/contact"
    >
      <main className="container max-w-7xl mx-auto">
        <div className="bg-white pt-40 pb-20" id="header">
          <div className="title">
            <h1 className="uppercase text-lg md:text-xl font-extrabold mb-4 text-center text-gray-700">
              <span role="img" aria-label="Contact">
                ☎️
              </span>{" "}
              Contact us
            </h1>
            <p className="uppercase text-lg mb-4 text-gray-800 font-semibold text-center">
              YOUR ALL-ACCESS PASS TO JOIN 15,000+ ATTENDEES AT Digital explora
            </p>
          </div>
          <div className="mail text-gray-600 font-medium text-xl md:text-xl text-center mt-10">
            Mail to :{" "}
            <a
              href="mailto:hello@dware.com"
              className="font-bold text-gray-800 block"
            >
              support@automatics.zendesk.com
            </a>
          </div>
          <div className="mail text-gray-600 font-medium text-xl md:text-xl text-center mt-5">
            Address :
            <p className="font-bold text-gray-800">
              Vkm road near Ken's garden, Chalakudy, Kerala, India - 680721
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default team;
