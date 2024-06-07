import { User } from "react-feather";
import '../styles/components/footer.css';
import { useAuth } from "../authContext";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <span>
        Made by 
        <a href="https://github.com/LucaBla" target="_blank">
          Luca Blazevic
        </a>
      </span>
    </div>
  );
}

export default Footer;