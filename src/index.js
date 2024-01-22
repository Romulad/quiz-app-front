import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom"
import './bootstrap/bootstrap.css';
import './bootstrap/bootstrap-icons.min.css';
import './global.css';

import { RouterPartterns } from "./urls"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={RouterPartterns} />
  </React.StrictMode>
);
