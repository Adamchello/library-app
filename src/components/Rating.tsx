import styled from "@emotion/styled";
import React from "react";

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  font-size: 24px;
  color: #f5c518;
  margin-right: 4px;
`;

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index}>{index < rating ? "★" : "☆"}</Star>
  ));

  return <RatingContainer>{stars}</RatingContainer>;
};

export default Rating;
