import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ComplaintForm from "../components/ComplaintForm";
import ComplaintDetails from "../components/ComplaintDetails";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import ComplaintTable from "../components/ComplaintTable";

import {
  analyzeComplaint,
  saveComplaint,
  getComplaints,
  refineComplaint,
} from "../services/api";

import {
  setComplaint,
  setResult,
  setComplaints,
  resetComplaint,
} from "../features/complaintSlice";

export default function Dashboard() {

  const dispatch = useDispatch();

  const complaint = useSelector(
    (state) => state.complaint.complaint
  );

  const result = useSelector(
    (state) => state.complaint.result
  );

  const complaints = useSelector(
    (state) => state.complaint.complaints
  );

  useEffect(() => {
    loadComplaints();
  }, []);

  async function loadComplaints() {

    try {

      const res = await getComplaints();

      dispatch(setComplaints(res.data));

    } catch (err) {

      console.log(err);

    }

  }

  async function handleAnalyze() {

    if (!complaint.trim()) {

      alert("Please enter a complaint.");

      return;

    }

    try {

      const res = await analyzeComplaint({
        complaint_text: complaint,
      });

      dispatch(setResult(res.data.result));

    } catch (err) {

      console.log(err);

      alert("Analysis failed.");

    }

  }

  // ⭐ NEW
  async function handleRefine(instruction) {

    try {

      const res = await refineComplaint({

        current_data: result,

        instruction,

      });

      dispatch(
        setResult(res.data.result)
      );

    } catch (err) {

      console.log(err);

      alert("AI update failed.");

    }

  }

  async function handleSave() {

    if (!result) {

      alert("Analyze complaint first.");

      return;

    }

    try {

      const res = await saveComplaint(result);

      alert(
        "Complaint Saved Successfully!\nComplaint ID: " +
          res.data.id
      );

      await loadComplaints();

      dispatch(resetComplaint());

    } catch (err) {

      console.log(err);

      alert("Save failed.");

    }

  }

  return (

    <>

      <Navbar />

      <div className="dashboard">

        <DashboardCards complaints={complaints} />

        <div className="content">

          <div className="left-panel">

            <ComplaintForm
              complaint={complaint}
              setComplaint={(value) =>
                dispatch(setComplaint(value))
              }
              analyzeComplaint={handleAnalyze}
            />

          </div>

          <div className="right-panel">

            {!result ? (

              <div className="card empty-card">

                <h2>AI Complaint Intake Assistant</h2>

                <div className="empty-state">

                  <h1>🤖</h1>

                  <p>

                    Upload a complaint PDF or paste a customer complaint,
                    then click

                    <strong> Analyze Complaint </strong>

                    to start AI analysis.

                  </p>

                </div>

              </div>

            ) : (

              <ComplaintDetails

                result={result}

                setResult={(value) =>
                  dispatch(setResult(value))
                }

                refineComplaint={handleRefine}

                saveComplaint={handleSave}

              />

            )}

          </div>

        </div>

        <ComplaintTable

          complaints={complaints}

          refreshComplaints={loadComplaints}

        />

      </div>

    </>

  );

}