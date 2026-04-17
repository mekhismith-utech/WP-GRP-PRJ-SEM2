/*
  DemonCoreLogout.js
  -------------------
  Group Members:
    Tarique Levy     2401827
    Traciana Thomas  2402168
    Mekhi Smith      2304381

  Purpose:
    Universal logout handler. Include this script on every page
    AFTER DemonCoreAuth.js:

      <script src="DemonCoreAuth.js"></script>
      <script src="DemonCoreLogout.js"></script>

    It will:
      1. Show the logout button whenever a user is logged in
         (checks localStorage.currentUser).
      2. If the page has no logout link in the nav, inject one.
      3. Clear the session and send the user back to index.html on click.
*/

(function () {
  "use strict";

  // ----- Helpers ------------------------------------------------------------

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch (e) {
      return null;
    }
  }

  function isLoggedIn() {
    return !!getCurrentUser();
  }

  function doLogout(e) {
    if (e) e.preventDefault();

    // Clear session. We do NOT clear RegistrationData, AllProducts,
    // AllInvoices, loginClickCount or registerClickCount — those
    // must persist across sessions.
    localStorage.removeItem("currentUser");
    localStorage.removeItem("lastInvoice"); // optional: clear recent-invoice cache

    // Nicety: if the browser sessionStorage holds anything, nuke it.
    try { sessionStorage.clear(); } catch (err) { /* ignore */ }

    alert("You have been logged out.");
    window.location.href = "index.html";
  }

  // ----- Inject the logout <li> if the page doesn't already have one -------

  function ensureLogoutLinkExists() {
    // If the page already has <li id="logout-item"> (as dashboard.html etc. do),
    // we leave it alone and just wire it up below.
    if (document.getElementById("logout-item")) return;

    // Find the main nav's <ul>. Pages put nav inside <header><nav><ul>...
    var navUl = document.querySelector("header nav ul");
    if (!navUl) return; // no nav on this page (e.g. invoice, login) — nothing to do

    var li = document.createElement("li");
    li.id = "logout-item";
    li.style.display = "none"; // start hidden; we'll reveal below if logged in

    var a = document.createElement("a");
    a.href = "#";
    a.id = "logout-btn";
    a.textContent = "Logout";

    li.appendChild(a);
    navUl.appendChild(li);
  }

  // ----- Show/hide the logout link based on auth state ---------------------

  function refreshLogoutVisibility() {
    var item = document.getElementById("logout-item");
    if (!item) return;
    item.style.display = isLoggedIn() ? "" : "none";
  }

  // ----- Wire up the click handler -----------------------------------------

  function attachLogoutHandler() {
    var btn = document.getElementById("logout-btn");
    if (!btn) return;

    // Remove any previous handler (in case DemonCoreAuth.js attached one too)
    // by cloning the node. Safer than double-firing.
    var fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);

    fresh.addEventListener("click", doLogout);
  }

  // ----- Keep tabs in sync: if user logs out in one tab, update others -----

  window.addEventListener("storage", function (e) {
    if (e.key === "currentUser") refreshLogoutVisibility();
  });

  // ----- Expose a global so other scripts / inline onclick can call it -----

  window.DemonCoreLogout = doLogout;

  // ----- Boot --------------------------------------------------------------

  function init() {
    ensureLogoutLinkExists();
    attachLogoutHandler();
    refreshLogoutVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
