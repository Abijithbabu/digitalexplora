export const BUCKET_URL = "https://digiexplora.s3.ap-south-1.amazonaws.com";

export const AWSS3CONFIG = {
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
};

export const BASE_URL = "http://localhost:5000";
// export const BASE_URL = "https://dev.digitalexplora.com";

export const AWS_API_URL = {
  USER: "/api/userS3",
  KYC: "/api/kycS3",
  WEBINAR: "/api/webinarS3",
};

export const COUNTRYAPIKEY =
  "WGlnam5ncjBaWDFuY3B6T3JOVW9vajh2dERpQ291bkVONGplUGNBTA==";
