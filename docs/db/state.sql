--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY accounts.teachers DROP CONSTRAINT teachers_schools_school_id_fk;
ALTER TABLE ONLY accounts.schools DROP CONSTRAINT schools_organisations_organisation_id_fk;
ALTER TABLE ONLY accounts.users DROP CONSTRAINT users_pk;
ALTER TABLE ONLY accounts.teachers DROP CONSTRAINT teachers_pk;
ALTER TABLE ONLY accounts.schools DROP CONSTRAINT schools_pk;
ALTER TABLE ONLY accounts.organisations DROP CONSTRAINT organisations_pk;
ALTER TABLE ONLY accounts.main_classes DROP CONSTRAINT main_classes_pk;
ALTER TABLE ONLY accounts.classes DROP CONSTRAINT classes_pk;
DROP TABLE accounts.teachers;
DROP TABLE accounts.users;
DROP TABLE accounts.schools;
DROP TABLE accounts.organisations;
DROP TABLE accounts.main_classes;
DROP TABLE accounts.classes;
DROP TYPE accounts.personal_info;
DROP TYPE accounts.contact;
DROP TYPE accounts.address;
DROP SCHEMA accounts;
--
-- Name: accounts; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA accounts;


ALTER SCHEMA accounts OWNER TO postgres;

--
-- Name: address; Type: TYPE; Schema: accounts; Owner: postgres
--

CREATE TYPE accounts.address AS (
	street text,
	number text,
	city text,
	postal_code text,
	country text
);


ALTER TYPE accounts.address OWNER TO postgres;

--
-- Name: contact; Type: TYPE; Schema: accounts; Owner: postgres
--

CREATE TYPE accounts.contact AS (
	cellular text,
	landline text,
	email text
);


ALTER TYPE accounts.contact OWNER TO postgres;

--
-- Name: personal_info; Type: TYPE; Schema: accounts; Owner: postgres
--

CREATE TYPE accounts.personal_info AS (
	first_name text,
	middle_name text,
	last_name text,
	address accounts.address,
	contact accounts.contact,
	birth_date text
);


ALTER TYPE accounts.personal_info OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classes; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.classes (
    class_id uuid NOT NULL
);


ALTER TABLE accounts.classes OWNER TO postgres;

--
-- Name: main_classes; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.main_classes (
)
INHERITS (accounts.classes);


ALTER TABLE accounts.main_classes OWNER TO postgres;

--
-- Name: organisations; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.organisations (
    organisation_id uuid NOT NULL,
    short text NOT NULL,
    name text
);


ALTER TABLE accounts.organisations OWNER TO postgres;

--
-- Name: schools; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.schools (
    school_id uuid NOT NULL,
    short text NOT NULL,
    name text,
    organisation_id uuid NOT NULL
);


ALTER TABLE accounts.schools OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.users (
    user_id uuid NOT NULL,
    password text NOT NULL,
    personal_info accounts.personal_info
);


ALTER TABLE accounts.users OWNER TO postgres;

--
-- Name: teachers; Type: TABLE; Schema: accounts; Owner: postgres
--

CREATE TABLE accounts.teachers (
    school_id uuid NOT NULL
)
INHERITS (accounts.users);


ALTER TABLE accounts.teachers OWNER TO postgres;

--
-- Data for Name: classes; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.classes (class_id) FROM stdin;
\.


--
-- Data for Name: main_classes; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.main_classes (class_id) FROM stdin;
\.


--
-- Data for Name: organisations; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.organisations (organisation_id, short, name) FROM stdin;
65964b2e-fae4-4ed9-8a19-a160707af8a0	MjE0MzE0NTFkNDg2YzU1MDc4MDFmZWFlZDQ3MDdiN2U=	M2I1NDFmZDY2OGI2YWYzN2Q4OTcyNjM4ZjdmYWRhNTU=
\.


--
-- Data for Name: schools; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.schools (school_id, short, name, organisation_id) FROM stdin;
696f586a-7a73-473d-a95f-bb9ae5ae1d9c	MzE4MTk5ODNkMGVkNDNiYTIwNzRlZmNkZTQ1YTliNGY=	ZDk3MDA1ZjNjMGIzMmNjMGRlMDRlOWJmZGIzZmEzNGZlY2U4NTdkMWJkYmZkOTEyNjNmZTczYjI4ZDU0NWEwNA==	65964b2e-fae4-4ed9-8a19-a160707af8a0
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.teachers (user_id, password, school_id, personal_info) FROM stdin;
07a1ab9a-3cdd-4c10-bd24-102afaf1ae90	pw2	696f586a-7a73-473d-a95f-bb9ae5ae1d9c	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: accounts; Owner: postgres
--

COPY accounts.users (user_id, password, personal_info) FROM stdin;
4c25a380-a300-44b7-acff-5b0865f5f4d9	fd5a71a5fecae3102bf192afa6e4c07566bd8f41fbc6934cc20fd12e5595e121	(NGY0NjJjYjk1ODQxMzU4NGRlMTQ1MTY0ZTA2ZmRjMGE=,OWVlNWQxY2Q0NGFmOTVkNWI4YjkxNTk1NzNmZjdhODQ=,Yzc4Y2ZhYjhhZjhmNGZhYmNlNDgwMTBiNWQ5YWY1Njc=,"(NWYwMzc4YzUxNmI1Y2U2ODE5ZDdiYTMxZDMwNmYyOTM=,ZTY5NjRlZmNlMzY5OTA5ZmE3NDJjNTZjZjlmYzFhOGM=,NjgyODczNzg0YjJjY2IwYjhiZmE3ZjMwYTAwZWFjMTE=,MmExYzY0NDZlM2NjMTdjMWY1YWVkY2MxOGNjZTBlZmQ=,MmRmZTlhZmM0ZTAyMGNiYTJhN2Y1OWNlYzA1ZDcyMzk=)","(OTIyZDc2ZWMwOTNlMGQ1MTM1ZTIxMGQxZjI0OTUxY2U=,ZGYwZGYyODE1OTVjZDBjMzgwYzE5NjdlZjI4ZWZmNmQ=,MjYzOWJiMzk0Yzk1NzVlNzA2ODYyYzdiMTQ5ZmE3OWE0ODFlYTAzY2I4MTAwMGJmMGI2MzkyZDk4M2RjNzMxNg==)",NzE3OGIwNTIyNGZiN2YxMmVlYjE0OGExZjNhNzYxY2U=)
\.


--
-- Name: classes classes_pk; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.classes
    ADD CONSTRAINT classes_pk PRIMARY KEY (class_id);


--
-- Name: main_classes main_classes_pk; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.main_classes
    ADD CONSTRAINT main_classes_pk PRIMARY KEY (class_id);


--
-- Name: organisations organisations_pk; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.organisations
    ADD CONSTRAINT organisations_pk PRIMARY KEY (organisation_id);


--
-- Name: schools schools_pk; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.schools
    ADD CONSTRAINT schools_pk PRIMARY KEY (school_id);


--
-- Name: teachers teachers_pk; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.teachers
    ADD CONSTRAINT teachers_pk PRIMARY KEY (user_id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.users
    ADD CONSTRAINT users_pk PRIMARY KEY (user_id);


--
-- Name: schools schools_organisations_organisation_id_fk; Type: FK CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.schools
    ADD CONSTRAINT schools_organisations_organisation_id_fk FOREIGN KEY (organisation_id) REFERENCES accounts.organisations(organisation_id);


--
-- Name: teachers teachers_schools_school_id_fk; Type: FK CONSTRAINT; Schema: accounts; Owner: postgres
--

ALTER TABLE ONLY accounts.teachers
    ADD CONSTRAINT teachers_schools_school_id_fk FOREIGN KEY (school_id) REFERENCES accounts.schools(school_id);


--
-- PostgreSQL database dump complete
--

