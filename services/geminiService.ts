import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse, GenerateContentParameters } from "@google/genai";
import type { Pillar, BrandVoice, BrandVoiceAnalysis, ContentType, Post, VisualHarmonyAnalysis, VoiceConsistencyAnalysis, PerformancePrediction, GroundingCitation, AspectRatio, BrandDiscoveryResult } from "../types";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  // A placeholder check as we assume the key is set in the environment.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const PILLAR_COLORS = ['bg-sky-200', 'bg-lime-200', 'bg-amber-200', 'bg-violet-200', 'bg-rose-200'];


export const discoverBrandFromUrl = async (niche: string, url: string): Promise<BrandDiscoveryResult> => {
    try {
        const prompt = `
        You are a world-class brand strategist AI. Your task is to analyze a brand based on its website URL and niche to pre-configure a content planner.

        **Brand Niche:** "${niche}"
        **Website URL:** "${url}"

        **Instructions:**
        Analyze the content from the provided URL using Google Search grounding to understand the brand's identity. Based on this analysis, generate the following:
        
        1.  **Niche Refinement:** A concise, refined niche statement for the brand.
        2.  **Content Pillars:** 5 relevant content pillar suggestions. For each pillar, provide a short name, a single relevant emoji, and pick a color from this list: ${PILLAR_COLORS.join(', ')}.
        3.  **Brand Voice Analysis:**
            *   A brief, encouraging summary (2-3 sentences) of the brand's voice.
            *   Numerical scores on three scales from -1.0 to 1.0:
                *   "formality": -1.0 for very casual, 1.0 for very formal.
                *   "humor": -1.0 for very serious, 1.0 for very humorous.
                *   "tone": -1.0 for very direct, 1.0 for very poetic/inspirational.

        **Output Format:**
        Return ONLY a single valid JSON object with the keys "niche", "pillars", and "voiceAnalysis".
        The "pillars" key should be an array of objects.
        The "voiceAnalysis" key should be an object.

        Example:
        {
          "niche": "Specialty eco-friendly coffee for discerning amateurs.",
          "pillars": [
            { "name": " brewing Tips", "emoji": "💡", "color": "bg-sky-200" },
            { "name": "Bean Origins", "emoji": "🌍", "color": "bg-lime-200" }
          ],
          "voiceAnalysis": {
            "summary": "The voice is knowledgeable yet approachable, focusing on quality and sustainability. It's passionate and aims to educate.",
            "formality": 0.3,
            "humor": 0.1,
            "tone": 0.5
          }
        }
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            }
        });

        const text = response.text.trim();
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        const discoveryResult = JSON.parse(jsonString);
        
        if (discoveryResult.niche && Array.isArray(discoveryResult.pillars) && discoveryResult.voiceAnalysis) {
            return discoveryResult;
        }
        throw new Error("Invalid format for brand discovery");

    } catch (error) {
        console.error("Error discovering brand from URL:", error);
         // Fallback in case of error
        return {
            niche: niche || "Your Awesome Niche",
            pillars: [
                { name: 'Educational', emoji: '💡', color: 'bg-sky-200' },
                { name: 'Inspirational', emoji: '✨', color: 'bg-amber-200' },
                { name: 'Community', emoji: '💬', color: 'bg-lime-200' },
                { name: 'Behind the Scenes', emoji: '🎬', color: 'bg-violet-200' },
                { name: 'Promotion', emoji: '🚀', color: 'bg-rose-200' },
            ],
            voiceAnalysis: {
                summary: "Could not analyze the URL, but here's a balanced starting point! Adjust the sliders to match your style.",
                formality: 0.0,
                humor: 0.0,
                tone: 0.0,
            }
        };
    }
};

const getVoiceDescription = (voice: BrandVoice): string => {
    let description = 'The brand voice is ';
    description += voice.formality < -0.3 ? 'casual and friendly' : voice.formality > 0.3 ? 'formal and professional' : 'neutral';
    description += ', ';
    description += voice.humor < -0.3 ? 'serious and straightforward' : voice.humor > 0.3 ? 'witty and humorous' : 'generally neutral in humor';
    description += ', and ';
    description += voice.tone < -0.3 ? 'direct and to-the-point' : voice.tone > 0.3 ? 'poetic and inspirational' : 'balanced in tone';
    description += '.';
    return description;
}

export const generateCaptions = async (topic: string, niche: string, voice: BrandVoice, useGoogleSearch: boolean = false): Promise<{captions: {caption: string, justification: string}[], citations: GroundingCitation[]}> => {
  try {
    const voiceDescription = getVoiceDescription(voice);
    let prompt = `You are an expert social media strategist embodying a specific brand voice.
    Your task is to generate 3 distinct and engaging Instagram captions.

    **Brand Voice Profile:**
    ${voiceDescription}

    **Post Details:**
    - **Topic:** "${topic}"
    - **Audience Niche:** "${niche}"

    **Requirements:**
    1.  Each caption must be under 150 words.
    2.  Incorporate relevant emojis that match the brand voice.
    3.  End with a compelling call to action.
    4.  The generated captions MUST strictly adhere to the brand voice profile.`;
    
    if(useGoogleSearch) {
        prompt += "\n5. Use Google Search to find up-to-date information or recent events related to the topic to make the captions more relevant and timely."
    }

    prompt += `
    **Output Format:**
    Return a JSON array of objects. Each object must have two keys: "caption" (the generated text) and "justification" (a brief explanation of how that specific caption aligns with the brand voice).

    Example:
    [
      {
        "caption": "Your caption here...",
        "justification": "This is direct and inspirational, perfectly matching your brand voice."
      },
      {
        "caption": "Another caption here...",
        "justification": "This option uses a more humorous and casual tone, as requested."
      }
    ]
    `;

    const config: GenerateContentParameters['config'] = {};
    if (useGoogleSearch) {
        config.tools = [{googleSearch: {}}];
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config,
    });
    
    const text = response.text.trim();
    const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
    const captions = JSON.parse(jsonString);

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const citations: GroundingCitation[] = chunks
        .filter((c: any) => c.web && c.web.uri)
        .map((c: any) => ({ uri: c.web.uri, title: c.web.title || c.web.uri }));

    const validCaptions = (Array.isArray(captions) && captions.every(c => c.caption && c.justification)) ? captions : [];
    
    return { captions: validCaptions, citations };
  } catch (error) {
    console.error("Error generating captions:", error);
    return { captions: [{ caption: "Failed to generate captions. Please try again.", justification: "An error occurred during generation." }], citations: [] };
  }
};

export const generateHashtags = async (caption: string): Promise<string[]> => {
    try {
        const prompt = `Based on the following Instagram caption, generate a list of 15-20 relevant hashtags. Mix popular, niche, and specific hashtags. Format the output as a JSON array of strings. Caption: "${caption}"`;
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const text = response.text.trim();
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        const hashtags = JSON.parse(jsonString);
        return Array.isArray(hashtags) ? hashtags.map(h => h.startsWith('#') ? h : `#${h}`) : [];
    } catch (error) {
        console.error("Error generating hashtags:", error);
        return ["#error"];
    }
};

interface CampaignPostSuggestion {
    position: number;
    contentType: ContentType;
    topic: string;
}

export const generateCampaign = async (objective: string, details: string, niche: string): Promise<CampaignPostSuggestion[]> => {
    try {
        const prompt = `
        You are a world-class marketing strategist planning an Instagram campaign.

        **Niche:** "${niche}"
        **Campaign Objective:** "${objective}"
        **Campaign Details:** "${details}"

        Your task is to create a strategic 5-post sequence to build hype and achieve the campaign objective. The sequence should follow a logical narrative (e.g., teaser, reveal, details, launch, follow-up).

        For each of the 5 posts, provide:
        1.  A unique grid position from 1 to 9. The most important "launch" post should be in a central position like 5.
        2.  A suggested content type ('Image', 'Reel', 'Carousel').
        3.  A compelling, short topic or idea for the post.

        **Output Format:**
        Return ONLY a valid JSON array of 5 objects. Each object must have "position", "contentType", and "topic" keys. Do not include any other text or markdown formatting.

        Example:
        [
          { "position": 2, "contentType": "Image", "topic": "Teaser: A silhouette of the new product with a mysterious caption." },
          { "position": 4, "contentType": "Carousel", "topic": "Behind the Scenes: The making of our new collection." },
          { "position": 5, "contentType": "Reel", "topic": "THE BIG REVEAL: Introducing the full Autumn collection in motion." },
          { "position": 6, "contentType": "Carousel", "topic": "Detailed Look: Exploring the key features and materials of one hero product." },
          { "position": 8, "contentType": "Image", "topic": "Early Bird Access: A graphic announcing a special offer for the first 24 hours." }
        ]
        `;
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text.trim();
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        const campaignPosts = JSON.parse(jsonString);

        if (Array.isArray(campaignPosts) && campaignPosts.length > 0 && campaignPosts.every(p => typeof p.position === 'number' && p.contentType && p.topic)) {
            return campaignPosts;
        }

        throw new Error("Invalid format for campaign posts");
    } catch (error) {
        console.error("Error generating campaign:", error);
        // Fallback in case of error
        return [
            { position: 2, contentType: "Image", topic: "Something new is coming..." },
            { position: 4, contentType: "Carousel", topic: "A sneak peek of what we've been working on." },
            { position: 5, contentType: "Reel", topic: "The official launch announcement!" },
            { position: 6, contentType: "Image", topic: "Your first chance to get it." },
            { position: 8, contentType: "Carousel", topic: "Customer stories and early feedback." },
        ];
    }
};

export const suggestCampaignObjectives = async (niche: string): Promise<string[]> => {
    try {
        const prompt = `
        You are a marketing consultant AI. Based on the following niche, suggest 3 distinct and actionable marketing campaign objectives.
        
        **Niche:** "${niche}"

        **Requirements:**
        - Keep the objectives short and clear (e.g., "Launch a new product", "Promote a seasonal sale", "Increase newsletter sign-ups").
        - The objectives should be relevant to a brand operating in this niche on social media.

        **Output Format:**
        Return ONLY a valid JSON array of 3 strings.

        Example for niche "handmade ceramic mugs":
        [
            "Launch the new 'Sunrise' collection",
            "Promote a 20% off Summer Sale",
            "Drive traffic to a blog post about 'The Art of the Perfect Pour'"
        ]
        `;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text.trim();
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        const objectives = JSON.parse(jsonString);

        if (Array.isArray(objectives) && objectives.length === 3 && objectives.every(o => typeof o === 'string')) {
            return objectives;
        }
        throw new Error("Invalid format for campaign objectives");
    } catch (error) {
        console.error("Error suggesting campaign objectives:", error);
        return [
            "Launch new collection",
            "Promote a special offer",
            "Increase audience engagement"
        ];
    }
};

export const generateImage = async (prompt: string, aspectRatio: AspectRatio = '1:1'): Promise<string | null> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A vibrant, high-quality, professional photograph for an Instagram post. ${prompt}`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};

export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '9:16'): Promise<string | null> => {
    try {
        // Create a new instance right before the call to ensure the latest key is used.
        const aiWithKey = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        let operation = await aiWithKey.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: `A vibrant, high-quality, professional video for an Instagram Reel. ${prompt}`,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: aspectRatio
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await aiWithKey.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY!}`);
            if (response.ok) {
                const videoBlob = await response.blob();
                return URL.createObjectURL(videoBlob);
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating video:", error);
        if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
             // This error indicates the key might be invalid, prompt the user to select again.
             await window.aistudio.openSelectKey();
        }
        return null;
    }
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData.split(',')[1],
                            mimeType: mimeType,
                        },
                    },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (part?.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error editing image:", error);
        return null;
    }
};

export const predictPerformance = async (caption: string, contentType: ContentType): Promise<PerformancePrediction> => {
    try {
        const prompt = `
        You are a social media expert AI. Analyze the following Instagram post content and predict its engagement potential.

        **Content Details:**
        - **Content Type:** ${contentType}
        - **Caption:** "${caption}"

        **Task:**
        1.  Provide a "performanceScore" from 0 to 100, where 100 is exceptional engagement potential. Base this score on the caption's clarity, emotional hook, call-to-action (CTA), length, and overall quality. A short, unengaging caption should receive a low score. A well-crafted caption with a clear CTA should be high.
        2.  Provide an array of 2-3 brief, actionable "feedback" strings for improvement. If the post is already good, the feedback can be reinforcing.

        **Output Format:**
        Return ONLY a valid JSON object with "performanceScore" and "feedback" keys.

        Example:
        {
          "performanceScore": 75,
          "feedback": [
            "The story is compelling and creates a great hook.",
            "Consider adding a more direct question to boost comments.",
            "The use of emojis is well-balanced."
          ]
        }
        `;
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const text = response.text.trim();
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        const prediction = JSON.parse(jsonString);

        if (typeof prediction.performanceScore === 'number' && Array.isArray(prediction.feedback)) {
            return prediction;
        }
        throw new Error("Invalid format for performance prediction");

    } catch (error) {
        console.error("Error predicting performance:", error);
        return {
            performanceScore: 0,
            feedback: ["Could not analyze performance at this time."],
        };
    }
};

// --- SIMULATED STRATEGIC ANALYSIS FUNCTIONS ---

export const analyzeVisualHarmony = async (posts: Post[]): Promise<VisualHarmonyAnalysis> => {
    // In a real app, this would involve image analysis.
    // Here, we simulate a positive outcome.
    console.log("Simulating visual harmony analysis...");
    await new Promise(res => setTimeout(res, 500)); // Simulate network delay
    return {
        score: 'Excellente',
        feedback: "Votre palette de couleurs est cohérente. Bon travail !"
    };
};

export const analyzeVoiceConsistency = async (posts: Post[], brandVoice: BrandVoice): Promise<VoiceConsistencyAnalysis> => {
    // In a real app, this would analyze caption text against the voice profile.
    // Here, we simulate a positive outcome.
    console.log("Simulating voice consistency analysis...");
    await new Promise(res => setTimeout(res, 500)); // Simulate network delay
    return {
        score: 'Constante',
        feedback: "Votre ton reste inspirant et direct sur tous les posts planifiés."
    };
};

export const generateTopics = async (niche: string, useGoogleSearch: boolean = false): Promise<{topics: string[], citations: GroundingCitation[]}> => {
    try {
        let prompt = `Based on the niche "${niche}", generate 5 short, compelling, and SEO-friendly topic ideas or titles for an Instagram post. Keep them concise and engaging.`
        
        if (useGoogleSearch) {
            prompt = `You are a trend analyst AI. Using Google Search, find 5 current and trending topic ideas for Instagram posts relevant to the niche "${niche}". Focus on recent events, popular discussions, or seasonal interests.`
        }

        prompt += `\n\nFormat the output as a JSON array of strings.
        
        Example for niche "sustainable fashion":
        [
          "5 Myths About Slow Fashion Debunked",
          "How to Build a Capsule Wardrobe That Lasts",
          "The Secret to Mending Your Favorite Jeans",
          "Why You Should Thrift Your Next Outfit",
          "Meet the Maker: The Story Behind Our Organic Cotton Tees"
        ]`;

        const config: GenerateContentParameters['config'] = {};
        if (useGoogleSearch) {
            config.tools = [{googleSearch: {}}];
        }

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config
        });

        const text = response.text.trim();
        const jsonString = text.replace(/^```json\s*|```\s*$/g, '');
        const topics = JSON.parse(jsonString);

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const citations: GroundingCitation[] = chunks
            .filter((c: any) => c.web && c.web.uri)
            .map((c: any) => ({ uri: c.web.uri, title: c.web.title || c.web.uri }));
        
        const validTopics = (Array.isArray(topics) && topics.every(t => typeof t === 'string')) ? topics : [];
        return { topics: validTopics, citations };

    } catch (error) {
        console.error("Error generating topics:", error);
        return { topics: ["Failed to generate topics, please try again."], citations: [] };
    }
};