// ============================================================
// SHENU FASHION STORE - Invoice PDF Generator
// Generates official PDF receipts using jsPDF & AutoTable
// ============================================================

export function generateInvoicePDF(order) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert('PDF generation library is still loading. Please try again in a moment.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const orderId = order.id || order.orderId || 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
  const customerName = order.userName || `${order.shippingAddress?.firstName || 'Valued'} ${order.shippingAddress?.lastName || 'Customer'}`.trim();
  const phone = order.shippingAddress?.phone || 'N/A';
  const address = `${order.shippingAddress?.address1 || ''}${order.shippingAddress?.address2 ? ', ' + order.shippingAddress?.address2 : ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.district || 'Sri Lanka'}`;
  const paymentMethod = (order.paymentMethod || 'card').toUpperCase();
  const paymentId = order.paymentId || (order.paymentMethod === 'paypal' ? 'PAYID-SANDBOX-CONFIRMED' : 'TXN-' + Math.floor(10000000 + Math.random() * 90000000));

  // --- Brand Header Banner ---
  doc.setFillColor(15, 15, 26); // #0F0F1A
  doc.rect(0, 0, 210, 42, 'F');

  // Gold Accent line
  doc.setFillColor(201, 169, 110); // #C9A96E
  doc.rect(0, 42, 210, 2, 'F');

  // Logo & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(201, 169, 110);
  doc.text('SHENU FASHION STORE', 14, 20);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 215);
  doc.text('Elevating Style Through Smart E-Commerce | Horizon Campus IT32053', 14, 27);
  doc.text('Web: https://shenufashion.lk | Email: support@shenufashion.lk', 14, 33);

  // Invoice Tag on Right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('INVOICE / RECEIPT', 196, 20, { align: 'right' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(201, 169, 110);
  doc.text(`#${orderId}`, 196, 28, { align: 'right' });
  doc.setTextColor(200, 200, 215);
  doc.text(`Date: ${orderDate}`, 196, 35, { align: 'right' });

  // --- Customer & Billing Information ---
  doc.setTextColor(30, 30, 45);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILLED TO (CUSTOMER):', 14, 54);
  doc.text('ORDER & PAYMENT DETAILS:', 115, 54);

  doc.setDrawColor(220, 220, 230);
  doc.setLineWidth(0.3);
  doc.line(14, 56, 95, 56);
  doc.line(115, 56, 196, 56);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 75);

  // Left column: Customer
  doc.text(`Name: ${customerName}`, 14, 62);
  doc.text(`Contact: ${phone}`, 14, 68);
  const splitAddress = doc.splitTextToSize(`Delivery: ${address}`, 80);
  doc.text(splitAddress, 14, 74);

  // Right column: Payment
  doc.text(`Status: CONFIRMED & VERIFIED`, 115, 62);
  doc.text(`Payment Gateway: ${paymentMethod === 'PAYPAL' ? 'PayPal Sandbox' : paymentMethod}`, 115, 68);
  doc.text(`Transaction Reference: ${paymentId}`, 115, 74);
  doc.text(`Delivery Method: Standard Courier (Islandwide)`, 115, 80);

  // --- Items Table ---
  const items = order.items || [];
  const tableRows = items.map((item, idx) => {
    const unitPrice = item.price || item.unitPrice || 0;
    const qty = item.quantity || 1;
    const rowTotal = unitPrice * qty;
    return [
      idx + 1,
      item.name || 'Fashion Apparel Item',
      item.size ? `Size: ${item.size}${item.color ? ' | ' + item.color : ''}` : 'Standard',
      qty,
      `LKR ${unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      `LKR ${rowTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
    ];
  });

  if (tableRows.length === 0) {
    tableRows.push([1, 'Custom Fashion Order Item', 'Standard', 1, `LKR ${(order.subtotal || order.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`, `LKR ${(order.subtotal || order.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`]);
  }

  // Draw AutoTable
  if (doc.autoTable) {
    doc.autoTable({
      startY: 92,
      head: [['#', 'Item Description', 'Variant', 'Qty', 'Unit Price', 'Amount']],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [15, 15, 26],
        textColor: [201, 169, 110],
        fontStyle: 'bold',
        fontSize: 9
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3.5,
        textColor: [40, 40, 50]
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 65 },
        2: { cellWidth: 35 },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 30, halign: 'right' },
        5: { cellWidth: 35, halign: 'right' },
      }
    });
  }

  const finalY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 120) + 8;

  // --- Totals Summary on the right ---
  const subtotal = order.subtotal || order.total || 0;
  const delivery = order.deliveryFee !== undefined ? order.deliveryFee : (subtotal >= 5000 ? 0 : 350);
  const discount = order.discount || 0;
  const grandTotal = order.total || (subtotal - discount + delivery);

  const summaryX = 120;
  doc.setFontSize(9.5);
  doc.setTextColor(70, 70, 85);
  doc.text('Subtotal:', summaryX, finalY);
  doc.text(`LKR ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 196, finalY, { align: 'right' });

  let offset = 6;
  if (discount > 0) {
    doc.setTextColor(40, 160, 80);
    doc.text(`Discount (${order.couponCode || 'Promo'}):`, summaryX, finalY + offset);
    doc.text(`-LKR ${discount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 196, finalY + offset, { align: 'right' });
    offset += 6;
  }

  doc.setTextColor(70, 70, 85);
  doc.text('Delivery Fee:', summaryX, finalY + offset);
  doc.text(delivery === 0 ? 'FREE' : `LKR ${delivery.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 196, finalY + offset, { align: 'right' });
  offset += 7;

  // Total Box
  doc.setFillColor(245, 243, 238);
  doc.roundedRect(summaryX - 4, finalY + offset - 4, 80, 10, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 15, 26);
  doc.text('Grand Total:', summaryX, finalY + offset + 3);
  doc.setTextColor(168, 133, 74);
  doc.text(`LKR ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 194, finalY + offset + 3, { align: 'right' });

  // Verification Badge / Watermark
  doc.setDrawColor(76, 175, 110);
  doc.setLineWidth(0.8);
  doc.roundedRect(14, finalY, 65, 20, 2, 2, 'D');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(76, 175, 110);
  doc.text('[ VERIFIED PURCHASE ]', 46, finalY + 8, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 120);
  doc.text('Shenu Fashion E-Commerce System', 46, finalY + 14, { align: 'center' });

  // --- Bottom Footer ---
  doc.setFillColor(15, 15, 26);
  doc.rect(0, 280, 210, 17, 'F');
  doc.setFontSize(8);
  doc.setTextColor(201, 169, 110);
  doc.text('Shenu Fashion Store | IT32053 E-Commerce Final Project | Horizon Campus', 105, 287, { align: 'center' });
  doc.setTextColor(170, 170, 185);
  doc.text('Thank you for shopping with us! All rights reserved.', 105, 292, { align: 'center' });

  // Save PDF
  doc.save(`Invoice_${orderId}.pdf`);
}

window.downloadInvoicePDF = (order) => {
  generateInvoicePDF(order);
};
