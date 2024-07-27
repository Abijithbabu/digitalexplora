import aws from "aws-sdk";
import { AWSS3CONFIG } from "../../config";

aws.config.update(AWSS3CONFIG);
var s3 = new aws.S3();

export default async (req, res) => {
  try {
    const { courseId, type, name, moduleId } = JSON.parse(req.body);

    console.log(courseId, type, name, moduleId);

    const fileParams = {
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: `courses/${courseId}/modules/${moduleId}/image/${name}`,
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
