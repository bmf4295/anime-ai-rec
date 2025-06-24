import { ChatOpenAI } from "@langchain/openai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { z } from "zod";


const client = new ChatOpenAI({
    apiKey: import.meta.env.VITE_OpenAIKey,
    dangerouslyAllowBrowser: true,
    model: "gpt-4o",
    temperature: 0.2
});



let recommendations = [];
const getAIRecommendation = async (FavoriteAnimeTitle) => {
    // Define the schema for the response
    const responseSchema = z.array(z.string()).describe("An array of recommended anime titles");

    const prompt = [
        new SystemMessage({
            content: "You are an expert anime recommender. Every time you will suggest exactly 6 anime based on the favorite anime that is given by the user. Give a good mix of popular and less well known anime, and do not recommend another season of the same show if it exists. If you receive the same query more than once from the same user, please try and recommend at least 1 thing different from the last request. Please provide ONLY the English titles of 6 anime as a JSON array of strings, and nothing else."
        }),
        new HumanMessage({
            content: `My favorite Anime is ${FavoriteAnimeTitle}. Can you recommend some similar anime that I might like?`
        })

    ];

    const response = await client.call(prompt);

    const output = response.content;
    try {
        const parsed = JSON.parse(output);
        recommendations = responseSchema.parse(parsed);
    } catch (e) {
        //recommend null if there is an error, so that we get an error when querying the API
        recommendations = null;
    }
    return recommendations;
};

export default getAIRecommendation;
