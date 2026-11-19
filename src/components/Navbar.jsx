import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>MyWebsite</h2>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/produk">Produk</Link>
        <Link href="/login">Login</Link>
        <Link href="/riwayat">Riwayat</Link>
      </div>
    </nav>
  );
}