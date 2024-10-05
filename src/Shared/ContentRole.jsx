import { Routes, Route } from 'react-router-dom';
import RoleBasedHome from '../Components/RoleBasedHome';
import { NotFoundPage } from '../Pages/NotFoundPage';

export const ContentRole = () => {
  return (
    <Routes>
      <Route path="/ansar" element={<RoleBasedHome />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};