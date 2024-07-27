import Layout from "../Components/landing/Layout";

function privacy() {
  return (
    <Layout
      title="Disclaimer"
      canonicalUrl="https://www.digitalexplora.in/disclaimer"
    >
      <main className="container max-w-7xl mx-auto">
        <div className="bg-white pt-40 pb-20" id="header">
          <div className="title">
            <h3 className="text-4xl font-bold mb-4 text-gray-700">
              Disclaimer
            </h3>
            <p className="text-lg text-gray-400">
              The software and Dware Inc are not a part of the Facebook website
              or Facebook Inc. Additionally, This site is NOT endorsed by
              Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
              There are inherent dangers in the use of any software available
              for download on the Internet, and we caution you to make sure that
              you completely understand the potential risks before downloading
              any of the software. All software is provided "as is" without
              warranty of any kind, either express or implied. Use at your own
              risk. The use of the software is done at your own discretion and
              risk and with agreement that you will be solely responsible for
              any damage to your computer system or loss of data that results
              from such activities. You are solely responsible for adequate
              protection and backup of the data and equipment used in connection
              with any of the software, and we will not be liable for any
              damages that you may suffer in connection with using, modifying or
              distributing any of this software. No advice or information,
              whether oral or written, obtained by you from us or from this
              website shall create any warranty for the software.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default privacy;
