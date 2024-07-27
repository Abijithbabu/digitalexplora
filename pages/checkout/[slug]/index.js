import CheckoutPage from "@/Components/landing/CheckoutPage";
import { BASE_URL } from "@/config";
import { landingRequests } from "@/config/requests";

function checkoutProduct() {
  return <CheckoutPage />;
}

export default checkoutProduct;

export async function getServerSideProps({ query }) {
  const slug = query.slug;
  const res = await fetch(`${BASE_URL}${landingRequests.PRODUCTS}`);
  const { data } = await res.json();
  const slugCheck = data.some((item) => item["slug"] === slug);

  if (!slugCheck) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
}
