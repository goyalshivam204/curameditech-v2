from fastapi import FastAPI,Path
from typing import Optional
from pydantic import BaseModel
app = FastAPI()

class Student(BaseModel):
    name: str
    roll_no: str
    age: int

class UpdateStudent(BaseModel):
    name: Optional[str] = None
    roll_no: Optional[str] = None
    age: Optional[int] = None

students = {
    1: {
        "name": "Shivam Goyal",
        "roll_no": "UE193131",
        "age": 22
    },
    2:  {
        "name": "Deepak Goyal",
        "roll_no": "UE198025",
        "age": 22
    },
    3: {
        "name" : "Raghav Goyal",
        "roll_no": "UE203080",
        "age": 21
    }
}


@app.get("/")
def index():
    return {"name": "First Data"}


@app.get("/get/{student_id}")
def get_student_by_id(student_id: int = Path(None,description="The id of student",ge=1,le = 100 )):
    return students[student_id]

@app.get("/get")
def get_student_by_name(name: Optional[str] = None):
    for student_id in students:
        if students[student_id]["name"] == name:
            return students[student_id]
    return {"Data": "Not Found"}


@app.post("/create/{student_id}")
def create_student(student_id: int,student: Student):
    if student_id in students:
        return {"Error": "Student with {student_id} already exist"}
    students[student_id] = student
    return students[student_id]

@app.put("/update/{student_id}")
def update_student(student_id: int,student: UpdateStudent):
    if student_id not in students:
        return {"Error": "Student with {student_id} not Found" }
    print(student_id)    
    print("student:",student.name)

    if student.name != None:
        print("name:",student.name)
        print(students[student_id])
        students[student_id]["name"] = student.name
    if student.roll_no != None:
        students[student_id]["roll_no"] = student.roll_no
    if student.age != None:
        students[student_id]["age"] = student.age

    return students[student_id]