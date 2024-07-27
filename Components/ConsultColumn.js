import { Container } from "@material-ui/core";
import React from "react";
import ConsultColItem from "./ConsultColItem";

const steps = [
  {
    id: 1,
    image: "https://dummyimage.com/640x400.png/dddddd/000000",
    title: "Kanlam",
    levelTitle: "Level One Beginner",
    levelRange: "33%",
    desc: "Displaced unsp fx right great toe, subs for fx w delay heal",
    btnTitle: "Explore Accelerator",
  },
  {
    id: 2,
    image: "https://dummyimage.com/640x400.png/dddddd/000000",
    title: "Transcof",
    levelTitle: "Level Two Advanced",
    levelRange: "66%",
    desc: "Displaced unsp fx right great toe, subs for fx w delay heal",
    btnTitle: "Explore Accelerator",
  },
  {
    id: 3,
    image: "https://dummyimage.com/640x400.png/cc0000/ffffff",
    title: "Stringtough",
    levelTitle: "Level Three Mastermind",
    levelRange: "100%",
    desc: "Displaced unsp fx right great toe, subs for fx w delay heal",
    btnTitle: "Explore Accelerator",
  },
];

function ConsultColumn() {
  return (
    <div className="bg-white py-10 md:py-20">
      <Container maxWidth="lg">
        <div className="sectionTitle md:w-3/5 mx-auto text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Learn the way that best suits you
          </h3>
          <p className="text-lg">
            Learn anytime, anywhere and whatever way you like with multiple
            training formats. All Consulting.com's courses come with online,
            physical, social, live and simulated material.
          </p>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4">
          {steps.map((step) => {
            return (
              <ConsultColItem
                key={step.id}
                img={step.image}
                title={step.title}
                levelTitle={step.levelTitle}
                levelRange={step.levelRange}
                desc={step.desc}
                btnTitle={step.btnTitle}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default ConsultColumn;
