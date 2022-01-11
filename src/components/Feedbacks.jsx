import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Rating } from "react-simple-star-rating";
import { feedbackContext } from "../contexts/FeedbackContext";

const Feedback = (props) => {
    const [rating, setRating] = useState(0);
    const {
        getFeedbacks,
        feedbacks,
        addFeedback,
        getFeedbacksToEdit,
        feedbacksToEdit,
        saveEditedFeedbacks,
    } = useContext(feedbackContext);
    const params = useParams();
    useEffect(() => {
        getFeedbacks(params.id);
    }, []);

    let user = JSON.parse(localStorage.getItem("user"));
    let avgRate = 0;
    let idFeedTemp,
        checkFeed = false,
        myRate = 0;
    let count = 0;
    feedbacks ? (avgRate /= feedbacks.length) : <></>;

    if (feedbacks) {
        feedbacks.forEach((item) => {
            // console.log(item.productId, params.id)
            // console.log(item.userId, user.id)

            if (
                item.productId == params.id &&
                item.userId === user.id
            ) {
                idFeedTemp = item.id;
                checkFeed = true;
                myRate = item.rate * 20;
            }
            if (item.productId == params.id) {
                count++;
                avgRate += item.rate;
            }
        });
    }
    avgRate /= count;
    if (count === 0) {
        // console.log('sadf')
        avgRate = 0;
    }

    const handleRating = (rate) => {
        // console.log(rate)
        rate /= 20;
        if (checkFeed) {
            let editRate = {
                owner: user.id,
                productId: params.id,
                rate: rate,
                id: idFeedTemp,
            };
            saveEditedFeedbacks(editRate);
        } else {
            addFeedback(user.id, params.id, rate);
        }
    };
    return (
        <div>
            {feedbacks ? (
                <Rating
                    onClick={handleRating}
                    ratingValue={myRate} /* Rating Props */
                />
            ) : (
                <h2>Loading</h2>
            )}

            <p style={{ color: "#9E9E9E", justifyContent: "space-between" }}>
                Рейтинг товара: ({Math.round(avgRate * 10) / 10}), количество отзывов (
                {feedbacks ? feedbacks.length : 0}){" "}
            </p>
        </div>
    );
};

export default Feedback;