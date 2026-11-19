
"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      setUsers(result.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Data Pengguna</h1>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>
                <img
                  src={
                    user.photo ||
                    "https://placehold.co/80x80?text=User"
                  }
                  alt="Foto pengguna"
                  width="60"
                  height="60"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </td>

              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <button>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
