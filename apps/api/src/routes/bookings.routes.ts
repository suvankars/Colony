import { Router } from "express"

const router = Router()

import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../controllers/bookings.controller.js";

router.get("/", getBookings)
router.get("/:id", getBookingById)
router.post("/", createBooking)
router.patch("/:id", updateBooking)
router.delete("/:id", deleteBooking)

export default router