export default function ComplaintDetails({
  result,
  setResult,
  saveComplaint,
}) {

  if (!result) return null;

  function handleChange(e) {

    const { name, value } = e.target;

    setResult({
      ...result,
      [name]: value,
    });

  }

  return (

    <div className="card">

      <h2>🤖 AI Complaint Analysis</h2>

      <div className="grid">

        {Object.entries(result).map(([key, value]) => (

          <div className="item" key={key}>

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

      <button
        className="save-btn"
        onClick={saveComplaint}
      >
        Save Complaint
      </button>

    </div>

  );

}