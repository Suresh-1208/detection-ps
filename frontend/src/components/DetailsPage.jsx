import React from 'react'; // Assuming the CSS is in the same folder
import './DetailsPage.css'
function DetailsPage() {
  return (
    <div className="details-container">
      <h1>Application Details</h1>
      <p>
        This Flask-based web application provides a simple yet powerful pedestrian detection system using the YOLO (You Only Look Once) model. The application allows users to upload images containing pedestrians, processes these images to detect and count pedestrians, and displays the processed results back to the user. The key components of this system include image uploading, YOLO-based object detection, and serving the results through a Flask web server.
        <br />
        <strong>Frontend and Image Upload:</strong>
        The user interacts with the application through a simple frontend where they can upload an image. The index route (/) renders the main page with an image upload form. The user selects an image file from their device, and it is submitted to the backend via a POST request to the /detect route...
        <br />
        <strong>YOLO Object Detection:</strong>
        Once the image is uploaded, the server processes it using the YOLO object detection model...
        <br />
        <strong>Post-Processing and Image Output:</strong>
        After detecting pedestrians, the system applies Non-Maximum Suppression (NMS) to eliminate redundant bounding boxes...
        <br />
        <strong>Displaying Results:</strong>
        The pedestrian count and the processed image are then displayed to the user...
        <br />
        <strong>Technologies and Libraries:</strong>
        The application uses several libraries to handle different tasks:
        <ul>
          <li><strong>Flask:</strong> A lightweight web framework for Python...</li>
          <li><strong>OpenCV:</strong> A computer vision library...</li>
          <li><strong>NumPy:</strong> A library for handling arrays...</li>
          <li><strong>Flask-CORS:</strong> A Flask extension...</li>
        </ul>
        In summary, this web application combines object detection, image processing, and web development to create a system that can accurately count pedestrians in images. It offers a simple interface for users to upload images and view the results...
      </p>
    </div>
  );
}

export default DetailsPage;
