import React from "react";
import styles from "./About.module.css";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";

function About() {
  return (
    <div>
      <div
        className={`${styles.aboutHeader} text-center relative bg-blend-darken`}
        id="header"
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug text-white">
            About Digital Explora
          </h1>
          <p className="text-white mt-5 leading-7 text-xl">
            Everything you need to know about us from the beginning to now
          </p>
        </div>

        <div className="text-center absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p href="#aboutUs">
            <ChevronDoubleDownIcon className="h-8 inline-block animate-bounce text-white" />
          </p>
        </div>
      </div>
      <main className="max-w-3xl py-20 lg:py-32 mx-auto" id="aboutUs">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center mb-20">
          <div className="leftCol mb-6 lg:mb-0">
            <h3 className="text-3xl text-gray-900 font-bold mb-5">
              Humble beginnings
            </h3>
            <p className="mb-3 leading-6 text-md text-gray-900 font-medium">
              Our company was founded by Alex Marsale in 2016. Back then it was
              not even registered as one but ran from Alex’s Room just with his
              simple laptop.
            </p>
            <p className="leading-6 text-md text-gray-900 font-medium">
              Today the company has evolved into various industries employing
              over 7 people working remotely in this new world with more than
              2000+ customers who use our software and education worldwide.
            </p>
          </div>
          <div className="rightCol">
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"
              alt="Our Company"
              className="rounded-md shadow-xl"
            />
          </div>
        </div>

        <div className="mb-24">
          <div>
            <AwesomeSlider>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Our Company"
                />
              </div>
              <div className="rounded-md shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1554200876-907f9286c2a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Our Company"
                />
              </div>
            </AwesomeSlider>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="leftCol leading-6 text-md font-medium text-gray-900 mb-14 lg:mb-0">
            <h3 className="text-3xl text-gray-900 font-bold mb-5">
              The Genesis & Journey
            </h3>
            <p>
              Alex Marsale started his online journey as a blogger struggling to
              find enough information to actually start making money blogging.
              Alex found his first online mentor Saran, a guy from chennai,
              India who taught him about Search Engine Optimization.
            </p>
            <p>
              The basics made Alex curious about Search engine optimization and
              he focused on it for a couple of years learning to crack the
              search engine ranking algorithm. During this time he became an
              expert in SEO.
            </p>
            <p>
              Even though he was making money with a blogging he was always
              curious about making software and started following that path.
            </p>
            <p>
              He bought a DFY software from a developer and scaled it to one
              million users in 2 years. Later had to shut down because of the
              lack of knowledge in coding and management.
            </p>
            <p>
              He later launched an app that hit 100k users which had to later
              shut down due to dependency issues.
            </p>
            <p>
              He later started his productized service company called “PBN
              Master” that provided seo services to bloggers which he later
              closed to continue in the Software Space.
            </p>
            <p>
              In 2019 he built another software called “Linkroid” a url
              shortener that was standalone and one major mistake was building
              the product and taking it to perfection without selling it which
              ultimately ended up in failure.
            </p>
            <p>
              With all the experience he started again with automation software
              that Generated 2 crore in revenue in a single year just in the US
              Market.
            </p>
            <p>
              Alex Marsale is known as a software creator but he has learned
              that to grow this software company he will have to educate users
              about marketing, sales and everything related to online business
              and that's how Digitalexplora was born. The only way to grow is by
              providing education
            </p>
          </div>
          <div className="rightCol">
            <img
              src="https://images.unsplash.com/photo-1594732832278-abd644401426?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Our Company"
              className="rounded-md shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"
              alt="Our Company"
              className="rounded-md shadow-xl mt-5"
            />
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80"
              alt="Our Company"
              className="rounded-md shadow-xl mt-5"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
