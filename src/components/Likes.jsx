import React, { useContext, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useParams } from "react-router";
import { likesContext } from "../contexts/LikesContext";
const Likes = () => {
    const { getLikes, likes, addLike, saveEditedLikes } =
        useContext(likesContext);
    const params = useParams();
    useEffect(() => {
        getLikes(params.id);
    }, []);
    let user = JSON.parse(localStorage.getItem("user"));
    let idFeedTemp,
        checkFeed,
        myRate = 0;
    let count = 0;
    let avgRate = 0;

    if (likes) {
        // console.log(likes);
        likes.forEach((item) => {
            if (
                item.productId == params.id &&
                item.userId === user.id
            ) {
                idFeedTemp = item.id;
                checkFeed = true;
                myRate = item.status;
            }
            if (item.productId == params.id) {
                count++;
                avgRate += item.status;
            }
        });
    }
    const handleRating = () => {
        if (checkFeed) {
            // console.log('here');
            let editLike = {
                userId: user.id,
                productId: params.id,
                status: myRate === true ? false : true,
                id: idFeedTemp,
            };
            saveEditedLikes(editLike);
        } else {
            addLike(user.id, params.id, 1);
        }
    };
    return (
        <>
            {likes ? (
                <>
                    <BsFillHeartFill
                        style={{
                            color: myRate === true ? "red" : "pink",

                            fontSize: "30px",
                            marginLeft: "10px",
                            cursor: "pointer",
                        }}
                        onClick={handleRating}
                    />
                    <span style={{ marginLeft: "5px", fontSize: "25px" }}>
                        {likes.filter((item) => item.status === true).length}
                    </span>
                </>
            ) : (
                <h2>Load</h2>
            )}
        </>
    );
};
export default Likes;