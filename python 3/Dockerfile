# syntax=docker/dockerfile:1

FROM python:3.9-bullseye

WORKDIR /python-docker

COPY requirements.txt ./
COPY data.pth ./
RUN pip3 install -r requirements.txt

COPY . .
ENV FLASK_APP=main.py
EXPOSE 5000
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]