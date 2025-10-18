````markdown
# Darrell Valentino's Portfolio CMS

![Project Screenshot Placeholder](YOUR_SCREENSHOT_URL_HERE) A personal portfolio application built with the modern T3 Stack, featuring CMS capabilities to manage projects, work experience, and testimonials. Includes authentication, admin roles, and a responsive design.

---

## Table of Contents

* [About The Project](#about-the-project)
    * [Key Features](#key-features)
    * [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Usage](#usage)
    * [Running the Application](#running-the-application)
    * [Database Setup](#database-setup)
    * [Environment Variables](#environment-variables)
* [Admin Features](#admin-features)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## About The Project

This Portfolio CMS is a full-stack web application designed to showcase Darrell Valentino's professional portfolio. It serves not only as a showcase but also as a simple content management system (CMS), allowing the admin (Darrell) to manage projects, work experience, and testimonial data directly from the web interface.

### Key Features ✨

* **Dynamic Portfolio Display:** Features sections for About Me, Work Experience, Projects, and Testimonials with data fetched from the database.
* **Content Management (CMS):**
    * **Projects:** Admin can perform CRUD (Create, Read, Update, Delete) operations for project data, including title, description, image URL, and tags. Uses infinite scrolling to load more projects.
    * **Work Experience:** Admin can perform CRUD operations for work experience data, including position, company, date range, description, and logo URL.
    * **Testimonials:** Logged-in users can submit testimonials. Admin has a dedicated dashboard (`/admin/testimonials`) to view, approve, or delete incoming testimonials. Approved testimonials appear on the main page.
* **User Authentication:** Uses NextAuth.js with the Google Provider for user login.
* **Admin Role:** Special access for the admin (based on configured email) to manage content.
* **Responsive Design:** Built with Tailwind CSS and shadcn/ui for optimal viewing on various devices.
* **Dark/Light Mode:** Theme toggle for changing the appearance.
* **Smooth Animations:** Utilizes Framer Motion for engaging interface animations.
* **Optimizations:**
    * **Server Components & Caching:** Leverages React Server Components and Next.js Caching (`unstable_cache`, `revalidateTag`) for optimal performance.
    * **Lazy Loading:** Components are lazy-loaded to improve initial load times.
* **Floating Socials & Navigation:** Floating buttons for quick access to social media, page navigation (top/bottom), dark mode, and sharing.

---

### Built With 🛠️

* **Framework:** [Next.js](https://nextjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **ORM:** [Prisma](https://prisma.io) with [Accelerate](https://www.prisma.io/accelerate)
* **Database:** [PostgreSQL](https://www.postgresql.org/)
* **API:** [tRPC](https://trpc.io/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **State Management (Client):** [React Query (via tRPC)](https://tanstack.com/query/latest)
* **Form Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **UI Components:** [Lucide React](https://lucide.dev/) (Icons), [Sonner](https://sonner.emilkowal.ski/) (Notifications)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Node.js:** Version 18.18.0 or higher.
* **npm:** (Usually installed with Node.js). Version 10.9.0 or as specified in `package.json`.
* **Docker or Podman:** (Optional, for easily running a local PostgreSQL database using the provided script).
* **Google Cloud Account:** Required for Google Authentication (Client ID & Client Secret).

### Installation

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/darrellv14/portfolio-cms.git](https://github.com/darrellv14/portfolio-cms.git)
    cd portfolio-cms
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    ```
    This command will also automatically run `prisma generate` post-installation.

3.  **Set up Environment Variables:**
    * Copy the `.env.example` file to `.env`:
        ```bash
        cp .env.example .env
        ```
    * Fill in the required environment variables in the `.env` file (see [Environment Variables](#environment-variables) section).

4.  **Database Setup:**
    * **Option 1: Using Docker Script (Recommended):**
        * Ensure Docker or Podman is running.
        * Run the script to create and start the PostgreSQL database container:
            ```bash
            chmod +x ./start-database.sh
            ./start-database.sh
            ```
            This script reads the `DATABASE_URL` from your `.env` and sets up the database.
    * **Option 2: Manual Setup:**
        * Set up your own PostgreSQL instance.
        * Ensure the `DATABASE_URL` in `.env` points to your database instance.

5.  **Run Prisma Migrations:**
    This command will create the database tables according to the Prisma schema:
    ```bash
    npx prisma migrate dev
    ```
    *Note:* If you are starting fresh and want to use the sample data from `backup-inserts.sql`, you might need to run those SQL commands manually on your database *after* running the migration.

---

## Usage

### Running the Application

To run the app in development mode:

```bash
npm run dev
````

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (or another port if 3000 is occupied) in your browser.

### Database Setup

  * **Schema:** Defined in `prisma/schema.prisma`. Models include `Project`, `Tag`, `Testimonial`, `Experience`, and standard NextAuth.js models (`Account`, `Session`, `User`, `VerificationToken`).

  * **Migrations:** Use Prisma Migrate to manage database schema changes:

      * Create a new migration: `npx prisma migrate dev --name <migration_name>`
      * Apply migrations in production: `npx prisma migrate deploy`

  * **Prisma Studio:** A GUI tool to view and edit data in your database:

    ```bash
    npx prisma studio
    ```

  * **Seeding/Sample Data:** The `backup-inserts.sql` file contains sample SQL INSERT statements that can be used to populate the initial database.

### Environment Variables

The following environment variables need to be set in your `.env` file:

  * `DATABASE_URL`: Connection URL for your PostgreSQL database. Example: `postgresql://postgres:password@localhost:5432/portfolio-cms`.
  * `DIRECT_URL`: (Optional, for Prisma Accelerate/Pulse) Direct connection URL if different from `DATABASE_URL`.
  * `AUTH_SECRET`: A secret key for NextAuth.js. Generate one using `npx auth secret`.
  * `AUTH_GOOGLE_ID`: Client ID from Google Cloud Console for OAuth.
  * `AUTH_GOOGLE_SECRET`: Client Secret from Google Cloud Console for OAuth.
  * `ADMIN_EMAIL`: The email address that will have admin privileges.
  * `NEXT_PUBLIC_ADMIN_EMAIL`: The same admin email, but accessible on the client-side (for conditional UI rendering).

Ensure the validation schema in `src/env.js` is updated if you add new environment variables.

-----

## Admin Features

Users whose email matches the `ADMIN_EMAIL` will gain access to admin features:

  * **Add/Edit/Delete Buttons:** Appear on Project and Experience cards on the main page.
  * **Testimonial Dashboard:** The `/admin/testimonials` page displays pending testimonials with options to Approve or Delete.

-----

## Deployment

This application can be deployed to platforms like Vercel or Netlify.

  * **Build Configuration:** Ensure environment variables (especially non-`NEXT_PUBLIC_` ones) are correctly set in your hosting platform's settings.
  * **Database:** Use a hosted PostgreSQL database (e.g., Supabase, Neon, Railway, Aiven). Update `DATABASE_URL` accordingly.
  * **Migrations:** Run the `npx prisma migrate deploy` command as part of your build process or after the initial deployment.
  * **NextAuth.js:** Configure the `AUTH_SECRET` and ensure the Google OAuth callback URLs in the Google Cloud Console match your deployment URL.

-----

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star\! Thanks again\!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

## License

Distributed under the MIT License. See `LICENSE` for more information (assuming MIT license as it's common for T3 projects, but a LICENSE file was not provided in the list).

-----

## Contact

Darrell Valentino - [@darrellv14](https://github.com/darrellv14) - Project Link: [https://github.com/darrellv14/portfolio-cms](https://www.google.com/search?q=https://github.com/darrellv14/portfolio-cms) ---

```
```
