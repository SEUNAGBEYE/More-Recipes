import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import Exclamation from '../recipes/Exclamation';

const NotFoundPage = () => (
  <div>
    <Navbar />
    <Exclamation>
      <p className="text-muted" style={{ marginTop: 200, fontSize: 20 }}> 404 Sorry Page Not Found <Link to="/">Go Home</Link></p>
    </Exclamation>
    <Footer />
  </div>
);
export default NotFoundPage;

