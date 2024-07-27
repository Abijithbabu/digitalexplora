import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@material-ui/core";

export default function ProductLogos(json) {
  return (
    <div className="productLogos">
      <Container maxWidth="xl">
        <div className="md:grid md:grid-cols-10 md:gap-6 py-6 text-center">
          <Image
            src="/img/logos/shopify.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/amazon.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/alibaba.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/allbirds.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/shopify.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/amazon.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/alibaba.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/allbirds.png"
            width="100%"
            height="40px"
            className="object-contain"
          />

          <Image
            src="/img/logos/alibaba.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
          <Image
            src="/img/logos/allbirds.png"
            width="100%"
            height="40px"
            className="object-contain"
          />
        </div>
      </Container>
    </div>
  );
}
