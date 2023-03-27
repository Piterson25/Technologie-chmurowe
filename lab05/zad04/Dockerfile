FROM alpine
ARG PYTHON_VERSION=3.10.10-r0
ARG PORT=8080
ENV PYTHON_VERSION=${PYTHON_VERSION} \
    PORT=${PORT}
RUN apk add --update --no-cache python3=${PYTHON_VERSION} \
    py3-pip \
    py3-setuptools \
    py3-wheel
RUN mkdir /app
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE ${PORT}
VOLUME ["/app/data"]
CMD ["python3", "app.py"]
