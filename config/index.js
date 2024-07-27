export const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

export const AWSS3CONFIG = {
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
};

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const AWS_API_URL = {
  USER: "/api/userS3",
  KYC: "/api/kycS3",
  WEBINAR: "/api/webinarS3",
};

export const COUNTRYAPIKEY = process.env.NEXT_PUBLIC_COUNTRYAPIKEY
