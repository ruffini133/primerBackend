const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const reservasFilePath = path.join(__dirname, '..', 'data', 'reservas.json');

const leerReservas = () => {
    const data = fs.readFileSync(reservasFilePath);
    return JSON.parse(data);
};

exports.crearReserva = (req, res) => {
    const nuevasReservas = leerReservas();
    const nuevaReserva = { id: uuidv4(), ...req.body };
    nuevasReservas.push(nuevaReserva);

    fs.writeFileSync(reservasFilePath, JSON.stringify(nuevasReservas, null, 2));

    res.status(201).json(nuevaReserva);
};

exports.obtenerReservas = (req, res) => {
    const reservas = leerReservas();
    res.json(reservas);
};

exports.obtenerReserva = (req, res) => {
    const reservas = leerReservas();
    const reserva = reservas.find(r => r.id === req.params.id);
    if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
};

exports.actualizarReserva = (req, res) => {
    const reservas = leerReservas();
    const index = reservas.findIndex(r => r.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    reservas[index] = { ...reservas[index], ...req.body };
    fs.writeFileSync(reservasFilePath, JSON.stringify(reservas, null, 2));

    res.json(reservas[index]);
};

exports.eliminarReserva = (req, res) => {
    const reservas = leerReservas();
    const nuevasReservas = reservas.filter(r => r.id !== req.params.id);

    fs.writeFileSync(reservasFilePath, JSON.stringify(nuevasReservas, null, 2));

    res.status(204).end();
};
