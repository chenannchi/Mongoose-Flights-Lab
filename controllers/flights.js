import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render("flights/new", {
    title: "Add Flight"
  })
}

function create(req, res) {
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

function index(req, res) {
  Flight.find({})
    .then(flights => {
      res.render("flights/index", {
        flights: flights,
        title: "All Flights"
      })
    })
    .catch(err => {
      res.redirect('/flights/index')
    })
}

function show(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      res.render("flights/show", {
        title: "Movie Detail",
        flight: flight,
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
    .then(flight => {
      res.redirect("/flights")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}

function edit(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      res.render("flights/edit", {
        flight,
        title: "Edit Flight",
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(flight => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
    .then(flight => {
      flight.tickets.push(req.body)
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
}