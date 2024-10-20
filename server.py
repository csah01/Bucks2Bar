# server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from email_validator import validate_email, EmailNotValidError
import base64
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv
import imghdr

load_dotenv()

app = FastAPI()

origins = ["http://localhost:63343"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    emailId: EmailStr
    image: str

@app.post("/send-email")
async def send_email(request: EmailRequest):
    email_id = request.emailId
    image = request.image

    # Validate and sanitize the email and image inputs
    try:
        validate_email(email_id)
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Invalid email address!")

    try:
        image_data = base64.b64decode(image.split(',')[1])
        if len(image_data) > 10 * 1024 * 1024:  # Limit image size to 10MB
            raise HTTPException(status_code=400, detail="Image size too large")
        if imghdr.what(None, h=image_data) not in ['jpeg', 'png']:
            raise HTTPException(status_code=400, detail="Invalid image type")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image data")

    msg = MIMEMultipart()
    msg['From'] = 'test@resend.dev'
    msg['To'] = email_id
    msg['Subject'] = 'Your Chart Image'

    part = MIMEBase('application', 'octet-stream')
    part.set_payload(image_data)
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="chart.png"')
    msg.attach(part)

    try:
        with smtplib.SMTP(os.getenv('EMAIL_HOST'), os.getenv('EMAIL_PORT')) as server:
            server.starttls()
            server.login(os.getenv('EMAIL_USER'), os.getenv('EMAIL_PASS'))
            server.sendmail(msg['From'], msg['To'], msg.as_string())
    except Exception as e:
        # Log the detailed error internally
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

    return {"message": "Email sent successfully!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)