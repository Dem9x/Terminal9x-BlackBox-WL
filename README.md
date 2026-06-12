# Terminal9X Blackbox Passport

Full-stack Terminal9X identity app with a cinematic Blackbox Division whitelist registration flow, agent passport preview, and MongoDB-backed authentication.

## What changed in this build

- Rebranded public UI from Cold Inbox-first to **Terminal9X // Blackbox Division**.
- Added `/whitelist` route as an alias for the upgraded registration flow.
- Rebuilt Register UI into a cinematic **Join T9X Whitelist** page.
- Added division selector, referral/invite code field, readiness meter, password strength meter, and unrevealed agent preview.
- Registration now reserves a whitelist passport slot in the backend.
- Added public assets:
  - `client/public/agents/unrevealed-agent.png`
  - `client/public/brand/t9x-blackbox-logo.png`
- Added Vite env typings so the client build passes.

## Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, React Router, Axios, Zustand
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt

## Setup

```bash
npm install
npm run install:all
cp server/.env.example server/.env
npm run dev
```

Client: http://localhost:5173  
Server: http://localhost:5000

MongoDB local default:

```txt
mongodb://127.0.0.1:27017/cold_inbox
```

For Atlas, set this in `server/.env`:

```txt
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/terminal9x_blackbox?retryWrites=true&w=majority
JWT_SECRET=change_me_to_a_long_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

## Routes

- `/` landing
- `/whitelist` upgraded whitelist registration
- `/register` same registration component
- `/login`
- `/dashboard`
- `/passport`

## API

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/passport/me`
- PUT `/api/passport/me`
- POST `/api/passport/mark-minted`

## Web3-ready passport fields

The passport model stores:

- `freeMintEligible`
- `whitelistStatus`
- `whitelistCode`
- `referralCode`
- `whitelistJoinedAt`
- `passportMinted`
- `passportTokenId`
- `passportTxHash`
- `walletAddress`
- `mintedAt`

Mint logic is still placeholder-ready for your contract wiring.
