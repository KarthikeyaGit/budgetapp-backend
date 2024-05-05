require('dotenv').config()


const API_KEY = process.env.API_KEY;
const MODEL_NAME =  process.env.MODEL_NAME;

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai"); const genAI = new GoogleGenerativeAI(API_KEY);

systemInstruction = "You are an AI specialized in transaction detection. You receive SMS messages with transaction info and extract key details to output in JSON format. Ensure proper date formatting. The JSON should include: merchant_name, amount, account_number, transaction_id, transaction_type, transaction_time, bank, and an additional field called 'data' containing all the other possible attributes. If the input SMS is not related to transactions, return null."

const model = genAI.getGenerativeModel({ model: MODEL_NAME, systemInstruction: systemInstruction });

const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: "BLOCK_NONE",
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: "BLOCK_NONE",
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: "BLOCK_NONE",
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: "BLOCK_NONE",
    },
];


exports.extractTransactionInfo  =  async (req, res) => {
    let input = req.body.input
    try {
        // Start a chat session
        const chat = model.startChat({
            generationConfig,
            safetySettings
        });

        // Send input message to the chat session
        // const input = "Dear UPI user A/C X1311 debited by 270.0 on date 02May24 trf to PONNALA SATHISH Refno 448992130363. If not u? call 1800111109. -SBI";
        const result = await chat.sendMessage(input);
        const response = result.response;
        const text = response.text();
        console.log("text:", text);

        // Extract JSON data from the response text
        const regex = /```json([\s\S]*)```/;
        const match = text.match(regex);
        
        if (match && match[1]) {
            const jsonData = match[1].trim();
            console.log("jsonData:", jsonData);

            // Parse JSON data
            const parsedData = JSON.parse(jsonData);
            console.log("parsedData:", parsedData);

            // Return the parsed data as JSON response
            res.json(parsedData);
        } else {
            console.error("No JSON data found in the response.");
            res.status(500).json({ error: "No JSON data found in the response" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

