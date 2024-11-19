// import React from 'react'
// import {Link} from 'react-router-dom'
// export default function Footer() {
//   return (
//     <div >
//       <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
//     <div className="col-md-4 d-flex align-items-center">
//       <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
//       </Link>
//       <span className="text-muted">© 2021 GoFood, Inc</span>
//     </div>

//     <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      
//     </ul>
//   </footer>
//     </div>
//   )
// }


import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links (optional)
import './Footer.css'
export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <span>© 2021 GoFood, Inc</span>
          </div>
          <div className="footer-right">
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
