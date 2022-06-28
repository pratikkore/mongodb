const express = require('express')

const router = express.Router();
const flightSchema = require('../model/flights');
const bookSchema = require('../model/bookTickets')

router.post('/bookTickets', async (req, res) => {
    try {
        const record = await flightSchema.find();
        const isFlightAvaialbe = false;
         record.forEach(data => {
            if (data.flightNo == req.body.planeNo) {
                isFlightAvaialbe = true;
                const book = new bookSchema({
                    planeNo: req.body.planeNo,
                    destination: req.body.destination
                });
                book.save()
                    .then(data => {
                        res.json(data);
                    })
                    .catch(err => {
                        res.json({ msg: err })
                    })
            }
        })
        if(!isFlightAvaialbe){
            res.json({msg:"No flight available"})
        }


    } catch (r) {
        res.json({ msg: r })

    }
})

router.get('/getBookingDetails', async (req, res) => {
    try {
        const record = await bookSchema.find();
        res.json(record);
    } catch (r) {
        res.json({ msg: r })

    }
})
module.exports = router;