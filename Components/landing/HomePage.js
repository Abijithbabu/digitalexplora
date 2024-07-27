import Layout from "./Layout";
import Header from "./Header";
import Stats from "./Stats";
import Team from "./Team";
import ThreeColumn from "./ThreeColumn";
import TwoColumn from "./TwoColumn";

function HomePage() {
  return (
    <Layout
      title="Digitalexplora"
      canonicalUrl="https://www.digitalexplora.in/"
    >
      {/* header */}
      <Header />
      <main>
        {/* stats */}
        <Stats />
        {/* Two-column */}
        <ThreeColumn />
        {/* TwoColumn */}
        <TwoColumn />
        {/* Team */}
        <Team />
      </main>
    </Layout>
  );
}

export default HomePage;
