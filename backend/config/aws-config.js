import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
AWS.config.update({ region: "us-east-1" });
const s3 = new AWS.S3();
const S3_BUCKET = process.env.BUCKET_NAME;

export { s3, S3_BUCKET };