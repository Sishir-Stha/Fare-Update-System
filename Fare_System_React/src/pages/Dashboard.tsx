import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData, fetchAllFareRecords, updateFare } from "../api/api";
import "../App.css";

const Dashboard: React.FC = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [records, setRecords] = useState<any[]>([]);
  const [sector, setSector] = useState<string>("");
  const [bookingClassRcd, setBookingClassRcd] = useState<string>("");
  const [fareCode, setFareCode] = useState<string>("");
  const [flightDate, setFlightDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [flightDateFrom, setFlightDateFrom] = useState<string>("");
  const [flightDateTo, setFlightDateTo] = useState<string>("");
  const [fareAmount, setFareAmount] = useState<string>("");
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("NPR");
  const [bookRcd, setbookRcd] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [actionType, setActionType] = useState<string>("Copy");
  const [validOnFlight, setvalidOnFlight] = useState<string>("");

const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard";
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.setAttribute("href", "/favicon.ico"); 
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");

        if (!username || !password) {
          setError("User credentials not found. Please log in again.");
          return;
        }

        await fetchUserData(username, password);
        setUserName(username || "");
      } catch (err: any) {
        console.error("Error loading data:", err.response || err.message);
        setError(err.response?.data || "Failed to load data");
      }
    };

    loadData();
  }, [navigate]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fareRecords = await fetchAllFareRecords(
        sector,
        bookingClassRcd,
        fareCode,
        flightDate,
        username,
        currency
      );
      setRecords(fareRecords);
      setSelectedRows([]); 
    } catch (err) {
      setError("Error fetching fare records.");
      console.error(err);
    }finally {
      setIsLoading(false);
    }
  };

  const handleRowSelection = (fareId: string, validOnFlight: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(fareId)
        ? prevSelected.filter((id) => id !== fareId)
        : [...prevSelected, fareId]
    );
  
    // If the row is selected, set the validOnFlight value
    if (!selectedRows.includes(fareId)) {
      setvalidOnFlight(validOnFlight); // Store validOnFlight for the selected row
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/"); 
  };
  
  const handleSelectAll = () => {
    if (selectedRows.length === records.length) {
      setSelectedRows([]); 
    } else {
      setSelectedRows(records.map((record) => record.fareId)); 
    }
  };
  
  const handleEditSubmit = async () => {
    setIsLoading(true);
    setUpdateSuccess(null);
    setError(null);
  
    try {
      if (selectedRows.length === 0) {
        setError("No rows selected.");
        return;
      }
  
      let successCount = 0;
      let errorCount = 0;
  
      for (const fareId of selectedRows) {
        try {
          const result = await updateFare(
            selectedRows,
            flightDateFrom,
            flightDateTo,
            validOnFlight,
            fareAmount,
            actionType,
            username
          );
  
          if (result && typeof result === "string" && result.toLowerCase().includes("updated")) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
          console.error("Update failed for fare:", fareId, error);
        }
      }
  
      if (successCount > 0) {
        setUpdateSuccess(`${successCount} fare(s) updated successfully.`);
      }
      if (errorCount > 0) {
        setError(`${errorCount} fare(s) failed to update.`);
      }
  
      // Fade out after 5 seconds
      setTimeout(() => {
        setUpdateSuccess(null);
        setError(null);
      }, 5000);
    } catch (error) {
      setError("Unexpected error occurred.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="dashboard-container">
      <div className="content">
        <div className="header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h2>FARE Update System</h2>
       
        </div>
        {username ? <p>Welcome, {username}!</p> : <p></p>}
        {/* Filter Bar */}
        <div className="filter-bar">
          <form onSubmit={handleSearch}>
            <div>
              <label>Sector:</label>
              <input type="text" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="Sector (e.g., KTMPKR)" />
            </div>
            <div>
              <label>Booking Class:</label>
              <input type="text" value={bookingClassRcd} onChange={(e) => setBookingClassRcd(e.target.value)} placeholder="Booking Class (e.g., E)" />
            </div>
            <div>
              <label>Fare Code:</label>
              <input type="text" value={fareCode} onChange={(e) => setFareCode(e.target.value)} placeholder="Fare Code (e.g., E1)" />
            </div>
            <div>
              <label>Flight Date:</label>
              <input type="date" value={flightDate} onChange={(e) => setFlightDate(e.target.value)} />
            </div>
            <div>
              <label>Currency:</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="NPR">NPR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Error Message */}
        {error && <div className="error-message-popup">{error}</div>}
        {updateSuccess && <div className="success-message-popup">{updateSuccess}</div>}

        {/* Table */}
        <div className="table-wrapper">
        <table className="foc-table">
          <thead>
            <tr>
              <th className="select-column">
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === records.length && records.length > 0}
                  onChange={handleSelectAll} 
                />
              </th>
              <th>Sector</th>
              <th>CC</th>
              <th>Flt Date From</th>
              <th>Flt Date To</th>
              <th>Fare Amount</th>
              <th>Validated Flight</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(record.fareId)}
                      onChange={() => handleRowSelection(record.fareId, record.validOnFlight)}
                    />
                  </td>
               
                  <td>{record.sector}</td>
                  <td>{record.bookRcd}</td>
                  <td>{record.flightDateFrom.split("T")[0]}</td>
                  <td>{record.flightDateTo.split("T")[0]}</td>
                  <td>{record.fareAmount}</td>
                  <td>{record.validOnFlight}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} style={{ textAlign: "center" }}>No rows to display.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        {/* Edit Button */}
        {selectedRows.length > 0 && (
          <button className="edit-btn" onClick={() => setIsEditPopupOpen(true)}>Edit Selected</button>
        )}

        {/* Edit Popup */}
        {isEditPopupOpen && (
  <div className="edit-popup">
    <h3>Edit Fare</h3>
    <label>Flight Date From:</label>
    <input
      type="date"
      value={flightDateFrom}
      onChange={(e) => setFlightDateFrom(e.target.value)}
      disabled={isLoading}
    />
    <label>Flight Date To:</label>
    <input
      type="date"
      value={flightDateTo}
      onChange={(e) => setFlightDateTo(e.target.value)}
      disabled={isLoading}
    />
    <label>Fare Amount:</label>
    <input
      type="text"
      value={fareAmount}
      onChange={(e) => setFareAmount(e.target.value)}
      disabled={isLoading}
    /> <label>Edit Type:</label>
    <select value={actionType} onChange={(e) => setActionType(e.target.value)} disabled={isLoading}>
      <option value="Update">Update</option>
      <option value="Copy">Copy</option>
    </select>
    <label>Valid On Flight:</label>
    <input
      type="text"
      value={validOnFlight}
      onChange={(e) => setvalidOnFlight(e.target.value)} // Allow modification if needed
      disabled={isLoading}
    />
    <button onClick={handleEditSubmit} disabled={isLoading}>
      {isLoading ? "Updating..." : "Submit"}
    </button>
    <button onClick={() => setIsEditPopupOpen(false)} disabled={isLoading}>Cancel</button>

    {isLoading && (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Updating fares, please wait...</p>
      </div>
    )}

    {/* Display success or error message */}
    {updateSuccess && (
 <div className={`notification success-message ${updateSuccess ? "fade-out" : ""}`}>
          {updateSuccess}
        </div>
      )}

      {error && (
       <div className={`notification error-message-popup ${error ? "fade-out" : ""}`}>
          {error}
        </div>
      )}
  </div>
)}
  <footer className="dashfooter">
        <p>© 2025 Sishir Shrestha. All Rights Reserved.</p>
      </footer>
      </div>
    </div>
  
  );
};

export default Dashboard;
