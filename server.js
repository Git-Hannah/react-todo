import express from 'express';

const app = express()
const port = 4000

app.get('/', (request, response) => {
	response.send('Hello World!')
  })


  app.get('/todos/', (request, response) => {
	  response.json(({
		  toDos:
		  {
			  id: "First",
			  name: "Second"
		  },
		  {
			id: "Third",
			name: "Fourth"
		  },
	  }))
  })

  app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  })
