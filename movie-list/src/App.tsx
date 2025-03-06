
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import WelcomePage from './components/WelcomePage';
// import MovieList from './components/MovieList';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<WelcomePage />} />
//         <Route path="/movies" element={<MovieList />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;




import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';

// Lazy load only the MovieList component
const MovieList = React.lazy(() => import('./components/MovieList'));

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<div>Loading Movies...</div>}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/movies" element={<MovieList />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
