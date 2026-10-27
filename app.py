from flask import Flask, render_template, request, jsonify
from chatbot import get_response
import os

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({
            "response": "Please enter a question."
        })

    try:
        answer = get_response(user_message)

        return jsonify({
            "response": answer
        })

    except Exception as e:
        print("Error:", e)

        return jsonify({
            "response": "Sorry, something went wrong. Please try again."
        })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)