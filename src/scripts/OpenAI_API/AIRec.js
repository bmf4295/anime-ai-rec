import {OpenAI} from "openai";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OpenAIKey,
    dangerouslyAllowBrowser: true
});
let recommendations = [];
const getAIRecommendation = async (FavoriteAnimeTitle) => {

    const response = await client.responses.create({
        model: "gpt-4o",
        instructions: "You are an expert anime recommender. You will suggest exactly 6 anime based on the favorite anime that is given by the user. Give a good mix of popular and less well known anime, and do not recommend another season of the same show if it exists. If you recieve the same query more than once from the same user, please try and recommend at least 1 thing different from the last request. Please provide ONLY the english titles of 5 anime in an comma seperated list, without any other text.",
        input:`My favorite Anime is "${FavoriteAnimeTitle}". Can you recommend some similar anime that I might like?`,
    });
   recommendations = response.output_text.split(',').map(title => title.trim());
   return recommendations;
};

export default getAIRecommendation;
