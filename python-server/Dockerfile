FROM python:3.10.9

WORKDIR /usr/src/app

# # Create a non-root user (optional)
# RUN useradd -m myuser
# USER myuser

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Use uvicorn to run your FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3001"]
