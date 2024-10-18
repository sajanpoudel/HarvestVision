import uvicorn
from fastapi import FastAPI
from feature import soil
import numpy as np
import pickle
import pandas as pd
import sklearn

app = FastAPI()
pickle_in = open("classifier.pkl", "rb")
classifier = pickle.load(pickle_in)


@app.get("/")
def index():
    return {'message': "Everything is working"}

@app.post('/predict')
def predict_crop(data: soil):
    data = data.dict()
    print(data)

    N = data["N"]
    P = data["P"]
    K = data["K"]
    temperature = data["temperature"]
    humidity = data["humidity"]
    ph = data["ph"]
    rainfall = data["rainfall"]

    prediction = classifier.predict([[N, P, K, temperature, humidity, ph, rainfall]])
    
    label = ['apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton',
 'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans',
 'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas', 'pomegranate',
 'rice', 'watermelon']
    
    ans = prediction.tolist()[0]

    return {
        'prediction': label[ans]
    }


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)