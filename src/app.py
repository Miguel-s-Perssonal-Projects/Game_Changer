from flask import Flask, jsonify
from flask_cors import CORS
import json
import os
import pandas as pd

# Serve static files (images, etc.)
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'datasets', 'assets', 'images'))
CORS(app)

@app.route('/images/<path:filename>')
def serve_image(filename):
    """ Serve images from the 'assets/images' folder. """
    return app.send_static_file(filename)

@app.route('/update-datasets', methods=['GET'])
def update_datasets():
    """ Process the dataset and serve constellation data. """
    # Define the relative path and get absolute path for constellation_names.csv
    relative_path = os.path.join(os.path.dirname(__file__), 'datasets', 'constellation_names.csv')
    absolute_path = os.path.abspath(relative_path)

    print("Attempting to access file at:", absolute_path)

    # Check if the file exists
    if not os.path.exists(absolute_path):
        print(f"File not found: {absolute_path}")
        return jsonify({"error": "Constellation names file not found."}), 404

    # Read the CSV data
    constellation_data = pd.read_csv(absolute_path)

    # Ensure necessary columns are available
    required_columns = ['Name', 'Abbreviation', 'Genitive', 'Meaning', 'Brightest Star']
    for col in required_columns:
        if col not in constellation_data.columns:
            return jsonify({"error": f"Missing required column: {col}"}), 400

    # Path to the images in the 'assets/images' folder
    stargazer_images_path = os.path.join(os.path.dirname(__file__), 'datasets', 'assets', 'images')

    # Ensure the stargazer images path exists
    if not os.path.exists(stargazer_images_path):
        return jsonify({"error": "Stargazer images path not found."}), 404

    # Extract images from the stargazer dataset (assuming JSON contains `imagePath`)
    stargazer_images = {}
    print(f"Extracting images from stargazer dataset in {stargazer_images_path}...")
    for file in os.listdir(stargazer_images_path):
        if file.endswith('.json'):
            with open(os.path.join(stargazer_images_path, file)) as f:
                shapes_data = json.load(f)

                # Extract imagePath from the JSON file
                image_path = shapes_data.get('imagePath')

                if image_path:
                    for shape in shapes_data.get('shapes', []):
                        label = shape.get('label')
                        if label:
                            first_word = label.split()[0].lower()  # Get first word from label (e.g., "Andromeda")
                            # Store the relative image path (using Flask's static path for serving images)
                            stargazer_images[first_word] = os.path.join('http://localhost:5000/images', image_path).replace("\\", "/")

    # Prepare final constellation data with attributes and image paths
    final_constellation_data = []
    for index, row in constellation_data.iterrows():
        name = row['Name']
        if name.lower() in stargazer_images:  # Ensure matching image exists
            final_constellation_data.append({
                "name": name, 
                "abbreviation": row['Abbreviation'],
                "genitive": row['Genitive'],
                "meaning": row['Meaning'],
                "brightestStar": row['Brightest Star'],
                "imagePath": stargazer_images[name.lower()]  # Relative image path to the Flask server
            })

    # Save the final constellation data to a JSON file
    final_constellations_file = 'final_constellations.json'
    with open(final_constellations_file, 'w') as f:
        json.dump(final_constellation_data, f)

    print(f"Final constellation data saved to {final_constellations_file} with {len(final_constellation_data)} entries.")
    return jsonify({"message": "Datasets updated successfully."})

@app.route('/constellations', methods=['GET'])
def get_constellations():
    """ Get all constellations and return the data. """
    try:
        with open('final_constellations.json') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Constellation data not found."}), 404

if __name__ == '__main__':
    app.run(debug=True)
