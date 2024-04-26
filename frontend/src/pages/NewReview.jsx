import { useState } from 'react';
import NewReviewForm from '../components/NewReviewForm';
import { postReview } from '../services/api';

function NewReviewPage() {
  const [review, setReview] = useState({
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
  });

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const { user_id, username } = user;
    await postReview({ ...review, user_id, username });
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
    <NewReviewForm
      review={review}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      renderStars={renderStars}
    />
  );
}

export default NewReviewPage;
