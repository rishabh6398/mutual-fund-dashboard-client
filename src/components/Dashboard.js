import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const BASE_URL = process.env.REACT_APP_API_URL; // Use the environment variable
    const [fundFamilies, setFundFamilies] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState('');
    const [schemes, setSchemes] = useState([]);
    const [expandedScheme, setExpandedScheme] = useState(null);
    const [purchaseAmount, setPurchaseAmount] = useState('');
    const [error, setError] = useState('');

    // Fetch available fund families on load
    useEffect(() => {
        const fetchFundFamilies = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/fund-families`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                setFundFamilies(response.data);
            } catch (error) {
                setError('Failed to fetch fund families');
            }
        };
        fetchFundFamilies();
    }, []);

    // Fetch schemes for selected fund family
    const fetchSchemes = async (fundFamily) => {
        setSelectedFamily(fundFamily);
        try {
            const response = await axios.get(`${BASE_URL}/schemes/${fundFamily}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            setSchemes(response.data);
        } catch (error) {
            setError('Failed to fetch schemes');
        }
    };

    // Toggle expanded view for a specific scheme
    const toggleExpandScheme = (schemeCode) => {
        setExpandedScheme(expandedScheme === schemeCode ? null : schemeCode);
    };

    // Handle purchase
    const handlePurchase = async (schemeCode) => {
        try {
            const response = await axios.post(`${BASE_URL}/purchase`, {
                scheme_code: schemeCode,
                amount: purchaseAmount,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            alert(response.data.message);
        } catch (error) {
            setError('Failed to process purchase');
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Mutual Fund Dashboard</h1>
            {error && <p className="error">{error}</p>}
            
            <label className="fund-family-label">Select Fund Family:</label>
            <select className="fund-family-select" onChange={(e) => fetchSchemes(e.target.value)}>
                <option value="">--Select Fund Family--</option>
                {fundFamilies.map((family) => (
                    <option key={family} value={family}>
                        {family}
                    </option>
                ))}
            </select>

            <h2>Schemes for {selectedFamily}</h2>
            {schemes.length > 0 ? (
                <ul className="scheme-list">
                    {schemes.map((scheme) => (
                        <li key={scheme.scheme_code} className="scheme-item">
                            <div className="scheme-header" onClick={() => toggleExpandScheme(scheme.scheme_code)}>
                                <strong>{scheme.scheme_name}</strong> (NAV: {scheme.nav})
                                {expandedScheme === scheme.scheme_code ? '▲' : '▼'}
                            </div>
                            {expandedScheme === scheme.scheme_code && (
                                <div className="scheme-details">
                                    <p>Date: {scheme.date}</p>
                                    <p>Scheme Type: {scheme.scheme_type}</p>
                                    <input
                                        type="number"
                                        className="amount-input"
                                        placeholder="Enter amount"
                                        onChange={(e) => setPurchaseAmount(e.target.value)}
                                    />
                                    <button className="purchase-btn" onClick={() => handlePurchase(scheme.scheme_code)}>
                                        Buy
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No schemes available for this fund family</p>
            )}
        </div>
    );
};

export default Dashboard;
