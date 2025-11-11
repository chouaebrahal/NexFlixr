

import { useThemeStore } from "./store/useThemeStore";
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Loading from "./components/shared/Loading";

// Lazy load pages for code splitting
const Home = lazy(() => import("./components/pages/Home"));
const Movies = lazy(() => import("./components/pages/Movies"));
const Series = lazy(() => import("./components/pages/Series"));
const MediaDetailsPage = lazy(() => import("./components/pages/MediaDetailsPage"));
const BookMark = lazy(() => import("./components/pages/BookMark"));


function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="media/:type/:id" element={<MediaDetailsPage />} />
            <Route path="/bookmark" element={<BookMark />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
