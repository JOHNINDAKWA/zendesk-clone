import { useState, useRef, useEffect } from 'react';
import { useMacro } from '../Context/MacroContext';
import './Macrobar.css';
import { macros } from './MacroList';

const Macrobar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [submitOptionsOpen, setSubmitOptionsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Solved');

  const dropdownRef = useRef(null);
  const submitRef = useRef(null);

  const { setSubject, setReply, setSelectedMacro } = useMacro();

  const filteredMacros = macros.filter(macro =>
    macro.title.toLowerCase().includes(search.toLowerCase())
  );

  const applyMacro = (macro) => {
    setSubject(macro.title);
    setReply(macro.body.replace(/\n/g, '<br/>'));
    setSelectedMacro(macro);
    setSearch('');
    setIsOpen(false);
  };

  const handleSubmit = (status) => {
    alert(`Submitted as ${status}`); // Replace with real logic
    setSubject('');
    setReply('');
    setSelectedMacro(null);
    setSearch('');
    setSubmitOptionsOpen(false);
    setSelectedStatus('Solved');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        (!submitRef.current || !submitRef.current.contains(e.target))
      ) {
        setIsOpen(false);
        setSubmitOptionsOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Macrobar (bottom-left) */}
      <div className="macrobar-wrapper" ref={dropdownRef}>
        <div className="macrobar">
          {isOpen ? (
            <input
              type="text"
              autoFocus
              placeholder="Search macros..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="macrobar-search-input"
            />
          ) : (
            <div className="macrobar-label" onClick={() => setIsOpen(true)}>
              <p>Apply Macros</p>
              <p>⮟</p>
            </div>
          )}
        </div>

        {isOpen && (
          <div className="macrobar-dropdown">
            <div className="macrobar-list">
              {filteredMacros.length > 0 ? (
                filteredMacros.map((macro, idx) => (
                  <div
                    key={idx}
                    className="macrobar-item"
                    onClick={() => applyMacro(macro)}
                  >
                    {macro.title}
                  </div>
                ))
              ) : (
                <div className="macrobar-no-result">No matching macros</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Submit Bar (bottom-right) */}
      <div className="submit-bar" ref={submitRef}>
        <button
          className="submit-button"
          onClick={() => handleSubmit(selectedStatus)}
        >
          Submit as {selectedStatus}
        </button>
        <div
          className="status-toggle"
          onClick={() => setSubmitOptionsOpen(!submitOptionsOpen)}
        >
          ⮝
        </div>

        {submitOptionsOpen && (
          <div className="status-options">
            {['Solved', 'Open', 'Pending', 'New'].map((status, i) => (
              <div
                key={i}
                className="status-option"
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Macrobar;
