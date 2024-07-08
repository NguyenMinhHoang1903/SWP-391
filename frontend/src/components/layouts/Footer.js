
const Footer = () => {
  return (
    <div className="footer-component" style={{ backgroundColor: "rgb(185,114,74)" }} >
      <div className="container" >
        <footer
          className="d-flex flex-wrap justify-content-between align-items-center pt-2 pb-2 "
        >
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 text-white">
              © 2024 Spa Shop, Inc
            </span>
          </div>
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <img src="Logo.png" alt="" width={50} height={50}></img>
          </a>
          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.facebook.com/tolabonhaaa"
              >
                <img src="facebook.png" alt="" width={40} height={40}></img>
              </a>
            </li>
            <li className="ms-3">
              <a
                className="text-muted"
                href="https://www.instagram.com/_mnhhng.ioa_/"
              >
                <img src="instagram.png" alt="" width={40} height={40}></img>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
