import jsPDF from "jspdf";

const BRAND_NAME = "Santorini flavours";
const LOGO_URL = `${process.env.PUBLIC_URL}/assets/Logo.ico`;

export const generateReceiptPDF = (receiptData) => {
    const {
        orderId,
        receipt: receiptNumber,
        customerName,
        customerMobileNumber,
        items,
        totalAmount,
        shopName = BRAND_NAME,
        logoUrl = LOGO_URL,
    } = receiptData;

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 15;

    // Set fonts
    const setFont = (type = "regular", size = 12) => {
        doc.setFont("helvetica", type);
        doc.setFontSize(size);
    };

    // Header with logo (if available)
    if (logoUrl) {
        try {
            doc.addImage(logoUrl, "PNG", 15, yPosition - 5, 15, 15);
        } catch (e) {
            console.warn("Could not load logo image");
        }
    }

    // Company name
    setFont("bold", 18);
    doc.setTextColor(225, 29, 72); // Rose-600
    doc.text(BRAND_NAME, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    // Tagline
    setFont("regular", 9);
    doc.setTextColor(100, 100, 100);
    doc.text("Delivering happiness, one slice at a time", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 8;

    // Receipt title
    setFont("bold", 14);
    doc.setTextColor(0, 0, 0);
    doc.text("Order Receipt", 15, yPosition);
    yPosition += 10;

    // Order details section
    setFont("bold", 10);
    doc.text("Order Details", 15, yPosition);
    yPosition += 6;

    setFont("regular", 9);
    doc.setTextColor(50, 50, 50);
    const orderDetails = [
        [`Order ID:`, orderId],
        [`Receipt No:`, receiptNumber],
        [`Date:`, new Date().toLocaleDateString()],
        [`Time:`, new Date().toLocaleTimeString()],
    ];

    orderDetails.forEach(([label, value]) => {
        doc.text(label, 15, yPosition);
        doc.text(value, 90, yPosition);
        yPosition += 6;
    });

    yPosition += 4;

    // Customer details section
    setFont("bold", 10);
    doc.text("Customer Details", 15, yPosition);
    yPosition += 6;

    setFont("regular", 9);
    const customerDetails = [
        [`Name:`, customerName],
        [`Mobile:`, customerMobileNumber],
        [`Shop:`, shopName],
    ];

    customerDetails.forEach(([label, value]) => {
        doc.text(label, 15, yPosition);
        doc.text(value, 90, yPosition);
        yPosition += 6;
    });

    yPosition += 8;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 8;

    // Items table header
    setFont("bold", 9);
    doc.setTextColor(0, 0, 0);
    doc.text("Item", 15, yPosition);
    doc.text("Size", 80, yPosition);
    doc.text("Qty", 100, yPosition);
    doc.text("Price", 120, yPosition);
    doc.text("Total", 155, yPosition);
    yPosition += 6;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 4;

    // Items rows
    setFont("regular", 9);
    doc.setTextColor(50, 50, 50);
    items.forEach((item) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        doc.text(item.title || item.name, 15, yPosition);
        doc.text(item.size, 80, yPosition);
        doc.text(String(item.quantity), 100, yPosition);
        doc.text(`₹${item.price}`, 120, yPosition);
        doc.text(`₹${itemTotal}`, 155, yPosition);
        yPosition += 6;
    });

    yPosition += 4;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
    yPosition += 6;

    // Total amount
    setFont("bold", 12);
    doc.setTextColor(225, 29, 72); // Rose-600
    doc.text("Total Amount", 120, yPosition);
    doc.text(`₹${totalAmount.toFixed(2)}`, 155, yPosition);
    yPosition += 10;



    // Footer
    setFont("regular", 8);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your order!", pageWidth / 2, yPosition, { align: "center" });
    doc.text(
        "For support, contact us at +919799760328 or Jaincreations48@gmail.com",
        pageWidth / 2,
        yPosition + 5,
        { align: "center" }
    );

    // Generate filename
    const filename = `SantoriniFlavours_Receipt_${orderId}_${new Date().getTime()}.pdf`;

    // Download PDF
    doc.save(filename);
};
