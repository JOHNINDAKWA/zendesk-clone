import { FiSearch } from "react-icons/fi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import "./Topbar.css";
import { SiZendesk } from "react-icons/si";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <SiZendesk title="Zendesk" />

        <span className="ticket-title">New Ticket</span>
        <IoClose className="close-icon" title="Close Ticket" />
        <span className="divider" />
        <button className="add-btn">+ Add</button>
      </div>

      <div className="topbar-right">
        <FiSearch className="topbar-icon" title="Search" />
        <HiOutlineSquares2X2 className="topbar-icon" title="Apps" />
        <img
          src="https://i.pravatar.cc/30"
          alt="User Avatar"
          className="avatar"
        />
      </div>
    </div>
  );
};

export default Topbar;
