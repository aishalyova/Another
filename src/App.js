import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './PAGES/Home';
import AboutUs from './PAGES/AboutUs';
import NewsList from './PAGES/NewsList';
import UserList from './PAGES/UserList';
import LoginForm from './PAGES/LoginForm';
import './App.css';
import AddUser from './PAGES/AddUser';
import UniversityList from './PAGES/UniversityList';
import AddUniversity from './PAGES/AddUniversity';
import AddNews from './PAGES/AddNews';
import MainLayout from './Layout/MainLayout';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/main" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="newslist" element={<NewsList />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="adduser/:id" element={<AddUser />} />
            <Route path="universitylist" element={<UniversityList />} />
            <Route path="adduniversity/:id" element={<AddUniversity />} />
            <Route path="adduniversity" element={<AddUniversity />} />
            <Route path="addnews" element={<AddNews />} />
            <Route path="addnews/:id" element={<AddNews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
