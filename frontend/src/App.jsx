import { useState, useEffect } from 'react';
import axios from 'axios';

// IMPORTANT: Replace this string with your actual Render URL once you get it!
// Notice it already includes the /api/calculations part.
const API_URL = "https://calculator-backend-jrzm.onrender.com";

function App() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // FIX: No quotes around API_URL!
      const response = await axios.get(API_URL);
      setHistory(response.data);
    } catch (error) {
      console.error("Could not fetch history:", error);
    }
  };

  const handleClearHistory = async () => {
    try {
      // FIX: Using the dynamic API_URL
      await axios.delete(API_URL);
      setHistory([]); 
    } catch (error) {
      console.error("Could not clear history:", error);
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

  const handleCalculate = async () => {
    if (!equation.trim()) return; 

    try {
      // FIX: Using the dynamic API_URL
      const response = await axios.post(API_URL, {
        equation: equation.trim()
      });
      
      setResult(response.data.result);
      fetchHistory(); 
    } catch (error) {
      console.error("Calculation failed:", error);
      setResult("Error");
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
                <div className="col-3"><button onClick={handleCalculate} className="btn btn-success w-100 fs-4 fw-bold">=</button></div>
              </div>

            </div>
          </div>

          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-header bg-white border-0 pt-4 pb-2 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Calculation History</h5>
              <button onClick={handleClearHistory} className="btn btn-sm btn-outline-danger">Clear All</button>
            </div>
            
            <ul className="list-group list-group-flush rounded-bottom-4">
              {history.length === 0 ? (
                <li className="list-group-item text-muted text-center py-3">No history yet.</li>
              ) : (
                [...history].reverse().map((calc) => (
                  <li key={calc.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                    <span className="text-muted">{calc.equation}</span>
                    <span className="badge bg-primary rounded-pill fs-6">{calc.result}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;