import { useState } from "react";
import SearchableSelect from "../SearchableSelect/SearchableSelect";
import "./TicketForm.css";
import { users } from "./userData.js";
import { useMacro } from "../Context/MacroContext";

const TicketForm = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedMacro, setReply } = useMacro();
  const [userData, setUserData] = useState({});
  const { subject, setSubject } = useMacro();


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

      setUserData(user);

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
        .replace(
          "Comment on the status:",
          `Comment on the status: ${user.statusComment}`
        )
        .replace("Phone Number:", `Phone Number: ${user.phoneNumber}`)
        .replace(
          "Phone Number to Be Reached:",
          `Phone Number to Be Reached: ${user.phoneNumber}`
        )
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
        options={["Beatrice Florah Lundu 12345", "Chepkorir Betty 67890", "Rofina Amai Ekwai 24680"]}
        onAddNew={() => alert("Open add user modal logic not yet added")}
      />

      <SearchableSelect
        label="Assignee"
        placeholder="Search or select assignee"
        options={["Digital Channels", "Staff Queue", "Kevin Juma Wafula", "John Indakwa"]}
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
          <button
            className="pull-btn"
            onClick={handlePullData}
            disabled={loading}
          >
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
          <option>Staff queue</option>
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select category</option>
          <option value="Delivery Schedule Inquiry">
            Delivery Schedule Inquiry
          </option>
          <option value="Changing Offers/Add ons">
            Changing Offers/Add ons
          </option>
          <option value="Group Information Change / Addition Request">
            Group Information Change / Addition Request
          </option>
          <option value="National ID Photo Validation (OCR at enrollment)">
            National ID Photo Validation (OCR at enrollment)
          </option>
          <option value="Over-payment Transfer Request">
            Over-payment Transfer Request
          </option>
          <option value="Balance Inquiry">Balance Inquiry</option>
          <option value="Client Registration">Client Registration</option>
          <option value="IPRS Validation Issue">IPRS Validation Issue</option>
          <option value="Lead is not Qualified">Lead is not Qualified</option>
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
        <input type="text" value={userData.leadId || ""} readOnly />
      </div>

      <div className="form-group">
        <label>National ID</label>
        <input type="text" value={userData.nationalId || ""} readOnly />
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
