import { useState } from "react";
import SearchableSelect from "../SearchableSelect/SearchableSelect";
import "./TicketForm.css";
import { users } from "./userData.js";
import { useMacro } from "../Context/MacroContext";

const TicketForm = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedMacro, setReply } = useMacro();

  const handlePullData = () => {
    if (!selectedMacro || !accountNumber) {
      alert("Please select a macro and enter account number.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = users[accountNumber];
      if (!user) {
        alert("No user found with that account number.");
        setLoading(false);
        return;
      }

      const filledMacro = selectedMacro.body
      .replace("Lead ID:", `Lead ID: ${user.leadId}`)
      .replace("Account Number:", `Account Number: ${user.accountNumber}`)
      .replace("Account:", `Account: ${user.accountNumber}`)
      .replace("National ID:", `National ID: ${user.nationalId}`)
      .replace("Client Name:", `Client Name: ${user.clientName}`)
      .replace("Territory:", `Territory: ${user.salesTerritory}`)
      .replace("Group Name:", `Group Name: ${user.groupName}`)
      .replace("Duka:", `Duka: ${user.duka}`)
      .replace("Zone:", `Zone: ${user.duka}`)
      .replace("Duka of Purchase:", `Duka of Purchase: ${user.duka}`)
      .replace("Current Status:", `Current Status: ${user.currentStatus}`)
      .replace("Comment on the status:", `Comment on the status: ${user.statusComment}`)
      .replace("Phone Number:", `Phone Number: ${user.phoneNumber}`)
      .replace("Phone Number to Be Reached:", `Phone Number to Be Reached: ${user.phoneNumber}`)
      .replace("Quantity:", `Quantity: N/A`)
      .replace("Input name:", `Input name: N/A`)
      .replace(/\n/g, "<br/>");
    
      setReply(filledMacro);
      setLoading(false);
    }, 2000); // simulate API call
  };

  return (
    <div className="ticket-form">
      <SearchableSelect
        label="Requester"
        placeholder="Search or select requester"
        options={["John Indakwa", "Miriam Ikobwa", "Alvin Makori"]}
        onAddNew={() => alert("Open add user modal logic not yet added")}
      />

      <SearchableSelect
        label="Assignee"
        placeholder="Search or select assignee"
        options={["Digital Channels", "Staff Queue", "Kevin Juma Wafula"]}
        onAddNew={() => alert("Add new assignee logic not yet added")}
      />

      <div className="form-group">
        <label>CCs</label>
        <input type="text" placeholder="Add CC emails" />
      </div>

      <div className="form-group with-button">
        <label>Account Number</label>
        <div className="input-with-button">
          <input
            type="text"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <button className="pull-btn" onClick={handlePullData} disabled={loading}>
            {loading ? "Pulling..." : "Pull Data"}
          </button>
        </div>
      </div>


      <div className="form-group">
        <label>Sharing</label>
        <select>
          <option>Not shared</option>
          <option>Shared with group</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tags</label>
        <input type="text" placeholder="Add tags" />
      </div>

      {/* Checkboxes for English and Evolution */}
      <div className="form-group checkbox-group">
        <label>
          <input type="checkbox" />
          English
        </label>
        <label>
          <input type="checkbox" />
          Evolution
        </label>
      </div>

      <div className="form-group">
        <label>Staff Queue Request</label>
        <select>
          <option>Select queue</option>
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select>
          <option>Select category</option>
        </select>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>

      <div className="form-group">
        <label>Caller Phone Number</label>
        <input type="text" placeholder="Enter phone number" />
      </div>

      <div className="form-group">
        <label>Year of Issue</label>
        <input type="text" placeholder="e.g. 2023" />
      </div>

      <div className="form-group">
        <label>Serial Number</label>
        <input type="text" placeholder="Enter serial number" />
      </div>

      <div className="form-group">
        <label>Lead ID</label>
        <input type="text" placeholder="Enter Lead ID" />
      </div>

      <div className="form-group">
        <label>National ID</label>
        <input type="text" placeholder="Enter National ID" />
      </div>

      <div className="form-group">
        <label>Loan Clients Experience Status Q</label>
        <input type="text" placeholder="Enter status" />
      </div>

      <div className="form-group">
        <label>Escalate To</label>
        <select>
          <option>Select team or person</option>
        </select>
      </div>

      <div className="form-group">
        <label>Intake Mechanism</label>
        <input type="text" placeholder="Enter mechanism" />
      </div>
    </div>
  );
};

export default TicketForm;
