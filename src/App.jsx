import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

/** lazy loading the game components */
const Home = lazy(() => import("./views/home/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ColorMatching = lazy(() =>
  import("./views/color-matching/ColorMatching")
);
const Snake = lazy(() => import("./views/snake-game/Snake"));
const GuessNumber = lazy(() => import("./views/guess-number/GuessNumber"));
const GuessCapitalCity = lazy(() =>
  import("./views/guess-capital-city/GuessCapitalCity")
);
const GuessAnimal = lazy(() => import("./views/guess-animal/GuessAnimal"));
const MatchPresident = lazy(() =>
  import("./views/match-president/MatchPresident")
);
const MatchCountryFlags = lazy(() =>
  import("./views/match-country-flags/MatchCountryFlags")
);

const Loading = () => {
  return <p>loading..</p>;
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route exact path="/" element={<Home />} />;
          <Route path="/color-matching" element={<ColorMatching />} />
          <Route path="/snake-game" element={<Snake />} />
          <Route path="/guess-number" element={<GuessNumber />} />
          <Route path="/guess-capital-city" element={<GuessCapitalCity />} />
          <Route path="/guess-animal" element={<GuessAnimal />} />
          <Route path="/match-president" element={<MatchPresident />} />
          <Route path="/match-country-flags" element={<MatchCountryFlags />} />
          <Route path={"*"} element={<NotFound />} />;
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
