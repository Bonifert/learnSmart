<br />
<div align="center">
  <a href="https://github.com/Bonifert/learnSmart">
    <img src="frontend/public/light.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">learnSmart</h3>
<p align="left">
   learnSmart is a full-stack web application designed to help users learn new languages or memorize definitions effectively. Users can register and create personalized learning spaces by creating topics and adding terms with clear definitions. The application utilizes features like flashcards and spaced repetition algorithms to enhance learning and retention. 
</p>
<p align="left">
   Please note that the project is not yet finished. I'm currently working on it.  
</p>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#building-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#author">Author</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project


## Building With

### Frontend:

![React] <br/> ![Mui] <br/> ![TypeScript] <br/>

### Backend: <br/>

![Java] <br/> ![SpringBoot]<br/> ![psql]

<p align="right">(<a href="#about-the-project">back to top</a>)</p>


## Implemented features:

### Backend:

1. User registration
2. Topic and term crud operations
3. User authorization and authentication
4. Repetition algorithm
5. Error messages

### Frontend:

1. Login and register page
2. Context:
   - User context to store data from the user
   - Alert context to give feedback to the user

## In progress:

### Backend:

1. Move authentication endpoints from UserController to authentication controller.

### Frontend:

1. My topics page
2. Edit/create topic page

## Future plans

1. AI integration to allow the application to recommend terms and definitions related to the topic
2. Implement forgetting curve
3. Dockerizing the application

<!-- GETTING STARTED -->

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

## Getting Started

### Installation:

0. Download Node and Maven and add them to the path if you haven't already.
   <br/>(Node: https://nodejs.org/en/download, Maven: https://maven.apache.org/download.cgi) <br/> <br/>
1. Clone the repo
   ```sh
   git clone https://github.com/Bonifert/learnSmart
   ```
2. Navigate to the frontend folder
   ```sh
   cd learnSmart/frontend
   ```
3. Install frontend packages
   ```shell
   npm install
   ```
4. Run the frontend
   ```sh
   vite
   ```
   (if not working, run ```npm install -g vite``` and then ```vite```)


5. Open another terminal, and navigate to the backend folder
   ```shell
   cd learnSmart/backend
   ```
6. Run the backend
   ```shell
   mvn spring-boot:run
   ```

<p align="right">(<a href="#about-the-project">back to top</a>)</p>



<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this application better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (```git checkout -b feature/AmazingFeature```)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#about-the-project">back to top</a>)</p>


<!-- AUTHORS -->

## Author

![Github Pages] <br/> https://github.com/Bonifert <br/> <br/>
![Gmail] <br/> bonifert.andras@gmail.com <br/> <br/>
![LinkedIn] <br/> https://www.linkedin.com/in/andras-bonifert/

<p align="right">(<a href="#about-the-project">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Mui]: https://img.shields.io/badge/MaterialUi-000000?style=for-the-badge&logo=Mui

[TypeScript]: https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=TypeScript

[React]: https://img.shields.io/badge/React-000000?style=for-the-badge&logo=React

[Java]: https://img.shields.io/badge/Java-000000?style=for-the-badge&logo=openjdk

[SpringBoot]: https://img.shields.io/badge/SpringBoot-000000?style=for-the-badge&logo=SpringBoot

[psql]: https://img.shields.io/badge/postgresql-000000?style=for-the-badge&logo=postgresql

[Github Pages]: https://img.shields.io/badge/github-121013?style=for-the-badge&logo=github&logoColor=white

[Gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white

[LinkedIn]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white