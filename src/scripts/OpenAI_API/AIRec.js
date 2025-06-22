import {OpenAI} from "openai";
import AnimeSearch from "../AniChartAPI/AnimeSearch";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OpenAIKey,
    dangerouslyAllowBrowser: true
});
let recommendations = [];
let RecommendedAnimeInfo;
const getAIRecommendation = async (FavoriteAnimeTitle) => {

    const response = await client.responses.create({
        model: "gpt-4o",
        instructions: "You are an expert anime recommender. You can ONLY suggest 5 anime based on the favorite anime that is given by the user. Give a good mix of popular and less well known anime. Please provide ONLY the english titles of 5 anime in an comma seperated list, without any other text.",
        input:`My favorite Anime is "${FavoriteAnimeTitle}". Can you recommend some similar anime that I might like?`,
   
    });
   recommendations = response.output_text.split(',').map(title => title.trim());
   RecommendedAnimeInfo = await AnimeSearch(recommendations);
};

export default getAIRecommendation;
