const putFile = file => {
  const BucketName = 'cc-project-bucket11'; // S3의 버킷 이름
  const region = 'us-east-1';
  const accessKeyId = 'AKIAVM2MIAATSN3SFGG6'; // IAM에서 생성한 사용자의 accessKeyId
  const secretAccessKey = 'mdCqu7JYMBdp2Y2at4R+3KlI1Q93IyA+Nz4i+ZTZ'; // IAM에서 생성한 사용자의 secretAccessKey
  
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