"use client";
import { useCreateAReviewMutation } from "@/redux/api/reviewApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Review {
  name: string;
  email: string;
  rating: string;
  message: string;
}

const MyReviews = () => {
  const { data, isLoading } = useGetSingleUserQuery({});

  const [activeTab, setActiveTab] = useState<"leaveReview" | "myReviews">(
    "leaveReview"
  );

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (data) {
      setName(data.fullName);
      setEmail(data.email);
    }
  }, [data]);
  const [createAReview] = useCreateAReviewMutation();

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && rating && message) {
      setReviews((prevReviews) => [
        ...prevReviews,
        { name, email, rating, message },
      ]);
      setName("");
      setEmail("");
      setRating("");
      setMessage("");
    }
    const dataInfo = {
      message: message,
      rating: Number(rating),
      photo: data.profilePhoto,
      name: data.fullName,
      email: data.email,
    };
    try {
      const res = await createAReview(dataInfo).unwrap();
      if (res.id) {
        toast.success("Review Submit successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", margin: "auto" }}>
      <h1>Review System</h1>
      <div style={{ display: "flex", cursor: "pointer" }}>
        <div
          onClick={() => setActiveTab("leaveReview")}
          style={{
            padding: "10px",
            borderBottom:
              activeTab === "leaveReview" ? "2px solid blue" : "none",
            fontWeight: activeTab === "leaveReview" ? "bold" : "normal",
            flex: 1,
            textAlign: "center",
          }}
        >
          Leave a Review
        </div>
        <div
          onClick={() => setActiveTab("myReviews")}
          style={{
            padding: "10px",
            borderBottom: activeTab === "myReviews" ? "2px solid blue" : "none",
            fontWeight: activeTab === "myReviews" ? "bold" : "normal",
            flex: 1,
            textAlign: "center",
          }}
        >
          My Reviews
        </div>
      </div>

      {activeTab === "leaveReview" && (
        <div style={{ marginTop: "20px" }}>
          <h2>Leave a Review</h2>
          <form onSubmit={handleReviewSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <option value="">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            ></textarea>
            <br />
            <button
              type="submit"
              style={{
                padding: "10px 15px",
                backgroundColor: "#EC5312",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {activeTab === "myReviews" && (
        <div style={{ marginTop: "20px" }}>
          <h2>My Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet!</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {reviews.map((review, index) => (
                <li
                  key={index}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginBottom: "10px",
                  }}
                >
                  <h3>
                    {review.name} ({review.email})
                  </h3>
                  <p>Rating: {review.rating} Stars</p>
                  <p>{review.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
