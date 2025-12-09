import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductForm.css";
import { createProduct, fetchProduct, updateProduct } from "../api/products.js";

const CATEGORIES = [
  { id: 1, label: "Man" },
  { id: 2, label: "Woman" },
  { id: 3, label: "Shoes" },
  { id: 4, label: "Accessories" },
];

function ProductForm({ mode }) {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    category_id: "",
    subcategory_id: "",
    price: "",
    old_price: "",
    available: 1,
    in_sale: 0,
    sizes: [{ size: "S", quantity: 0 }],
  });

  const [subcategories, setSubcategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(isEdit);

  // VALIDATION CLIENT-SIDE

  function validate() {
    const newErrors = {};

    // Mandatory name
    if (!form.name.trim()) newErrors.name = "Name is required";

    // Mandatory category
    if (!form.category_id) newErrors.category_id = "Please select a category";

    // Price
    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    // If on SALE → old_price mandatory
    if (form.in_sale === 1) {
      if (!form.old_price || Number(form.old_price) <= 0) {
        newErrors.old_price = "Original price is required for sale items";
      }
    }

    // Size validation
    form.sizes.forEach((s, i) => {
      if (!s.size) newErrors[`size_${i}`] = "Size required";
      if (s.quantity < 0) newErrors[`qty_${i}`] = "Quantity cannot be negative";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // LOAD PRODUCT (EDIT MODE)

  useEffect(() => {
    if (!isEdit) return;

    async function loadProduct() {
      try {
        const data = await fetchProduct(id);

        setForm({
          name: data.name,
          description: data.description,
          image: data.image,
          category_id: data.category_id,
          subcategory_id: data.subcategory_id,
          price: data.price,
          old_price: data.old_price,
          available: data.available,
          in_sale: data.in_sale,
          sizes: data.sizes || [{ size: "S", quantity: 0 }],
        });

        loadSubcategories(data.category_id);
      } catch (err) {
        setServerError("Error loading product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, []);

  // Load subcategories
  async function loadSubcategories(category_id) {
    if (!category_id) return;

    const res = await fetch(
      `http://localhost:4000/subcategories?category_id=${category_id}`
    );
    const data = await res.json();
    setSubcategories(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "category_id") {
      setForm((prev) => ({
        ...prev,
        category_id: Number(value),
        subcategory_id: "",
      }));
      loadSubcategories(value);
    } else if (name === "in_sale") {
      setForm((prev) => ({
        ...prev,
        in_sale: e.target.checked ? 1 : 0,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setForm((prev) => ({ ...prev, image: data.imageUrl }));
  }

  function addSize() {
    setForm((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", quantity: 0 }],
    }));
  }

  function updateSize(i, field, value) {
    const updated = [...form.sizes];
    updated[i][field] = value;
    setForm((prev) => ({ ...prev, sizes: updated }));
  }

  // SUBMIT

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    const payload = {
      ...form,
      category_id: Number(form.category_id),
      subcategory_id: Number(form.subcategory_id),
      price: Number(form.price),
      old_price: form.in_sale === 1 ? Number(form.old_price) : null,
    };

    try {
      if (isEdit) await updateProduct(id, payload);
      else await createProduct(payload);

      navigate("/dashboard");
    } catch (err) {
      setServerError("Error saving product");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <section className="form-page">
      <h1>{isEdit ? "Edit Product" : "New Product"}</h1>

      {serverError && <p className="error">{serverError}</p>}

      <form className="form" onSubmit={handleSubmit}>

        {/* NAME */}
        <div className="form__group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="form__group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        {/* IMAGE */}
        <div className="form__group">
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>

        {/* CATEGORY */}
        <div className="form__group">
          <label>Category</label>
          <select name="category_id" value={form.category_id} onChange={handleChange}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          {errors.category_id && <p className="error">{errors.category_id}</p>}
        </div>

        {/* SUBCATEGORY */}
        {subcategories.length > 0 && (
          <div className="form__group">
            <label>Subcategory</label>
            <select
              name="subcategory_id"
              value={form.subcategory_id}
              onChange={handleChange}
            >
              <option value="">Select subcategory</option>
              {subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* PRICE */}
        <div className="form__group">
          <label>Price (€)</label>
          <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        {/* SALE TOGGLE */}
        <div className="form__group">
          <label>
            <input type="checkbox" name="in_sale" checked={form.in_sale === 1} onChange={handleChange} />
            On SALE
          </label>
        </div>

        {/* OLD PRICE */}
        {form.in_sale === 1 && (
          <div className="form__group">
            <label>Original Price (€)</label>
            <input
              type="number"
              step="0.01"
              name="old_price"
              value={form.old_price}
              onChange={handleChange}
            />
            {errors.old_price && <p className="error">{errors.old_price}</p>}
          </div>
        )}

        {/* SIZES */}
        <h3>Sizes & Quantity</h3>
        {form.sizes.map((s, i) => (
          <div key={i} className="size-row">
            <select value={s.size} onChange={(e) => updateSize(i, "size", e.target.value)}>
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            {errors[`size_${i}`] && <p className="error">{errors[`size_${i}`]}</p>}

            <input
              type="number"
              min="0"
              value={s.quantity}
              onChange={(e) => updateSize(i, "quantity", Number(e.target.value))}
            />
            {errors[`qty_${i}`] && <p className="error">{errors[`qty_${i}`]}</p>}
          </div>
        ))}

        <button type="button" onClick={addSize} className="btn">
          + Add Size
        </button>

        <button type="submit" className="btn btn--primary">
          {isEdit ? "Save changes" : "Create product"}
        </button>
      </form>
    </section>
  );
}

export default ProductForm;
