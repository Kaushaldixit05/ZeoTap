import React, { useState, useEffect } from 'react';
import { createRule, combineRules, evaluateRule } from './utils/ruleEngine';
import { UserData } from './types/ruleEngine';

function App() {
  const [rules, setRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState('');
  const [userData, setUserData] = useState<UserData>({
    age: 0,
    department: '',
    salary: 0,
    experience: 0,
  });
  const [result, setResult] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/rules');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRules(data.map((rule: { ruleString: string }) => rule.ruleString));
      setError(null);
    } catch (error) {
      console.error('Error fetching rules:', error);
      setError('Failed to fetch rules. Please ensure the server is running and MongoDB is connected.');
    }
  };

  const handleAddRule = async () => {
    if (newRule) {
      try {
        const response = await fetch('/api/rules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ruleString: newRule }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await fetchRules(); // Refresh the rules list after adding a new rule
        setNewRule('');
        setError(null);
      } catch (error) {
        console.error('Error adding rule:', error);
        setError('Failed to add rule. Please ensure the server is running and MongoDB is connected.');
      }
    }
  };

  const handleEvaluate = () => {
    try {
      const combinedRule = combineRules(rules);
      const result = evaluateRule(combinedRule, userData);
      setResult(result);
      setError(null);
    } catch (error) {
      console.error('Error evaluating rules:', error);
      setError('Failed to evaluate rules. Please check the rule syntax and ensure all required user data is provided.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-5">Rule Engine Application</h1>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Add New Rule</h2>
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
            />
            <button
              onClick={handleAddRule}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Rule
            </button>
          </div>
          
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-2">Current Rules</h2>
            <ul className="list-disc pl-5">
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-5">
            <h2 className="text-xl font-semibold mb-2">User Data</h2>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder="Age"
            />
            <input
              type="text"
              value={userData.department}
              onChange={(e) => setUserData({ ...userData, department: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder="Department"
            />
            <input
              type="number"
              value={userData.salary}
              onChange={(e) => setUserData({ ...userData, salary: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder="Salary"
            />
            <input
              type="number"
              value={userData.experience}
              onChange={(e) => setUserData({ ...userData, experience: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md mb-2"
              placeholder="Experience"
            />
          </div>
          
          <button
            onClick={handleEvaluate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Evaluate Rules
          </button>
          
          {result !== null && (
            <p className="mt-4 text-lg font-semibold">
              Result: {result ? 'User is eligible' : 'User is not eligible'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;