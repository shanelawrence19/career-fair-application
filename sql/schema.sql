-- This is the SQL script that initializes the tables we need for the developmental DB.
-- I am doing this because we need to start implementation even though we don't know exactly what DB we will use.

-- In case this file ever gets re-ran, this will make sure the tables get reset.
DROP TABLE IF EXISTS company_position_titles CASCADE;
DROP TABLE IF EXISTS company_position_types CASCADE;
DROP TABLE IF EXISTS company_majors CASCADE;
DROP TABLE IF EXISTS table_assignments CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS position_titles CASCADE;
DROP TABLE IF EXISTS position_types CASCADE;
DROP TABLE IF EXISTS majors CASCADE;
DROP TABLE IF EXISTS sponsor_levels CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;

-- Rooms Table
CREATE TABLE rooms (
    room_id     SERIAL PRIMARY KEY,
    room_name   VARCHAR(50) NOT NULL
);

-- Sponsor Levels
CREATE TABLE sponsor_levels (
    sponsor_level_id SERIAL PRIMARY KEY,
    level_name       VARCHAR(10) NOT NULL
);

-- Majors Search Table
CREATE TABLE majors (
    major_id   SERIAL PRIMARY KEY,
    major_name VARCHAR(50) NOT NULL
);

-- Position Types Table
CREATE TABLE position_types (
    type_id   SERIAL PRIMARY KEY,
    type_name VARCHAR(10) NOT NULL
);

-- Position Titles Table
CREATE TABLE position_titles (
    title_id   SERIAL PRIMARY KEY,
    title_name VARCHAR(255) NOT NULL
);

-- Company Table
CREATE TABLE companies (
    comp_id           SERIAL PRIMARY KEY,
    comp_name         VARCHAR(75)  NOT NULL,
    sponsor_level_id  INT          NULL,
    logo              VARCHAR(255),
    comp_desc         VARCHAR(255) NOT NULL,
    website           VARCHAR(255) NOT NULL,
    visa_sponsorship  BIT NOT NULL,
    -- FK to sponsor_levels
    CONSTRAINT fk_comp_sponsor_level
        FOREIGN KEY (sponsor_level_id)
        REFERENCES sponsor_levels (sponsor_level_id)
        ON DELETE SET NULL
);

-- Table Assignments Table
-- Each assignment belongs to a room and a company
CREATE TABLE table_assignments (
    assign_id   SERIAL PRIMARY KEY,
    room_id     INT NOT NULL,
    comp_id     INT NOT NULL,
    row_letter  VARCHAR(2) NOT NULL,
    column_num  INT NOT NULL,
    CONSTRAINT fk_assign_room
        FOREIGN KEY (room_id)
        REFERENCES rooms (room_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_assign_company
        FOREIGN KEY (comp_id)
        REFERENCES companies (comp_id)
        ON DELETE CASCADE
);

-- Company Major Junction Table
CREATE TABLE company_majors (
    company_major_id SERIAL PRIMARY KEY,
    comp_id          INT NOT NULL,
    major_id         INT NOT NULL,
    CONSTRAINT fk_company_major_comp
        FOREIGN KEY (comp_id)
        REFERENCES companies (comp_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_company_major_major
        FOREIGN KEY (major_id)
        REFERENCES majors (major_id)
        ON DELETE CASCADE
);

-- Company Position Types Junction Table
CREATE TABLE company_position_types (
    company_pos_types_id SERIAL PRIMARY KEY,
    comp_id              INT NOT NULL,
    type_id              INT NOT NULL,
    CONSTRAINT fk_company_pos_type_comp
        FOREIGN KEY (comp_id)
        REFERENCES companies (comp_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_company_pos_type_type
        FOREIGN KEY (type_id)
        REFERENCES position_types (type_id)
        ON DELETE CASCADE
);

-- Company Position Titles Junction Table
CREATE TABLE company_position_titles (
    company_pos_titles_id SERIAL PRIMARY KEY,
    comp_id               INT NOT NULL,
    title_id              INT NOT NULL,
    CONSTRAINT fk_company_pos_title_comp
        FOREIGN KEY (comp_id)
        REFERENCES companies (comp_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_company_pos_title_title
        FOREIGN KEY (title_id)
        REFERENCES position_titles (title_id)
        ON DELETE CASCADE
);
