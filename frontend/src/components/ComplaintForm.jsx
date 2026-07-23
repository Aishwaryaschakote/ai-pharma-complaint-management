import { uploadPDF } from "../services/api";

export default function ComplaintForm({
  complaint,
  setComplaint,
  analyzeComplaint,
}) {

  async function handlePDF(e) {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

      const res = await uploadPDF(formData);

      if (!res.data.success) {
          alert(res.data.message);
          return;
      }

      setComplaint(res.data.text);

      alert("PDF uploaded successfully.");

    } catch (err) {

      console.log(err);

      alert("Failed to upload PDF.");

    }

  }

  return (

    <div className="card">

      <h2>📝 Customer Complaint</h2>

      <div className="upload-box">

        <label className="upload-label">

          📄 Upload Complaint PDF

          <input
            type="file"
            accept=".pdf"
            onChange={handlePDF}
            hidden
          />

        </label>

      </div>

      <textarea

        value={complaint}

        onChange={(e) => setComplaint(e.target.value)}

        placeholder="Paste complaint email or upload PDF..."

      />

      <button onClick={analyzeComplaint}>

        ✨ Analyze Complaint

      </button>

    </div>

  );

}