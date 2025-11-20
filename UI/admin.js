// ==============================
// DATA SETUP + LOADERS
// ==============================
// This part builds simple sample data that follows the database tables

const DEFAULT_ROW_LETTERS = ["A", "B", "C", "D"];
const DEFAULT_COLUMN_COUNT = 8;
const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

const sampleData = {
  rooms: [{ room_id: 1, room_name: "Junker Hall A" }],
  sponsor_levels: [
    { sponsor_level_id: 1, level_name: "Gold" },
    { sponsor_level_id: 2, level_name: "Silver" },
    { sponsor_level_id: 3, level_name: "Bronze" },
  ],
  majors: [
    { major_id: 1, major_name: "Computer Science" },
    { major_id: 2, major_name: "Software Engineering" },
    { major_id: 3, major_name: "Mechanical Engineering" },
    { major_id: 4, major_name: "Electrical Engineering" },
    { major_id: 5, major_name: "Cybersecurity" },
  ],
  position_types: [
    { type_id: 1, type_name: "Internship" },
    { type_id: 2, type_name: "Co-op" },
    { type_id: 3, type_name: "Full-time" },
  ],
  position_titles: [
    { title_id: 1, title_name: "Software Engineer" },
    { title_id: 2, title_name: "Data Analyst" },
    { title_id: 3, title_name: "Mechanical Engineer" },
    { title_id: 4, title_name: "Product Manager" },
    { title_id: 5, title_name: "Firmware Engineer" },
  ],
  companies: [
    {
      comp_id: 1,
      comp_name: "Northwind Robotics",
      sponsor_level_id: 1,
      logo: null,
      comp_desc: "Autonomous systems for supply chain and warehouse robotics.",
      website: "https://northwindrobotics.example.com",
      visa_sponsorship: 1,
    },
    {
      comp_id: 2,
      comp_name: "Lakehouse Analytics",
      sponsor_level_id: 2,
      logo: null,
      comp_desc: "Data engineering and analytics consulting studio.",
      website: "https://lakehouse-analytics.example.com",
      visa_sponsorship: 1,
    },
    {
      comp_id: 3,
      comp_name: "Ironclad Manufacturing",
      sponsor_level_id: 3,
      logo: null,
      comp_desc: "Heavy equipment, additive manufacturing, and prototyping.",
      website: "https://ironclad-mfg.example.com",
      visa_sponsorship: 0,
    },
    {
      comp_id: 4,
      comp_name: "Summit Energy",
      sponsor_level_id: 2,
      logo: null,
      comp_desc: "Grid modernization and clean-energy analytics.",
      website: "https://summit-energy.example.com",
      visa_sponsorship: 0,
    },
    {
      comp_id: 5,
      comp_name: "Brightbridge Consulting",
      sponsor_level_id: null,
      logo: null,
      comp_desc: "Technology strategy, product discovery, and PMO support.",
      website: "https://brightbridge.example.com",
      visa_sponsorship: 1,
    },
    {
      comp_id: 6,
      comp_name: "Keystone Medical Devices",
      sponsor_level_id: 1,
      logo: null,
      comp_desc: "Embedded systems and QA for diagnostic devices.",
      website: "https://keystone-med.example.com",
      visa_sponsorship: 0,
    },
  ],
  table_assignments: [
    { assign_id: 1, room_id: 1, comp_id: 1, row_letter: "A", column_num: 1 },
    { assign_id: 2, room_id: 1, comp_id: 2, row_letter: "A", column_num: 4 },
    { assign_id: 3, room_id: 1, comp_id: 3, row_letter: "B", column_num: 2 },
    { assign_id: 4, room_id: 1, comp_id: 4, row_letter: "B", column_num: 6 },
    { assign_id: 5, room_id: 1, comp_id: 5, row_letter: "C", column_num: 3 },
    { assign_id: 6, room_id: 1, comp_id: 6, row_letter: "C", column_num: 7 },
  ],
  company_majors: [
    { company_major_id: 1, comp_id: 1, major_id: 1 },
    { company_major_id: 2, comp_id: 1, major_id: 2 },
    { company_major_id: 3, comp_id: 1, major_id: 5 },
    { company_major_id: 4, comp_id: 2, major_id: 1 },
    { company_major_id: 5, comp_id: 2, major_id: 5 },
    { company_major_id: 6, comp_id: 3, major_id: 3 },
    { company_major_id: 7, comp_id: 3, major_id: 4 },
    { company_major_id: 8, comp_id: 4, major_id: 4 },
    { company_major_id: 9, comp_id: 4, major_id: 1 },
    { company_major_id: 10, comp_id: 5, major_id: 2 },
    { company_major_id: 11, comp_id: 6, major_id: 4 },
    { company_major_id: 12, comp_id: 6, major_id: 3 },
  ],
  company_position_types: [
    { company_pos_types_id: 1, comp_id: 1, type_id: 1 },
    { company_pos_types_id: 2, comp_id: 1, type_id: 3 },
    { company_pos_types_id: 3, comp_id: 2, type_id: 1 },
    { company_pos_types_id: 4, comp_id: 2, type_id: 2 },
    { company_pos_types_id: 5, comp_id: 3, type_id: 2 },
    { company_pos_types_id: 6, comp_id: 3, type_id: 3 },
    { company_pos_types_id: 7, comp_id: 4, type_id: 3 },
    { company_pos_types_id: 8, comp_id: 5, type_id: 1 },
    { company_pos_types_id: 9, comp_id: 5, type_id: 2 },
    { company_pos_types_id: 10, comp_id: 6, type_id: 1 },
  ],
  company_position_titles: [
    { company_pos_titles_id: 1, comp_id: 1, title_id: 1 },
    { company_pos_titles_id: 2, comp_id: 1, title_id: 5 },
    { company_pos_titles_id: 3, comp_id: 2, title_id: 2 },
    { company_pos_titles_id: 4, comp_id: 2, title_id: 4 },
    { company_pos_titles_id: 5, comp_id: 3, title_id: 3 },
    { company_pos_titles_id: 6, comp_id: 4, title_id: 5 },
    { company_pos_titles_id: 7, comp_id: 4, title_id: 2 },
    { company_pos_titles_id: 8, comp_id: 5, title_id: 4 },
    { company_pos_titles_id: 9, comp_id: 6, title_id: 5 },
  ],
};

/**
 * Generates a default grid when no backend data is available.
 * Keeps the layout predictable across environments.
 */
function createDefaultTables(rowLetters = DEFAULT_ROW_LETTERS, columnCount = DEFAULT_COLUMN_COUNT, roomName = "Main hall") {
  return rowLetters.flatMap((rowLetter) =>
    Array.from({ length: columnCount }).map((_, colIndex) => {
      const col = colIndex + 1;
      const label = `${rowLetter}${col}`;
      return {
        id: `${roomName}-${label}`,
        label,
        companyId: null,
        isSponsor: false,
        constraints: [],
        roomId: 1,
        roomName,
        rowLetter,
        columnNum: col,
      };
    })
  );
}

let tables = createDefaultTables();

let companies = [];

let resumes = [];

/**
 * Creates blank wall collections for each side of the room.
 * Each constraint placed on the wall stores its type + offset.
 */
function createEmptyWallSegments() {
  return {
    top: [],
    bottom: [],
    left: [],
    right: [],
  };
}

// Constraint palette (walls only)
const constraintTypes = [
  { type: "door", label: "Door", short: "\u{1F6AA}" },
  { type: "fire-ex", label: "Fire extinguisher", short: "\u{1F9EF}" },
  { type: "fire-exit", label: "Fire exit", short: "\u{1F7E9}" },
];

let wallSegments = createEmptyWallSegments();
let gridConfig = {
  rowLetters: DEFAULT_ROW_LETTERS,
  columnCount: DEFAULT_COLUMN_COUNT,
};

// Optional: override the default endpoints before this script loads via window.CAREER_FAIR_BACKEND.
const backendConfig =
  (typeof window !== "undefined" && window.CAREER_FAIR_BACKEND) || {
    layoutUrl: null,
    companiesUrl: null,
    resumesUrl: null,
  };

// Fetch helper so future integrations can plug in APIs
async function fetchSection(url) {
  if (!url || typeof fetch !== "function") return null;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status})`);
  }
  return response.json();
}

/**
 * Re-shapes backend-provided tables into the lightweight front-end structure.
 */
function normalizeTables(rawTables) {
  if (!Array.isArray(rawTables) || !rawTables.length) {
    return createDefaultTables(gridConfig.rowLetters, gridConfig.columnCount);
  }

  return rawTables.map((table, index) => ({
    id: table.id || `table-${index + 1}`,
    label: table.label || table.id || `T${index + 1}`,
    companyId: table.companyId ?? null,
    isSponsor: Boolean(table.isSponsor),
    constraints: Array.isArray(table.constraints) ? [...table.constraints] : [],
    roomId: table.roomId ?? 1,
    roomName: table.roomName || "Main hall",
    rowLetter:
      table.rowLetter ||
      gridConfig.rowLetters[index % gridConfig.rowLetters.length] ||
      "A",
    columnNum:
      table.columnNum ||
      ((index % (gridConfig.columnCount || DEFAULT_COLUMN_COUNT)) + 1),
  }));
}

/**
 * Maps stored wall metadata into evenly sized arrays so the UI can render slots.
 */
function normalizeWallSegments(rawSegments) {
  const normalized = createEmptyWallSegments();
  if (!rawSegments || typeof rawSegments !== "object") {
    return normalized;
  }

  const mapLegacySegments = (side) => {
    const sideSegments = rawSegments[side];
    if (!sideSegments) return;

    // Legacy format: array of segments with constraints arrays
    if (
      Array.isArray(sideSegments) &&
      sideSegments.some((segment) => Array.isArray(segment?.constraints))
    ) {
      const length = sideSegments.length || 1;
      sideSegments.forEach((segment, index) => {
        (segment?.constraints || []).forEach((type, constraintIndex) => {
          if (!type) return;
          normalized[side].push({
            id: `${segment?.id || `${side}-${index}`}-${constraintIndex}`,
            type,
            offset: clamp01((index + 0.5) / length),
          });
        });
      });
      return;
    }

    // Modern format: array of objects with type + offset
    if (Array.isArray(sideSegments)) {
      sideSegments.forEach((item, index) => {
        if (!item || (!item.type && !item.constraintType)) return;
        const type = item.type || item.constraintType;
        normalized[side].push({
          id: item.id || `${side}-${index}`,
          type,
          offset: clamp01(
            typeof item.offset === "number"
              ? item.offset
              : (index + 1) / (sideSegments.length + 1)
          ),
        });
      });
    }
  };

  ["top", "bottom", "left", "right"].forEach(mapLegacySegments);
  return normalized;
}

// Guarantee we always have enough wall slots for drag targets
function ensureWallSegments() {
  wallSegments = normalizeWallSegments(wallSegments);
}

/**
 * Reads the assignment data to determine which row labels should exist.
 */
function deriveRowLetters(assignments) {
  const letters = Array.from(
    new Set(
      (assignments || [])
        .map((assignment) => (assignment.row_letter || "").toString().toUpperCase())
        .filter(Boolean)
    )
  ).sort();

  return letters.length ? letters : DEFAULT_ROW_LETTERS;
}

/**
 * Builds out the entire seating grid from joined assignment data.
 */
function buildTablesFromData(data) {
  const assignments = Array.isArray(data?.table_assignments)
    ? data.table_assignments
    : [];
  const rowLetters = deriveRowLetters(assignments);
  const maxColumnFromAssignments = assignments.reduce(
    (max, assignment) => Math.max(max, Number(assignment.column_num) || 0),
    0
  );
  const columnCount = Math.max(maxColumnFromAssignments, DEFAULT_COLUMN_COUNT - 2);
  const room =
    (Array.isArray(data?.rooms) && data.rooms.length && data.rooms[0]) || {
      room_id: 1,
      room_name: "Main hall",
    };

  const assignmentMap = new Map();
  // Fast lookup so we can map (row, column) to assignments during grid creation
  assignments.forEach((assignment) => {
    const key = `${assignment.room_id || room.room_id}-${(assignment.row_letter || "")
      .toString()
      .toUpperCase()}-${assignment.column_num}`;
    assignmentMap.set(key, assignment);
  });

  // Generate every row/column combination so empty tables still render
  const tablesFromData = rowLetters.flatMap((rowLetter) =>
    Array.from({ length: columnCount }).map((_, colIndex) => {
      const columnNum = colIndex + 1;
      const key = `${room.room_id}-${rowLetter}-${columnNum}`;
      const assignment = assignmentMap.get(key);
      return {
        id: `${room.room_name}-${rowLetter}${columnNum}`,
        label: `${rowLetter}${columnNum}`,
        companyId: assignment?.comp_id ?? null,
        isSponsor: false,
        constraints: [],
        roomId: room.room_id,
        roomName: room.room_name,
        rowLetter,
        columnNum,
      };
    })
  );

  return {
    tables: tablesFromData,
    columnCount: tablesFromData.length
      ? Math.max(...tablesFromData.map((t) => t.columnNum || 0))
      : columnCount,
    rowLetters,
  };
}

/**
 * Joins together tables, sponsor tiers, majors, and titles into company objects.
 */
function buildCompaniesFromData(data, tablesFromData) {
  const sponsorMap = new Map(
    (data?.sponsor_levels || []).map((level) => [
      level.sponsor_level_id,
      level.level_name,
    ])
  );
  const majorsMap = new Map(
    (data?.majors || []).map((major) => [major.major_id, major.major_name])
  );
  const positionTypesMap = new Map(
    (data?.position_types || []).map((type) => [type.type_id, type.type_name])
  );
  const positionTitlesMap = new Map(
    (data?.position_titles || []).map((title) => [title.title_id, title.title_name])
  );

  // Map relational tables to arrays keyed by company id
  const majorsByCompany = new Map();
  (data?.company_majors || []).forEach((entry) => {
    const majorName = majorsMap.get(entry.major_id);
    if (!majorName) return;
    const existing = majorsByCompany.get(entry.comp_id) || [];
    majorsByCompany.set(entry.comp_id, [...existing, majorName]);
  });

  const typesByCompany = new Map();
  (data?.company_position_types || []).forEach((entry) => {
    const typeName = positionTypesMap.get(entry.type_id);
    if (!typeName) return;
    const existing = typesByCompany.get(entry.comp_id) || [];
    typesByCompany.set(entry.comp_id, [...existing, typeName]);
  });

  const titlesByCompany = new Map();
  (data?.company_position_titles || []).forEach((entry) => {
    const titleName = positionTitlesMap.get(entry.title_id);
    if (!titleName) return;
    const existing = titlesByCompany.get(entry.comp_id) || [];
    titlesByCompany.set(entry.comp_id, [...existing, titleName]);
  });

  // Keep track of which table belongs to which company
  const tableByCompany = new Map();
  tablesFromData.forEach((table) => {
    if (table.companyId) {
      tableByCompany.set(table.companyId, table);
    }
  });

  const firstRoomName =
    (Array.isArray(data?.rooms) && data.rooms[0]?.room_name) || "Room 1";

  return (data?.companies || []).map((company, index) => {
    const table = tableByCompany.get(company.comp_id);
    const sponsorLabel = sponsorMap.get(company.sponsor_level_id) || "None";

    const normalizedSponsorTier =
      sponsorLabel && sponsorLabel.toLowerCase() !== "none"
        ? sponsorLabel.toLowerCase()
        : "none";

    return {
      id: company.comp_id ?? index + 1,
      name: company.comp_name || "Unknown company",
      description: company.comp_desc || "",
      tableId: table?.id || "",
      roomName: table?.roomName || firstRoomName,
      rowLetter: table?.rowLetter || "",
      columnNum: table?.columnNum || null,
      sponsorTier: normalizedSponsorTier,
      sponsorLabel,
      sponsorLevelId: company.sponsor_level_id ?? null,
      majors: majorsByCompany.get(company.comp_id) || [],
      positionTypes: typesByCompany.get(company.comp_id) || [],
      positionTitles: titlesByCompany.get(company.comp_id) || [],
      website: company.website || "",
      visa: Boolean(
        company.visa_sponsorship === 1 ||
          company.visa_sponsorship === "1" ||
          company.visa_sponsorship === true
      ),
    };
  });
}

// Update the grid dimensions once we know how many rows/columns exist
function applyGridConfigFromTables(tableSet) {
  const rowLetters = Array.from(
    new Set(tableSet.map((table) => table.rowLetter).filter(Boolean))
  ).sort();
  const columnCount = tableSet.reduce(
    (max, table) => Math.max(max, table.columnNum || 0),
    0
  );

  gridConfig = {
    rowLetters: rowLetters.length ? rowLetters : DEFAULT_ROW_LETTERS,
    columnCount: columnCount || DEFAULT_COLUMN_COUNT,
  };

  ensureWallSegments();
}

/**
 * Seeds the UI with bundled sample data so the demo works offline.
 */
function seedFromSample(data = sampleData) {
  const built = buildTablesFromData(data);
  tables = built.tables;
  applyGridConfigFromTables(tables);
  wallSegments = createEmptyWallSegments();
  companies = buildCompaniesFromData(data, tables);
  resumes = [];
}

/**
 * Converts arbitrary company data into the normalized format used by rendering layers.
 */
function normalizeCompanies(rawCompanies) {
  if (!Array.isArray(rawCompanies)) return [];

  return rawCompanies.map((company, index) => ({
    id: company.id ?? company.comp_id ?? index + 1,
    name: company.name || company.comp_name || "Unknown company",
    description: company.description || company.comp_desc || "",
    tableId: company.tableId || "",
    roomName: company.roomName || "",
    rowLetter: company.rowLetter || "",
    columnNum: company.columnNum || null,
    sponsorTier: (company.sponsorTier || "none").toString().toLowerCase(),
    sponsorLabel: company.sponsorLabel || company.sponsorTier || "None",
    sponsorLevelId: company.sponsor_level_id ?? null,
    majors: company.majors || [],
    positionTypes: company.positionTypes || [],
    positionTitles: company.positionTitles || [],
    website: company.website || "",
    visa: Boolean(company.visa ?? company.visa_sponsorship ?? false),
  }));
}

// Resumes are flattened into simple cards for the Resumes view
function normalizeResumes(rawResumes) {
  if (!Array.isArray(rawResumes)) return [];

  return rawResumes.map((resume, index) => ({
    id: resume.id ?? index + 1,
    studentName: resume.studentName || "Unnamed student",
    major: resume.major || "Major TBD",
    companyId: resume.companyId ?? null,
    filename: resume.filename || "resume.pdf",
  }));
}

/**
 * Writes table/company relationships back to each entity
 * so drag-and-drop renders consistent details everywhere.
 */
function syncTableAssignments() {
  tables.forEach((table) => {
    table.companyId = null;
    table.isSponsor = false;
  });

  companies.forEach((company) => {
    if (!company.tableId) return;
    const table = tables.find((t) => t.id === company.tableId);
    if (table) {
      table.companyId = company.id;
      table.isSponsor = company.sponsorTier !== "none";
      company.roomName = table.roomName;
      company.rowLetter = table.rowLetter;
      company.columnNum = table.columnNum;
    }
  });
}

async function loadInitialData() {
  try {
    const [layoutData, companiesData, resumesData] = await Promise.all([
      fetchSection(backendConfig.layoutUrl),
      fetchSection(backendConfig.companiesUrl),
      fetchSection(backendConfig.resumesUrl),
    ]);

    if (layoutData || companiesData) {
      tables = normalizeTables(layoutData?.tables || layoutData || []);
      applyGridConfigFromTables(tables);
      wallSegments = normalizeWallSegments(
        layoutData?.wallSegments || layoutData,
        gridConfig.columnCount
      );

      companies = normalizeCompanies(
        layoutData?.companies || companiesData || []
      );
      resumes = normalizeResumes(layoutData?.resumes || resumesData || []);
    } else {
      seedFromSample(sampleData);
    }
  } catch (error) {
    console.warn("Backend not available yet - using sample data.", error);
    seedFromSample(sampleData);
  }

  syncTableAssignments();
}

// ==============================
// SIDEBAR NAV + MOBILE SIDEBAR
// ==============================
// This handles switching views and showing the sidebar on small screens

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

// Simple helpers keep the sidebar toggling logic tidy
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
// This draws the room grid, walls, and tables

const layoutGridEl = document.getElementById("layout-grid");
const dashboardLayoutGridEl = document.getElementById("dashboard-layout-grid");
const layoutDetailsEl = document.getElementById("layout-details");
const layoutTotalTablesEl = document.getElementById("layout-total-tables");

/**
 * Helper: constraint metadata
 */
/**
 * Helper to map a constraint type into a friendly label/icon set.
 */
function getConstraintMeta(type) {
  return constraintTypes.find((c) => c.type === type) || null;
}

/**
 * Build the full map for the Layout view (walls + tables + aisles).
 * compact = false -> full map
 * compact = true  -> simplified grid for dashboard
 */
/**
 * Renders all table cells and wall segments for the dashboard + layout views.
 */
function renderGridCells(container, compact) {
  container.innerHTML = "";

  const rowLetters =
    gridConfig.rowLetters && gridConfig.rowLetters.length
      ? gridConfig.rowLetters
      : deriveRowLetters([]);
  const columnCount =
    gridConfig.columnCount ||
    tables.reduce((max, table) => Math.max(max, table.columnNum || 0), 0) ||
    DEFAULT_COLUMN_COUNT;

  ensureWallSegments();

  const findTable = (rowLetter, columnIndex) =>
    tables.find(
      (table) =>
        table.rowLetter === rowLetter && Number(table.columnNum) === columnIndex
    ) || {
      id: `${rowLetter}${columnIndex}`,
      label: `${rowLetter}${columnIndex}`,
      companyId: null,
      isSponsor: false,
      constraints: [],
      rowLetter,
      columnNum: columnIndex,
      roomName: tables[0]?.roomName || "Room",
    };

  const room = document.createElement("div");
  room.className = "map-room";
  if (compact) {
    room.classList.add("map-room-compact");
  }

  const grid = document.createElement("div");
  grid.className = "map-grid";
  if (compact) {
    grid.classList.add("map-grid-compact");
  }

  const walkwayAfter = Math.max(1, Math.floor(columnCount / 2));
  const appendWalkwaySpacer = (rowElement, isAisle) => {
    const walkway = document.createElement("div");
    walkway.className = "map-walkway-spacer" + (isAisle ? " walkway-aisle" : "");
    if (compact) {
      walkway.classList.add("compact");
    }
    rowElement.appendChild(walkway);
  };

  rowLetters.forEach((rowLetter, rowIndex) => {
    const tableRow = document.createElement("div");
    tableRow.className = "map-row";
    tableRow.style.setProperty("--map-columns", columnCount + 1);
    let walkwayInserted = false;
    for (let col = 1; col <= columnCount; col++) {
      const table = findTable(rowLetter, col);
      const cell = createTableCell(table, compact);
      tableRow.appendChild(cell);
      if (!walkwayInserted && col === walkwayAfter) {
        appendWalkwaySpacer(tableRow, false);
        walkwayInserted = true;
      }
    }
    if (!walkwayInserted) {
      appendWalkwaySpacer(tableRow, false);
    }
    grid.appendChild(tableRow);

    if (rowIndex !== rowLetters.length - 1) {
      const aisleRow = document.createElement("div");
      aisleRow.className = "map-row map-row-aisle";
      aisleRow.style.setProperty("--map-columns", columnCount + 1);
      let aisleWalkwayInserted = false;
      for (let col = 1; col <= columnCount; col++) {
        const aisleCell = document.createElement("div");
        aisleCell.className = "map-aisle-cell";
        if (col === Math.ceil(columnCount / 2)) {
          const label = document.createElement("div");
          label.className = "map-aisle-label";
          label.textContent = "Aisle";
          aisleCell.appendChild(label);
        }

        aisleRow.appendChild(aisleCell);
        if (!aisleWalkwayInserted && col === walkwayAfter) {
          appendWalkwaySpacer(aisleRow, true);
          aisleWalkwayInserted = true;
        }
      }
      if (!aisleWalkwayInserted) {
        appendWalkwaySpacer(aisleRow, true);
      }
      grid.appendChild(aisleRow);
    }
  });

  room.appendChild(grid);

  ["top", "bottom", "left", "right"].forEach((side) => {
    room.appendChild(createWallEdge(side));
  });

  container.appendChild(room);
}

function createTableCell(table, compact) {
  const company = companies.find((c) => c.id === table.companyId) || null;

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

function createWallEdge(side) {
  const edge = document.createElement("div");
  edge.className = `map-wall-edge map-wall-${side}`;
  edge.dataset.side = side;

  const items = wallSegments[side] || [];
  items.forEach((item) => {
    const meta = getConstraintMeta(item.type);
    if (!meta) return;
    const chip = document.createElement("div");
    chip.className =
      "map-wall-item " +
      (side === "top" || side === "bottom" ? "horizontal" : "vertical");
    chip.textContent = meta.short;
    chip.draggable = true;
    chip.tabIndex = 0;
    chip.title = "Drag to move or double-click to remove";

    if (side === "top" || side === "bottom") {
      chip.style.left = `${clamp01(item.offset) * 100}%`;
      chip.style.top = "50%";
    } else {
      chip.style.top = `${clamp01(item.offset) * 100}%`;
      chip.style.left = "50%";
    }

    chip.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("type", "constraint");
      e.dataTransfer.setData("constraintType", item.type);
      e.dataTransfer.setData("constraintId", item.id);
      e.dataTransfer.setData("constraintSourceSide", side);
    });

    chip.addEventListener("dblclick", () => {
      removeConstraintFromWall(item.id, side);
    });

    edge.appendChild(chip);
  });

  edge.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  edge.addEventListener("drop", (e) => {
    e.preventDefault();
    handleDropOnWall(e, side);
  });

  return edge;
}

/**
 * Show details in the side panel when a table is selected.
 * Also adds sponsor toggle + "Unassign table" button.
 */
/**
 * Populates the inspector panel whenever a table is selected.
 */
function showTableDetails(table) {
  const company = companies.find((c) => c.id === table.companyId) || null;
  const info = [];

  info.push(
    `<div>Table ID: <span class="layout-details-strong">${table.id}</span></div>`
  );
  info.push(
    `<div>Room: <span class="layout-details-strong">${table.roomName}</span></div>`
  );
  info.push(
    `<div>Row/Col: <span class="layout-details-strong">${table.rowLetter}${
      table.columnNum || ""
    }</span></div>`
  );
  info.push(
    `<div>Assigned company: <span class="layout-details-strong">${
      company ? company.name : "Unassigned"
    }</span></div>`
  );

  if (company) {
    if (company.description) {
      info.push(
        `<div class="layout-details-strong" style="font-weight:500;">${company.description}</div>`
      );
    }

    const sponsorText = company.sponsorTier === "none" ? "Not sponsored" : "Sponsored";
    info.push(
      `<div>Sponsor: <span class="layout-details-strong">${sponsorText}</span></div>`
    );

    const majorsText = company.majors.length
      ? company.majors.join(", ")
      : "No majors linked";
    info.push(
      `<div>Majors: <span class="layout-details-strong">${majorsText}</span></div>`
    );

    const typesText = company.positionTypes.length
      ? company.positionTypes.join(", ")
      : "No position types set";
    info.push(
      `<div>Position types: <span class="layout-details-strong">${typesText}</span></div>`
    );

    const titlesText = company.positionTitles.length
      ? company.positionTitles.join(", ")
      : "No titles set";
    info.push(
      `<div>Position titles: <span class="layout-details-strong">${titlesText}</span></div>`
    );

    info.push(
      `<div>Visa sponsorship: <span class="layout-details-strong">${
        company.visa ? "Yes" : "No"
      }</span></div>`
    );

    if (company.website) {
      info.push(
        `<div>Website: <a href="${company.website}" target="_blank" rel="noreferrer" class="layout-details-strong">${company.website}</a></div>`
      );
    }

    info.push(`
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
      This panel shows data from rooms, tables, companies, sponsors, majors, and positions.
    </div>`;

  if (company) {
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
/**
 * Handles all drag-n-drop interactions that target a table.
 */
function handleDropOnTable(e, table) {
  const dropType = e.dataTransfer.getData("type");
  if (dropType !== "company") return; // constraints not accepted on tables

  const companyIdStr = e.dataTransfer.getData("companyId");
  if (!companyIdStr) return;
  const companyId = Number(companyIdStr);
  const company = companies.find((c) => c.id === companyId);
  if (!company) return;

  // Unassign company from its previous table, if any
  if (company.tableId) {
    const prevTable = tables.find((t) => t.id === company.tableId);
    if (prevTable && prevTable.companyId === company.id) {
      prevTable.companyId = null;
      prevTable.isSponsor = false;
    }
  }

  // Assign company to this table
  table.companyId = company.id;
  company.tableId = table.id;
  company.roomName = table.roomName;
  company.rowLetter = table.rowLetter;
  company.columnNum = table.columnNum;

  // Sponsor status depends ONLY on sponsorTier; drag/drop does not auto-sponsor
  table.isSponsor = company.sponsorTier !== "none";

  renderCompanyTable();
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
  renderCompanyPalette();
  showTableDetails(table);
}

/**
 * Handle drops on walls: constraints ONLY (doors, extinguishers, exits).
 */
// Allows constraint chips to land anywhere along the wall rails
function handleDropOnWall(e, side) {
  const dropType = e.dataTransfer.getData("type");
  if (dropType !== "constraint") return;

  const constraintType = e.dataTransfer.getData("constraintType");
  if (!constraintType) return;

  const targetRect = e.currentTarget.getBoundingClientRect();
  let offset;
  if (side === "top" || side === "bottom") {
    offset = (e.clientX - targetRect.left) / targetRect.width;
  } else {
    offset = (e.clientY - targetRect.top) / targetRect.height;
  }

  const existingId = e.dataTransfer.getData("constraintId");
  const sourceSide = e.dataTransfer.getData("constraintSourceSide");

  if (existingId && sourceSide && wallSegments[sourceSide]) {
    wallSegments[sourceSide] = wallSegments[sourceSide].filter(
      (item) => item.id !== existingId
    );
  }

  const entry = {
    id: existingId || `${side}-${Date.now()}`,
    type: constraintType,
    offset: clamp01(offset || 0),
  };

  const currentList = Array.isArray(wallSegments[side]) ? wallSegments[side] : [];
  wallSegments[side] = [
    ...currentList.filter((item) => item.id !== entry.id),
    entry,
  ];

  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
}

function removeConstraintFromWall(constraintId, side) {
  if (!constraintId || !wallSegments[side]) return;
  const before = wallSegments[side].length;
  wallSegments[side] = wallSegments[side].filter(
    (item) => item.id !== constraintId
  );
  if (wallSegments[side].length === before) {
    return;
  }
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
}

/**
 * Unassign a company from a table (table becomes free).
 */
// Utility to clear assignments without losing the original table
function unassignTable(table, company) {
  if (!table || !company) return;

  if (table.companyId === company.id) {
    table.companyId = null;
  }
  if (company.tableId === table.id) {
    company.tableId = "";
    company.rowLetter = "";
    company.columnNum = null;
  }

  table.isSponsor = false; // sponsor is about table location; company still has tier

  renderCompanyTable();
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
  renderCompanyPalette();
  showTableDetails(table);
}

// ==============================
// COMPANIES TABLE + FORM
// ==============================
// This renders the company list from the sample data

const companiesTableBody = document.getElementById("companies-table-body");
const companiesTotalEl = document.getElementById("companies-total");
const companiesAssignedEl = document.getElementById("companies-assigned");
const companiesSponsorsEl = document.getElementById("companies-sponsors");
/**
 * Render company table (list) with badges at the top.
 */
/**
 * Draws the detailed company table listing on the Companies view.
 */
function renderCompanyTable() {
  companiesTableBody.innerHTML = "";
  let assignedCount = 0;
  let sponsorCount = 0;

  companies.forEach((company) => {
    if (company.tableId) assignedCount += 1;
    if (company.sponsorTier !== "none") sponsorCount += 1;

    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    const nameLine = document.createElement("div");
    nameLine.textContent = company.name;
    const descLine = document.createElement("div");
    descLine.className = "table-subtext";
    descLine.textContent = company.description || "No description provided";
    nameTd.appendChild(nameLine);
    nameTd.appendChild(descLine);
    tr.appendChild(nameTd);

    const websiteTd = document.createElement("td");
    if (company.website) {
      const link = document.createElement("a");
      link.href = company.website;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = company.website.replace(/^https?:\/\//, "");
      websiteTd.appendChild(link);
    } else {
      websiteTd.textContent = "Not provided";
    }
    tr.appendChild(websiteTd);

    const tableTd = document.createElement("td");
    if (company.tableId) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = `${company.rowLetter}${company.columnNum || ""}`;
      tableTd.appendChild(tag);

      const roomLine = document.createElement("div");
      roomLine.className = "table-subtext";
      roomLine.textContent = company.roomName || "Room TBD";
      tableTd.appendChild(roomLine);
    } else {
      const tag = document.createElement("span");
      tag.className = "tag tag-unassigned";
      tag.textContent = "Unassigned";
      tableTd.appendChild(tag);
    }
    tr.appendChild(tableTd);

    const sponsorTd = document.createElement("td");
    const label = document.createElement("span");
    const isSponsored = company.sponsorTier !== "none";
    label.className = "tag" + (isSponsored ? " tag-sponsor" : "");
    label.textContent = isSponsored ? "Sponsored" : "Not sponsored";
    sponsorTd.appendChild(label);
    tr.appendChild(sponsorTd);

    const majorsTd = document.createElement("td");
    const majorsLine = document.createElement("div");
    majorsLine.textContent = company.majors.length
      ? company.majors.join(", ")
      : "No majors linked";
    majorsTd.appendChild(majorsLine);
    const rolesLine = document.createElement("div");
    rolesLine.className = "table-subtext";
    const typesText = company.positionTypes.length
      ? `Types: ${company.positionTypes.join(", ")}`
      : "Types: none";
    const titlesText = company.positionTitles.length
      ? `Titles: ${company.positionTitles.join(", ")}`
      : "Titles: none";
    rolesLine.textContent = `${typesText} | ${titlesText}`;
    majorsTd.appendChild(rolesLine);
    tr.appendChild(majorsTd);

    const visaTd = document.createElement("td");
    const visaLabel = document.createElement("span");
    visaLabel.className = "tag" + (company.visa ? "" : " tag-unassigned");
    visaLabel.textContent = company.visa ? "Yes" : "No";
    visaTd.appendChild(visaLabel);
    tr.appendChild(visaTd);

    companiesTableBody.appendChild(tr);
  });

  companiesTotalEl.textContent = String(companies.length);
  companiesAssignedEl.textContent = String(assignedCount);
  companiesSponsorsEl.textContent = String(sponsorCount);
}

// Quick way to reload the bundled sample data set
function resetToSampleSeed() {
  seedFromSample(sampleData);
  syncTableAssignments();
  renderAllViews();
}

const clearFiltersButton = document.getElementById("btn-clear-filters");
clearFiltersButton.addEventListener("click", () => {
  resetToSampleSeed();
});

// ==============================
// PALETTES: DRAG SOURCES
// ==============================
// This builds the draggable chips for companies and wall items

const companyPaletteEl = document.getElementById("company-palette");
const constraintPaletteEl = document.getElementById("constraint-palette");

/**
 * Companies palette: drag these onto tables.
 */
/**
 * Populates the draggable company chips next to the layout editor.
 */
function renderCompanyPalette() {
  companyPaletteEl.innerHTML = "";
  companies.forEach((company) => {
    const item = document.createElement("div");
    item.className = "palette-item palette-item-company";
    const sponsorText = company.sponsorTier === "none" ? "" : " (Sponsored)";
    item.textContent = `${company.name}${sponsorText}`;
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
// Populates the simple constraint chips (doors, exits, etc.)
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

// ==============================
// RESUMES
// ==============================
// This renders the basic resume list

const resumeListEl = document.getElementById("resume-list");

/**
 * Rebuilds the resume list with the latest normalized data.
 */
function renderResumes() {
  resumeListEl.innerHTML = "";
  resumes.forEach((resume) => {
    const company =
      companies.find((c) => c.id === resume.companyId) || { name: "Open to all" };

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
    metaEl.textContent = `${resume.major} - Target: ${company.name}`;
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
      alert("View action can open the file when hooked up.");
    });

    const downloadButton = document.createElement("button");
    downloadButton.className = "button-ghost";
    downloadButton.textContent = "Download";
    downloadButton.addEventListener("click", () => {
      alert("Download action can be wired to the backend.");
    });

    actions.appendChild(viewButton);
    actions.appendChild(downloadButton);

    item.appendChild(main);
    item.appendChild(actions);

    resumeListEl.appendChild(item);
  });
}

// Runs every render function so the UI stays in sync
function renderAllViews() {
  renderGridCells(layoutGridEl, false);
  renderGridCells(dashboardLayoutGridEl, true);
  if (layoutTotalTablesEl) {
    layoutTotalTablesEl.textContent = String(tables.length);
  }

  renderCompanyTable();
  renderCompanyPalette();
  renderConstraintPalette();
  renderResumes();
  renderMetrics();
}

async function initializeAdminDashboard() {
  await loadInitialData();
  renderAllViews();
}

initializeAdminDashboard();

// ==============================
// DASHBOARD METRICS
// ==============================
// This refreshes the simple metrics at the top

const metricCompanies = document.getElementById("metric-companies");
const metricCompaniesTrend = document.getElementById("metric-companies-trend");
const metricTablesAssigned = document.getElementById("metric-tables-assigned");
const metricTablesFree = document.getElementById("metric-tables-free");
const metricSponsors = document.getElementById("metric-sponsors");
const metricResumes = document.getElementById("metric-resumes");
const refreshStatsButton = document.getElementById("btn-refresh-stats");

/**
 * Refreshes the top-level stats shown on the Dashboard cards.
 */
function renderMetrics() {
  const companyCount = companies.length;
  const tablesAssigned = tables.filter((t) => t.companyId).length;
  const sponsorsCount = companies.filter((c) => c.sponsorTier !== "none").length;
  const majorsCovered = new Set(
    companies.flatMap((c) => c.majors || [])
  ).size;

  metricCompanies.textContent = String(companyCount);
  metricCompaniesTrend.textContent = "Sample data loaded";
  metricTablesAssigned.textContent = String(tablesAssigned);
  metricTablesFree.textContent = `${Math.max(
    tables.length - tablesAssigned,
    0
  )} free`;
  metricSponsors.textContent = String(sponsorsCount);
  metricResumes.textContent = String(majorsCovered);
}

refreshStatsButton.addEventListener("click", () => {
  renderMetrics();
});















