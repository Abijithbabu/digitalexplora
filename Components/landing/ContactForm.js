function ContactForm() {
  return (
    <div className="contactForm bg-white py-10 md:py-20 px-6 md:px-0">
      <div className="max-w-2xl mx-auto">
        <div className="sectionTitle mb-10">
          <h3 className="text-xl md:text-5xl font-bold capitalize text-gray-900 text-center mb-4 md:mb-5">
            Never miss an update
          </h3>
          <p className="text-lg my-6 text-center text-gray-600">
            Ready to help your brand grow? Sign up below and never miss an
            update on all things Digital explora, including price changes,
            discounts, and the latest speakers added to the line-up.
          </p>
        </div>

        <form action="#">
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="mb-4">
              <input type="text" placeholder="First name*" className="field" />
            </div>
            <div className="mb-4">
              <input type="text" placeholder="Last name*" className="field" />
            </div>
            <div className="mb-6 col-span-2">
              <input
                type="email"
                placeholder="Enter your email*"
                className="field"
              />
            </div>
            <div className="text-center col-span-2">
              <button className="userBtn px-14 mx-auto">Subscribe</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
