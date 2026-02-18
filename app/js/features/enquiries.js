// enquiries.js – FIXED (dropdown + enquiries)

import { auth, db } from "../core/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const enquiryFallbackImage = new URL("../../assets/images/IMG5.jpg", import.meta.url).href;

  const enquiriesList = document.getElementById("enquiriesList");

  // Dropdown elements
  const userDropdown = document.getElementById("userDropdown");
  const usernameSpan = document.getElementById("username");
  const userNameTop = document.getElementById("userNameTop");
  const logoutBtn = document.getElementById("logoutBtn");

  async function loadUserDropdown(user) {
  userDropdown.style.display = "block";

  try {
    const userSnap = await getDocs(
      query(
        collection(db, "users"),
        where("__name__", "==", user.uid)
      )
    );

    if (!userSnap.empty) {
      const data = userSnap.docs[0].data();
      const displayName = data.name || user.displayName || "User";

      usernameSpan.textContent = displayName;
      
    } else {
      usernameSpan.textContent = "👤User";
      
    }
  } catch (err) {
    console.error("Dropdown load failed:", err);
    usernameSpan.textContent = "User";
    userNameTop.textContent = "User";
  }
}

  onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  await loadUserDropdown(user);
  loadEnquiries(user.uid);
});


  async function loadEnquiries(userId) {
    enquiriesList.innerHTML = "<p>Loading enquiries...</p>";

    try {
      const q = query(
        collection(db, "enquiries"),
        where("userId", "==", userId)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        enquiriesList.innerHTML = "<p>You have no enquiries.</p>";
        return;
      }

      enquiriesList.innerHTML = "";

      const enquiryDocs = snapshot.docs;

      for (const docSnap of enquiryDocs) {
        const e = docSnap.data();
        const id = docSnap.id
        let listingImage = e.listingImageUrl || "";

        if (!listingImage && e.listingId) {
          try {
            const listingSnap = await getDoc(doc(db, "listings", e.listingId));
            if (listingSnap.exists()) {
              listingImage = listingSnap.data().imageUrl || "";
            }
          } catch (err) {
            console.error("Could not fetch listing image for enquiry:", err);
          }
        }

        if (!listingImage) listingImage = enquiryFallbackImage;

        const card = document.createElement("div");
        card.className = "enquiry-card";

        card.innerHTML = `
          <div class="enquiry-image-wrap">
            <img src="${listingImage}" alt="${e.listingTitle || "Listing"}" class="enquiry-listing-image" onerror="this.onerror=null;this.src='${enquiryFallbackImage}'">
          </div>
          <div class="enquiry-content">
            <h3>${e.listingTitle || "-"}</h3>
            <p><strong>From:</strong> ${e.fromDate?.toDate().toLocaleDateString()}</p>
            <p><strong>To:</strong> ${e.toDate?.toDate().toLocaleDateString()}</p>
            <p><strong>Message:</strong> ${e.message || "-"}</p>
            <p><strong>Status:</strong> ${e.status || "pending"}</p>
            <button class="delete-enquiry-btn" data-id="${id}">
              ❌ Remove Enquiry
            </button>
          </div>
        `;

        enquiriesList.appendChild(card);
      }

    } catch (err) {
      console.error(err);
      enquiriesList.innerHTML = "<p>❌ Failed to load enquiries.</p>";
    }
  }

  // DELETE enquiry
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".delete-enquiry-btn");
    if (!btn) return;

    if (!confirm("Remove this enquiry?")) return;

    try {
      await deleteDoc(doc(db, "enquiries", btn.dataset.id));
      btn.closest(".enquiry-card").remove();
    } catch (err) {
      console.error(err);
      alert("Failed to remove enquiry.");
    }
  });

  // LOGOUT
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });

});
