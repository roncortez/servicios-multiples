import React from "react";
import { jsPDF } from "jspdf";
import logo from './logo.jpg'

const PdfPermiso = ({ permiso }) => {
    const generarPdf = () => {
        const doc = new jsPDF();
        const anchoPagina = doc.internal.pageSize.width;
        const alturaPagina = doc.internal.pageSize.height;
        const margenInferior = alturaPagina - 30;
        const margenIzquierdo = 20; // Espacio desde el borde izquierdo
        
        
        // Agregar el logo
        doc.addImage(logo, "JPG", (anchoPagina - 10)/2, 10, 10, 12);
        // Títulos
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");  // Activa negrita
        doc.text("Círculo Militar", anchoPagina / 2, 27, { align: "center" });
        doc.text("¡Mucho más que un buen club!", anchoPagina / 2, 32, { align: "center" });

        // Título de documento
        doc.setFontSize(14);
        doc.text("SOLICITUD DE PERMISO", anchoPagina / 2, 60, { align: "center" });

        // Datos de la solicitud
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");  // Activa negrita
        doc.setTextColor(255, 0, 0);
        doc.text(`Nº: ${permiso.id}`, anchoPagina - 20, 60, { align: "right" });

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");  // Activa negrita
        doc.text("APELLIDOS Y NOMBRES:", margenIzquierdo, 90);
        doc.setFont("helvetica", "normal");  // Activa negrita
        doc.text(permiso.empleado, margenIzquierdo, 100);

        doc.setFont("helvetica", "bold");  // Activa negrita
        doc.text("TIPO:",  margenIzquierdo, 120);

        doc.setFont("helvetica", "normal");
        doc.text((permiso.tipo).toUpperCase(), 20, 130);
        if(permiso.tipo === "Médico") {
            doc.setFontSize(10);
            doc.setTextColor(255, 0, 0);
            doc.text("*Es necesario un certificado médico", margenIzquierdo, 135);
        } 

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");  // Activa negrita
        doc.text("DURACIÓN:",  margenIzquierdo, 150);
        doc.setFont("helvetica", "normal");  // Activa negrita

        if(permiso.total_horas) {
            doc.text(`Día: ${permiso.dia_permiso}`, margenIzquierdo, 160);
            doc.text(`Hora de salida: ${permiso.hora_salida}`, margenIzquierdo, 170);
            doc.text(`Hora de ingreso: ${permiso.hora_ingreso} `, margenIzquierdo, 180);
            doc.text(`Total de horas: ${permiso.total_horas.toString()}`, margenIzquierdo, 190);

        } else {
            doc.text(`Fecha de salida: ${permiso.fecha_salida}`,  margenIzquierdo, 160);
            doc.text(`Fecha de presentación: ${permiso.fecha_ingreso}`,  margenIzquierdo, 170);
            doc.text(`Total de días: ${permiso.total_dias.toString()}`,  margenIzquierdo, 180);
        }

        // PIE DE PÁGINA: Firmas
        const anchoFirma = 50; // Ancho de cada firma
        const espacioEntreFirmas = (anchoPagina - (margenIzquierdo * 2) - (anchoFirma * 3)) / 2; // Espacio uniforme

        const x1 = margenIzquierdo; 
        const x2 = x1 + anchoFirma + espacioEntreFirmas;
        const x3 = x2 + anchoFirma + espacioEntreFirmas;

        doc.setLineWidth(0.5);
        doc.line(x1, margenInferior, x1 + anchoFirma, margenInferior); // Firma 1
        doc.line(x2, margenInferior, x2 + anchoFirma, margenInferior); // Firma 2
        doc.line(x3, margenInferior, x3 + anchoFirma, margenInferior); // Firma 3

        doc.setFontSize(10);
        doc.text("Trabajador", x1 + 15, margenInferior + 5);
        doc.text("Jefe Inmediato", x2 + 15, margenInferior + 5);
        doc.text("Talento Humano", x3 + 15, margenInferior + 5);

        doc.save("solicitud.pdf");
    };

    return (
        <div>
            <button 
                className="bg-blue-900 rounded-lg text-white p-2 w-full"
                onClick={generarPdf}
            >
                Descargar  
            </button>
        </div>
    );
};

export default PdfPermiso;
