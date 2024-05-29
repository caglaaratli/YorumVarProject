import PropTypes from "prop-types";
import { getBrands, getProducts } from "../services/api"; 
import { useState, useEffect } from "react";

function NewReviewForm({ review, handleChange, handleSubmit, renderStars, handleFileChange }) {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]); 
  const [selectedBrand, setSelectedBrand] = useState(review.marka_adi);
  const [selectedProduct, setSelectedProduct] = useState(review.urun_adi); 
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [isCustomProduct, setIsCustomProduct] = useState(false); 

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchProducts = async () => { 
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchBrands();
    fetchProducts(); 
  }, []);

  const handleBrandChange = (e) => {
    if (e.target.value === "custom") {
      setIsCustomBrand(true);
      setSelectedBrand("");
      handleChange({ target: { name: "marka_adi", value: "" } });
    } else {
      setIsCustomBrand(false);
      setSelectedBrand(e.target.value);
      handleChange(e);
    }
  };

  const handleProductChange = (e) => { 
    if (e.target.value === "custom") {
      setIsCustomProduct(true);
      setSelectedProduct("");
      handleChange({ target: { name: "urun_adi", value: "" } });
    } else {
      setIsCustomProduct(false);
      setSelectedProduct(e.target.value);
      handleChange(e);
    }
  };

  const handleCustomBrandChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setSelectedBrand(formattedValue);
    handleChange({ target: { name, value: formattedValue } });
  };

  const handleCustomProductChange = (e) => { 
    const { name, value } = e.target;
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    setSelectedProduct(formattedValue);
    handleChange({ target: { name, value: formattedValue } });
  };

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
        encType="multipart/form-data" // Formun dosya yüklemeyi desteklemesi için eklenir
      >
        <div
          className="form-container"
          style={{ display: "flex", flexDirection: "column", gap: "11px" }}
        >
          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="urun_adi" style={{ flex: "1" }}>
              Product Name:
            </label>
            <select
              id="urun_adi"
              name="urun_adi"
              value={isCustomProduct ? "custom" : selectedProduct}
              onChange={handleProductChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <option value="">Select product</option>
              {products.map((product, index) => (
                <option key={index} value={product.product_name}>
                  {product.product_name}
                </option>
              ))}
              <option value="custom">Add New Product</option>
            </select>
          </div>

          {isCustomProduct && (
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="customProduct" style={{ flex: "1" }}>
                New Product name:
              </label>
              <input
                id="customProduct"
                name="urun_adi"
                value={selectedProduct}
                onChange={handleCustomProductChange}
                placeholder="Yeni ürün adı girin"
                style={{
                  flex: "2",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="marka_adi" style={{ flex: "1" }}>
              Marka:
            </label>
            <select
              id="marka_adi"
              name="marka_adi"
              value={isCustomBrand ? "custom" : selectedBrand}
              onChange={handleBrandChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <option value="">Seelect Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand.brand_name}>
                  {brand.brand_name}
                </option>
              ))}
              <option value="custom">Add New Brand</option>
            </select>
          </div>

          {isCustomBrand && (
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="customBrand" style={{ flex: "1" }}>
                New Brand Name:
              </label>
              <input
                id="customBrand"
                name="marka_adi"
                value={selectedBrand}
                onChange={handleCustomBrandChange}
                placeholder="Yeni marka adı girin"
                style={{
                  flex: "2",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
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
          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
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

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
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

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="kargo_paket_puani" style={{ flex: "2" }}>
              Cargo Packaging Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("kargo_paket_puani")}
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="teslimat_puani" style={{ flex: "2" }}>
              Delivery Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("teslimat_puani")}
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="fiyat_puani" style={{ flex: "2" }}>
              Price Performance score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("fiyat_puani")}
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="urun_kalite_puani" style={{ flex: "2" }}>
              Product Quality Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("urun_kalite_puani")}
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="musteri_hizmetleri_puani" style={{ flex: "2" }}>
              Customer Services Score:
            </label>
            <div style={{ flex: "2", display: "flex" }}>
              {renderStars("musteri_hizmetleri_puani")}
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
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
              <label htmlFor="urun_orj_yes">Yes</label>
              <input
                type="radio"
                id="urun_orj_no"
                name="urun_orj"
                value="0"
                checked={review.urun_orj === "0"}
                onChange={handleChange}
              />
              <label htmlFor="urun_orj_no">No</label>
            </div>
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="photo" style={{ flex: "1" }}>
              Photo:
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              style={{
                flex: "2",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
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
  handleFileChange: PropTypes.func.isRequired,
};

export default NewReviewForm;
