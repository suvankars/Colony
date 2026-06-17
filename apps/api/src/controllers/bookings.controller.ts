//  createBooking,
//   getBookings,
//   getBookingById,
//   updateBooking,
//   deleteBooking,
import {
    createNewBooking,
  deleteExistingBooking,
  findAllBookings,
  findBookingById,
  updateExistingBooking,
} from "../services/bookings.service.js";
import express from "express";

export async function getBookings(req: express.Request, res: express.Response) {
  const bookings = await findAllBookings();
  res.json(bookings);
}

export async function getBookingById(
  req: express.Request,
  res: express.Response,
) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const booking = await findBookingById(id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.json(booking);
}

export async function createBooking(req: express.Request, res: express.Response) {
  const data = req.body;

  if (!data || !data.customerName) {
    return res.status(400).json({ message: "Missing required field: customerName" });
  }

  const booking = await createNewBooking(data);

  if (!booking) {
    return res.status(500).json({ message: "Booking not created" });
  }

  res.status(201).json(booking);
}

export async function updateBooking(req: express.Request, res: express.Response) {
    const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id
  const data = req.body
  const booking = await updateExistingBooking(id, data)

    res.json(booking)
}

export async function deleteBooking(req: express.Request, res: express.Response) {
    const id = Array.isArray(req.params.id)? req.params.id[0] : req.params.id

    await deleteExistingBooking(id)

    res.status(204).send()
}