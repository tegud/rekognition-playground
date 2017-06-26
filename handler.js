const AWS = require('aws-sdk');
const rek = new AWS.Rekognition();

module.exports.info = (event, context, callback) => {
    rek.detectLabels({
        Image: {
            S3Object: {
                Bucket: "rekognition-tegud-test",
                Name: "19424023_10102800025414035_3309316934660864874_n.jpg",
            },
        },
        MaxLabels: 10,
        MinConfidence: 50
    }, (err, data) => {
        if (err) {
            return callback(err);
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(data),
        });
    });
};
