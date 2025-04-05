# Gotta Catch Them Balls! 🎯

A social app where users can collect other Worldcoin users, with a fun "gotta catch them balls" theme referencing the Worldcoin iris scanning technology.

## Features

- Worldcoin verification for unique human identity
- Collect other verified Worldcoin users
- View your collection of unique humans
- One-time collection per user
- Modern, responsive UI with fun animations

## Prerequisites

- Node.js 18+ and npm/pnpm
- A Worldcoin developer account
- Worldcoin app credentials (App ID)

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd balls-collector
```

2. Install dependencies:
```bash
cd my-app
pnpm install
```

3. Create a `.env.local` file in the `my-app` directory with your Worldcoin credentials:
```env
NEXT_PUBLIC_WORLDCOIN_APP_ID=your_app_id_here
```

4. Start the development server:
```bash
pnpm dev
```

## How to Use

1. Visit the app and click "Verify Yourself" to start
2. Complete the Worldcoin verification process
3. Once verified, you can start collecting other Worldcoin users
4. View your collection in the "View Collection" page
5. Each user can only be collected once

## Technical Details

- Built with Next.js 14 and TypeScript
- Uses Worldcoin Mini App SDK for verification
- Implements client-side storage for user collections
- Responsive design with Tailwind CSS
- Modern UI with animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Worldcoin for their identity verification technology
- Next.js team for the amazing framework
- All contributors and users of the app

## World ID Verification Setup

This application uses World ID verification via the Worldcoin Mini App. To set it up:

1. Create an account on the [Worldcoin Developer Portal](https://developer.worldcoin.org/)
2. Create a new App in the Developer Portal
3. Create a new "Incognito Action" within your app for the verification
   - Incognito Actions are a primitive of World ID and allow you to gate functionality behind a unique human check
   - You can limit the number of times a user can perform an action
4. Copy your app ID and update the `.env.local` file:
   ```
   NEXT_PUBLIC_WLD_APP_ID="app_YOUR_MINI_APP_ID_HERE"
   NEXT_PUBLIC_WLD_ACTION_ID="tute-claim-action" # Or your custom action ID
   ```
5. Make sure you have the World App installed on your device to test the verification flow

### Implementation Details

The verification flow is triggered when clicking the "Verify to Claim" button, which will:

1. Open the World App for verification
2. Prompt the user to confirm the verification
3. Send the proof to the backend for verification
4. Upon successful verification, allow the user to claim TUTE tokens

#### Event-Based Approach

This implementation uses the event-based approach as recommended in the World ID documentation:

1. We use `MiniKit.commands.verify()` instead of the async version to initiate the verification
2. Event listeners are set up to handle the verification result:
   ```javascript
   document.addEventListener("miniapp-verify-action-success", handleSuccess);
   document.addEventListener("miniapp-verify-action-error", handleError);
   ```
3. When a successful verification event is received, we then verify the proof on the backend

This follows the exact implementation guidelines from the [World ID Verify Command documentation](https://docs.world.org/mini-apps/commands/verify).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about World ID and Mini Apps:

- [World ID Documentation](https://docs.world.org/)
- [Mini Apps Quick Start](https://docs.world.org/mini-apps/quick-start)
- [Verify Command Documentation](https://docs.world.org/mini-apps/commands/verify)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
