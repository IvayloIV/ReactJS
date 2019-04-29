import React from 'react';

function Footer() {
    return (
        <footer className="container py-5">
            <div className="row text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mb-2" role="i  mg"
                    viewBox="0 0 24 24" focusable="false">
                    <title>Product</title>
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94">
                    </path>
                </svg>
                <p className="d-block mb-3 text-muted">© UniEnt - 2019. One application proudly built in BULGARIA!</p>
            </div>
        </footer>
    )
}

export default Footer;
