import PDFDocument from "pdfkit";
import type { Response } from "express";

export class PdfService {
    static generateTripPDF(trip: any, res: Response) {
        const doc = new PDFDocument();
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=trip-${trip._id}.pdf`);
        
        doc.pipe(res);

        // Header
        doc.fontSize(20).text("ORDRE DE MISSION", { align: "center" });
        doc.moveDown();

        // Trip details
        doc.fontSize(12);
        doc.text(`ID: ${trip._id}`);
        doc.text(`Origine: ${trip.origin}`);
        doc.text(`Destination: ${trip.destination}`);
        doc.text(`Date de départ: ${new Date(trip.departureDate).toLocaleDateString()}`);
        doc.text(`Statut: ${trip.status}`);
        doc.moveDown();

        // Truck info
        if (trip.truckId) {
            doc.text(`Camion: ${trip.truckId.matriculation} - ${trip.truckId.brand}`);
        }
        doc.moveDown();

        // Driver info
        if (trip.driverId) {
            doc.text(`Chauffeur: ${trip.driverId.name}`);
        }
        doc.moveDown();

        // Mileage
        if (trip.departureMileage) {
            doc.text(`Kilométrage départ: ${trip.departureMileage} km`);
        }
        if (trip.arrivalMileage) {
            doc.text(`Kilométrage arrivée: ${trip.arrivalMileage} km`);
        }

        // Fuel
        if (trip.fuelVolume) {
            doc.text(`Volume gasoil: ${trip.fuelVolume} L`);
        }

        // Notes
        if (trip.notes) {
            doc.moveDown();
            doc.text(`Notes: ${trip.notes}`);
        }

        doc.end();
    }
}