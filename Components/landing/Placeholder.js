import React from "react";
import ContentLoader from "react-content-loader";

const Placeholder = (props) => (
  <ContentLoader
    speed={2}
    width={320}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="17" y="225" rx="2" ry="2" width="372" height="16" />
    <rect x="23" y="480" rx="2" ry="2" width="140" height="10" />
    <rect x="8" y="-23" rx="2" ry="2" width="400" height="224" />
    <rect x="19" y="258" rx="2" ry="2" width="372" height="16" />
  </ContentLoader>
);

export default Placeholder;
