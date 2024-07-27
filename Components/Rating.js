import React from "react";
import Rate from "@material-ui/lab/Rating";

function Rating({ review }) {
  return <Rate name="read-only" value={review.rating} readOnly />;
}

export default Rating;
