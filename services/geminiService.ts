import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { GenerateContentResponse, GenerateContentParameters } from "@google/genai";
import type { Pillar, BrandVoice, BrandVoiceAnalysis, ContentType, Post, VisualHarmonyAnalysis, VoiceConsistencyAnalysis, PerformancePrediction, GroundingCitation, AspectRatio, BrandDiscoveryResult } from "../types";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  // A placeholder check as we assume the key is set in the environment.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const PILLAR_COLORS = ['bg-sky-200', 'bg-lime-200', 'bg-amber-200', 'bg-violet-200', 'bg-rose-200'];

const safeJsonParse = (text: string) => {
  const cleanText = text.replace(/^```json\s*|```\s*$/g, '');
  return JSON.parse(cleanText);
}

export const discoverBrandFromUrl = async (niche: string, url: string): Promise<BrandDiscoveryResult> => {
    const prompt = `
    You are a world-class brand strategist AI. Analyze a brand from its website URL and niche.
    **Brand Niche:** "${niche}"
    **Website URL:** "${url}"
    Analyze content from the URL using Google Search to understand the brand. Generate:
    1. A concise, refined niche statement.
    2. 5 relevant content pillars (name, single emoji, color from ${PILLAR_COLORS.join(', ')}).
    3. Brand Voice Analysis:
        - A brief summary (2-3 sentences).
        - Numerical scores (-1.0 to 1.0) for "formality", "humor", "tone".
    Return ONLY a single valid JSON object with keys "niche", "pillars", and "voiceAnalysis".
    `;

    try {
        // FIX: Per API guidelines, responseMimeType and responseSchema should not be set when using the googleSearch tool.
        // The prompt has been updated to explicitly request a single JSON object for more reliable parsing.
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            }
        });

        const discoveryResult = safeJsonParse(response.text);
        return discoveryResult;

    } catch (error) {
        console.error("Error discovering brand from URL:", error);
        throw new Error("Failed to analyze the website. Please check the URL or describe your niche manually.");
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
  const voiceDescription = getVoiceDescription(voice);
  let prompt = `You are an expert social media strategist. Generate 3 distinct Instagram captions.
    **Brand Voice Profile:** ${voiceDescription}
    **Topic:** "${topic}"
    **Audience Niche:** "${niche}"
    Each caption must be under 150 words, include emojis, a CTA, and strictly adhere to the voice profile.`;
  
  if(useGoogleSearch) {
      prompt += "\nUse Google Search for up-to-date info to make captions more relevant."
  }
  
  const config: GenerateContentParameters['config'] = {
      responseMimeType: 'application/json',
      responseSchema: {
          type: Type.ARRAY,
          items: {
              type: Type.OBJECT,
              properties: {
                  caption: { type: Type.STRING },
                  justification: { type: Type.STRING }
              },
              required: ['caption', 'justification']
          }
      }
  };
  if (useGoogleSearch) {
      config.tools = [{googleSearch: {}}];
      // FIX: Per API guidelines, responseMimeType and responseSchema should not be set when using the googleSearch tool.
      delete config.responseMimeType;
      delete config.responseSchema;
      prompt += '\nReturn ONLY a valid JSON array of objects with "caption" and "justification" keys.'
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config,
    });
    
    const captions = safeJsonParse(response.text);
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const citations: GroundingCitation[] = chunks
        .filter((c: any) => c.web && c.web.uri)
        .map((c: any) => ({ uri: c.web.uri, title: c.web.title || c.web.uri }));

    return { captions, citations };
  } catch (error) {
    console.error("Error generating captions:", error);
    throw new Error("Failed to generate captions. Please try again.");
  }
};

export const generateHashtags = async (caption: string): Promise<string[]> => {
    const prompt = `Based on the caption "${caption}", generate a list of 15-20 relevant hashtags (popular, niche, specific). Return a JSON array of strings.`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        });
        const hashtags = safeJsonParse(response.text);
        return hashtags.map((h: string) => h.startsWith('#') ? h : `#${h}`);
    } catch (error) {
        console.error("Error generating hashtags:", error);
        throw new Error("Failed to generate hashtags.");
    }
};

interface CampaignPostSuggestion {
    position: number;
    contentType: ContentType;
    topic: string;
}

export const generateCampaign = async (objective: string, details: string, niche: string): Promise<CampaignPostSuggestion[]> => {
    const prompt = `You are a world-class marketing strategist planning an Instagram campaign.
        **Niche:** "${niche}"
        **Campaign Objective:** "${objective}"
        **Campaign Details:** "${details}"
        Create a strategic 5-post sequence following a logical narrative. For each post, provide a unique grid position (1-9), content type ('Image', 'Reel', 'Carousel'), and a compelling topic. The launch post should be central (e.g., position 5).
        Return ONLY a valid JSON array of 5 objects with "position", "contentType", and "topic" keys.`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            position: { type: Type.INTEGER },
                            contentType: { type: Type.STRING },
                            topic: { type: Type.STRING }
                        },
                        required: ['position', 'contentType', 'topic']
                    }
                }
            }
        });
        return safeJsonParse(response.text);
    } catch (error) {
        console.error("Error generating campaign:", error);
        throw new Error("Failed to generate the campaign strategy.");
    }
};

export const suggestCampaignObjectives = async (niche: string): Promise<string[]> => {
    const prompt = `You are a marketing consultant AI. Based on the niche "${niche}", suggest 3 distinct, actionable marketing campaign objectives (e.g., "Launch a new product"). Return ONLY a valid JSON array of 3 strings.`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        });
        return safeJsonParse(response.text);
    } catch (error) {
        console.error("Error suggesting campaign objectives:", error);
        throw new Error("Failed to suggest campaign objectives.");
    }
};

export const generateImage = async (prompt: string, aspectRatio: AspectRatio = '1:1'): Promise<string | null> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A vibrant, high-quality, professional photograph for an Instagram post. ${prompt}`,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return `data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate the image.");
    }
};

export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16' = '9:16'): Promise<string | null> => {
    let delay = 5000; // Initial delay of 5 seconds
    const maxDelay = 30000; // Max delay of 30 seconds

    try {
        const aiWithKey = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        let operation = await aiWithKey.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: `A vibrant, high-quality, professional video for an Instagram Reel. ${prompt}`,
            config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, delay));
            delay = Math.min(delay * 2, maxDelay); // Exponential backoff
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
             await window.aistudio.openSelectKey();
        }
        throw new Error("Failed to generate the video.");
    }
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64ImageData.split(',')[1], mimeType: mimeType } },
                    { text: prompt },
                ],
            },
            config: { responseModalities: [Modality.IMAGE] },
        });
        const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (part?.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        return null;
    } catch (error) {
        console.error("Error editing image:", error);
        throw new Error("Failed to edit the image.");
    }
};

export const predictPerformance = async (caption: string, contentType: ContentType): Promise<PerformancePrediction> => {
    const prompt = `
        You are a social media expert AI. Analyze the post content and predict its engagement potential.
        **Content Type:** ${contentType}
        **Caption:** "${caption}"
        **Task:**
        1.  Provide a "performanceScore" from 0 to 100.
        2.  Provide an array of 2-3 brief, actionable "feedback" strings.
        Return ONLY a valid JSON object with "performanceScore" and "feedback" keys.
    `;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        performanceScore: { type: Type.INTEGER },
                        feedback: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ['performanceScore', 'feedback']
                }
            }
        });
        return safeJsonParse(response.text);
    } catch (error) {
        console.error("Error predicting performance:", error);
        throw new Error("Could not analyze performance.");
    }
};

export const analyzeVisualHarmony = async (posts: Post[]): Promise<VisualHarmonyAnalysis> => {
    const prompt = `You are a design critic AI. Analyze the following list of Instagram post topics and their visual types to determine the overall visual harmony of the grid. Consider variety in content types and themes.
    **Posts:** ${JSON.stringify(posts.map(p => ({topic: p.topic, type: p.contentType, hasVisual: !!p.imageUrl || !!p.videoUrl})))}
    Provide a 'score' ('Excellente', 'Moyenne', or 'Faible') and brief 'feedback'.
    Return ONLY a valid JSON object with "score" and "feedback" keys.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.STRING },
                        feedback: { type: Type.STRING }
                    },
                    required: ['score', 'feedback']
                }
            }
        });
        return safeJsonParse(response.text);
    } catch (error) {
        console.error("Error analyzing visual harmony:", error);
        throw new Error("Could not analyze visual harmony.");
    }
};

export const analyzeVoiceConsistency = async (posts: Post[], brandVoice: BrandVoice): Promise<VoiceConsistencyAnalysis> => {
    const voiceDescription = getVoiceDescription(brandVoice);
    const prompt = `You are a brand voice analyst AI. Your defined brand voice is: ${voiceDescription}.
    Analyze the captions of the following posts to check for consistency with this voice.
    **Posts:** ${JSON.stringify(posts.map(p => p.caption))}
    Provide a 'score' ('Constante' or 'Variable') and brief 'feedback'.
    Return ONLY a valid JSON object with "score" and "feedback" keys.`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.STRING },
                        feedback: { type: Type.STRING }
                    },
                    required: ['score', 'feedback']
                }
            }
        });
        return safeJsonParse(response.text);
    } catch (error) {
        console.error("Error analyzing voice consistency:", error);
        throw new Error("Could not analyze voice consistency.");
    }
};

export const generateTopics = async (niche: string, useGoogleSearch: boolean = false): Promise<{topics: string[], citations: GroundingCitation[]}> => {
    let prompt = `Based on the niche "${niche}", generate 5 short, compelling topic ideas for an Instagram post.`
    if (useGoogleSearch) {
        prompt = `You are a trend analyst AI. Using Google Search, find 5 current and trending topic ideas for Instagram posts relevant to the niche "${niche}".`
    }
    prompt += `\nReturn ONLY a JSON array of 5 strings.`;
    
    const config: GenerateContentParameters['config'] = {
        responseMimeType: 'application/json',
        responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
    };
    if (useGoogleSearch) {
        config.tools = [{googleSearch: {}}];
        // FIX: Per API guidelines, responseMimeType and responseSchema should not be set when using the googleSearch tool.
        delete config.responseMimeType;
        delete config.responseSchema;
    }

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config
        });

        const topics = safeJsonParse(response.text);
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const citations: GroundingCitation[] = chunks
            .filter((c: any) => c.web && c.web.uri)
            .map((c: any) => ({ uri: c.web.uri, title: c.web.title || c.web.uri }));
        
        return { topics, citations };
    } catch (error) {
        console.error("Error generating topics:", error);
        throw new Error("Failed to generate topics.");
    }
};