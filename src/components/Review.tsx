import styled from "@emotion/styled";
import React from "react";
import Rating from "./Rating";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewerName = styled.span`
  font-weight: bold;
`;

const ReviewText = styled.p`
  margin: 0;
`;

interface ReviewProps {
  reviewer: string;
  rating: number;
  text: string;
}

const Review: React.FC<ReviewProps> = ({ reviewer, rating, text }) => {
  return (
    <ReviewContainer>
      <ReviewHeader>
        <ReviewerName>{reviewer}</ReviewerName>
        <Rating rating={rating} />
      </ReviewHeader>
      <ReviewText>{text}</ReviewText>
    </ReviewContainer>
  );
};

export default Review;
