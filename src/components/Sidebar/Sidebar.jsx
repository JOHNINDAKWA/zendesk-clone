import { FaHome, FaUserFriends, FaChartBar, FaCog } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';
import { MdViewList } from 'react-icons/md';
import { SiZendesk } from 'react-icons/si';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-icons">
        <SiZendesk title="Zendesk" />
        <FaHome title="Home" />
        <MdViewList title="Views" />
        <FaUserFriends title="Customers" />
        <FaChartBar title="Reporting" />
        <FaCog title="Admin" />
      </div>
      <div className="bottom-icon">
        <SiZendesk title="Zendesk" />
      </div>
    </div>
  );
};

export default Sidebar;
