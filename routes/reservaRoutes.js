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
router.delete('/:id', reservaController.eliminarReserva);

module.exports = router;
