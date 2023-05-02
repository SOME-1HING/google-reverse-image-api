import requests

url = "https://google-reverse-image-api.vercel.app/reverse"
data = {
    "imageUrl": "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0"
}

response = requests.post(url, json=data)

if response.ok:
    print(response.json())
else:
    print(response.status_code)
