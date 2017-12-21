import React from 'react';
import { Link } from 'react-router-dom';
import Exclamation from '../recipes/Exclamation';

const NotFoundPage = () => (
  <div>
    <Exclamation>
      <p className="text-muted" style={{ marginTop: 200, fontSize: 20 }}> 404 Sorry Page Not Found <Link to="/">Go Home</Link></p>
    </Exclamation>
  </div>
);
export default NotFoundPage;

