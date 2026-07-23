import { useState } from "react";

export default function ComplaintDetails({
  result,
  setResult,
  saveComplaint,
  refineComplaint,
}) {

  const [instruction, setInstruction] = useState("");

  if (!result) return null;

  function handleChange(e) {

    const { name, value } = e.target;

    setResult({
      ...result,
      [name]: value,
    });

  }

  async function handleRefine() {

    if (!instruction.trim()) {
      alert("Please enter a correction.");
      return;
    }

    await refineComplaint(instruction);

    setInstruction("");

  }

  return (

    <div className="card">

      <h2>🤖 AI Complaint Analysis</h2>

      <div className="grid">

        {Object.entries(result).map(([key, value]) => (

          <div
            className="item"
            key={key}
          >

            <label>

              {key.replaceAll("_", " ")}

            </label>

            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
            />

          </div>

        ))}

      </div>

      <hr
        style={{
          margin: "25px 0",
          border: "1px solid #eee",
        }}
      />

      <h3>💬 AI Correction</h3>

      <p
        style={{
          color: "#666",
          marginTop: "10px",
        }}
      >
        Tell AI what needs to be corrected.
      </p>

      <textarea
        style={{
          height: "120px",
          marginTop: "15px",
        }}
        placeholder='Example:
Actually the batch number is PCM2402, not PCM2401.
or quantity entered wrong..tell me anything?'
        value={instruction}
        onChange={(e) =>
          setInstruction(e.target.value)
        }
      />

      <button
        onClick={handleRefine}
      >
        ✨ Update AI Result
      </button>

      <button
        className="save-btn"
        onClick={saveComplaint}
      >
        💾 Save Complaint
      </button>

    </div>

  );

}