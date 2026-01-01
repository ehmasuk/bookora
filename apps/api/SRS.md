**Requirements analysis :**

This tool helps user to write books.User can login and register. User can create multiple books share and export also. Every book have a summary . Every book have multiple chapters. Every chapters have multiple sections. Every chapter have a summary. After finish the book, user can export the book. user can update a book cover. Also user can make the book status public/private. Any user can view the public books. When writing the book , everything should autosave

Procedure of book creating:

1. Create a blank book with title only
2. Create a book with AI

**Create a blank book with title only:**

Form with book title, and create a blank book

**Create a book with AI:**

Form with book category, genere, age etc. , then generate a book chapters with summary each, user can sort , delete and edit chapters and then generate sections for each chapters. user can also rename and sort sections and delete also, there will be regenerate option and then user can create a book with that informations.

**Software Requirement Specification (SRS):**

**Introduction:**

We have to create a modern book writing tool named bookora. In this tool user can write his book and can share and export

**Stack holders :**

- Any user with valid email can register
- Registered user can create books
- Everything is free to use for all users

**Functional requirements:**

Authentication:

- User can register with a valid email address
- User should verify his email to create a book
- User should be logged in to create a book
- User can reset his password

Book creation methods:

- Every book have a summary
- Every book can have multiple chapters with summary for each
- Every book can have multiple sections under chapters
- Blank book creation with book title
  - User can create a book with it’s title and redirect to the book creator
  - In book creator user can create multiple chapters for the book
  - User can sort chapters and edit titles
  - Each chapter have a summary
  - User have to create sections in every chapter where they can write. Basically user can write in a section and section comes inside the chapters
  - User can sort sections and edit titles
  - User can delete chapters and sections
- AI based book creation
  ![ai based book.png](attachment:d70f3fd0-edc2-4ce4-a4a8-b533e2941383:ai_based_book.png)
  - User can give prompt and other information and generate chaters with summary in each chapters
  - User can generate sections
  - User can regenerate if do not like the text
  - User can sort chapters
  - User can sort sections
  - User can edit summary , titles

Export :

- User can export his book in pdf , docx format

Share :

- User can share his book with making the status of book to public
- Any user can view the book with public status

Book cover:

- User can upload cover of the book

**Non-functional requirements:**

- User flow must be smooth and easy
- Loading speed must be fast
- Everything should auto save
- User email must be varified
- User data and profile must be delete able
- chatpers and sections should load only when it is under use

**Constarins:**

- 1 email = 1 account
- mutiple accounts not allowed
- chapter and section title cannot be same
- Without verify the email, user cannot create book

**Possible entities :**

- user
  - id - string
  - email - string
  - password - string
  - bookIds - array
  - status - enum [blocked, unverified, verified]
  - timestamp
- book
  - id - string
  - title - string
  - authorId - string
  - status - enum [public, private]
  - cover - string
  - summary - string
  - chapterIds - array
  - timestamp
- chapter
  - id - string
  - title - string
  - bookId - string
  - summary - string
  - sectionIds - array
  - timestamp
- section
  - id - string
  - title - string
  - chapterId - string
  - timestamp

**ER diagram :**

![er-diagram.png](attachment:9f3d69c1-a5ef-4a1c-9b10-3bf258c71330:er-diagram.png)

**API Endpoints:**

Base url : api-doamin/api

Auth :

- POST - /auth/register - create new user - public

  ```json
  Request body = {name,email,password}

  Success response = {
  	 code: 201,
  	 message: user created successfully,
  	 data: {
  		 name, email, token
  	 }
  }

  Error response = {code,message}
  ```

- POST - /auth/login - login user - public

  ```json
  Request body = {email,password}

  Success response = {
  	 code: 200,
  	 message: login successfully,
  	 data: {
  		 name, email, token
  	 }
  }

  Error response = {code,message}
  ```

User :

- GET - /user/:id - get a single user - private (auth)

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: { name,email,books,status }
  }

  Error response = {code,message}
  ```

- GET - /user/:id/book - get all books of an user - private(auth)

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: [
  		 { ...book },
  		 { ...book }
     ]
  }

  Error response = {code,message}
  ```

- GET - /user/:id/draft_book - get all draft books of a user - private(auth)

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: [
  		 { ...draft_book },
  		 { ...draft_book }
     ]
  }

  Error response = {code,message}
  ```

Book :

- GET - /book - get all books - public

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: [
  		 { ...book },
  		 { ...book }
     ]
  }

  Error response = {code,message}
  ```

- POST - /book - create new book - private (authenticated)

  ```json
  Request body = {
  	title
  }
  Success response = {
  	 code: 201,
  	 message: book created successfully,
  	 data: { ...book }
  }

  Error response = {code,message}
  ```

- GET - /book/:id - get single book with bookId - public

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: { ...book }

  }

  Error response = {code,message}
  ```

- GET - /book/:id/chapter - get chapters of a book - public

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: [ {...chapter}, {...chapter} ]
  }

  Error response = {code,message}
  ```

- DELETE - /book/:id - delete a book with id - private (auth+ owner)

  ```json
  Success response = {
  	 code: 200,
  	 message: book deleted successfully,
  }

  Error response = {code,message}
  ```

- PATCH - /book/:id - update book information - private (auth + owner)

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: { ...updated_book }
  }

  Error response = {code,message}
  ```

Chapter :

- GET - /chapter/:id - get single chapter with chapterId - public

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: { ...chapter }
  }

  Error response = {code,message}
  ```

- POST - /chapter - create new chapter - private (authenticated)

  ```json
  Success response = {
  	 code: 201,
  	 message: Chapter created successfully,
  	 data: { ...new_chapter }
  }

  Error response = {code,message}
  ```

- DELETE- /chapter/:id - delete a chapter - private (authenticated)

  ```json
  Success response = {
  	 code: 200,
  	 message: Chapter deleted,
  }

  Error response = {code,message}
  ```

- PATCH - /chapter/:id - update capter information - private (auth+owner)

  ```json
  Success response = {
  	 code: 200,
  	 message: chapter updated,
  	 data: { ...updated_chapter }
  }

  Error response = {code,message}
  ```

- GET - /chapter/:id/section - get all sections of a chapter - private (auth+owner)

  ```json
  Success response = {
  	 code: 200,
  	 message: success,
  	 data: [ { ...section },{ ...section },{ ...section } ]
  }

  Error response = {code,message}
  ```

Section :

- GET - /section/:id - get single section with sectionId - public
- POST - /section - create new section - private (authenticated)
- DELETE - /section/:id - delete a section - private (authenticated)
- PATCH - /section/:id - update section - private (auth+owner)





## Pendings:
- Setup file logger
- Realtime collaboration
- AI endpoints for book generation
- Docarization