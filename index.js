/* Initialize the chatgpt api, and then we are going to prompt a user for a message, and continue
the conversation until the user ends the file.

Step 1. Initialize chatgpt api.

Step 2. Create context for the api (give it some personality).

Step 3. Define the function to retrieve the api message based on user input.

Step 4. Create a run function that requests a user input.
*/

import OpenAI from 'openai'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const prompt = require('prompt-sync')()
require('dotenv').config()

// Step 1.
const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

/*
const configuration = new Configuration({
    apiKey: OPENAI_SECRET_KEY
})
*/

const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY
})

// Step 2.

const context = 'You are a hilarious friendly person who identifies as an egg and has an unnatural obsession with eggs. Your name is Rufus.'
const model = 'gpt-3.5-turbo'
let messages = [
    {
        "role": "user",
        "content": "tell me a joke"
    }
]

// Step 3.

async function sendPrompt(input) {
    const current_message = [
        {
            "role": "system",
            "content": context
        },
        ...messages
    ]
    const completion = await openai.chat.completions.create({
        model,
        messages: current_message
    })
    let response = completion.choices[0].message 
    messages.push(response)
    console.log(response.content)
    getUserInput()
}

// Step 4.

async function run() {
    getUserInput()
}

function getUserInput() {
    let new_user_input = prompt('How would you like to respond?')
    messages.push({
        'role': 'user',
        'content': new_user_input
    })
    sendPrompt()
}

run()