// import React, { useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import './detectionPage.css';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function DetectionPage() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [outputImage, setOutputImage] = useState(null);
//   const [pedestrianCount, setPedestrianCount] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pedestrianHistory, setPedestrianHistory] = useState([]);
//   const [showChart, setShowChart] = useState(false);

//   const handleImageChange = (e) => {
//     setSelectedImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedImage) {
//       alert("Please select an image before submitting!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedImage);

//     try {
//       setIsLoading(true);
//       setOutputImage(null);
//       setPedestrianCount(null);

//       // Send image to Flask backend
//       const response = await axios.post('http://127.0.0.1:5000/detect', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       // Fetch pedestrian count from query params
//       const count = new URLSearchParams(response.request.responseURL.split('?')[1]).get('count');
//       setPedestrianCount(count);

//       // Set the output image path
//       setOutputImage('http://127.0.0.1:5000/output_image');

//       // Add the pedestrian count to the history
//       setPedestrianHistory(prevHistory => [
//         ...prevHistory,
//         { image: `Image ${prevHistory.length + 1}`, count: parseInt(count) },
//       ]);

//     } catch (error) {
//       console.error("Error during pedestrian detection:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const chartData = {
//     labels: pedestrianHistory.map((entry) => entry.image),
//     datasets: [
//       {
//         label: 'Pedestrian Count',
//         data: pedestrianHistory.map((entry) => entry.count),
//         backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black color (rgba format for transparency)
//         borderColor: 'rgba(0, 0, 0, 1)', // Black border
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: {
//       x: {
//         ticks: {
//           color: 'black', // Black color for X-axis labels
//         },
//         grid: {
//           color: 'rgba(0, 0, 0, 0.2)', // Optional: Light black for grid lines
//         },
//       },
//       y: {
//         ticks: {
//           color: 'black', // Black color for Y-axis labels
//         },
//         grid: {
//           color: 'rgba(0, 0, 0, 0.2)', // Optional: Light black for grid lines
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Pedestrian Detection History',
//         color: 'black', // Black color for chart title
//       },
//       legend: {
//         labels: {
//           color: 'black', // Black color for legend text
//         },
//       },
//     },
//   };

//   // Function to reset the form and all state
//   const handleReset = () => {
//     setSelectedImage(null);
//     setOutputImage(null);
//     setPedestrianCount(null);
//     setPedestrianHistory([]);
//     setShowChart(false); // Hide chart on reset
//   };

//   return (
//     <div className='body'>
//     <div className="page-container">
//       <div className="detection-container">
//         <h1 className="title">Pedestrian Detection</h1>
//         <form onSubmit={handleSubmit} className="form">
//           <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
//           <button type="submit" className="button" disabled={isLoading}>
//             {isLoading ? 'Processing...' : 'Detect Pedestrians'}
//           </button>
//         </form>
//         {pedestrianCount !== null && (
//           <p className="result">
//             Pedestrians Detected: <strong>{pedestrianCount}</strong>
//           </p>
//         )}
//         {outputImage && (
//           <div className="image-container">
//             <img src={outputImage} alt="Output" className="image" />
//           </div>
//         )}

//         {/* Conditionally render the View Chart button after pedestrian count is detected */}
//         {pedestrianHistory.length > 0 && !showChart && pedestrianCount !== null && (
//           <button
//             className="button"
//             onClick={() => setShowChart(true)}
//           >
//             View Chart
//           </button>
//         )}

//         {/* Show the bar chart when the showChart state is true */}
//         {showChart && (
//           <div className="chart-container">
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         )}

//         {/* Reset button */}
//         <button className="button" onClick={handleReset}>
//           Reset
//         </button>
//       </div>

//       {/* History Section */}
//       <div className="history-container">
//         <h2>Detection History</h2>
//         {pedestrianHistory.length > 0 ? (
//           <ul className="history-list">
//             {pedestrianHistory.map((entry, index) => (
//               <li key={index} className="history-item">
//                 <strong>{entry.image}:</strong> {entry.count} pedestrians
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No history available.</p>
//         )}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default DetectionPage;


import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './detectionPage.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DetectionPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [pedestrianCount, setPedestrianCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pedestrianHistory, setPedestrianHistory] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setError(null); // Reset any previous error when a new image is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image before submitting!");
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setIsLoading(true);
      setOutputImage(null);
      setPedestrianCount(null);
      setError(null); // Reset error state

      // Send image to Flask backend
      const response = await axios.post('http://127.0.0.1:5000/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Get pedestrian count and output image URL from the response
      const count = response.data.pedestrian_count;  // Access pedestrian count from response data
      setPedestrianCount(count);

      // Set the output image path
      setOutputImage('http://127.0.0.1:5000/output_image');

      // Add the pedestrian count to the history
      setPedestrianHistory(prevHistory => [
        ...prevHistory,
        { image: `Image ${prevHistory.length + 1}`, count: parseInt(count) },
      ]);

    } catch (err) {
      console.error("Error during pedestrian detection:", err);
      setError("Something went wrong. Please try again."); // Set error state
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = {
    labels: pedestrianHistory.map((entry) => entry.image),
    datasets: [
      {
        label: 'Pedestrian Count',
        data: pedestrianHistory.map((entry) => entry.count),
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black color (rgba format for transparency)
        borderColor: 'rgba(0, 0, 0, 1)', // Black border
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'black', // Black color for X-axis labels
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.2)', // Optional: Light black for grid lines
        },
      },
      y: {
        ticks: {
          color: 'black', // Black color for Y-axis labels
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.2)', // Optional: Light black for grid lines
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Pedestrian Detection History',
        color: 'black', // Black color for chart title
      },
      legend: {
        labels: {
          color: 'black', // Black color for legend text
        },
      },
    },
  };

  // Function to reset the form and all state
  const handleReset = () => {
    setSelectedImage(null);
    setOutputImage(null);
    setPedestrianCount(null);
    setPedestrianHistory([]);
    setShowChart(false); // Hide chart on reset
    setError(null); // Reset error on reset
  };

  return (
    <div className='body'>
      <div className="page-container">
        <div className="detection-container">
          <h1 className="title">Pedestrian Detection</h1>
          
          {/* Form for image upload */}
          <form onSubmit={handleSubmit} className="form">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <button type="submit" className="button" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Detect Pedestrians'}
            </button>
          </form>

          {/* Error message */}
          {error && <p className="error">{error}</p>}

          {/* Pedestrian count result */}
          {pedestrianCount !== null && (
            <p className="result">
              Pedestrians Detected: <strong>{pedestrianCount}</strong>
            </p>
          )}

          {/* Display output image */}
          {outputImage && (
            <div className="image-container">
              <img src={outputImage} alt="Output" className="image" />
            </div>
          )}

          {/* Show chart button */}
          {pedestrianHistory.length > 0 && !showChart && pedestrianCount !== null && (
            <button
              className="button"
              onClick={() => setShowChart(true)}
            >
              View Chart
            </button>
          )}

          {/* Show the bar chart when the showChart state is true */}
          {showChart && (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          {/* Reset button */}
          <button className="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* History Section */}
        <div className="history-container">
          <h2>Detection History</h2>
          {pedestrianHistory.length > 0 ? (
            <ul className="history-list">
              {pedestrianHistory.map((entry, index) => (
                <li key={index} className="history-item">
                  <strong>{entry.image}:</strong> {entry.count} pedestrians
                </li>
              ))}
            </ul>
          ) : (
            <p>No history available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetectionPage;
