import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App max-w-screen-lg mx-auto">
      <BrowserRouter>
        <Layout>
        <Toaster />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<App />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
