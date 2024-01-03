# Google Reverse Image Search API

This is a simple API built using Node.js and Express.js that allows you to perform Google Reverse Image Search by providing an image URL. The API uses Cheerio to scrap Google's image search engine's html to get result text and similar images url.

API is currently hosted on Vercel. You can access it using [this](https://google-reverse-image-api.vercel.app) link.

## Usage

To use the API, you need to make a POST request to the `/reverse` endpoint with a JSON payload containing the image URL. Here's an example using `curl`:

```bash
Invoke-RestMethod -Uri "https://google-reverse-image-api.vercel.app/reverse" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"imageUrl": "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0"}'

```

The API will respond with a JSON object containing the title and link of the top matching image from Google search, if the search was successful. Here's an example response:

```json
{
  "success" : true,
  "message" : "Successfully Got the Result",
  "data" : {
    "similarUrl" : "https://www.google.com/search?tbm=isch&q=Elderly%20person",
    "resultText" : "Results forÂElderly person"
  }
}

```

If there was an error during the search process, the API will respond with a JSON object containing an error field with a description of the error. Here's an example response:

```json
{
  "success" : false,
  "message" : "Failed to find text output",
  "data" : null
}

```

### Using the API in Python and JavaScript

To use this API in a Python project, you can use the `requests` library to make POST requests to the API endpoint. Here's an example:

```python
import requests

url = "https://google-reverse-image-api.vercel.app/reverse"
data = {"imageUrl": "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0"}

response = requests.post(url, json=data)

if response.ok:
    print(response.json())
else:
    print(response.status_code)

```

To use the API in a JavaScript project, you can use the `fetch` function to make POST requests to the API endpoint. Here's an example:

```javascript
const url = "https://google-reverse-image-api.vercel.app/reverse";
const data = { imageUrl: "https://fastly.picsum.photos/id/513/200/300.jpg?hmac=KcBD-M89_o9rkxWW6PS2yEfAMCfd3TH9McppOsf3GZ0" };

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Could not perform reverse image search.");
    }
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

```

### Telegram Integration

#### Python

This api can be easily used in your python telegram bot. The module example code is present [here](https://github.com/SOME-1HING/google-reverse-image-api/blob/main/examples/telegram_reverse.py). You can fork [ShikimoriBot](https://github.com/SOME-1HING/ShikimoriBot) repository if you are new to telegram bot development.

#### JavaScript

I will provide the code soon.

## Deployment

This API can be deployed to any cloud platform that supports Node.js applications. One popular option is Vercel, which allows you to deploy Node.js applications with zero configuration.

To deploy this API to [Vercel](https://vercel.com/), click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSOME-1HING%2Fgoogle-reverse-image-api&project-name=google-reverse-image-api&repository-name=google-reverse-image-api)

## Credits

This project was created by [SOME-1HING](https://www.github.com/SOME-1HING). Feel free to use and modify this code for your own projects. If you found this project helpful, please consider giving it a ⭐️ on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/SOME-1HING/google-reverse-image-api/blob/main/LICENSE) file for details.

### Terms of Use

By using this API, you agree to the following terms:

- The API is provided as-is and without warranty.
- You will not use the API for any illegal or unauthorized purpose.
- You will include proper attribution if you use the API in a public project.
