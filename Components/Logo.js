function Logo({ light, ...props }) {
  return (
    <img src={light ? "/img/logo-light.png" : "/img/logo.png"} {...props} />
  );
}

export default Logo;
