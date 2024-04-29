import PropTypes from "prop-types";

function NewReviewForm({ review, handleChange, handleSubmit, renderStars }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f7f7f7",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "500px",
          margin: "auto",
          padding: "15px",
          border: "1px solid #ccc",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <div
          className="form-container"
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="urun_adi" style={{ flex: "1" }}>
              Product Name:
            </label>
            <input
              id="urun_adi"
              name="urun_adi"
              value={review.urun_adi}
              onChange={handleChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="site_adi" style={{ flex: "1" }}>
               Site :
            </label>
            <input
              id="site_adi"
              name="site_adi"
              value={review.site_adi}
              onChange={handleChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="satici_isim" style={{ flex: "1" }}>
              Seller Name:
            </label>
            <input
              id="satici_isim"
              name="satici_isim"
              value={review.satici_isim}
              onChange={handleChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="teslimat_suresi" style={{ flex: "1" }}>
              Delivery Time:
            </label>
            <input
              id="teslimat_suresi"
              name="teslimat_suresi"
              type="number"
              value={review.teslimat_suresi}
              onChange={handleChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>


          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="kargo_paket_puani" style={{ flex: "2" }}>
              Cargo Packaging Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("kargo_paket_puani")}
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="teslimat_puani" style={{ flex: "2" }}>
              Delivery Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("teslimat_puani")}
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="fiyat_puani" style={{ flex: "2" }}>
            Price Performance score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("fiyat_puani")}
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="urun_kalite_puani" style={{ flex: "2" }}>
            Product Quality Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("urun_kalite_puani")}
            </div>
          </div>

    
          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="musteri_hizmetleri_puani" style={{ flex: "2" }}>
              Customer Services Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("musteri_hizmetleri_puani")}
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="urun_orj" style={{ flex: "2" }}>
              Is The Product Original ? :
            </label>
            <div style={{ flex: "2", display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                id="urun_orj_yes"
                name="urun_orj"
                value="1"
                checked={review.urun_orj === "1"}
                onChange={handleChange}
              />
              <label htmlFor="urun_orj_yes">Evet</label>
              <input
                type="radio"
                id="urun_orj_no"
                name="urun_orj"
                value="0"
                checked={review.urun_orj === "0"}
                onChange={handleChange}
              />
              <label htmlFor="urun_orj_no">Hayır</label>
            </div>
          </div>

          <div
            className="form-group"
            style={{ display: "flex", alignItems: "center" }}
          >
            <label htmlFor="yorum" style={{ flex: "1" }}>
              Comment:
            </label>
            <textarea
              id="yorum"
              name="yorum"
              value={review.yorum}
              onChange={handleChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                minHeight: "100px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

NewReviewForm.propTypes = {
  review: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  renderStars: PropTypes.func.isRequired,
};

export default NewReviewForm;
