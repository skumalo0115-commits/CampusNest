import { db, auth } from '../core/firebase.js';
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("landlord-grid");
  if (!grid) return;

  grid.innerHTML = '<p style="grid-column:1/-1;color:#666;">Loading landlords...</p>';

  let currentUser = null;
  try {
    auth.onAuthStateChanged((user) => {
      currentUser = user;
    });
  } catch (err) {
    console.warn("Auth state listener failed:", err);
  }

  const safeGetDocs = async (ref, retries = 2) => {
    let lastError;
    for (let i = 0; i <= retries; i += 1) {
      try {
        return await getDocs(ref);
      } catch (err) {
        lastError = err;
        await new Promise((resolve) => setTimeout(resolve, 350 * (i + 1)));
      }
    }
    throw lastError;
  };

  try {
    const landlordsCol = collection(db, "landlords");
    const snapshot = await safeGetDocs(landlordsCol);

    if (snapshot.empty) {
      grid.innerHTML = '<p style="grid-column:1/-1;color:#666;">No landlords found.</p>';
      return;
    }

    let landlords = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      data: docSnap.data()
    }));

    landlords = landlords.sort((a, b) => {
      const aTime = a.data.createdAt?.toMillis?.() || 0;
      const bTime = b.data.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });

    const propertyCounts = await Promise.all(
      landlords.map(async (ld) => {
        try {
          const listingsCol = collection(db, "listings");
          const q = query(listingsCol, where("landlordId", "==", ld.id));
          const snap = await safeGetDocs(q, 1);
          return snap.size;
        } catch {
          return 0;
        }
      })
    );

    grid.innerHTML = "";

    landlords.forEach((ld, index) => {
      const d = ld.data || {};
      const card = document.createElement("div");
      card.className = "card landlord-card";

      card.innerHTML = `
        <div class="img-wrap">
          <img src="${d.photoUrl || 'https://via.placeholder.com/600?text=No+Photo'}" />
        </div>

        <div class="card-body">
          <h3>${escapeHtml(d.name || "Unnamed Landlord")}</h3>
          <p style="color:#666;">${escapeHtml(d.city || "Unknown City")}</p>
          <p style="color:#444;">🏠 ${propertyCounts[index]} Properties</p>
          ${d.verified ? '<span class="verified">✔ Verified</span>' : ''}

          <div class="actions">
            <button class="btn secondary contact-btn" data-id="${ld.id}">
              Contact
            </button>
            <button class="btn view-properties-btn" data-id="${ld.id}">
              View Properties
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      if (!currentUser) {
        document.getElementById("authModal")?.style && (document.getElementById("authModal").style.display = "flex");
        return;
      }

      const id = btn.dataset.id;
      if (btn.classList.contains("contact-btn")) {
        window.location.href = `listing-details.html?landlordId=${id}`;
      }
      if (btn.classList.contains("view-properties-btn")) {
        window.location.href = `listings.html?landlordId=${id}`;
      }
    });
  } catch (err) {
    console.error("❌ Error loading landlords:", err);
    const msg = err?.message || "Unknown error";
    grid.innerHTML = `<p style="color:red;">Failed to load landlords: ${escapeHtml(msg)}</p>`;
  }
});

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
