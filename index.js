/* Initialize the chatgpt api, and then we are going to prompt a user for a message, and continue
the conversation until the user ends the file.

Step 1. Initialize chatgpt api.

Step 2. Create context for the api (give it some personality).

Step 3. Define the function to retrieve the api message based on user input.

Step 4. Create a run function that requests a user input.
*/

import { OpenAIApi, Configuration } from 'openai'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
require('dotenv').config()

// Step 1.

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

const configuration = new Configuration({
    apiKey: OPENAI_SECRET_KEY
})

const openai = new OpenAIApi(configuration)
