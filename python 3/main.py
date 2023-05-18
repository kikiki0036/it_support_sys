import random
import json
import torch
import requests
import numpy
import email
import smtplib, ssl
import torch.nn as nn
import mysql.connector
from modul import Neural
from thainlp import bow, tokenize
from pickletools import optimize
from torch.utils.data import Dataset, DataLoader
from modul import Neural
from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask('_name_')
CORS(app,resources={r"/api/*":{"origins":"*","credentials":"true",}})
app.config['CORS HRADERS'] = 'Content-Type'


@app.route('/traindata',methods=['GET'])
@cross_origin()
def wdatas():
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="",
      database="data_itservice"
    )
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM chatdb")
    myresult = mycursor.fetchall()
    all_words = []
    tags = []
    xy = []
    for x in myresult:
        tag = x[1]
        tags.append(tag)
        for i in x[2].split(','):
            w = tokenize(i)
            all_words.extend(w)
            xy.append((w, tag))
    all_words = sorted(set(all_words))
    tags = sorted(set(tags))
    print(tags)
    print(all_words)
    
    x_train = []
    y_train = []
    for(pattern, tag) in xy:
        bag = bow(pattern, all_words)
        x_train.append(bag)
        label = tags.index(tag)
        y_train.append(label)
    x_train = numpy.array(x_train)
    y_train = numpy.array(y_train)
    
    class ChatDataset(Dataset):

        def __init__(self):
            self.n_samples = len(x_train)
            self.x_data = x_train
            self.y_data = y_train

   
        def __getitem__(self, index):
            return self.x_data[index], self.y_data[index]

 
        def __len__(self):
            return self.n_samples
        
    batch_size = 8
    hidden_size = 8
    output_size = len(tags)
    input_size = len(x_train[0])
    learning_rate = 0.001
    num_epochs = 1000
    dataset = ChatDataset()
    train_loader = DataLoader(dataset=dataset,batch_size=batch_size,shuffle=True,num_workers=0)
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = Neural(input_size, hidden_size, output_size).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)
    for epoch in range(num_epochs):
        for (words, labels) in train_loader:
            words = words.to(device)
            labels = labels.to(dtype=torch.long).to(device)
            outputs = model((words.float()))
            loss = criterion(outputs, labels)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        
        if (epoch+1) % 100 == 0:
            print (f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

    print(f'final loss: {loss.item():.4f}')
    data = {
    "model_state": model.state_dict(),
    "input_size": input_size,
    "hidden_size": hidden_size,
    "output_size": output_size,
    "all_words": all_words,
    "tags": tags
    }
    torch.save(data, "data.pth")
    return json.dumps({'msg':"training complete"}), 200


@app.route('/send_em',methods=['POST'])
@cross_origin()
def send_em():
    jsony = request.json
    sender_email = "*********"
    receiver_email = jsony['receive']
    message = MIMEMultipart("alternative")
    message["Subject"] = jsony['title']
    message["From"] = sender_email
    message["To"] = receiver_email
    html1 = jsony['msg']
    html = """\
<html>
  <body>
    """+html1+"""
  </body>
</html>
"""
    part1 = MIMEText(html, "html")
    message.attach(part1)
    server = smtplib.SMTP('smtp-mail.outlook.com',587)
    server.starttls()
    server.login("*********","*********")
    server.sendmail(sender_email,receiver_email,message.as_string())
    server.quit()
    return "ok"

@app.route('/chatbot',methods=['POST'])
@cross_origin()
def chatbot():
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="",
      database="data_itservice"
    )
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM chatdb")
    myresult = mycursor.fetchall()
    FILE = "data.pth"
    data = torch.load(FILE)
    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    all_words = data['all_words']
    tags = data['tags']
    model_state = data["model_state"]
    model = Neural(input_size, hidden_size, output_size).to(device)
    model.load_state_dict(model_state)
    model.eval()
    jsony = request.json
    data = jsony['msg']
    sentence = tokenize(data)
    X = bow(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)
    output = model(X.float())
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
     #intents = json.load(json_data)
    print(prob)
    if prob.item() > 0.86:
        print("en")
        for intent in myresult:
            if tag == intent[1]:
                return str(intent[3])
    else:
        return str("โปรดระบุปัญหาให้ชัดเจน สามารถพืมพ์ !คำสั่ง เพื่อดูคำถามทั้งหมดได้")
    return str("ลองใหม่อีกครั้ง(คำที่พิมพ์มาใกล้เคียงกับในระบบ) สามารถพิมพ์!คำสั่ง เพื่อดูคำถามทั้งหมด")

if __name__ == "__main__":
    app.run(debug=False)
    # mydb = mysql.connector.connect(
    #   host="localhost",
    #   user="root",
    #   password="",
    #   database="data itsmart proj"
    # )

    # mydb = mysql.connector.connect(
    #   host="us-cdbr-east-06.cleardb.net",
    #   user="bf44fd476260ac",
    #   password="8e5334d7",
    #   database="heroku_c801ea3e21b5383"
    # )
