// ==============================
// DEMO DATA: TABLES, COMPANIES, RESUMES, WALL SEGMENTS
// ==============================

// 4 rows x 8 columns = 32 tables in Hall A
const demoTables = Array.from({ length: 32 }).map((_, i) => {
  const row = Math.floor(i / 8) + 1;        // 1..4
  const col = (i % 8) + 1;                  // 1..8
  return {
    id: `A${row}-${col}`,                   // internal id
    label: `${row}${String.fromCharCode(64 + col)}`, // e.g. 1A, 1B
    companyId: null,
    isSponsor: false,
    constraints: [],                        // not used for constraints anymore, but kept for future
  };
});

// Demo companies
const demoCompanies = [
  { id: 1, name: "BlueShift Robotics", industry: "Software / Robotics", tableId: "A1-1", sponsorTier: "gold" },
  { id: 2, name: "Lakefront Manufacturing", industry: "Manufacturing", tableId: "A1-2", sponsorTier: "none" },
  { id: 3, name: "Northern Data Systems", industry: "IT / Consulting", tableId: "A1-3", sponsorTier: "silver" },
  { id: 4, name: "Erie Health Partners", industry: "Healthcare", tableId: "A1-4", sponsorTier: "none" },
  { id: 5, name: "Great Lakes Finance", industry: "Finance", tableId: "", sponsorTier: "none" },
  { id: 6, name: "PennTech Labs", industry: "Engineering", tableId: "A2-1", sponsorTier: "gold" },
  { id: 7, name: "Campus Innovators", industry: "Startup / Incubator", tableId: "A2-2", sponsorTier: "none" },
  { id: 8, name: "Nittany Analytics", industry: "Data / Analytics", tableId: "A2-3", sponsorTier: "silver" },
];

// Demo resumes
const demoResumes = [
  { id: 1, studentName: "Jordan Smith", major: "Software Engineering", companyId: 1, filename: "Jordan_Smith_Resume.pdf" },
  { id: 2, studentName: "Alex Nguyen", major: "Computer Science", companyId: 3, filename: "Alex_Nguyen_Resume.pdf" },
  { id: 3, studentName: "Casey Patel", major: "Mechanical Engineering", companyId: 2, filename: "Casey_Patel_Resume.pdf" },
  { id: 4, studentName: "Taylor Johnson", major: "Finance", companyId: 5, filename: "Taylor_Johnson_Resume.pdf" },
  { id: 5, studentName: "Morgan Lee", major: "Cybersecurity Analytics", companyId: 3, filename: "Morgan_Lee_Resume.pdf" },
];

// Constraint palette (walls only)
const constraintTypes = [
  { type: "door", label: "Door", short: "🚪" },
  { type: "fire-ex", label: "Fire extinguisher", short: "🧯" },
  { type: "fire-exit", label: "Fire exit", short: "🟩" },
];

// Walls: top and bottom of the room, each broken into 8 segments
const wallSegments = {
  top: Array.from({ length: 8 }).map((_, i) => ({
    id: `top-${i}`,
    constraints: [], // e.g. ["door", "fire-ex"]
  })),
  bottom: Array.from({ length: 8 }).map((_, i) => ({
    id: `bottom-${i}`,
    constraints: [],
  })),
};

// Attach initial sponsors to their tables
demoCompanies.forEach((company) => {
  if (!company.tableId) return;
  const table = demoTables.find((t) => t.id === company.tableId);
  if (table) {
    table.companyId = company.id;
    table.isSponsor = company.sponsorTier !== "none";
  }
});

// ==============================
// SIDEBAR NAV + MOBILE SIDEBAR
// ==============================

const sidebarButtons = Array.from(document.querySelectorAll(".sidebar-button"));
const views = Array.from(document.querySelectorAll(".view"));

sidebarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-view-target");
    if (!targetId) return;

    sidebarButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    views.forEach((view) => {
      view.classList.toggle("visible", view.id === targetId);
    });

    if (window.innerWidth <= 880) {
      closeSidebar();
    }
  });
});

const sidebarEl = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
const topbarMenuButton = document.getElementById("topbar-menu-button");

function openSidebar() {
  sidebarEl.classList.add("open");
  sidebarBackdrop.classList.add("visible");
}

function closeSidebar() {
  sidebarEl.classList.remove("open");
  sidebarBackdrop.classList.remove("visible");
}

if (topbarMenuButton) {
  topbarMenuButton.addEventListener("click", openSidebar);
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", closeSidebar);
}

// ==============================
// MAP RENDERING (ROOM LAYOUT)
// ==============================

const layoutGridEl = document.getElementById("layout-grid");
const dashboardLayoutGridEl = document.getElementById("dashboard-layout-grid");
const layoutDetailsEl = document.getElementById("layout-details");
const layoutTotalTablesEl = document.getElementById("layout-total-tables");

/**
 * Helper: constraint metadata
 */
function getConstraintMeta(type) {
  return constraintTypes.find((c) => c.type === type) || null;
}

/**
 * Build the full map for the Layout view (walls + tables + aisles).
 * compact = false → full map
 * compact = true  → simplified grid for dashboard
 */
function renderGridCells(container, compact) {
  container.innerHTML = "";

  if (compact) {
    // Compact view: just 4 rows of tables, no walls/aisles
    for (let r = 0; r < 4; r++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "map-row";
      for (let c = 0; c < 8; c++) {
        const index = r * 8 + c;
        const table = demoTables[index];
        const cell = createTableCell(table, true);
        rowDiv.appendChild(cell);
      }
      container.appendChild(rowDiv);
    }
    return;
  }

  // FULL MAP for Layout view:

  // TOP WALL ROW (hallway / entrance side)
  const topRow = document.createElement("div");
  topRow.className = "map-row map-row-wall";
  for (let col = 0; col < 8; col++) {
    const cell = createWallCell("top", col);
    topRow.appendChild(cell);
  }
  container.appendChild(topRow);

  // Table rows with aisles between them
  for (let r = 0; r < 4; r++) {
    // Tables row
    const tableRow = document.createElement("div");
    tableRow.className = "map-row";
    for (let c = 0; c < 8; c++) {
      const index = r * 8 + c;
      const table = demoTables[index];
      const cell = createTableCell(table, false);
      tableRow.appendChild(cell);
    }
    container.appendChild(tableRow);

    // Aisle row between rows (not after last row)
    if (r !== 3) {
      const aisleRow = document.createElement("div");
      aisleRow.className = "map-row map-row-aisle";
      for (let c = 0; c < 8; c++) {
        const aisleCell = document.createElement("div");
        aisleCell.className = "map-aisle-cell";

        // Just label a couple of cells so it looks like a walkway
        if (c === 3 || c === 4) {
          const label = document.createElement("div");
          label.className = "map-aisle-label";
          label.textContent = "Aisle";
          aisleCell.appendChild(label);
        }

        aisleRow.appendChild(aisleCell);
      }
      container.appendChild(aisleRow);
    }
  }

  // BOTTOM WALL ROW
  const bottomRow = document.createElement("div");
  bottomRow.className = "map-row map-row-wall";
  for (let col = 0; col < 8; col++) {
    const cell = createWallCell("bottom", col);
    bottomRow.appendChild(cell);
  }
  container.appendChild(bottomRow);
}

/**
 * Create a single table cell (the squares students walk between).
 * compact = true → used on dashboard, no drag/drop
 */
function createTableCell(table, compact) {
  const company = demoCompanies.find((c) => c.id === table.companyId) || null;

  const cell = document.createElement("div");
  cell.className = "layout-cell";
  if (company) cell.classList.add("assigned");
  if (table.isSponsor) cell.classList.add("sponsor");

  const dot = document.createElement("div");
  dot.className = "layout-cell-dot" + (table.isSponsor ? " gold" : "");
  cell.appendChild(dot);

  const label = document.createElement("div");
  label.className = "layout-cell-label";
  label.textContent = table.label;
  cell.appendChild(label);

  const companyEl = document.createElement("div");
  companyEl.className = "layout-cell-company";
  companyEl.textContent = company ? company.name : compact ? "Free" : "Unassigned";
  cell.appendChild(companyEl);

  if (!compact) {
    // Select table
    cell.addEventListener("click", () => {
      showTableDetails(table);
    });

    // Drag-over: only allow drops for companies (constraints are for walls)
    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // Drop handler: companies only
    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      handleDropOnTable(e, table);
    });
  }

  return cell;
}

/**
 * Create a cell for the walls; constraints (doors, etc.) go here.
 * side = "top" | "bottom"
 */
function createWallCell(side, index) {
  const segment = wallSegments[side][index];
  const cell = document.createElement("div");
  cell.className = "map-wall-cell";

  const label = document.createElement("div");
  label.className = "map-wall-label";

  // Give the middle segments names so it reads like a real room
  if (side === "top" && index === 3) {
    label.textContent = "Entrance";
  } else if (side === "bottom" && index === 4) {
    label.textContent = "Exit";
  } else if (index === 0) {
    label.textContent = side === "top" ? "North wall" : "South wall";
  } else {
    label.textContent = "";
  }

  cell.appendChild(label);

  if (segment.constraints.length) {
    const constraintsEl = document.createElement("div");
    constraintsEl.className = "map-wall-constraints";

    const shortLabels = segment.constraints
      .map((type) => {
        const meta = getConstraintMeta(type);
        return meta ? meta.short : type;
      })
      .join(" ");

    constraintsEl.textContent = shortLabels;
    cell.appendChild(constraintsEl);
  }

  // Drag-over: only for constraints
  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  cell.addEventListener("drop", (e) => {
    e.preventDefault();
    handleDropOnWall(e, side, index);
  });

  return cell;
}

/**
 * Show details in the side panel when a table is selected.
 * Also adds sponsor toggle + "Unassign table" button.
 */
function showTableDetails(table) {
  const company = demoCompanies.find((c) => c.id === table.companyId) || null;
  const info = [];

  info.push(`<div>Table ID: <span class="layout-details-strong">${table.id}</span></div>`);
  info.push(`<div>Label: <span class="layout-details-strong">${table.label}</span></div>`);
  info.push(
    `<div>Assigned company: <span class="layout-details-strong">${
      company ? company.name : "Unassigned"
    }</span></div>`
  );

  if (company) {
    info.push(
      `<div>Industry: <span class="layout-details-strong">${company.industry}</span></div>`
    );

    const sponsorText =
      company.sponsorTier === "none"
        ? "No"
        : company.sponsorTier.toUpperCase();
    info.push(
      `<div>Sponsor tier: <span class="layout-details-strong">${sponsorText}</span></div>`
    );

    // Sponsor toggle + unassign button
    info.push(`
      <div style="margin-top:8px; display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
        <label class="switch">
          <input type="checkbox" id="layout-sponsor-toggle">
          <span class="switch-slider"></span>
        </label>
        <span style="font-size:12px;">Mark this as a sponsor booth</span>
      </div>
      <button class="button-ghost" id="layout-unassign-button" style="margin-top:8px;">
        Unassign company from this table
      </button>
    `);
  } else {
    info.push(
      `<div>Sponsor: <span class="layout-details-strong">No (no company assigned)</span></div>`
    );
  }

  layoutDetailsEl.innerHTML =
    info.join("") +
    `<div style="margin-top:8px;">
      This panel will eventually include more admin actions (e.g., notes for this table).
    </div>`;

  // Wire up sponsor toggle and unassign button if we have a company
  if (company) {
    const sponsorToggleInput = document.getElementById("layout-sponsor-toggle");
    if (sponsorToggleInput) {
      sponsorToggleInput.checked = company.sponsorTier !== "none";
      sponsorToggleInput.addEventListener("change", () => {
        // Change sponsor tier only from this toggle (drag/drop does NOT auto-sponsor)
        company.sponsorTier = sponsorToggleInput.checked ? "gold" : "none";
        table.isSponsor = sponsorToggleInput.checked;
        renderCompanyTable();
        renderGridCells(layoutGridEl, false);
        renderGridCells(dashboardLayoutGridEl, true);
        renderCompanyPalette();
        // Re-show to update text
        showTableDetails(table);
      });
    }

    const unassignButton = document.getElementById("layout-unassign-button");
    if (unassignButton) {
      unassignButton.addEventListener("click", () => {
        unassignTable(table, company);
      });
    }
  }
}

/**
 * Handle drops on tables: ONLY companies here.
 */
function handleDropOnTable(e, table) {
  const dropType = e.dataTransfer.getData("type");
  if (dropType !== "company") return; // constraints not accepted on tables

  const companyIdStr = e.dataTransfer.getData("companyId");
  if (!companyIdStr) return;
  const companyId = Number(companyIdStr);
  const company = demoCompanies.find((c) => c.id === companyId);
  if (!company) return;

  // Unassign company from its previous table, if any
  if (company.tableId) {
    const prevTable = demoTables.find((t) => t.id === company.tableId);
    if (prevTable && prevTable.companyId === company.id) {
      prevTable.companyId = null;
      prevTable.isSponsor = false;
    }
  }

  // Assign company to this table
  table.companyId = company.id;
  company.tableId = table.id;

  // Sponsor status depends ONLY on sponsorTier; drag/drop does not auto-sponsor
  table.isSponsor = company.sponsorTier !== "none";

  renderCompanyTable();
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
  renderTableOptions();
  renderCompanyPalette();
  showTableDetails(table);
}

/**
 * Handle drops on walls: constraints ONLY (doors, extinguishers, exits).
 */
function handleDropOnWall(e, side, index) {
  const dropType = e.dataTransfer.getData("type");
  if (dropType !== "constraint") return;

  const constraintType = e.dataTransfer.getData("constraintType");
  if (!constraintType) return;

  const segment = wallSegments[side][index];
  if (!segment.constraints.includes(constraintType)) {
    segment.constraints.push(constraintType);
  }

  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
}

/**
 * Unassign a company from a table (table becomes free).
 */
function unassignTable(table, company) {
  if (!table || !company) return;

  if (table.companyId === company.id) {
    table.companyId = null;
  }
  if (company.tableId === table.id) {
    company.tableId = "";
  }

  table.isSponsor = false; // sponsor is about table location; company still has tier

  renderCompanyTable();
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
  renderTableOptions();
  renderCompanyPalette();
  showTableDetails(table);
}

// Initial render of both maps
renderGridCells(layoutGridEl, false);
renderGridCells(dashboardLayoutGridEl, true);
if (layoutTotalTablesEl) {
  layoutTotalTablesEl.textContent = String(demoTables.length);
}

// ==============================
// COMPANIES TABLE + FORM
// ==============================

const companiesTableBody = document.getElementById("companies-table-body");
const companiesTotalEl = document.getElementById("companies-total");
const companiesAssignedEl = document.getElementById("companies-assigned");
const companiesSponsorsEl = document.getElementById("companies-sponsors");
const companiesTableSelect = document.getElementById("company-table");
const companiesNameInput = document.getElementById("company-name");
const companiesIndustryInput = document.getElementById("company-industry");
const companiesSponsorSelect = document.getElementById("company-sponsor");

/**
 * Render company table (list) with badges at the top.
 */
function renderCompanyTable() {
  companiesTableBody.innerHTML = "";
  let assignedCount = 0;
  let sponsorCount = 0;

  demoCompanies.forEach((company) => {
    if (company.tableId) assignedCount += 1;
    if (company.sponsorTier !== "none") sponsorCount += 1;

    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = company.name;
    tr.appendChild(nameTd);

    const indTd = document.createElement("td");
    indTd.textContent = company.industry;
    tr.appendChild(indTd);

    const tableTd = document.createElement("td");
    if (company.tableId) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = company.tableId;
      tableTd.appendChild(tag);
    } else {
      const tag = document.createElement("span");
      tag.className = "tag tag-unassigned";
      tag.textContent = "Unassigned";
      tableTd.appendChild(tag);
    }
    tr.appendChild(tableTd);

    const sponsorTd = document.createElement("td");
    const label = document.createElement("span");
    label.className = "tag" + (company.sponsorTier !== "none" ? " tag-sponsor" : "");
    label.textContent =
      company.sponsorTier === "none"
        ? "None"
        : company.sponsorTier === "gold"
        ? "Gold"
        : "Silver";
    sponsorTd.appendChild(label);
    tr.appendChild(sponsorTd);

    const actionsTd = document.createElement("td");
    actionsTd.style.display = "flex";
    actionsTd.style.alignItems = "center";
    actionsTd.style.gap = "8px";

    // Sponsor toggle (controls sponsorTier; map color updates)
    const sponsorSwitchLabel = document.createElement("label");
    sponsorSwitchLabel.className = "switch";
    const sponsorInput = document.createElement("input");
    sponsorInput.type = "checkbox";
    sponsorInput.checked = company.sponsorTier !== "none";
    const sponsorSlider = document.createElement("span");
    sponsorSlider.className = "switch-slider";
    sponsorSwitchLabel.appendChild(sponsorInput);
    sponsorSwitchLabel.appendChild(sponsorSlider);

    sponsorInput.addEventListener("change", () => {
      company.sponsorTier = sponsorInput.checked ? "gold" : "none";
      const table = demoTables.find((t) => t.id === company.tableId);
      if (table) {
        table.isSponsor = sponsorInput.checked;
      }
      renderCompanyTable();
      renderGridCells(layoutGridEl, false);
      renderGridCells(dashboardLayoutGridEl, true);
      renderCompanyPalette();
    });

    // Unassign button from the company side
    const unassignButton = document.createElement("button");
    unassignButton.className = "button-danger-text";
    unassignButton.textContent = "Unassign";
    unassignButton.addEventListener("click", () => {
      const table = demoTables.find((t) => t.id === company.tableId);
      if (table) {
        unassignTable(table, company);
      } else {
        company.tableId = "";
        renderCompanyTable();
        renderGridCells(layoutGridEl, false);
        renderGridCells(dashboardLayoutGridEl, true);
        renderTableOptions();
        renderCompanyPalette();
      }
    });

    actionsTd.appendChild(sponsorSwitchLabel);
    actionsTd.appendChild(unassignButton);
    tr.appendChild(actionsTd);

    companiesTableBody.appendChild(tr);
  });

  companiesTotalEl.textContent = String(demoCompanies.length);
  companiesAssignedEl.textContent = String(assignedCount);
  companiesSponsorsEl.textContent = String(sponsorCount);
}

/**
 * Populate table dropdown for the company form.
 */
function renderTableOptions() {
  companiesTableSelect.innerHTML = "";
  const first = document.createElement("option");
  first.value = "";
  first.textContent = "Unassigned";
  companiesTableSelect.appendChild(first);

  demoTables.forEach((table) => {
    const opt = document.createElement("option");
    opt.value = table.id;
    const company = demoCompanies.find((c) => c.tableId === table.id);
    opt.textContent = company ? `${table.id} · ${company.name}` : table.id;
    companiesTableSelect.appendChild(opt);
  });
}

// Save company (create-only for now)
const saveCompanyButton = document.getElementById("btn-save-company");
saveCompanyButton.addEventListener("click", () => {
  const name = companiesNameInput.value.trim();
  const industry = companiesIndustryInput.value.trim();
  const tableId = companiesTableSelect.value;
  const sponsorTier = companiesSponsorSelect.value;

  if (!name || !industry) {
    alert("Please provide at least a name and an industry.");
    return;
  }

  const newId = demoCompanies.length
    ? Math.max(...demoCompanies.map((c) => c.id)) + 1
    : 1;

  // If some company already owns this table, free it
  if (tableId) {
    const previousOwner = demoCompanies.find((c) => c.tableId === tableId);
    if (previousOwner) {
      const prevTable = demoTables.find((t) => t.id === tableId);
      if (prevTable && prevTable.companyId === previousOwner.id) {
        prevTable.companyId = null;
        prevTable.isSponsor = false;
      }
      previousOwner.tableId = "";
    }

    const table = demoTables.find((t) => t.id === tableId);
    if (table) {
      table.companyId = newId;
      table.isSponsor = sponsorTier !== "none";
    }
  }

  demoCompanies.push({
    id: newId,
    name,
    industry,
    tableId: tableId || "",
    sponsorTier,
  });

  companiesNameInput.value = "";
  companiesIndustryInput.value = "";
  companiesSponsorSelect.value = "none";
  companiesTableSelect.value = "";

  renderCompanyTable();
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
  renderTableOptions();
  renderCompanyPalette();

  alert("Demo: company saved (in-memory only).");
});

const clearFiltersButton = document.getElementById("btn-clear-filters");
clearFiltersButton.addEventListener("click", () => {
  renderCompanyTable();
});

renderTableOptions();
renderCompanyTable();

// ==============================
// PALETTES: DRAG SOURCES
// ==============================

const companyPaletteEl = document.getElementById("company-palette");
const constraintPaletteEl = document.getElementById("constraint-palette");

/**
 * Companies palette: drag these onto tables.
 */
function renderCompanyPalette() {
  companyPaletteEl.innerHTML = "";
  demoCompanies.forEach((company) => {
    const item = document.createElement("div");
    item.className = "palette-item palette-item-company";
    item.textContent = company.name;
    item.draggable = true;
    item.dataset.companyId = company.id;

    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("type", "company");
      e.dataTransfer.setData("companyId", String(company.id));
    });

    companyPaletteEl.appendChild(item);
  });
}

/**
 * Constraints palette: doors, extinguishers, exits, walls only.
 */
function renderConstraintPalette() {
  constraintPaletteEl.innerHTML = "";
  constraintTypes.forEach((c) => {
    const item = document.createElement("div");
    item.className = "palette-item palette-item-constraint";
    item.draggable = true;
    item.dataset.constraintType = c.type;
    item.textContent = `${c.short} ${c.label}`;

    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("type", "constraint");
      e.dataTransfer.setData("constraintType", c.type);
    });

    constraintPaletteEl.appendChild(item);
  });
}

renderCompanyPalette();
renderConstraintPalette();

// ==============================
// RESUMES
// ==============================

const resumeListEl = document.getElementById("resume-list");

function renderResumes() {
  resumeListEl.innerHTML = "";
  demoResumes.forEach((resume) => {
    const company =
      demoCompanies.find((c) => c.id === resume.companyId) || { name: "Open to all" };

    const item = document.createElement("div");
    item.className = "resume-item";

    const main = document.createElement("div");
    main.className = "resume-main";

    const nameEl = document.createElement("div");
    nameEl.className = "resume-name";
    nameEl.textContent = resume.studentName;
    main.appendChild(nameEl);

    const metaEl = document.createElement("div");
    metaEl.className = "resume-meta";
    metaEl.textContent = `${resume.major} • Target: ${company.name}`;
    main.appendChild(metaEl);

    const fileEl = document.createElement("div");
    fileEl.className = "resume-meta";
    fileEl.textContent = resume.filename;
    main.appendChild(fileEl);

    const actions = document.createElement("div");
    actions.className = "resume-actions";

    const viewButton = document.createElement("button");
    viewButton.className = "button-ghost";
    viewButton.textContent = "View";
    viewButton.addEventListener("click", () => {
      alert("Demo: this would open the PDF in a new tab.");
    });

    const downloadButton = document.createElement("button");
    downloadButton.className = "button-ghost";
    downloadButton.textContent = "Download";
    downloadButton.addEventListener("click", () => {
      alert("Demo: this would download the resume.");
    });

    actions.appendChild(viewButton);
    actions.appendChild(downloadButton);

    item.appendChild(main);
    item.appendChild(actions);

    resumeListEl.appendChild(item);
  });
}

renderResumes();

// ==============================
// DASHBOARD METRICS RANDOMIZER
// ==============================

const metricCompanies = document.getElementById("metric-companies");
const metricCompaniesTrend = document.getElementById("metric-companies-trend");
const metricTablesAssigned = document.getElementById("metric-tables-assigned");
const metricTablesFree = document.getElementById("metric-tables-free");
const metricSponsors = document.getElementById("metric-sponsors");
const metricResumes = document.getElementById("metric-resumes");
const refreshDemoButton = document.getElementById("btn-refresh-demo");

refreshDemoButton.addEventListener("click", () => {
  const companyCount = demoCompanies.length + Math.floor(Math.random() * 3);
  const tablesAssigned = demoTables.filter((t) => t.companyId).length;
  const sponsorsCount = demoCompanies.filter((c) => c.sponsorTier !== "none").length;
  const resumesCount = demoResumes.length * (1 + Math.floor(Math.random() * 3));

  metricCompanies.textContent = String(companyCount);
  metricCompaniesTrend.textContent = `+${Math.floor(
    Math.random() * 6
  )} since last check`;
  metricTablesAssigned.textContent = String(tablesAssigned);
  metricTablesFree.textContent = `${Math.max(
    demoTables.length - tablesAssigned,
    0
  )} free`;
  metricSponsors.textContent = String(sponsorsCount);
  metricResumes.textContent = String(resumesCount);
});
