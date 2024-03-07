import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/** lazy loading the game components */
const Home = lazy(() => import("./views/home/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ColorMatching = lazy(() =>
  import("./views/color-matching/ColorMatching")
);

const Loading = () => {
  return <p>loading...</p>;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />;
          <Route path="/color-matching" element={<ColorMatching />} />
          <Route path={"*"} element={<NotFound />} />;
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
