 import { db, seedData } from './db';

const testing = await seedData();
console.log(testing);
loadItems();

async function loadItems() {
  const items = await db.items.toArray();
  const list = document.getElementById("itemList");
  list.innerHTML = ""; // clear previous

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.status}`;

    const btn = document.createElement("button");
    btn.textContent = item.status === "available" ? "Check Out" : "Check In";
    btn.onclick = () => handleToggle(item);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function handleToggle(item) {
  if (item.status === "available") {
    await db.items.update(item.id, { status: "checked-out" });
    await db.checkouts.add({
      itemId: item.id,
      user: "Guest", // Replace with user system if desired
      dateOut: new Date(),
      dateIn: null
    });
  } else {
    await db.items.update(item.id, { status: "available" });
    const lastCheckout = await db.checkouts
      .where("itemId")
      .equals(item.id)
      .last();
    if (lastCheckout) {
      await db.checkouts.update(lastCheckout.id, { dateIn: new Date() });
    }
  }

  loadItems();
}
window.resetDB = async function () {
    await db.items.clear();
    await seedData();
    loadItems();
  };