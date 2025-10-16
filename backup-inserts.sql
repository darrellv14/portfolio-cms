--
-- PostgreSQL database dump
--


-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: delvin
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    refresh_token_expires_in integer
);


ALTER TABLE public."Account"

--
-- Name: Project; Type: TABLE; Schema: public; Owner: delvin
--

CREATE TABLE public."Project" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "imageURL" text NOT NULL,
    "createdById" text NOT NULL
);




--
-- Name: Project_id_seq; Type: SEQUENCE; Schema: public; Owner: delvin
--

CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: delvin
--

ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: delvin
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);




--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: delvin
--

CREATE TABLE public."Testimonial" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "position" text NOT NULL,
    "avatarURL" text NOT NULL,
    "createdById" text NOT NULL
);




--
-- Name: Testimonial_id_seq; Type: SEQUENCE; Schema: public; Owner: delvin
--

CREATE SEQUENCE public."Testimonial_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: Testimonial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: delvin
--

ALTER SEQUENCE public."Testimonial_id_seq" OWNED BY public."Testimonial".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: delvin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text
);




--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: delvin
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);




--
-- Name: Project id; Type: DEFAULT; Schema: public; Owner: delvin
--




--
-- Name: Testimonial id; Type: DEFAULT; Schema: public; Owner: delvin
--




--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: delvin
--

INSERT INTO public."Account" VALUES ('cmgs7drri000437t4dg6x6tpq', 'cmgs7drpn000237t40slrggpn', 'oidc', 'google', '105277435183593614669', NULL, 'ya29.a0AQQ_BDS74dqEnOD_CjdnzJj8YwXADcgNWJtYINYttb7QXMrO2FgJwGBu8U3Lu7MtgD_r2W-B-STjs8L7yWOCn-EwvY7SL5-tuG1U1Gm9A3g25Stgoj0MnJi50LS2oAZCacofpIurJPRB_NU53VXMFy8YRE6mTM_8UvPZUargEY0PCqmt-4Ts2mzpB10OfEKh5tsqDlRXaCgYKATYSARcSFQHGX2MiHLy8K5b3KlAKkVf40-gAGg0207', 1760549179, 'bearer', 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4YWI3MTUzMDk3MmJiYTIwYjQ5Zjc4YTA5Yzk4NTJjNDNmZjkxMTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTg3MjQ4NjE4NzEtZHMybXAzZDJvNWttMWhtZzU2ZHVjbHUwbjhkYWFucnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0OTg3MjQ4NjE4NzEtZHMybXAzZDJvNWttMWhtZzU2ZHVjbHUwbjhkYWFucnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDUyNzc0MzUxODM1OTM2MTQ2NjkiLCJlbWFpbCI6ImRhcnJlbGwudmFsZW50aW5vMTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLc0MzUmJYTjV5WnlwZUlvS2RDcXZnIiwibmFtZSI6IkRhcnJlbGwgVmFsZW50aW5vIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0owLWtCWEp5ejg1YnJnN3dZNkk5aDhMRlNhUVNGWnU3V0lRZVdrUWJjS0dkb01qTXQ5OWc9czk2LWMiLCJnaXZlbl9uYW1lIjoiRGFycmVsbCIsImZhbWlseV9uYW1lIjoiVmFsZW50aW5vIiwiaWF0IjoxNzYwNTQ1NTc3LCJleHAiOjE3NjA1NDkxNzd9.cd54qaXF90WGmZEoGNMTjEA9sEr1zl2HHXYqI3ev_QLascawvH3T1YJfUlGueBqxMLab1sBDZjlRc7XaBfmLNPYa9GdIJ1XF_DXMZYQUEdZ0xZtEiwDBl5_OXjdxUwlfaxDo8TfpGPhaeTIYNM_QX8GxU_kNgMD9f9rpX20A4y5mcptkkjnP-SFNLMwCnAeAULgSvxnnxHDo2Fuen-qH7Y_gKn7lz-tdVNovJx8ka83qm7xeJGBN7MQ-f_Kq7bJb4KlY3CPvNOJUuzHbGLxKn7JoQE7EpMUgjpOOpQW4JTF4AMBcKgpJX-i95LeeisZ2CVTE3GFDlLIra12Caohztg', NULL, NULL);
INSERT INTO public."Account" VALUES ('cmgsdsvhj000237g4kv9nvgn6', 'cmgsdsvff000037g4s0b0zwyl', 'oidc', 'google', '104548564352438609379', NULL, 'ya29.a0AQQ_BDRrcZ9O3uvhesbBbL2l4HPH9QKyIHo_7oPMHUfdj1xtHNhTouTKIYDBkbfWORkLaD2PNNw8yl1CG02Y6BFxi2yBZSElpBA9VBlRtvDv8lPtYmG0KQGGN5L0nfn1MJPPmP_bD8BIn_OLSyUAP5Zp_5SaX6Leqk6-DR8dkwP4s8AMx4ZrbF4-7d5r04_klwPpqkTGaCgYKAQASARASFQHGX2MiZF2x1Pc5yQDw5eb8udFvbQ0207', 1760559961, 'bearer', 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4YWI3MTUzMDk3MmJiYTIwYjQ5Zjc4YTA5Yzk4NTJjNDNmZjkxMTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0OTg3MjQ4NjE4NzEtZHMybXAzZDJvNWttMWhtZzU2ZHVjbHUwbjhkYWFucnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0OTg3MjQ4NjE4NzEtZHMybXAzZDJvNWttMWhtZzU2ZHVjbHUwbjhkYWFucnMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ1NDg1NjQzNTI0Mzg2MDkzNzkiLCJlbWFpbCI6ImRhcnJlbGxzcGFtMTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJNSHlGM2lkclJMck5Ca0ZiNGhLdEVBIiwibmFtZSI6IkRlZGUgQXJpcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMZEJxdGQ4S3ROUjVQZjJWRFZBRmN3YkN5Mlg4bDh1MW1uUlJ2T0Q4SHk1b0RUd2FfbD1zOTYtYyIsImdpdmVuX25hbWUiOiJEZWRlIiwiZmFtaWx5X25hbWUiOiJBcmlzIiwiaWF0IjoxNzYwNTU2MzU5LCJleHAiOjE3NjA1NTk5NTl9.HZn_7LLjudKGr_et7NXyEdhU0HuJUH4sJpFgRw6xscdV2Qln7N-J0WzRXJiau0uIEa45TMJ_W3NR9KcyotsNgacG9C5xXpF5UofocoHIiFW-cHemEFWa6YADOyhHrxJoJErLj2dlB0MCnLDNTcNQMbsd_HhPZXXYFwn_RxpW3uqaT0tDh8mPypzz_49JU3mFrqxXHEsfvX3DvhRrz2tGqP7Si8iQd_kiymAuGBcgipPHx0ek52tq8rdA8iaj1wigfXNmi3_VxMAv6e-pPEqRPrBxMV1ftd0KGNLlfhiHAJP-G1VIS6d7fvbtd5MMdZC54A44fwSNxjX7UIT16PRKJA', NULL, NULL);


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: delvin
--

INSERT INTO public."Project" VALUES (2, '2025-10-15 18:16:40.597', '2025-10-15 18:16:40.597', 'EazyChise', 'EazyChise is a one-stop PWA marketplace that lets entrepreneurs discover, compare, and secure franchise opportunities in just a few taps. I built its frontend using Next.js, React, TypeScript, and Tailwind CSS implementing core PWA features like installable desktop/mobile support, offline caching with Workbox, and a Web App Manifest for blazing fast cross platform performance. I also developed the home screen and franchise detail pages with a smart search input, enabling seamless, mobile-first exploration of franchise listings.', 'https://jhoniananta.com/_next/image?url=%2Fimages%2Fproject%2Feazy_chise_project.png&w=1080&q=75', 'cmgs7drpn000237t40slrggpn');
INSERT INTO public."Project" VALUES (3, '2025-10-15 18:53:53.059', '2025-10-15 18:53:53.059', 'Petsaurus', 'Built with Next.js and Progressive Web App (PWA) technologies, Petsaurus is a comprehensive platform developed as part of the Program Kreativitas Mahasiswa entrepreneurship program. As the CTO, I led the development of this application that connects pet owners, pet shops, and pet clinics. The project involved overseeing technical aspects, managing the development team, and ensuring timely delivery. This experience enhanced my skills in technical leadership and project management while implementing modern web technologies.', 'https://jhoniananta.com/_next/image?url=%2Fimages%2Fproject%2Fpetsaurus_project.png&w=1080&q=75', 'cmgs7drpn000237t40slrggpn');


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: delvin
--

INSERT INTO public."Session" VALUES ('cmgsdt5md000637g4ap2p8rak', '31c38941-c610-4779-b7e7-2d62eb75ce8c', 'cmgs7drpn000237t40slrggpn', '2025-11-14 19:26:15.726');


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: delvin
--



--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: delvin
--

INSERT INTO public."User" VALUES ('cmgs7drpn000237t40slrggpn', 'Darrell Valentino', 'darrell.valentino14@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocJ0-kBXJyz85brg7wY6I9h8LFSaQSFZu7WIQeWkQbcKGdoMjMt99g=s96-c');
INSERT INTO public."User" VALUES ('cmgsdsvff000037g4s0b0zwyl', 'Dede Aris', 'darrellspam14@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/ACg8ocLdBqtd8KtNR5Pf2VDVAFcwbCy2X8l8u1mnRRvOD8Hy5oDTwa_l=s96-c');


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: delvin
--



--
-- Name: Project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: delvin
--

SELECT pg_catalog.setval('public."Project_id_seq"', 3, true);


--
-- Name: Testimonial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: delvin
--

SELECT pg_catalog.setval('public."Testimonial_id_seq"', 1, false);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: delvin
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: delvin
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: delvin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: delvin
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: delvin
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Project Project_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Testimonial Testimonial_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: delvin
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--
