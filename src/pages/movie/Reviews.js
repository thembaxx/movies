import React, { useState, useEffect } from "react";
import styles from "./reviews.module.css";

import { getReviews } from "../../tmdb/getData";
import { formatDate } from "../../helpers";

function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const response = await getReviews(id);

      let items = [];
      if (response?.length > 6) {
        items = response.slice(0, 6);
      } else {
        items = [...response];
      }

      setReviews(items);

      setIsLoading(false);
    }

    getData();

    return () => {
      setReviews([]);
      setIsLoading(false);
    };
  }, [id]);

  let content = <div>No user reviews</div>;
  if (reviews.length > 0) {
    content = (
      <div className="mt-3">
        {reviews?.map((review) => {
          let rating;
          if (review?.author_details?.rating) {
            rating = (
              <div className={`${styles.rating}`}>
                <i
                  className="bi bi-star-fill"
                  style={{
                    marginRight: 6,
                    fontSize: ".75rem",
                    color: "#f3ce13",
                  }}
                ></i>
                <span>{review?.author_details?.rating}/10</span>
              </div>
            );
          }

          let date = review?.created_at?.split("T");
          let dateStr = formatDate(date[0]);

          return (
            <div key={review.id} className={`${styles.container} mb-3`}>
              <div className={`${styles.author}`}>
                {review.author}{" "}
                <span className={`${styles.username}`}>
                  @{review?.author_details?.username}
                </span>
              </div>
              {rating}
              <p className={`${styles.content}`}>{review.content}</p>
              <span className={`${styles.date}`}>{dateStr}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 px-3 py-4">
      <div className="d-flex align-items-center justify-content-between">
        {/* <h6 className={`${styles.title}`}>User reviews</h6> */}
        {/* SPINNER */}
        {isLoading && (
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Reviews;
