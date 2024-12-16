# AI Fullstack Home Service Chatbot

This project is a full-stack web application that integrates a FastAPI backend with a React+Vite frontend to provide a chatbot for home service inquiries. Users can select a service category, ask questions, and fill out a form for further assistance.

## Features

- **Chatbot Interface:** Users can interact with a chatbot to ask questions about different home services.
- **Service Categories:** Users can choose from various service categories, including plumbing, electrical, landscaping, and more.
- **Dynamic Questioning:** The chatbot prompts users with relevant questions based on the selected service category.
- **Form Submission:** Users can fill out a form to provide their contact information and service details, which are sent to the server for processing.
- **Data Storage:** Submitted form data is stored in a CSV file for record-keeping.

## Technologies Used

- **Frontend:** React+Vite
- **Backend:** FastAPI
- **Database:** Local Device (CSV file for data storage)
- **Environment:** Python virtual environment

## Installation

### Backend(FastAPI)

1. Navigate to the backend directory:
   ```zsh
   cd AI-FullStack/Backend
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Set up your environment variables in a .env file:
   ```
   API_KEY=your_api_key_here
   ```
4. Start the FastAPI server:
   ```
   uvicorn main:app --reload
   ```
   
### Frontend (React+Vite)

1. Navigate to the frontend directory:
   ```zsh
   cd AI-FullStack/Frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm run dev
   ```
   
Demo:
![Model ShowCase:](https://github.com/Kabilduke/AI-Fullstack/blob/main/Demo%20Challenge%20Pic.png)


### Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.
   
   
   
