/**
 * @project      HRDotNet-Mobile
 * @description  Generate PDF
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-11-2024
 */

import React from 'react';

export const generatePDF = ({ children }: { children: React.ReactNode }) => {
  return `
      <html>
        <head>
          <style>
          @page {
              size: landscape;
              margin: 0;
          }
          </style>
          </head>
          <body
              style="
              background-color: #ffffff;
              background-image: linear-gradient(
                  rgba(212, 212, 212, 0.5) 1px,
                  transparent 1px
                  ),
                  linear-gradient(90deg, rgba(245, 245, 245, 0.5) 1px, transparent 1px);
              background-size: 10px 10px;
              height: 100vh;
              padding: 20px 20px 0px 20px;
              margin: 0;
              overflow: hidden;
              ">
                <!-- Header Information Start -->
              <div>
              ${children}
              </div>
          </body>
    </html>
    `;
};
