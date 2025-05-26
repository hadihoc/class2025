// db.js
import Dexie from "dexie";

// Create a new database
export const db = new Dexie("CheckOutApp");

// Define schema
db.version(1).stores({
  items: "++id, name, status", // status: 'available' | 'checked-out'
  checkouts: "++id, itemId, user, dateOut, dateIn"
});

// Seed sample data (run once or with a reset button)
export async function seedData() {
  const count = await db.items.count();
  if (count === 0) {
    await db.items.bulkAdd([
      { name: "TI-84 Plus CE Graphing Calculator", status: "available" },
      { name: "TI-84 Plus CE Graphing Calculator", status: "available" },
      { name: "TI-84 Graphing Calculator", status: "available" },
      { name: "TI-84 Graphing Calculator", status: "available" },
      { name: "TI-30XS Multiview Scientific Calculator", status: "available" },
      { name: "TI-30XS Multiview Scientific Calculator", status: "available" },
      { name: "TI-30XIIS Scientific Calculator", status: "available" },
      { name: "TI-30XIIS Scientific Calculator", status: "available" },
      { name: "TI-30Xa Scientific Calculator", status: "available" },
      { name: "TI-30Xa Scientific Calculator", status: "available" },
      
    ]);
  }
}