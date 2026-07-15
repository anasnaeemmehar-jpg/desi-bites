// Placeholder for thermal/receipt printer integration.
// Real printer integration (e.g. via ESC/POS + node-thermal-printer) requires
// a local network or USB printer, so this is stubbed for now.

export function printReceipt(order) {
  console.log('--- RECEIPT (simulated) ---');
  console.log(`Order #${order.id}`);
  console.log(`Customer: ${order.customer_name} (${order.customer_phone})`);
  console.log(`Address: ${order.customer_address}`);
  console.log('Items:');
  order.items?.forEach((item) => {
    console.log(`  ${item.quantity} x ${item.product_name} - Rs. ${item.price * item.quantity}`);
  });
  console.log(`Total: Rs. ${order.total_amount}`);
  console.log('----------------------------');
  return true;
}
