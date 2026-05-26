import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://calculator-backend-jrzm.onrender.com/api/calculations";

function App() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchHistory(0);
  }, []);

  const fetchHistory = async (pageNumber = 0) => {
    try {
      const response = await axios.get(`${API_URL}?page=${pageNumber}&size=5`);
      setHistory(response.data.content);
      setCurrentPage(pageNumber);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  const handleCalculate = async () => {
    if (!equation.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        equation: equation.trim()
      });

      setResult(response.data.result);
      fetchHistory(0);
    } catch (error) {
      console.error("Calculation failed:", error);

      if (error.response && error.response.status === 400) {
        setResult("Invalid Math!");
      } else {
        setResult("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (val) => {
    if (result !== null) {
      setResult(null);
      setEquation('');
    }

    if (['+', '-', '*', '/'].includes(val)) {
      setEquation((prev) => prev + ` ${val} `);
    } else {
      setEquation((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setEquation('');
    setResult(null);
  };

  const clearHistory = async () => {
    try {
      await axios.delete(API_URL);
      setHistory([]);
      setCurrentPage(0);
      setTotalPages(0);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (key === 'Escape' || key === 'Backspace') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [equation, result]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow mb-4 bg-dark text-white border-0 rounded-4">
            <div className="card-body p-4">

              <div className="bg-light text-dark text-end p-3 rounded-3 mb-4 shadow-inner" style={{ minHeight: '80px' }}>
                <div className="text-muted small">{equation || "\u00A0"}</div>
                <h2 className="mb-0 fw-bold">{result !== null ? `= ${result}` : "0"}</h2>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-9">
                  <button onClick={handleClear} className="btn btn-danger w-100 fs-4 fw-bold">CLEAR</button>
                </div>
                <div className="col-3">
                  <button onClick={() => handleButtonClick('/')} className="btn btn-warning w-100 fs-4 fw-bold">÷</button>
                </div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-3"><button onClick={() => handleButtonClick('7')} className="btn btn-secondary w-100 fs-4">7</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('8')} className="btn btn-secondary w-100 fs-4">8</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('9')} className="btn btn-secondary w-100 fs-4">9</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('*')} className="btn btn-warning w-100 fs-4 fw-bold">×</button></div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-3"><button onClick={() => handleButtonClick('4')} className="btn btn-secondary w-100 fs-4">4</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('5')} className="btn btn-secondary w-100 fs-4">5</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('6')} className="btn btn-secondary w-100 fs-4">6</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('-')} className="btn btn-warning w-100 fs-4 fw-bold">−</button></div>
              </div>

              <div className="row g-2">
                <div className="col-3"><button onClick={() => handleButtonClick('1')} className="btn btn-secondary w-100 fs-4">1</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('2')} className="btn btn-secondary w-100 fs-4">2</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('3')} className="btn btn-secondary w-100 fs-4">3</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('+')} className="btn btn-warning w-100 fs-4 fw-bold">+</button></div>
              </div>

              <div className="row g-2 mt-2">
                <div className="col-6"><button onClick={() => handleButtonClick('0')} className="btn btn-secondary w-100 fs-4">0</button></div>
                <div className="col-3"><button onClick={() => handleButtonClick('.')} className="btn btn-secondary w-100 fs-4 fw-bold">.</button></div>
                <div className="col-3"><button onClick={handleCalculate} disabled={loading} className="btn btn-success w-100 fs-4 fw-bold">{loading ? "..." : "="}</button></div>
              </div>

            </div>
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Calculation History</h4>
              <button className="btn btn-outline-danger btn-sm" onClick={clearHistory}>
                Clear All
              </button>
            </div>

            {history.length === 0 ? (
              <p className="text-muted">No history yet.</p>
            ) : (
              <ul className="list-group">
                {history.map((calc, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <span>{calc.equation}</span>
                    <strong>= {calc.result}</strong>
                  </li>
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={currentPage === 0}
                  onClick={() => fetchHistory(currentPage - 1)}
                >
                  ← Previous
                </button>

                <span className="text-muted small">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => fetchHistory(currentPage + 1)}
                >
                  Next →
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;