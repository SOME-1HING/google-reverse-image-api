# Google Reverse Image Search API

This is a simple API built using Node.js and Express.js that allows you to perform Google Reverse Image Search by providing an image URL. The API uses Puppeteer to automate a headless Chrome browser and perform the search on Google's image search engine.

## Usage

To use the API, you need to make a POST request to the `/reverse` endpoint with a JSON payload containing the image URL. Here's an example using `curl`:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"imageUrl": "https://example.com/image.jpg"}' https://your-app-url.com/reverse
```

The API will respond with a JSON object containing the title and link of the top matching image from Google search, if the search was successful. Here's an example response:

```json
{
  "title": "Eiffel Tower",
  "link": "https://www.google.com/search?tbs=sbi:AMhZZivAuKHs9aJQPgTRAVqd74iKAWz3SLXaaljMHZUWu5QnFIBD1RQ1GA6B0cyS1TJwMhVrYowa4D0mCWVF5vBGRuhAyMQU0CVx_1wJb8N4eGvtnTXK7thizkT8WA5CItsHmlh06Kz1izB0WgHo2jNlbyONDJhU7sg"
}
```

If there was an error during the search process, the API will respond with a JSON object containing an error field with a description of the error. Here's an example response:

```json
{
  "error": "Could not perform reverse image search."
}
```

### Using the API in Python and JavaScript

To use this API in a Python project, you can use the `requests` library to make POST requests to the API endpoint. Here's an example:

```python
import requests

url = "https://your-app-url.com/reverse"
data = {"imageUrl": "https://example.com/image.jpg"}

response = requests.post(url, json=data)

if response.ok:
    print(response.json())
else:
    print(response.status_code)
```

To use the API in a JavaScript project, you can use the `fetch` function to make POST requests to the API endpoint. Here's an example:

```javascript
const url = "https://your-app-url.com/reverse";
const data = { imageUrl: "https://example.com/image.jpg" };

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

## Deployment

This API can be deployed to any cloud platform that supports Node.js applications. One popular option is Vercel, which allows you to deploy Node.js applications with zero configuration.

To deploy this API to [Vercel](https://vercel.com/), click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSOME-1HING%2Fgoogle-reverse-image-api&project-name=google-reverse-image-api&repository-name=google-reverse-image-api)

## Credits

This project was created by [SOME-1HING]. Feel free to use and modify this code for your own projects. If you found this project helpful, please consider giving it a ⭐️ on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE]() file for details.

### Terms of Use

By using this API, you agree to the following terms:

- The API is provided as-is and without warranty.
- You will not use the API for any illegal or unauthorized purpose.
- You will include proper attribution if you use the API in a public project.
