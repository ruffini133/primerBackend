/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Operaciones relacionadas con las reservas hoteleras
 * 
 * definitions:
 *   Reserva:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID único de la reserva
 *       hotel:
 *         type: string
 *         description: Nombre del hotel
 *       tipo_habitacion:
 *         type: string
 *         description: Tipo de habitación reservada
 *       num_huespedes:
 *         type: integer
 *         description: Número de huéspedes
 *       fecha_inicio:
 *         type: string
 *         format: date
 *         description: Fecha de inicio de la reserva (en formato YYYY-MM-DD)
 *       fecha_fin:
 *         type: string
 *         format: date
 *         description: Fecha de fin de la reserva (en formato YYYY-MM-DD)
 */

const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crea una nueva reserva
 *     tags: [Reservas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Reserva'
 *     responses:
 *       201:
 *         description: Reserva creada satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Reserva'
 */
router.post('/', reservaController.crearReserva);

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtiene todas las reservas
 *     tags: [Reservas]
 *     responses:
 *       200:
 *         description: Lista de todas las reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Reserva'
 */
router.get('/', reservaController.obtenerReservas);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtiene una reserva específica por su ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la reserva
 *     responses:
 *       200:
 *         description: Detalles de la reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Reserva'
 */
router.get('/:id', reservaController.obtenerReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Actualiza una reserva existente por su ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Reserva'
 *     responses:
 *       200:
 *         description: Reserva actualizada satisfactoriamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Reserva'
 */
router.put('/:id', reservaController.actualizarReserva);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva existente por su ID
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la reserva
 *     responses:
 *       204:
 *         description: Reserva eliminada satisfactoriamente
 */

/**
 * @swagger
 * /reservas/filtrar/{hotel}:
 *   get:
 *     summary: Filtra las reservas por hotel
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: hotel
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del hotel para filtrar las reservas
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas por el hotel especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Reserva'
 */

router.get('/filtrar/:hotel', reservaController.filtrarReservasPorHotel);

/**
 * @swagger
 * /reservas/filtrarPorNumHuespedes/{numHuespedes}:
 *   get:
 *     summary: Filtra las reservas por número de huéspedes
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: numHuespedes
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de huéspedes para filtrar las reservas
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas por el número de huéspedes especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Reserva'
 */
router.get('/filtrarPorNumHuespedes/:numHuespedes', reservaController.filtrarReservasPorNumHuespedes);

/**
 * @swagger
 * /reservas/filtrarPorTipoHabitacion/{tipo_habitacion}:
 *   get:
 *     summary: Filtra las reservas por tipo de habitación.
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: tipo_habitacion
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de habitación para filtrar las reservas.
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas por el tipo de habitación especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Reserva'
 */
router.get('/filtrarPorTipoHabitacion/:tipo_habitacion', reservaController.filtrarReservasPorTipoHabitacion);


/**
 * @swagger
 * /reservas/filtrarPorFechas/{fecha_inicio}/{fecha_fin}:
 *   get:
 *     summary: Filtra las reservas por rango de fechas. A veces no funciona (rezar un padre nuestro para que funcione).
 *     tags: [Reservas]
 *     parameters:
 *       - in: path
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de inicio del rango de fechas en formato YYYY-MM-DD.
 *       - in: path
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Fecha de fin del rango de fechas en formato YYYY-MM-DD.
 *     responses:
 *       200:
 *         description: Lista de reservas filtradas por el rango de fechas especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Reserva'
 */
router.get('/filtrarPorFechas/:fecha_inicio/:fecha_fin', reservaController.filtrarReservasPorRangoDeFechas);




module.exports = router;
