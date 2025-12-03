import path from "path";
import fs from "fs/promises";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
const S3_BUCKET = process.env.BUCKET_NAME;
const s3 = new AWS.S3();
console.log("ACCESS_KEY:", process.env.AWS_ACCESS_KEY_ID);
console.log("SECRET_KEY:", process.env.AWS_SECRET_ACCESS_KEY);

export default async function pushChanges() {
  const repoPath = path.resolve(process.cwd(), ".myGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitDir}/${file}`,
          Body: fileContent,
        };

        await s3.upload(params).promise();
      }
    }

    console.log("All commits pushed to S3.");
  } catch (err) {
    console.error("Error pushing to S3 : ", err);
  }
}