FROM python:3.11-slim-buster
ARG PYTHON_VERSION=3.11
COPY ./myapp /app
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "app.py"]