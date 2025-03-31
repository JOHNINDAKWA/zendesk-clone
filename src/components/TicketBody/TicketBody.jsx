import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TicketBody.css";
import { useMacro } from "../Context/MacroContext";
import { slashCommands } from "./slashCommands";
import commentSuggestions from "./commentSuggestions";

const TicketBody = () => {
  const { subject, setSubject, reply, setReply } = useMacro();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: "#custom-toolbar",
    },
  };

  const handleReplyChange = (value) => {
    let updatedValue = value;

    // Replace all slash commands in the text
    Object.keys(slashCommands).forEach((cmd) => {
      if (updatedValue.includes(cmd)) {
        updatedValue = updatedValue.replaceAll(cmd, slashCommands[cmd]);
      }
    });

    setReply(updatedValue);

    // Get plain text for suggestion matching
    const editor = quillRef.current?.getEditor();
    const cursorPos = editor?.getSelection()?.index || 0;
    const plainText = editor?.getText(0, cursorPos) || "";
    const lastWord = plainText.trim().split(/\s+/).pop().toLowerCase();

    const suggestions = commentSuggestions[subject] || [];

    if (lastWord.length > 1) {
      const matched = suggestions.filter((s) =>
        s.toLowerCase().includes(lastWord)
      );
      setFilteredSuggestions(matched.slice(0, 3));
    } else {
      setFilteredSuggestions([]);
    }

    setIsTyping(true);
  };

  const handleSuggestionClick = (suggestion) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const fullText = editor.getText();
    const lines = fullText.split("\n");
    const lastLineIndex = lines.length > 1 ? lines.length - 2 : 0;
    lines[lastLineIndex] = suggestion;

    const updatedPlainText = lines.join("\n");

    editor.setText(updatedPlainText);
    setReply(editor.root.innerHTML);

    const length = editor.getLength();
    editor.setSelection(length - 1, 0);

    setFilteredSuggestions([]);
    setIsTyping(false);
  };

  return (
    <div className="ticket-body">
      <input
        className="ticket-subject"
        type="text"
        placeholder="Subject "
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <div className="divider-line" />

      <div className="editor-wrapper">
        <div className="editor-header">
          <span className="header-icon">⤺</span>
          <span className="header-title">Public Reply</span>
          <span className="header-arrow">▾</span>
        </div>

        <div className="editor-container" style={{ position: "relative" }}>
          <ReactQuill
            ref={quillRef}
            value={reply}
            onChange={handleReplyChange}
            theme="snow"
            modules={modules}
            placeholder="Type your reply here..."
            className="quill-editor"
          />

          {isTyping && filteredSuggestions.length > 0 && (
            <div
              className="suggestion-box"
              style={{
                position: "absolute",
                bottom: "50px",
                left: "0",
                right: "0",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 10,
                borderRadius: "8px",
                padding: "8px",
                height: "200px",
              }}
            >
              {filteredSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom:
                      i < filteredSuggestions.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          )}

          <div id="custom-toolbar" className="custom-toolbar">
            <span className="ql-formats">
              <button className="ql-bold" />
              <button className="ql-italic" />
              <button className="ql-underline" />
            </span>
            <span className="ql-formats">
              <button className="ql-list" value="bullet" />
              <button className="ql-list" value="ordered" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBody;
