import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays on top */}
      <Header />

      {/* Main content grows and is responsive */}
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}
