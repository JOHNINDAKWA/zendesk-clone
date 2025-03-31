import Macrobar from '../../components/Macrobar/Macrobar';
import Sidebar from '../../components/Sidebar/Sidebar';
import TicketBody from '../../components/TicketBody/TicketBody';
import TicketForm from '../../components/TicketForm/TicketForm';
import TicketHeader from '../../components/TicketHeader/TicketHeader';
import Topbar from '../../components/Topbar/Topbar';
import './TicketPage.css';

const TicketPage = () => {
  return (
    <div className="ticket-page">
    <Sidebar />
    <div className="main-content">
      <Topbar />
      <TicketHeader />
      
      <div className="ticket-content">
        <TicketForm />
        <TicketBody />
        <Macrobar/>
      </div>
    </div>
  </div>
  
  );
};

export default TicketPage;
