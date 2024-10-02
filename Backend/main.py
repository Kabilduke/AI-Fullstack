import pandas as pd
import os
import csv
import openai
from dotenv import load_dotenv
from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
client = openai

class Message(BaseModel):
    Category: str
    user_Message: str | None = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

df = pd.read_csv("csv/corrected_final_home_improvement_services.csv")

group_df = df.groupby('Category Name')

@app.get("/")
def read_root():
    return{"Message": "Chat bot is running!"}

# Category Name from the dataset and store it in the [categories = list()]
@app.get("/categories")
def get_categories():
    categories = df['Category Name'].unique().tolist()
    return {'categories': categories}

@app.get('/questions/{category_name}')
def get_questions(category_name: str):
    category_data = df[df['Category Name'] == category_name]

    if category_data.empty:  
        raise HTTPException(status_code=404, detail="No questions found for this category")

    questions = []
    for index, row in category_data.iterrows():
        question = row['Question Funnel']
        service_ID = row['Service ID']
        questions.append({
            'questions': question,
            'service_ID': service_ID    
        })

    return {'questions': questions}


@app.post('/openai')
async def get_openai_response(message: Message):
    try:
        category_data = df[df['Category Name'] == message.Category]

        print(f"Category: {message.Category}")
        print(f"User Message: {message.user_Message}")

        questions = []
        for index, row in category_data.iterrows():
            question = row['Question Funnel']
            questions.append(question)

        prompt = f"""Welcome to the Home Service! You have chosen {message.Category}.
           These are the list help your service can provide {questions}. 
           Ask the questions in a natural way one by one and find out what repair the user want if the repair is available in the given list of questions tell them to fill the form else Service not available. 
           Don't ask question out of the given list of questions. 
           Once you find out what they want end the chat.
           If the user types Thank you or Service Form say Please fill the form.
           Don't repeat same question.
           """
        
        messages =[
            {"role": "system", 
             "content": prompt},

             {"role": "user",
              "content": message.user_Message
              }
        ]
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages= messages
        )

        assitant_message = response.choices[0].message.content

        return{"response": assitant_message}
    
    except Exception as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code= 500, detail=str(e))



@app.post("/submit")
def submit(
    category: str = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    zipcode: int = Form(...),
    address: str = Form(...),
    phone: int = Form(...),
    service:str = Form(...)
):
    file_path = "/Users/kabil/Challenge/Customer.data/data.csv"

    form_data = {
        "category": category,
        "name": name,
        "email": email,
        "zipcode": zipcode,
        "address": address,
        "phone": phone,
        "service": service
    }

    try:
        with open(file_path, mode='a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=form_data.keys())
                
                # Write the header if the file is empty
            if file.tell() == 0:
                writer.writeheader()

            writer.writerow(form_data)
        
    except Exception as e:
        return {"error": str(e)}

    return {"message": "Form submitted successfully", "data": form_data}
