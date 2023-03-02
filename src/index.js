import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
//import AppAnt from "./AppAntHome/AppAnt/AppAnt";
//import AppMui from "./AppMui/AppMui"
import ProductPage from  "./pages/ProductPage/ProductPage";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<ProductPage />);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
//root.render(<AppAnt />);
//root.render(<AppMui />);
