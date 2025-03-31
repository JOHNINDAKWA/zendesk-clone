import './TicketHeader.css';
import { useMacro } from '../Context/MacroContext';

const TicketHeader = () => {
  const { selectedMacro } = useMacro();

  const status = selectedMacro ? 'Solved' : 'New';
  const statusClass = selectedMacro ? 'ticket-status solved' : 'ticket-status new';

  return (
    <div className="ticket-header">
      <div className="bg">
        <span className={statusClass}>{status}</span>
        <span className="ticket-header-text">Ticket</span>
      </div>
    </div>
  );
};

export default TicketHeader;
