FROM python:3.10-alpine
WORKDIR /web
COPY . .
RUN pip3 install -r requirements.txt

ENTRYPOINT ["python3"]
CMD ["app.py"]