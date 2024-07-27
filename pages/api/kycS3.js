import aws from "aws-sdk";

const awsS3Config = {
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
};

aws.config.update(awsS3Config);
var s3 = new aws.S3();

export default async (req, res) => {
  try {
    const { id, type, name, folder, subFolder } = JSON.parse(req.body);

    const fileParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: `users/${id}/kyc/${folder}/${subFolder}/${name}`,
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
