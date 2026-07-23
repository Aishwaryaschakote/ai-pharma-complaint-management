import { updateStatus } from "../services/api";

export default function ComplaintTable({
  complaints,
  refreshComplaints,
}) {

  async function handleStatus(id, status) {

    try {

      await updateStatus(id, status);

      refreshComplaints();

    } catch (err) {

      console.log(err);

      alert("Failed to update status.");

    }

  }

  return (
    <div className="table-card">

      <h2> 📋Recent Complaints</h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Created</th>
          </tr>

        </thead>

        <tbody>

          {complaints.length === 0 ? (
            <tr>
              <td colSpan="6">
                No complaints found.
              </td>
            </tr>
          ) : (
            complaints.map((item) => (
              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.product}</td>

                <td>{item.category}</td>

                <td>{item.severity}</td>

                <td>

                  <select
                    value={item.status}
                    onChange={(e) =>
                      handleStatus(
                        item.id,
                        e.target.value
                      )
                    }
                  >

                    <option>Open</option>

                    <option>Investigating</option>

                    <option>CAPA Implemented</option>

                    <option>Closed</option>

                  </select>

                </td>

                <td>
                  {item.created_at
                    ? new Date(
                        item.created_at
                      ).toLocaleDateString()
                    : "-"}
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}