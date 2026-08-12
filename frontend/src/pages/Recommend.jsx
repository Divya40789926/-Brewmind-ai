import { useState } from 'react';
import API from '../api/axios';

function Recommend() {
  const [mood, setMood] = useState('tired');
  const [preference, setPreference] = useState('sweet');
  const [temperature, setTemperature] = useState('cold');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await API.post('/ai/recommend', { mood, preference, temperature });
      setResult(res.data);
    } catch (err) {
      setError('Something went wrong getting your recommendation. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black text-white rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Find Your Perfect Coffee</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          How are you feeling?
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="text-black bg-white p-2 rounded"
          >
            <option className="text-black bg-white" value="tired">Tired</option>
            <option className="text-black bg-white" value="stressed">Stressed</option>
            <option className="text-black bg-white" value="energetic">Energetic</option>
            <option className="text-black bg-white" value="relaxed">Relaxed</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Taste preference?
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="text-black bg-white p-2 rounded"
          >
            <option className="text-black bg-white" value="sweet">Sweet</option>
            <option className="text-black bg-white" value="bitter">Bitter / Strong</option>
            <option className="text-black bg-white" value="balanced">Balanced</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Hot or cold?
          <select
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="text-black bg-white p-2 rounded"
          >
            <option className="text-black bg-white" value="hot">Hot</option>
            <option className="text-black bg-white" value="cold">Cold</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-400 text-black font-semibold p-2 rounded mt-2 disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Get My Recommendation'}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-amber-400">
          <h3 className="text-xl font-bold text-amber-400">{result.recommendation}</h3>
          <p className="text-gray-300 mt-2">{result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default Recommend;