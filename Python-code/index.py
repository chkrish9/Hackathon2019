import io
import os
from google.cloud import vision_v1p3beta1 as vision
import cv2
import requests
import numpy as np
from playsound import playsound

# Getting keys
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'client_key.json'


def recognize_license_plate():

    img_resp = requests.get(path)
    img_arr = np.array(bytearray(img_resp.content), dtype=np.uint8)
    img = cv2.imdecode(img_arr, cv2.IMREAD_COLOR)

    # finding out the Image size
    height, width = img.shape[:2]

    # Scaling the image
    img = cv2.resize(img, (800, int((height * 800) / width)))

    # Store the image in temp file
    cv2.imwrite("temp.jpg", img)

    # Create new img path for google vision
    img_path = "temp.jpg"

    # Create google vision client
    client = vision.ImageAnnotatorClient()

    # Read image file
    with io.open(img_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    # Recognize text
    response = client.text_detection(image=image)
    texts = response.text_annotations

    for text in texts:
        if len(text.description) == 6 or len(text.description) == 7:
            license_plate = text.description
            # print(license_plate)

            url = "https://hackthon19.herokuapp.com/search?licenseNumber="+license_plate

            result = requests.get(url)

            data = result.json()

            if len(data) > 0:
                print("FOUND")
            else:
                print("NOT FOUND")
                img = cv2.imread(img_path)
                print(img)
                cv2.imshow('Recognize & Draw', img)
                cv2.waitKey(0)
                playsound('1.wav')


while True:
    path = "http://192.168.1.103:8080/shot.jpg"
    recognize_license_plate()
