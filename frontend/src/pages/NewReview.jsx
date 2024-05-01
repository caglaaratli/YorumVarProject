import { useState } from 'react';
import NewReviewForm from '../components/NewReviewForm';
import { postReview } from '../services/api';

function NewReviewPage() {
  const initialReviewState = {
    urun_adi: "",
    site_adi: "",
    satici_isim: "",
    teslimat_suresi: "",
    kargo_paket_puani: "",
    teslimat_puani: "",
    fiyat_puani: "",
    urun_kalite_puani: "",
    musteri_hizmetleri_puani: "",
    urun_orj: "",
    yorum: "",
  };

  const [review, setReview] = useState(initialReviewState);
  const [message, setMessage] = useState(null);


  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const { user_id, username } = user;
    try {
      const response = await postReview({ ...review, user_id, username });
      if (response.data.message === "Review added successfully") {
        setMessage(response.data.message);
        setReview(initialReviewState); 
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Review submission failed. please try again later.");
      }
    }
  };

  const renderStars = (category) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            cursor: "pointer",
            color: i <= review[category] ? "#FFD700" : "#A9A9A9",
          }}
          onClick={() => handleStarClick(category, i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleStarClick = (category, count) => {
    setReview({ ...review, [category]: count });
  };

  return (
   <div>
      {message && (
        <div className="text-center p-3 mb-2 bg-green-100 border border-green-400 text-green-700">
          {message}
        </div>
      )}
      <NewReviewForm
        review={review}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        renderStars={renderStars}
      />
    </div>
  );
}

export default NewReviewPage;
