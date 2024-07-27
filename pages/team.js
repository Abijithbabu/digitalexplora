import Layout from "../Components/landing/Layout";
import Team from "../Components/landing/Team";

function team() {
  return (
    <Layout title="Team" canonicalUrl="https://www.digitalexplora.in/team">
      <main className="container max-w-7xl pt-20 mx-auto">
        <Team />
      </main>
    </Layout>
  );
}

export default team;
