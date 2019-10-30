const mongoose = require('mongoose')

const TransportDataSchema = mongoose.Schema({
    start: {
        // Start time
        type: Date
    },
    destCoordinates: {
        // Destination coordinates
        type: String
    },
    destName: {
        // Destination name
        type: String
    },
    mode: {
        // Transport mode
        type: Number
    }
})

const TransportData = mongoose.model('transport_data', TransportDataSchema)

module.exports = TransportData
