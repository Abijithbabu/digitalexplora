function VideoSection() {
  return (
    <div className="px-6 py-20 bg-gray-900">
      <div className="md:grid md:grid-cols-2 md:gap-10 items-center max-w-7xl mx-auto">
        <div className="video rounded-lg overflow-hidden">
          <video controls style={{ width: `100%` }}>
            <source src="/assets/dog.mp4" type="video/mp4" />
            <track kind="captions" srcLang="en" src="/assets/captions.vtt" />
          </video>
        </div>
        <div className="colRight mt-10 md:mt-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-400">
            Welcome to Digitalexplora
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase text-white">
            Where brands come to grow.
          </h3>
          <p className="mb-2 text-gray-400 leading-6">
            For the first time ever, the entire ecommerce world is coming
            together online to share exclusive knowledge, tactics and actionable
            strategies on how to build, operate, and scale profitable ecommerce
            businesses in 2021.
          </p>
          <p className="mb-2 text-gray-400 leading-6">
            This isn’t your typical virtual conference. Digital explora is
            gathering the world’s most innovative founders, brightest minds and
            trailblazing DTC brands for two days of masterclasses and networking
            - all from the comfort of your home.
          </p>
          <p className="mb-2 text-gray-400 leading-6">
            Our speakers are masters of their craft and are handpicked to share
            their proven blueprints to success. Join them and 15,000+ attendees
            for 10+ tracks of in-depth speeches, panels, workshops & live Q&A
            sessions on 28-29th June.
          </p>
          <p className="text-gray-400 leading-6">
            Interested in growing your brand, increasing your sales and making
            2021 your most profitable year yet? This event is for you.
          </p>

          <button className="userBtn px-20 mt-6 w-full lg:w-auto">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
