import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/** lazy loading the game components */
const Home = lazy(() => import("./views/home/Home"));

const Loading = () => {
  return <p>loading...</p>;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />;
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
