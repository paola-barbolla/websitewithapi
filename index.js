const express = require ("express")
const app = new express()
const fetch = require("node-fetch")

const renderMenu = (currentPage) => {
  const selectedStyle = "color: green;"
  const defaultStyle = "color: red;"
  return `
    <ul>
      <li><a href = "/" style = "${currentPage === "/" ? selectedStyle : defaultStyle}">Home</a></li>        
    </ul>
    `
}

const renderHtml = (currentPage, body) => {
  return `
      <!DOCTYPE html>
      <html>
          <head>
              <title>website</title>
          </head>
          <body>
              ${renderMenu(currentPage)}
              ${body}
          </body>
      </html>
      `
}

var obj
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json())
  .then(data => obj = data)

app.get("/", (req, res) => {
  res.send(renderHtml("/", `
    <h1>post</h1>
    <ul>
      ${obj.map((e => {
    return `
          <div>
            <p>${e.userId}</p>
            <p>${e.id}</p>
            <p>${e.title}</p>
            <p>${e.body}</p>
          </div>
          `
  })).join(" ")}
    </ul>
  `))
})

// eslint-disable-next-line no-console
app.listen(8080, () => console.log("server listening on port 8080"))
