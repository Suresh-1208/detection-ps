from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS  # Import CORS
import cv2
import numpy as np
import os

app = Flask(__name__)

# Enable CORS for all routes (or for specific routes if needed)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Paths for YOLO model files
YOLO_WEIGHTS = 'yolov4-tiny.weights'  # Path to your yolov4-tiny weights
YOLO_CFG = 'yolov4-tiny.cfg'  # Path to your yolov4-tiny config
COCO_NAMES = 'classes.txt'

# Load YOLO model
net = cv2.dnn.readNet(YOLO_WEIGHTS, YOLO_CFG)
with open(COCO_NAMES, "r") as f:
    classes = [line.strip() for line in f.readlines()]

output_layers = net.getUnconnectedOutLayersNames()
output_image_path = 'static/output_image.jpg'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/detect', methods=['POST'])
def detect():
    # Check if an image file is uploaded
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save uploaded image
    image_path = os.path.join('static', 'input_image.jpg')
    image_file.save(image_path)

    # Process image to detect pedestrians and get count
    pedestrian_count = process_image(image_path)

    # Return response with image path and pedestrian count
    return jsonify({
        'pedestrian_count': pedestrian_count,
        'output_image': 'http://127.0.0.1:5000/output_image'
    })


@app.route('/output_image')
def output_image():
    return send_file(output_image_path, mimetype='image/jpeg')


def process_image(image_path):
    # Read image
    img = cv2.imread(image_path)
    height, width, channels = img.shape

    # Prepare image for YOLO
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outputs = net.forward(output_layers)

    boxes, confidences, class_ids = [], [], []
    pedestrian_count = 0

    for output in outputs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            if confidence > 0.5 and class_id == 0:  # Class 0 is 'person'
                pedestrian_count += 1

    # Save output image (highlight pedestrians)
    cv2.imwrite(output_image_path, img)

    return pedestrian_count


if __name__ == '__main__':
    app.run(debug=True)
