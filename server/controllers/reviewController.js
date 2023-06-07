const reviewModel = require("../model/reviewModel");

exports.addReview = (req, res) => {
    const reviewData = req.body
    try {
        if (reviewData) {
            const newReview = new reviewModel({
                productId:reviewData.productId,
                reviewerName: reviewData.reviewerName,
                reviewerEmail: reviewData.reviewerEmail,
                rating: reviewData.rating,
                comment: reviewData.comment,
                date: reviewData.date,
            }).save(error => {
                if (error) {
                    return res.json(
                        {
                            status: "Error",
                            message:error,
                        }
                    )
                } else {
                    return res.json(
                        {
                            status: "OK",
                            message: "Your review has been submitted"
                        }
                    )
                }
            })
        } else {
            res.json({
                status: "Error",
                message: "Please check your submission"
            })
        }

    } catch (error) {
        res.json({
            status: "Error",
            message: error
        })
    }

}