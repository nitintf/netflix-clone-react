const Footer = ({ bgColor = "#000" }) => {
  return (
    <footer className="footer" style={{ backgroundColor: bgColor }}>
      <div className="footer__container">
        <div className="footer__title">
          <h4>Questions? Call 000-800-040-1843</h4>
        </div>
        <div className="footer__links">
          <div className="footer__column">
            <span>FAQ</span>
            <span>Investor Relations</span>
            <span>Privacy</span>
            <span>Speed Test</span>
          </div>
          <div className="footer__column">
            <span>Help Center</span>
            <span>Jobs</span>
            <span>Cookie Preferences</span>
            <span>Legal Notices</span>
          </div>
          <div className="footer__column">
            <span>Account</span>
            <span>Ways to Watch</span>
            <span>Corporate Information</span>
            <span>Only on Netflix</span>
          </div>
        </div>
        <span className="footer__location">Netflix India</span>
      </div>
    </footer>
  );
};

export default Footer;
