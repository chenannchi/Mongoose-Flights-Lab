import {Flight} from "../models/flight.js"

function newFlight(req,res){
  res.render("flights/new",{
    title:"Add Flight"
  })
}

function create(req,res){
  // remove empty properties
	for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect("/flights")
  })
  .catch(err => {
    res.redirect('/flights')
  })
}

function index(req,res){
  Flight.find({})
  .then(flights => {
    res.render("flights/index",{
      flights:flights,
      title:"All Flights"
    })
  })
  .catch(err => {
    res.redirect('/flights/index')
  })
}

export{
  newFlight as new,
  create,
  index
}