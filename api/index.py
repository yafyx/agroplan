from os.path import join

import joblib
from flask import Flask, jsonify, request

app = Flask(__name__)

with open(join("../data", "model.pkl"), "rb") as file:
    model = joblib.load(file)


@app.route("/api/predict", methods=["GET"])
def predict():
    data = request.get_json()
    prediction = model.predict([data])
    return jsonify(prediction.tolist())


if __name__ == "__main__":
    app.run(port=5328)
