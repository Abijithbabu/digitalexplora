import { brandLogos } from "../../constants/LandingPage";

export default function ProductLogos() {
  return (
    <div className="productLogos" id="productLogo">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex overflow-x-auto px-6 md:px-0 md:grid md:grid-cols-10 md:gap-6 py-6 text-center">
          {brandLogos.map((brandlogo, i) => {
            return (
              <img
                key={i}
                src={brandlogo.src}
                alt={brandlogo.alt}
                className="object-contain w-20 md:w-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
