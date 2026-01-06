import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';

// Manual .env parser since we don't want to install dotenv just for this test
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = {};

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envConfig[key.trim()] = value.trim();
    }
  });
}

const appKey = envConfig['X_API_KEY'];
const appSecret = envConfig['X_API_KEY_SECRET'];
const accessToken = envConfig['X_ACCESS_TOKEN'];
const accessSecret = envConfig['X_ACCESS_TOKEN_SECRET'];

if (!appKey || !appSecret || !accessToken || !accessSecret) {
  console.error('Missing keys in .env');
  process.exit(1);
}

const client = new TwitterApi({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});

async function testTweet() {
  try {
    const date = new Date().toLocaleString('ja-JP');
    const response = await client.v2.tweet(`AI News Dashboard API Verification Test\nTimestamp: ${date}\n✅ System Online`);
    console.log('Successfully tweeted:', response);
  } catch (e) {
    console.error('Failed to tweet:', e);
  }
}

testTweet();
