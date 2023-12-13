// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProfileForm from './components/EditProfileForm/EditProfileForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/edit-profile" element={<EditProfileForm />} />
          {/* Add other routes if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
