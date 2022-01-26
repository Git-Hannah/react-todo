import express from 'express';

const app = express()
const port = 4000

app.get('/', (request, response) => {
	response.send('Hello World!')
  })


  app.get('/todos/', (request, response) => {
	  response.json([
			  { id: 1, name: "First toDo"},
		  { id: 2, name: "Second toDo"},
	  ])
  })

  app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  })
