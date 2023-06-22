import styled from "@emotion/styled";
import React from "react";
import StarRatings from "react-star-ratings";
import Review from "./Review";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
`;

const BookCover = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-right: 20px;
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.h1`
  margin: 0;
`;

const BookAuthor = styled.h2`
  margin: 0;
`;

const BookDescription = styled.p`
  margin-top: 20px;
`;

const ReviewsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const AuthorBioContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const ReviewTitleContainer = styled.h2`
  margin: 0;
`;

const AuthorBioTitle = styled.h3`
  margin: 0;
`;

const AuthorBioText = styled.p`
  margin-top: 10px;
`;
const AverageRatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const AverageRatingText = styled.span`
  margin-left: 5px;
  font: 14px;
`;

interface BookPageProps {
  title: string;
  author: string;
  coverImageUrl: string;
  description: string;
  authorBio: string;
}

const BookPage: React.FC<BookPageProps> = ({
  title,
  author,
  coverImageUrl,
  description,
  authorBio,
}) => {
  const reviews = [
    {
      reviewer: "John Doe",
      rating: 4,
      text: "I really enjoyed this book. The story was captivating and the characters were well-developed.",
    },
    {
      reviewer: "Jane Smith",
      rating: 5,
      text: "An amazing book! I could not put it down. Highly recommended.",
    },
  ];

  const calculateAverageRating = () => {
    let averageRating = 0;
    reviews.forEach((review) => (averageRating += review.rating));
    return averageRating / reviews.length;
  }
 
  return (
    <Container>
      <BookInfo>
        <BookCover src={coverImageUrl} alt={`${title} book cover`} />
        <BookDetails>
          <BookTitle>{title}</BookTitle>
          <BookAuthor>by {author}</BookAuthor>
          <AverageRatingContainer>
            <StarRatings
              rating={calculateAverageRating()}
              starRatedColor="gold"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="2px"
            />
            <AverageRatingText>
              {calculateAverageRating().toFixed(1)} average rating
            </AverageRatingText>
          </AverageRatingContainer>
          <BookDescription>{description}</BookDescription>
        </BookDetails>
      </BookInfo>
      <AuthorBioContainer>
        <AuthorBioTitle>About {author}</AuthorBioTitle>
        <AuthorBioText>{authorBio}</AuthorBioText>
      </AuthorBioContainer>
      <ReviewTitleContainer>Reviews</ReviewTitleContainer>
      <ReviewsContainer>
        {reviews.map((review, index) => (
          <Review
            key={index}
            reviewer={review.reviewer}
            rating={review.rating}
            text={review.text}
          />
        ))}
      </ReviewsContainer>
    </Container>
  );
};

export default BookPage;
