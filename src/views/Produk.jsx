
"use client";

import { useEffect, useState } from "react";

export default function Produk() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    const response = await fetch("/api/products");
    const result = await response.json();
    setProducts(result.data || []);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = null;

      // Upload foto jika dipilih
      if (photo) {
        const formData = new FormData();
        formData.append("photo", photo);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.message);
        }

        photoUrl = uploadResult.photo;
      }

      // Simpan produk ke database
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          photo: photoUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Produk berhasil ditambahkan!");

      setName("");
      setPrice("");
      setPhoto(null);

      await getProducts();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manajemen Produk</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Produk</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Harga</label>
          <br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Foto Produk</label>
          <br />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => setPhoto(e.target.files[0] || null)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Tambah Produk"}
        </button>
      </form>

      <hr />

      <h2>Daftar Produk</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Rp {Number(product.price).toLocaleString("id-ID")}</p>

          {product.photo && (
            <img
              src={product.photo}
              alt={product.name}
              width="120"
              height="120"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
