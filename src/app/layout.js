import "./globals.css";
import Navbar from "../components/Navbar";


export const metadata = {
    title: "test",
    description: "Belajar Next.js",
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body className="min-h-screen flex flex-col">

                <Navbar />

                <main className="flex-1">
                    {children}
                </main>

             

            </body>
        </html>
    );
}