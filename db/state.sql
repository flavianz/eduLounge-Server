--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 16.1

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

--
-- Name: userdata; Type: SCHEMA; Schema: -; Owner: flavianzullig
--

CREATE SCHEMA userdata;


ALTER SCHEMA userdata OWNER TO flavianzullig;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: classes; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.classes (
    class_id integer NOT NULL,
    grade character varying(255),
    school_id integer
);


ALTER TABLE userdata.classes OWNER TO flavianzullig;

--
-- Name: classes_class_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.classes_class_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.classes_class_id_seq OWNER TO flavianzullig;

--
-- Name: classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.classes_class_id_seq OWNED BY userdata.classes.class_id;


--
-- Name: grades; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.grades (
    grade_id integer NOT NULL,
    note character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    student_id integer,
    subject_id integer
);


ALTER TABLE userdata.grades OWNER TO flavianzullig;

--
-- Name: grades_grade_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.grades_grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.grades_grade_id_seq OWNER TO flavianzullig;

--
-- Name: grades_grade_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.grades_grade_id_seq OWNED BY userdata.grades.grade_id;


--
-- Name: guardians; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.guardians (
    guardian_id integer NOT NULL,
    guardian_number numeric NOT NULL,
    first_name character varying(255),
    middle_name character varying(255),
    last_name character varying(255),
    mobile character varying(255),
    email character varying(255),
    student_id integer
);


ALTER TABLE userdata.guardians OWNER TO flavianzullig;

--
-- Name: guardians_guardian_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.guardians_guardian_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.guardians_guardian_id_seq OWNER TO flavianzullig;

--
-- Name: guardians_guardian_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.guardians_guardian_id_seq OWNED BY userdata.guardians.guardian_id;


--
-- Name: organisations; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.organisations (
    organisation_id integer NOT NULL,
    short character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE userdata.organisations OWNER TO flavianzullig;

--
-- Name: organisations_organisation_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.organisations_organisation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.organisations_organisation_id_seq OWNER TO flavianzullig;

--
-- Name: organisations_organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.organisations_organisation_id_seq OWNED BY userdata.organisations.organisation_id;


--
-- Name: schools; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.schools (
    school_id integer NOT NULL,
    short character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    organisation_id integer
);


ALTER TABLE userdata.schools OWNER TO flavianzullig;

--
-- Name: schools_school_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.schools_school_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.schools_school_id_seq OWNER TO flavianzullig;

--
-- Name: schools_school_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.schools_school_id_seq OWNED BY userdata.schools.school_id;


--
-- Name: users; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.users (
    user_id integer NOT NULL,
    password integer
);


ALTER TABLE userdata.users OWNER TO flavianzullig;

--
-- Name: students; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.students (
    student_id integer NOT NULL,
    first_name character varying(255),
    middle_name character varying(255),
    last_name character varying(255),
    class_id integer NOT NULL
)
INHERITS (userdata.users);


ALTER TABLE userdata.students OWNER TO flavianzullig;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.students_id_seq OWNER TO flavianzullig;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.students_id_seq OWNED BY userdata.students.student_id;


--
-- Name: subjects; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.subjects (
    subject_id integer NOT NULL,
    short character varying(255) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE userdata.subjects OWNER TO flavianzullig;

--
-- Name: subjects_subject_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.subjects_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.subjects_subject_id_seq OWNER TO flavianzullig;

--
-- Name: subjects_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.subjects_subject_id_seq OWNED BY userdata.subjects.subject_id;


--
-- Name: teachers; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.teachers (
    teacher_id integer NOT NULL,
    first_name character varying(255),
    middle_name character varying(255),
    last_name character varying(255),
    school_id integer
)
INHERITS (userdata.users);


ALTER TABLE userdata.teachers OWNER TO flavianzullig;

--
-- Name: teacher_teacher_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.teacher_teacher_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.teacher_teacher_id_seq OWNER TO flavianzullig;

--
-- Name: teacher_teacher_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.teacher_teacher_id_seq OWNED BY userdata.teachers.teacher_id;


--
-- Name: teachers_subjects; Type: TABLE; Schema: userdata; Owner: flavianzullig
--

CREATE TABLE userdata.teachers_subjects (
    teacher_id integer NOT NULL,
    subject_id integer NOT NULL
);


ALTER TABLE userdata.teachers_subjects OWNER TO flavianzullig;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: userdata; Owner: flavianzullig
--

CREATE SEQUENCE userdata.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE userdata.users_user_id_seq OWNER TO flavianzullig;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: userdata; Owner: flavianzullig
--

ALTER SEQUENCE userdata.users_user_id_seq OWNED BY userdata.users.user_id;


--
-- Data for Name: classes; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.classes (class_id, grade, school_id) FROM stdin;
\.


--
-- Data for Name: grades; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.grades (grade_id, note, title, student_id, subject_id) FROM stdin;
\.


--
-- Data for Name: guardians; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.guardians (guardian_id, guardian_number, first_name, middle_name, last_name, mobile, email, student_id) FROM stdin;
\.


--
-- Data for Name: organisations; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.organisations (organisation_id, short, name) FROM stdin;
\.


--
-- Data for Name: schools; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.schools (school_id, short, name, organisation_id) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.students (user_id, password, student_id, first_name, middle_name, last_name, class_id) FROM stdin;
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.subjects (subject_id, short, name) FROM stdin;
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.teachers (user_id, password, teacher_id, first_name, middle_name, last_name, school_id) FROM stdin;
\.


--
-- Data for Name: teachers_subjects; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.teachers_subjects (teacher_id, subject_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: userdata; Owner: flavianzullig
--

COPY userdata.users (user_id, password) FROM stdin;
\.


--
-- Name: classes_class_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.classes_class_id_seq', 1, false);


--
-- Name: grades_grade_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.grades_grade_id_seq', 1, false);


--
-- Name: guardians_guardian_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.guardians_guardian_id_seq', 1, false);


--
-- Name: organisations_organisation_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.organisations_organisation_id_seq', 1, true);


--
-- Name: schools_school_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.schools_school_id_seq', 1, false);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.students_id_seq', 1, false);


--
-- Name: subjects_subject_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.subjects_subject_id_seq', 1, false);


--
-- Name: teacher_teacher_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.teacher_teacher_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: userdata; Owner: flavianzullig
--

SELECT pg_catalog.setval('userdata.users_user_id_seq', 1, false);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (class_id);


--
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (grade_id);


--
-- Name: guardians guardians_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.guardians
    ADD CONSTRAINT guardians_pkey PRIMARY KEY (guardian_id);


--
-- Name: organisations organisations_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.organisations
    ADD CONSTRAINT organisations_pkey PRIMARY KEY (organisation_id);


--
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (school_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (subject_id);


--
-- Name: teachers teacher_pkey; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.teachers
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (teacher_id);


--
-- Name: teachers_subjects teachers_subjects_pk; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.teachers_subjects
    ADD CONSTRAINT teachers_subjects_pk PRIMARY KEY (teacher_id, subject_id);


--
-- Name: users user_id_pk; Type: CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.users
    ADD CONSTRAINT user_id_pk PRIMARY KEY (user_id);


--
-- Name: classes classes_school_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.classes
    ADD CONSTRAINT classes_school_id_fkey FOREIGN KEY (school_id) REFERENCES userdata.schools(school_id);


--
-- Name: grades grades_student_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.grades
    ADD CONSTRAINT grades_student_id_fkey FOREIGN KEY (student_id) REFERENCES userdata.students(student_id);


--
-- Name: grades grades_subject_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.grades
    ADD CONSTRAINT grades_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES userdata.subjects(subject_id);


--
-- Name: guardians guardians_student_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.guardians
    ADD CONSTRAINT guardians_student_id_fkey FOREIGN KEY (student_id) REFERENCES userdata.students(student_id);


--
-- Name: schools schools_organisation_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.schools
    ADD CONSTRAINT schools_organisation_id_fkey FOREIGN KEY (organisation_id) REFERENCES userdata.organisations(organisation_id);


--
-- Name: students students_class_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.students
    ADD CONSTRAINT students_class_id_fkey FOREIGN KEY (class_id) REFERENCES userdata.classes(class_id);


--
-- Name: teachers teacher_school_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.teachers
    ADD CONSTRAINT teacher_school_id_fkey FOREIGN KEY (school_id) REFERENCES userdata.schools(school_id);


--
-- Name: teachers_subjects teachers_subjects_subject_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.teachers_subjects
    ADD CONSTRAINT teachers_subjects_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES userdata.subjects(subject_id);


--
-- Name: teachers_subjects teachers_subjects_teacher_id_fkey; Type: FK CONSTRAINT; Schema: userdata; Owner: flavianzullig
--

ALTER TABLE ONLY userdata.teachers_subjects
    ADD CONSTRAINT teachers_subjects_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES userdata.teachers(teacher_id);


--
-- PostgreSQL database dump complete
--

