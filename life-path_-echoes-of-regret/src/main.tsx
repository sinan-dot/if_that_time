import React from 'react'; // 【新增这一行】
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // 这里的 .tsx 后缀最好去掉
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);