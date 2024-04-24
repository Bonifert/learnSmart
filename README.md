<br />
<div align="center">
  <a href="https://github.com/Bonifert/learnSmart">
    <img src="frontend/light.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">learnSmart</h3>
</div>

# About The Project

<p>
   learnSmart is a full-stack web application designed to help users learn new languages or memorize definitions effectively with AI. Users can register and create personalized learning spaces by creating topics and adding terms with clear definitions. The user can also create topics with the AI. The application utilizes features like flashcards and spaced repetition algorithms to enhance learning and retention. 
</p>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#building-with">Built With</a></li>
        <li><a href="#implemented-features">Implemented features</a></li>
        <li><a href="#in-progress">In progress</a></li>
        <li><a href="#future-plans">Future plans</a></li>
      </ul>
    </li>
     <li>
       <a href="#getting-started">Getting Started</a>
      <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
     </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#author">Author</a></li>
  </ol>
</details>


## Built With

### Frontend:

![React] <br/> ![Mui] <br/> ![TypeScript] <br/>

#### Smaller libraries:

![ZOD] <br/> ![React-hook-form]


### Backend: <br/>

![Java] <br/> ![SpringBoot]<br/> ![psql] <br/> ![OpenAI]

<p align="right">(<a href="#about-the-project">back to top</a>)</p>

# Getting Started

## Prerequisites

![Docker] <br/>
![OpenAI]
<br/>OpenAI api key

## Installation

0. Install Docker:
    - For Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
    - For macOS: [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - For Linux: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)


1. Clone the repo
   ```shell
   git clone git@github.com:Bonifert/learnSmart.git
   ```
2. Create the .env file:
    - Copy the `envtemplate` file in the repository and modify the values according to your configuration. Rename the file to `.env`.

    
3. Start the application using Docker Compose::
    ```shell
    cd learnSmart
    ```
    ```shell
    docker compose up -d
    ```
   
4. You can access the application: http://localhost/home

<p align="right">(<a href="#about-the-project">back to top</a>)</p>


## Implemented features:

### Backend:

1. User registration
2. Topic and term crud operations
3. User authorization and authentication
4. Repetition algorithm
5. Error messages
6. OpenAI integration, generate topic with AI

### Frontend:

1. Login and register page
2. Context:
   - User context to store data from the user
   - Alert context to give feedback to the user
3. Topics page
4. Topic info page
5. Topic edit page
6. Play topic page
7. AI topic generator page with definitions
8. AI topic generator page with words


## In progress:

### Backend:

1. Move authentication endpoints from UserController to authentication controller.

## Future plans

1. Implement forgetting curve

<!-- GETTING STARTED -->

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

### Bonifert András

[![Github Pages]](https://github.com/Bonifert) 
[![LinkedIn]](https://www.linkedin.com/in/andras-bonifert/) 
[![Gmail]](mailto:bonifert.andras@gmail.com) <br/> <br/>

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

[Docker]: https://img.shields.io/badge/docker-121013?style=for-the-badge&logo=docker

[OpenAI]: https://img.shields.io/badge/OpenAI-000000?style=for-the-badge&logo=openai

[ZOD]: https://img.shields.io/badge/zod-000000?style=for-the-badge&logo=zod

[React-hook-form]: https://img.shields.io/badge/react%20hook%20form-000000?style=for-the-badge&logo=react-hook-form