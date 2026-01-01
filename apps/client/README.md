# Bookora

Bookora is a full-stack web application that provides a platform for authors to write, organize, and manage their books. It offers a clean, intuitive interface with a rich text editor and features designed to streamline the book writing process.

[![Live Demo](https://bookora.vercel.app)]
[![GitHub issues](https://img.shields.io/github/issues/ehmasuk/bookora-client)](https://github.com/ehmasuk/bookora-client/issues)
[![GitHub forks](https://img.shields.io/github/forks/ehmasuk/bookora-client)](https://github.com/ehmasuk/bookora-client/network)
[![GitHub stars](https://img.shields.io/github/stars/ehmasuk/bookora-client)](https://github.com/ehmasuk/bookora-client/stargazers)


## Features

- **Authentication:** Secure user registration and login.
- **Book Management:** Create, edit, and delete books.
- **Chapter Organization:** Add, reorder, and manage chapters within a book.
- **Rich Text Editor:** A powerful and intuitive editor for writing content.
- **Drag and Drop:** Easily reorder chapters with a drag-and-drop interface.
- **Internationalization (i18n):** Support for multiple languages.
- **Dark Mode:** A comfortable reading and writing experience in low-light environments.
- **Responsive Design:** A seamless experience across all devices.

## Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components.
- [Tiptap](https://tiptap.dev/) - A headless, framework-agnostic rich text editor.
- [SWR](https://swr.vercel.app/) - React Hooks for data fetching.
- [Framer Motion](https://www.framer.com/motion/) - A production-ready motion library for React.
- [Next-Intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js.

**Backend:**

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For serverless API endpoints.
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ehmasuk/bookora-client.git
    cd YOUR_REPOSITORY/client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the `client` directory and add the necessary environment variables. You can use `example.env` as a template.

    ```bash
    cp example.env .env.local
    ```

    Update the values in `.env.local` with your own.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production to the `.next` folder.
-   `npm run start`: Starts a Next.js production server.
-   `npm run lint`: Runs ESLint to find and fix problems in your code.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m '''Add some AmazingFeature'''`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

*This README was generated with the help of Gemini.*