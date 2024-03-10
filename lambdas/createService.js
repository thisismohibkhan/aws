const { CreateBucketCommand, ListBucketsCommand, S3Client } = require("@aws-sdk/client-s3");


exports.handler = async (event) => {
    let response;
    try {
       const  s3client = new S3Client({});
        const command = new CreateBucketCommand({
            Bucket: event.bucketName,
          });
          response = await s3client.send(command);
          if(response.$metadata.httpStatusCode === 200){
            return {statusCode : 200, location: response.Location};
          }
          return {statusCode : response.$metadata.httpStatusCode, body:response.code};
        } catch (err) {
         console.log('Hello 1');
         console.log(err.Code);
         response = {statusCode : 400, body:err.Code.toString()};
        }
        return response;
};
  