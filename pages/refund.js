import Layout from "../Components/landing/Layout";

function refund() {
  return (
    <Layout
      title="Refund Policy"
      canonicalUrl="https://www.digitalexplora.in/refund"
    >
      <main className="container max-w-5xl mx-auto">
        <div className="bg-white pt-30 pb-20" id="header">
          <div className="title">
            <h1 className="text-4xl font-bold mb-4 text-gray-700">
              Digital Explora has a strict REFUND Policy.
            </h1>
            <p className="text-lg text-gray-600">
              We do however, offer a 24 hours Partial Money Back Guarantee on
              any payment, paid directly to Digital Explora, should you not be
              satisfied by the system and tools provided. The purchase of a
              course is NON-REFUNDABLE. This is due to the fact that once a
              course is purchased, it becomes immediately available for
              download. To preserve the integrity of the products and our
              programs we DO NOT offer a REFUND on any course purchased. If you
              wish to proceed with a refund of your software from the
              marketplace, it MUST be received in writing via email within 24
              hours from the time of your purchase date. Please send an email
              requesting refund to: support@automatics.zendesk.com A 5% will be
              taken as a processing fee will be applied to your original
              payment. Digital Explora support will notify you via email once
              your request has been processed with your net refund amount. If
              you proceed with a purchase, YOU are confirming that you agree to
              all Refund Policies and will NOT instigate a credit/debit card
              chargeback or dispute any payment, after the 24 hours has elapsed.
              You understand and acknowledge that your bank will be presented
              with this confirmation.
            </p>
            <p className="text-lg mt-4">
              <strong>
                Please do NOT proceed with your purchase if you do not accept
                this Refund Policy and its Terms.
              </strong>
            </p>

            <h1 className="text-4xl font-bold mb-4 text-gray-700 mt-8">
              Membership Renewals
            </h1>
            <p className="text-lg text-gray-600">
              The above Refund Policy only applies to new purchases made after
              20th november 2021. An existing or previous member that has let
              their membership expire and then renews their membership, is not
              covered by this Refund Policy and will not be eligible for any
              refund of the membership fee. By proceeding with your renewal
              payment, you are confirming that you agree to all Refund Policies
              and will not instigate a false credit/debit card charge back. You
              understand and acknowledge that your bank will be presented with
              this confirmation.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default refund;
