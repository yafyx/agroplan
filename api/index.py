from os.path import join

import joblib
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open(join("..", "data", "model.pkl"), "rb") as file:
    model = joblib.load(file)


@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    prediction = model.predict([list(data.values())])
    return jsonify(prediction.tolist())


if __name__ == "__main__":
    app.run(port=5328)
