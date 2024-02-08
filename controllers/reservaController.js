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

exports.filtrarReservasPorHotel = (req, res) => {
    const { hotel } = req.params; // Obtenemos el parámetro de la ruta
    const reservas = leerReservas(); // Obtenemos las reservas
    let reservasFiltradas = reservas; // Inicializamos con todas las reservas

    // Filtramos las reservas por el hotel especificado
    if (hotel) {
        reservasFiltradas = reservasFiltradas.filter(reserva => reserva.hotel.toLowerCase() === hotel.toLowerCase());
    }

    res.json(reservasFiltradas); // Enviamos las reservas filtradas como respuesta
};

exports.filtrarReservasPorNumHuespedes = (req, res) => {
    const numHuespedes = parseInt(req.params.numHuespedes, 10);
    const reservas = leerReservas(); // Usamos leerReservas para obtener todas las reservas del archivo JSON

    // Filtramos las reservas por el número de huéspedes
    const reservasFiltradas = reservas.filter(reserva => reserva.num_huespedes === numHuespedes);

    if (reservasFiltradas.length) {
        res.status(200).json(reservasFiltradas);
    } else {
        res.status(404).json({ error: "No se encontraron reservas con ese número de huéspedes" });
    }
};

exports.filtrarReservasPorTipoHabitacion = (req, res) => {
    const tipoHabitacion = req.params.tipo_habitacion;
    console.log("Tipo de habitación recibido:", tipoHabitacion); // Agregado para depuración
    const reservas = leerReservas();
    const reservasFiltradas = reservas.filter(reserva => reserva.tipo_habitacion.toLowerCase() === tipoHabitacion.toLowerCase());

    res.status(200).json(reservasFiltradas);
};


exports.filtrarReservasPorRangoDeFechas = (req, res) => {
    const fechaInicio = req.params.fecha_inicio;
    const fechaFin = req.params.fecha_fin;
    console.log("Fecha de inicio recibida:", fechaInicio); // Para depuración
    console.log("Fecha de fin recibida:", fechaFin); // Para depuración
    
    const reservas = leerReservas();
    const reservasFiltradas = reservas.filter(reserva => {
        // Convertir las fechas de inicio y fin de las reservas al mismo formato que las fechas recibidas
        const fechaInicioReserva = new Date(reserva.fecha_inicio).toISOString().split('T')[0];
        const fechaFinReserva = new Date(reserva.fecha_fin).toISOString().split('T')[0];
        
        // Verificar si la fecha de inicio de la reserva está dentro del rango especificado
        // y si la fecha de fin de la reserva también está dentro del rango
        return fechaInicioReserva >= fechaInicio && fechaFinReserva <= fechaFin;
    });

    if (reservasFiltradas.length > 0) {
        res.status(200).json(reservasFiltradas);
    } else {
        res.status(404).json({ error: "No se encontraron reservas en el rango de fechas especificado" });
    }
};
