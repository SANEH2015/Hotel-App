import React from 'react';

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        {/* Services Section */}
        <div style={footerNavStyle}>
          <h6 style={footerTitleStyle}>Services</h6>
          <a href="#" style={footerLinkStyle}>Branding</a>
          <a href="#" style={footerLinkStyle}>Design</a>
          <a href="#" style={footerLinkStyle}>Marketing</a>
          <a href="#" style={footerLinkStyle}>Advertisement</a>
        </div>

        {/* Company Section */}
        <div style={footerNavStyle}>
          <h6 style={footerTitleStyle}>Company</h6>
          <a href="#" style={footerLinkStyle}>About Us</a>
          <a href="#" style={footerLinkStyle}>Contact</a>
          <a href="#" style={footerLinkStyle}>Jobs</a>
          <a href="#" style={footerLinkStyle}>Press Kit</a>
        </div>

        {/* Social Section */}
        <div style={footerNavStyle}>
          <h6 style={footerTitleStyle}>Social</h6>
          <div style={socialLinksStyle}>
            <a href="#" style={socialIconStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="#" style={socialIconStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="#" style={socialIconStyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom Text */}
      <div style={footerBottomStyle}>
        <p>&copy; 2024 Hotel App. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Footer Styles
const footerStyle = {
  backgroundColor: '#2e2e2e',
  color: '#ffffff',
  padding: '40px 20px',
  position: 'relative',
  bottom: '0',
  width: '100%',
  textAlign: 'center',
};

const footerContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  maxWidth: '1200px',
  margin: '0 auto',
};

const footerNavStyle = {
  flex: '1',
  minWidth: '220px',
  padding: '10px',
};

const footerTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#fff',
};

const footerLinkStyle = {
  display: 'block',
  color: '#ccc',
  textDecoration: 'none',
  marginBottom: '8px',
  transition: 'color 0.3s',
};

const footerLinkStyleHover = {
  color: '#ffffff',
};

const socialLinksStyle = {
  display: 'flex',
  gap: '10px',
};

const socialIconStyle = {
  color: '#fff',
  width: '24px',
  height: '24px',
  transition: 'color 0.3s',
};

const footerBottomStyle = {
  marginTop: '20px',
  fontSize: '14px',
  color: '#ccc',
};

// Hover effect for links
document.querySelectorAll('.link').forEach(item => {
  item.addEventListener('mouseover', () => {
    item.style.color = '#fff';
  });
  item.addEventListener('mouseout', () => {
    item.style.color = '#ccc';
  });
});
