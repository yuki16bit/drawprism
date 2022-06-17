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
- Anonymously, no registration needed but still can sign up if you'd like to. ✨
- Here I also provide a test account for you guys.
  - ID: test@user.com
  - Password: Qwert123

### Table of Content

- [Main Features](#main-features)
- [System Architecture](#system-architecture)
- [Backend Tech Stack](#backend-tech-stack)
- [Front-End Tech Stack](#front-end-tech-stack)
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
<div align="left">
  <img src="https://images.plurk.com/5DJ9oeugHyOgPTgaB1bG2C.gif" alt="drawprism-gif"/>
</div
<br />

### System Architecture <a name="system-architecture"></a>

<div align="center">
  <img src="https://images.plurk.com/Gl17kBIGWQFEoZ7Q8Z8Du.png" alt="drawprism-architechure"/>
</div>
<br />

### Backend Tech Stack <a name="backend-tech-stack"></a>

- Docker / docker-compose
- gunicorn
- gevent / gevent-websocket
- Python / Flask
- Flask-SocketIO
- Celery
- MongoDB Atlas
- AWS ElastiCache for Redis
- AWS S3
- AWS CloudFront
- AWS EC2
- JSON Web Token (JWT)
- MVC Design Pattern
- Ubuntu 20.04 (Windows Subsystem for Linux 2)

### Front-End Tech Stack <a name="front-end-tech-stack"></a>

- React.js (Hooks)
- React Router
- Redux Toolkit / RTK Query
- Socket.IO Client
- Html Canvas API
- Tailwind CSS

### Net-working <a name="net-working"></a>

- Nginx (Reverse Proxy / Http & Https support)

### Version Control <a name="version-control"></a>

- Git / Github
- GUI: Fork / Git Kraken

### Contact <a name="contact"></a>

- 📲 Juri
- 📨 sizumasa@hotmail.com
