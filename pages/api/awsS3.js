import aws from "aws-sdk";

const awsS3Config = {
  accessKeyId: process.env.REACT_APP_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  region: process.env.REACT_APP_REGION,
};

aws.config.update(awsS3Config);
var s3 = new aws.S3();

export default async (req, res) => {
  try {
    const { key, type } = JSON.parse(req.body);

    const fileParams = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: key,
      ContentType: type,
      ACL: "public-read",
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.statusCode = 200;
    res.json({ url });
  } catch (error) {
    console.error(error);
  }
};
