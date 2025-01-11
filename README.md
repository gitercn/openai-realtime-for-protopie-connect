# OpenAI Realtime for ProtoPie Connect

This project is based on a fork of the [OpenAI Realtime Console](https://github.com/openai/openai-realtime-console), originally developed by OpenAI. The initial fork by [bloodlinealpha](https://github.com/bloodlinealpha/openai-realtime-console) replaced Fastify with Express.js to fix issues with paths. This modification enables communication with **ProtoPie Connect** as a bridge app.

### Notes
- **ProtoPie Connect**: Controlling session using `start` or `stop` through ProtoPie Connect. OpenAI's returned outputs are transmitted back to ProtoPie Connect.
- **Audio is Browser-Based**: After starting the application, audio playback requires opening the web page in a browser to capture and play sound.

### Installation and Usage

#### Prerequisites
1. Obtain an OpenAI API key from the [OpenAI dashboard](https://platform.openai.com/settings/api-keys).
2. Install [Node.js](https://nodejs.org/) on your system.

#### Setup
1. Clone this repository and navigate to its root directory.
2. Create a `.env` file and add your API key:
   ```plaintext
   OPENAI_API_KEY=<your-key-here>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application server:
   ```bash
   npm run dev
   ```

#### Access
- Open the application in your browser at [http://localhost:3000](http://localhost:3000).
- Ensure your browser is configured to capture and play sound from the page.

### Limitations
- This version is designed for **local testing only** and does not include deployment configurations or build processes.