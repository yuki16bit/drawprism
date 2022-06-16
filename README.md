## DrawPrism

<div align="center">
  <img src="https://images.plurk.com/1F7pzR5n1FL2rDYfYm6qCH.png" alt="drawprism-logo"/>
</div>
<br />
<div align="center">
  DrawPrism, a real-time online collaborative paint chat website.
</div>
<br />

### Live Demo

- Home page: https://www.drawprism.space/
- Anonymously, no need to register, but you still can register as a member if you'd like to ✨
- Here I also provide a test account for you guys.
  - ID: test@user.com
  - Password: Qwert123

### Table of Content

- [Main Features](#main-features)
- [System Architecture](#system-architecture)
- [Backend Tech Stack](#backend-tech-stack)
  - [Deployment](#deployment)
  - [Environment](#environment)
  - [Database](#database)
  - [AWS Cloud Service (AWS)](#aws)
  - [Authentication](#authentication)
  - [Design Pattern](#design-pattern)
- [Front-End Tech Stack](#front-end-tech-stack)
  - [JavaScript](#javascript)
  - [CSS](#css)
  - [AJAX](#ajax)
- [Net-working](#net-working)
- [Version Control](#version-control)
- [Contact](#contact)

### Main Features <a name="main-features"></a>

#### ✨ Create a free paint chat room in a second!

- After create the room, system will give you an url to invite your friends in,
  <br />then you can drawing and chatting together, asynchronously!
- Communication between client-side and server-side is handled through Socket.IO.

<div align="center">
  <img src="https://images.plurk.com/2Hj504MVQaoTw15gCUEhn8.gif" alt="drawprism-gif"/>
</div>

#### ✨ Pen Pressure Sensitive

- If you draw by tablet, I have built-in support for pressure sensitivity!
<div align="center">
  <img src="https://images.plurk.com/5DJ9oeugHyOgPTgaB1bG2C.gif" alt="drawprism-gif"/>
</div

### System Architecture <a name="system-architecture"></a>

<div align="center">
  <img src="https://images.plurk.com/7FcdiLUj3MjNzgrt6oGhps.png" alt="drawprism-architechure"/>
</div>
<br />

### Backend Tech Stack <a name="backend-tech-stack"></a>

#### Deployment <a name="deployment"></a>

- Docker / docker-compose
- gunicorn
- gevent / gevent-websocket

#### Environment <a name="environment"></a>

- Python / Flask
- Flask-SocketIO
- Celery
- Ubuntu 20.04 (Windows Subsystem for Linux 2)

#### Database <a name="database"></a>

- MongoDB Atlas
- Redis Enterprise Cloud

#### AWS Cloud Service (AWS) <a name="aws"></a>

- S3
- CloudFront
- EC2

#### Authentication <a name="authentication"></a>

- JSON Web Token (JWT)

#### Design Pattern <a name="design-pattern"></a>

- MVC

### Front-End Tech Stack <a name="front-end-tech-stack"></a>

#### JavaScript <a name="javascript"></a>

- React.js (Hooks)
- React Router
- Redux Toolkit
- Socket.IO Client
- Canvas API

#### CSS <a name="css"></a>

- Tailwind CSS

#### AJAX <a name="ajax"></a>

- Redux Toolkit Query

### Net-working <a name="net-working"></a>

#### Nginx

- Http & Https support

### Version Control <a name="version-control"></a>

#### Git / Github

- GUI: Fork / Git Kraken

### Contact <a name="contact"></a>

- 📲 Juri
- 📨 sizumasa@hotmail.com
