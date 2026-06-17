import { prisma }  from "../lib/prisma.js";

export function findAllBookings() {
    return prisma.booking.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
}


export function findBookingById(id: string) {
    return prisma.booking.findUnique({
            where: {id: Number(id)}
        })
}

export function createNewBooking(data: any){
    console.log(data)
    return prisma.booking.create({
        data
    })
}

export function updateExistingBooking(id: string, data: any) {
    return prisma.booking.update({
        where: {id: Number(id)},
        data
    })
}

export function deleteExistingBooking(id: string) {
    return prisma.booking.delete({
        where: {id: Number(id)}
    })
}