import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className="footer text-center py-3">
      <div className="container">
        <h6 className="mb-2">
          &copy; {new Date().getFullYear()} - All rights reserved to Simon
          B.Stirling
        </h6>
        <ul className="list-inline">
          <li className="list-inline-item">
            <HashLink to="/privacy" className="text-decoration-none">
              Privacy Policy
            </HashLink>
          </li>
          <li className="list-inline-item mx-2">|</li>
          <li className="list-inline-item">
            <HashLink to="/terms" className="text-decoration-none">
              Terms of Usage
            </HashLink>
          </li>
        </ul>
        <div className="mt-3">
          <img src="./images/guy.png" width={100} alt="I'm the BestDev" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
