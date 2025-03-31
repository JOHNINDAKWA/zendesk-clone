import { useState } from "react";
import "./SearchableSelect.css";

const SearchableSelect = ({ label, placeholder, options = [], onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="custom-select">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />
        {isOpen && (
          <div className="dropdown">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, idx) => (
                <div
                  key={idx}
                  className="dropdown-item"
                  onMouseDown={() => {
                    setSearchTerm(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="dropdown-item no-match">No match found</div>
            )}
            <div className="dropdown-item add-new" onMouseDown={onAddNew}>
              + Add User
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
