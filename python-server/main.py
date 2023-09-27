from fastapi import FastAPI,Path
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse
from starlette.responses import HTMLResponse
from starlette.status import HTTP_404_NOT_FOUND
from typing import Optional
from pydantic import BaseModel
import pickle
import numpy as np
import numpy

from utils.DiseaseClassFile import DiseaseClass
from utils.utils import topNProbs
app = FastAPI()

# origins = [
   
#     "http://localhost:8000",
#     "http://localhost:80",
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )






#--------------------------------------------------------------------------------#
#-------------------------------Diabetes API START-------------------------------------#

# Loading required models and transformations

DiabetesModel = pickle.load(open("./saved_models/Diabetes/diabetes.sav","rb"))
DiabetesScaler = pickle.load(open("./saved_models/Diabetes/ageScaler.sav", "rb"))

def transform_age(old_age):
    age_reshaped = np.asarray([[old_age]])
    new_age = DiabetesScaler.transform(age_reshaped)
    return new_age[0][0]

class DiabetesInput(BaseModel):
    Age: float
    Gender: int
    Polyuria: int
    Polydipsia: int
    sudden_weight_loss: int
    weakness: int
    Polyphagia: int
    Genital_thrush: int
    visual_blurring: int
    Itching: int
    Irritability: int
    delayed_healing: int
    partial_paresis: int
    muscle_stiffness: int
    Alopecia: int
    Obesity: int



@app.post("/api/diabetes")
def index(input: DiabetesInput):
    input_dict = input.dict()
    # print(input_dict)
    # model.predict()
    input_dict["Age"] = transform_age(input_dict["Age"])
    print(input_dict)
    X_list = []
    for key in input_dict:
        X_list.append(input_dict[key])
    X = numpy.asarray(X_list)
    X = X.reshape(1,-1)
    # print(X.shape)
    print(X)
    Y = DiabetesModel.predict_proba(X)
    # print("Output:", Y[0])
    # can't direct send int value may be
    if float(Y[0][0]) > float(Y[0][1]):
        return {"prediction": "You Don't have Diabetes !!","confidenceScore": str(Y[0][0])}    
    else:
        return {"prediction": "You've Diabetes !!","confidenceScore": str(Y[0][1])}


#-------------------------------Diabetes API END-------------------------------------#
#--------------------------------------------------------------------------------#



#--------------------------------------------------------------------------------#
#-------------------------------HEART API START-------------------------------------#

# Loading required models and transformations

HeartModel = pickle.load(open("./saved_models/Heart/heart_lr.sav","rb"))

class HeartInput(BaseModel):
    age: float
    sex: float
    trestbps: float
    chol: float
    fbs: float
    thalch: float
    exang: float
    oldpeak: float
    ca: float
    cp_asymptomatic: float
    cp_atypical0angina: float
    cp_non1anginal: float
    cp_typical0angina: float
    restecg_lv0hypertrophy: float
    restecg_normal: float
    restecg_st1t0abnormality: float
    slope_downsloping: float
    slope_flat: float
    slope_upsloping: float
    thal_fixed0defect: float
    thal_normal: float
    thal_reversable0defect: float

 



riskPrediction = {
    "0": "No significant heart disease",
    "1": "Presence of mild heart disease",
    "2": "Presence of moderate heart disease",
    "3": "Presence of severe heart disease",
    "4": "Presence of extremely severe heart disease",
}

@app.post("/api/heart")
def index(input: HeartInput):
    # print(type(input))
    input_dict = input.dict()
    print(input_dict)
    X_list = []
    for key in input_dict:
        X_list.append(input_dict[key])
    print(X_list)

    X = numpy.asarray(X_list)
    X = X.reshape(1,-1)
    Y = HeartModel.predict(X)
    return {"prediction" : riskPrediction[str(Y[0])], "risk": str(Y[0])}



#-------------------------------HEART API END-------------------------------------#
#--------------------------------------------------------------------------------#


#--------------------------------------------------------------------------------#
#-------------------------------Disease API START-------------------------------------#

# Loading required models
DiseaseModel = pickle.load(open("./saved_models/Disease/disease_mnb.sav","rb"))



@app.post("/api/predict")
def disease_prediction(inp: DiseaseClass):
    input = inp.dict()
    features = DiseaseModel.feature_names_in_

    X = [0]* len(features)
    for i in range(0,len(features)):
        if features[i] in input:
            X[i] = input[features[i]]
    
    X_reshaped = np.asarray(X).reshape(1,-1)
    probs = DiseaseModel.predict_proba(X_reshaped)[0]
    top = topNProbs(probs,DiseaseModel,3)
    for ele in top:
        print(ele)
    return top[0]
            




#-------------------------------Disease API END-------------------------------------#
#--------------------------------------------------------------------------------#


#--------------------------------------------------------------------------------#
#-------------------------------Serve Static Files-------------------------------------#




# @app.get("/")
# def index():
#     return FileResponse("./build/index.html")

# @app.get("/disease_prediction")
# def index():
#     return FileResponse("./build/index.html")

# @app.get("/diabetes_prediction")
# def index():
#     return FileResponse("./build/index.html")

# @app.get("/heart_prediction")
# def index():
#     return FileResponse("./build/index.html")

# @app.get("/{anypath}")
# def index():
#     return HTMLResponse(
#         status_code=HTTP_404_NOT_FOUND,
#         content="""<html>
#             <head>
#                 <title>Not Found</title>
#             </head>
#             <body>
#                 <h1>404 Not Found</h1>
#                 <p>The requested URL was not found on the server.</p>
#             </body>
#         </html>""",
#     )


# app.mount("/", StaticFiles(directory="./build", html=True), name="static")


#-------------------------------Serve Static Files END-------------------------------------#
#--------------------------------------------------------------------------------#