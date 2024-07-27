import Layout from "../Components/landing/Layout";
import Privacy from "../Components/landing/Privacy";

function privacyPolicy() {
  return (
    <Layout
      title="Privacy policy"
      canonicalUrl="https://www.digitalexplora.in/privacy"
    >
      <main className="py-10 md:pt-40 md:pb-20">
        <Privacy />
      </main>
    </Layout>
  );
}

export default privacyPolicy;
