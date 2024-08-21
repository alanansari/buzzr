![Banner](https://socialify.git.ci/alanansari/buzzr/image?language=1&name=1&theme=Light)

# BUZZR

**Check the Website [here](https://buzzr-one.vercel.app/)**.

**Check the websocket server repository [here](https://github.com/alanansari/buzzr-server)**.

## TABLE OF CONTENTS

- [Launch Video](#Launch-Video)
- [About the project](#About-the-project)
- [Tech Stack Used](#Tech-Stack-Used)
- [Key Features ✨](#Key-Features-✨)
- [Running the project](#Running-the-Project)

# Launch Video

[![LAUNCH VIDEO HERE](https://img.youtube.com/vi/914g3rvEXOc/0.jpg)](https://www.youtube.com/watch?v=914g3rvEXOc)

# About the project

Welcome to Buzzr, where learning meets excitement! Join live quiz battles, create personalized challenges, and connect with peers in real-time. Buzzr offers an engaging learning experience for users of all levels. Create an account, customize your profile, and dive into the world of quizzes today. Get ready to buzz with excitement on Buzzr!

# Tech Stack Used

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# Key Features ✨

- **User Authentication:** Secure Google OAuth Sign In system using Next-Auth.

- **Quiz Creation:** Create new buzzrs(quizzes) and add questions to it.

- **Create Quiz by AI:** Powered by Gemini, this feature lets you create a whole quiz and all its question via a prompt.

- **Host a Buzzr:** Host a new Game Session for the quiz.

- **Real-time Updates:** Get Realtime player and presenter interations.

- **Player Management:** Manage players in a game through presenter, system to kick unwanted players.

- **Leaderboard:** See the leaderboard after each question round.

# Running the Project

1. Clone the repository:

```CMD
git clone https://github.com/alanansari/buzzr.git
```

To run the server, you need to have NodeJS installed on your machine. If you don't have it installed, you can follow the instructions [here](https://nodejs.org/en//) to install it.

2. Install the dependencies:

```CMD
npm install
```

4. Setup .env file in base directory:

```
NEXTAUTH_URL = "http://localhost:3000"
NEXTAUTH_SECRET = "<random_string>"

GOOGLE_CLIENT_ID = ""
GOOGLE_CLIENT_SECRET = ""

DATABASE_URL="<supabase_db_uri>"
DIRECT_URL="<supabase_direct_uri>"

UPSTASH_REDIS_URL=""
UPSTASH_REDIS_TOKEN=""

NEXT_PUBLIC_SOCKET_URL="<websocket_server_url>"

RATELIMIT="<ON/OFF>"
```

5. Connect to the Server for websockets:

   - Go through this: https://github.com/alanansari/buzzr-server
   - Add the NEXT_PUBLIC_SOCKET_URL=http://localhost:[PORT]
   - PORT is where the socket server is running

6. Run on localhost:

```CMD
npm run dev
```

You can access the endpoints from your web browser following this url

```url
http://localhost:3000
```
