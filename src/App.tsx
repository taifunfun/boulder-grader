import { useState, useMemo, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { GradeConverter, GradeConversionError } from './lib/converter';
import { SystemCode } from './lib/types';
import './index.css';

const converter = new GradeConverter();

function App() {
  const [grade, setGrade] = useState('6a');
  const [fromSys, setFromSys] = useState<string>(SystemCode.FRENCH);
  const [toSys, setToSys] = useState<string>(SystemCode.YDS);
  const [convertAll, setConvertAll] = useState(false);
  
  const [result, setResult] = useState<string>('');
  const [allResults, setAllResults] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>('');

  const systems = useMemo(() => converter.listSystems(), []);

  useEffect(() => {
    setError('');
    setResult('');
    setAllResults({});

    if (!grade.trim()) return;

    try {
      if (convertAll) {
        const res = converter.convertToAll(grade.trim(), fromSys);
        setAllResults(res);
      } else {
        const res = converter.convert(grade.trim(), fromSys, toSys);
        setResult(res);
      }
    } catch (err) {
      if (err instanceof GradeConversionError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  }, [grade, fromSys, toSys, convertAll]);

  const handleSwap = () => {
    const temp = fromSys;
    setFromSys(toSys);
    setToSys(temp);
    
    // Attempt to put the converted result as the new input grade if we have a valid single result
    if (result && !convertAll && !error) {
      // For partial matches that return commas (e.g. "5a, 5b"), don't auto-fill
      if (!result.includes(',')) {
        setGrade(result);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Grade Converter</h1>
        <p>Translate climbing grades across systems</p>
      </div>

      <div className="converter-form">
        <div className="form-group">
          <label>Grade to Convert</label>
          <input 
            type="text" 
            className="input-control" 
            placeholder="e.g. 6a, V5, 5.10" 
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>

        <div className="systems-row">
          <div className="form-group">
            <label>From</label>
            <select 
              className="input-control" 
              value={fromSys} 
              onChange={(e) => setFromSys(e.target.value)}
            >
              {systems.map(s => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>

          <button className="swap-btn" onClick={handleSwap} title="Swap Systems" disabled={convertAll}>
            <ArrowRightLeft size={20} />
          </button>

          <div className="form-group">
            <label>To</label>
            <select 
              className="input-control" 
              value={toSys} 
              onChange={(e) => setToSys(e.target.value)}
              disabled={convertAll}
            >
              {systems.map(s => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="toggle-group">
          <div 
            className={`toggle-switch ${convertAll ? 'active' : ''}`}
            onClick={() => setConvertAll(!convertAll)}
          >
            <div className="toggle-knob"></div>
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Show all equivalents
          </span>
        </div>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!error && grade.trim() && !convertAll && result && (
        <div className="result-box">
          <h3>Equivalent in {systems.find(s => s.code === toSys)?.name}</h3>
          <div className="result-value">{result}</div>
        </div>
      )}

      {!error && grade.trim() && convertAll && Object.keys(allResults).length > 0 && (
        <div className="result-box" style={{ background: 'transparent', padding: 0, border: 'none' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>All Equivalents</h3>
          <div className="all-results">
            {Object.entries(allResults).map(([sysCode, val]) => (
              <div key={sysCode} className="all-result-item">
                <span>{systems.find(s => s.code === sysCode)?.name || sysCode}</span>
                <strong>{val}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
