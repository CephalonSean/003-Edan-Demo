(() => {
  "use strict";

  const SUPABASE_URL = "https://tqgjgnohqzmvkakqxhcm.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_R6DbjHgjZXrJSwVKLKvh0Q_Ks0BFYEV";
  const typeList = document.getElementById("appointmentTypeList");
  const typeSelect = document.getElementById("appointmentType");
  const dateSelect = document.getElementById("appointmentDate");
  const slotSelect = document.getElementById("appointmentSlot");
  const form = document.getElementById("appointmentForm");
  const status = document.getElementById("appointmentStatus");
  const review = document.getElementById("appointmentReview");
  const submit = document.getElementById("appointmentSubmit");
  const list = document.getElementById("appointmentList");
  const confirmation = document.getElementById("appointmentConfirmation");
  const confirmationDetails = document.getElementById("appointmentConfirmationDetails");
  if (!form) return;

  let client;
  let types = [];
  let slots = [];
  let currentUser;

  const dateFormat = new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long" });
  const timeFormat = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });
  const dateTimeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

  function setStatus(text) { status.textContent = text; }
  function formatDuration() { return "Duration to be confirmed"; }
  function selectedType() { return types.find(type => type.id === typeSelect.value); }
  function selectedSlot() { return slots.find(slot => slot.id === slotSelect.value); }

  function renderTypes() {
    typeSelect.replaceChildren(new Option("Choose an appointment", ""));
    typeList.replaceChildren();
    types.forEach(type => {
      typeSelect.append(new Option(type.title, type.id));
      const card = document.createElement("article");
      card.className = "members__appointment-type-card";
      const category = document.createElement("span");
      category.className = "members__research-category";
      category.textContent = type.title;
      const heading = document.createElement("h4");
      heading.textContent = type.title;
      const description = document.createElement("p");
      description.textContent = type.description;
      const meta = document.createElement("span");
      meta.className = "members__appointment-meta";
      meta.textContent = formatDuration();
      const button = document.createElement("button");
      button.type = "button";
      button.className = "members__appointment-choose";
      button.textContent = "Choose appointment →";
      button.addEventListener("click", () => {
        typeSelect.value = type.id;
        updateReview();
        typeSelect.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      card.replaceChildren(category, heading, description, meta, button);
      typeList.append(card);
    });
  }

  function renderDates() {
    const dates = [...new Map(slots.map(slot => [new Date(slot.starts_at).toISOString().slice(0, 10), slot])).keys()];
    dateSelect.replaceChildren(new Option("Choose a date", ""));
    dates.forEach(value => dateSelect.append(new Option(dateFormat.format(new Date(`${value}T12:00:00`)), value)));
    dateSelect.disabled = !dates.length;
    slotSelect.replaceChildren(new Option("Choose a time", ""));
    slotSelect.disabled = true;
  }

  function renderTimes() {
    const date = dateSelect.value;
    slotSelect.replaceChildren(new Option("Choose a time", ""));
    slots.filter(slot => new Date(slot.starts_at).toISOString().slice(0, 10) === date).forEach(slot => slotSelect.append(new Option(`${timeFormat.format(new Date(slot.starts_at))} – ${timeFormat.format(new Date(slot.ends_at))}`, slot.id)));
    slotSelect.disabled = !date;
    updateReview();
  }

  function updateReview() {
    const type = selectedType();
    const slot = selectedSlot();
    submit.disabled = !(type && slot && document.getElementById("appointmentName").value.trim() && document.getElementById("appointmentEmail").value.trim());
    review.textContent = type && slot ? `${type.title} · ${dateTimeFormat.format(new Date(slot.starts_at))} · ${formatDuration()}` : "Choose an appointment type, date and time to review your request.";
  }

  function renderBookings(bookings) {
    list.replaceChildren();
    if (!bookings.length) {
      const empty = document.createElement("p");
      empty.className = "members__appointment-empty";
      empty.textContent = "You have no upcoming appointments yet. Choose a time above to begin.";
      list.append(empty);
      return;
    }
    bookings.forEach(booking => {
      const item = document.createElement("article");
      item.className = "members__appointment-booking-card";
      const title = document.createElement("h4");
      title.textContent = booking.member_appointment_types?.title || "Appointment";
      const time = document.createElement("p");
      time.textContent = booking.member_appointment_slots ? dateTimeFormat.format(new Date(booking.member_appointment_slots.starts_at)) : "Time pending";
      const meta = document.createElement("span");
      meta.textContent = `${booking.status} · ${booking.booking_reference}`;
      item.append(title, time, meta);
      list.append(item);
    });
  }

  async function loadBookings() {
    const { data, error } = await client.from("member_appointments").select("id, booking_reference, status, member_appointment_types(title), member_appointment_slots(starts_at, ends_at)").in("status", ["requested", "confirmed"]).order("created_at", { ascending: false });
    if (error) { list.textContent = "Your appointments could not be loaded right now."; return; }
    renderBookings(data || []);
  }

  async function loadSlots() {
    const from = new Date();
    const to = new Date(from);
    to.setDate(to.getDate() + 60);
    const { data, error } = await client.rpc("get_member_appointment_slots", { p_from: from.toISOString(), p_to: to.toISOString() });
    if (error) { setStatus("Available times could not be loaded. Please try again later."); return; }
    slots = data || [];
    renderDates();
  }

  form.addEventListener("input", updateReview);
  typeSelect.addEventListener("change", updateReview);
  dateSelect.addEventListener("change", renderTimes);
  slotSelect.addEventListener("change", updateReview);

  form.addEventListener("submit", async event => {
    event.preventDefault();
    const type = selectedType();
    const slot = selectedSlot();
    if (!type || !slot) return;
    submit.disabled = true;
    setStatus("Saving your request…");
    const { data, error } = await client.rpc("create_member_appointment", {
      p_appointment_type_id: type.id,
      p_slot_id: slot.id,
      p_member_name: document.getElementById("appointmentName").value.trim(),
      p_member_email: document.getElementById("appointmentEmail").value.trim(),
      p_whatsapp_number: document.getElementById("appointmentWhatsapp").value.trim(),
      p_member_note: document.getElementById("appointmentNote").value.trim()
    });
    if (error || !data?.[0]) {
      setStatus("We could not reserve that time. Please choose another available slot.");
      submit.disabled = false;
      await loadSlots();
      return;
    }
    const booking = data[0];
    confirmationDetails.replaceChildren();
    [["Appointment", booking.appointment_title], ["When", dateTimeFormat.format(new Date(booking.starts_at))], ["Reference", booking.booking_reference]].forEach(([label, value]) => {
      const term = document.createElement("dt"); term.textContent = label;
      const detail = document.createElement("dd"); detail.textContent = value;
      confirmationDetails.append(term, detail);
    });
    confirmation.hidden = false;
    form.reset();
    renderDates();
    setStatus("");
    await loadBookings();
  });

  async function init() {
    if (!window.supabase) return;
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
    const { data } = await client.auth.getSession();
    if (!data.session) return;
    currentUser = data.session.user;
    document.getElementById("appointmentName").value = currentUser.user_metadata?.full_name || "";
    document.getElementById("appointmentEmail").value = currentUser.email || "";
    const typeResult = await client.from("member_appointment_types").select("id, title, description, duration_minutes").order("sort_order");
    if (typeResult.error) { typeList.textContent = "Appointment options could not be loaded."; return; }
    types = typeResult.data || [];
    renderTypes();
    await Promise.all([loadSlots(), loadBookings()]);
    updateReview();
  }

  init().catch(error => { console.error("Appointment page error:", error); setStatus("Appointments are temporarily unavailable."); });
})();
