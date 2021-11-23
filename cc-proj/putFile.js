const putFile = file => {
  const BucketName = ''; // S3의 버킷 이름
  const region = '';
  const accessKeyId = ''; // IAM에서 생성한 사용자의 accessKeyId
  const secretAccessKey = ''; // IAM에서 생성한 사용자의 secretAccessKey
  
  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey
  }); 
  
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BucketName,
      Key: 'project/image/' + file.name,
      Body: file,
      ACL: "public-read"
    }
  });
  
  const promise = upload.promise();

  promise.then(
    function(data) {
      alert('Successfully uploaded photo.');
      console.log("Successfully uploaded photo.");
    },
    function(err) {
      alert('There was an error uploading your photo: ', err.message);
      return console.log(err);
    }
  );
};
