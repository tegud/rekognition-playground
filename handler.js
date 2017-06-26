const AWS = require('aws-sdk');
const rek = new AWS.Rekognition();

function getLabels(bucket, image) {
    return new Promise((resolve, reject) => rek.detectLabels({
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: image
            },
        },
        MaxLabels: 10,
        MinConfidence: 50
    }, (err, data) => {
        if (err) {
            return reject(err);
        }

        resolve(data);
    ));
}

function getFaces(bucket, image) {
    return new Promise((resolve, reject) => rek.detectFaces({
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: image
            },
        }
    }, (err, data) => {
        if (err) {
            return reject(err);
        }

        resolve(data);
    ));
}

module.exports.info = (event, context, callback) => {
    Promise.all([
        getLabels('rekognition-tegud-test', '19424023_10102800025414035_3309316934660864874_n.jpg'),
        getFaces('rekognition-tegud-test', '19424023_10102800025414035_3309316934660864874_n.jpg')
    ])
    .then(data => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                labels: data[0],
                faces: data[1]
            }),
        });
    });
};
