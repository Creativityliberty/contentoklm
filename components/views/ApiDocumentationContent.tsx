export const markdownContent = `
# AI Content Planner API Documentation

Bienvenue sur l'API de votre partenaire de contenu stratégique. Nos endpoints sont conçus non seulement pour planifier, mais pour penser, créer et optimiser votre présence sur les réseaux sociaux grâce à l'IA.

## Table des Matières
- [Philosophie de l'API](#philosophie)
- [Authentification](#authentication)
- [Plans & Limites IA](#plans)
- [Démarrage Rapide](#quick-start)
- [Workspaces](#workspaces)
- [Posts](#posts)
- [Moteur IA](#ai-engine)
- [Média](#media)

<a name="philosophie"></a>
## Philosophie de l'API
Notre API est construite autour de trois concepts :
- **Le Workspace** : Chaque marque, client ou projet a son propre "Workspace". C'est là que l'IA apprend et mémorise votre Voix de Marque et vos Piliers de Contenu.
- **Le Post** : Un objet flexible qui peut être un simple brouillon ou un contenu riche prêt à être publié, enrichi par l'IA.
- **Le Moteur IA** : Une série d'endpoints dédiés qui agissent comme votre copywriter, votre stratège et votre directeur artistique personnels.

<a name="authentication"></a>
## Authentification
Toutes les requêtes API nécessitent une clé API dans l'en-tête \`Authorization\`.

\`\`\`bash
# Incluez votre clé API dans l'en-tête Authorization
curl -H "Authorization: Bearer VOTRE_CLÉ_API" https://api.aicontentplanner.com/v1/workspaces
\`\`\`

<a name="plans"></a>
## Plans & Limites IA
Nos plans sont conçus pour évoluer avec vos ambitions. Les limites principales concernent les crédits de génération IA.
- **Solo (Gratuit)**: 10 générations de post complètes/mois, 2 Workspaces, Voix de Marque Basique.
- **Creator ($19/mois)**: 150 générations/mois, 10 Workspaces, Voix de Marque Avancée, Performance Predictor.
- **Agency ($49/mois)**: Générations illimitées, 50 Workspaces, Architecte de Campagnes, Analyse Visuelle.

<a name="quick-start"></a>
## Démarrage Rapide : Votre Premier Post Intelligent
En 3 étapes, créez un post optimisé par l'IA.

### 1. Créez un Workspace pour votre marque
\`\`\`bash
curl -X POST https://api.aicontentplanner.com/v1/workspaces \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Ma Marque de Café",
    "niche": "Café de spécialité éco-responsable pour les amateurs exigeants"
  }'
\`\`\`

### 2. Laissez l'IA définir votre Voix de Marque
\`\`\`bash
# Déclenchez l'analyse de la voix à partir de la niche
curl -X POST https://api.aicontentplanner.com/v1/ai/brand-voice/analyze \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{ "workspaceId": "WORKSPACE_ID" }'
\`\`\`
(Cette étape est cruciale pour que les futures générations soient personnalisées)

### 3. Générez et planifiez votre premier post
\`\`\`bash
# Créez un post en demandant à l'IA de tout faire
curl -X POST https://api.aicontentplanner.com/v1/posts \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workspaceId": "WORKSPACE_ID",
    "position": 1,
    "ai_brief": {
        "topic": "Les secrets d''un bon café filtre à la maison",
        "pillar": "Conseils & Tutoriaux"
    }
  }'
\`\`\`
(En fournissant un \`ai_brief\`, le post sera créé avec une légende et une idée de visuel générées par l'IA, en respectant la Voix de Marque apprise à l'étape 2).

<a name="workspaces"></a>
## Workspaces
Le Workspace est le conteneur de votre marque. C'est ici que sont stockés les Piliers de Contenu, la Voix de Marque et tous vos posts.

### \`GET /v1/workspaces\`
Retourne tous les workspaces accessibles.

### \`POST /v1/workspaces\`
Crée un nouveau workspace. La \`niche\` est essentielle pour guider l'IA.

<a name="posts"></a>
## Posts
Gérez vos posts, de la simple idée au contenu entièrement planifié.

### \`GET /v1/posts\`
Récupère une liste de vos posts, avec des filtres (par \`workspaceId\`, \`status\`, etc.).

### \`POST /v1/posts\`
Crée un nouveau post. Fournissez un \`ai_brief\` pour une création intelligente, ou les champs \`content\`, \`mediaItems\`, etc., pour une création manuelle.

### \`PUT /v1/posts/[postId]\`
Met à jour un post.

<a name="ai-engine"></a>
## Moteur IA : Le Cerveau Créatif
C'est le cœur de notre API. Ces endpoints vous permettent d'interagir directement avec l'intelligence de la plateforme.

### \`POST /v1/ai/ideas\`
Génère des idées de contenu. Basé sur la niche de votre workspace, cet endpoint vous retourne une liste de sujets pertinents à aborder, classés par Piliers de Contenu.
\`\`\`bash
# Obtenir des idées de contenu pour un workspace
curl -X POST https://api.aicontentplanner.com/v1/ai/ideas \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{ "workspaceId": "WORKSPACE_ID", "count": 5 }'
\`\`\`

### \`POST /v1/ai/captions\`
Génère des légendes (captions). Fournissez un sujet et l'IA rédigera plusieurs légendes, en respectant la Voix de Marque définie pour le workspace.
\`\`\`bash
# Générer des légendes pour un sujet donné
curl -X POST https://api.aicontentplanner.com/v1/ai/captions \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workspaceId": "WORKSPACE_ID",
    "topic": "Notre nouvel emballage 100% compostable",
    "tone_override": "enthousiaste"
  }'
\`\`\`

### \`POST /v1/ai/predict-performance\`
Prédit l'engagement potentiel d'un post. (Plan Creator et supérieur)
Envoyez le contenu d'un post (légende, type, visuel) et l'IA vous retournera un score de performance potentiel et des conseils d'amélioration.
\`\`\`bash
# Obtenir une prédiction de performance
curl -X POST https://api.aicontentplanner.com/v1/ai/predict-performance \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "caption": "Découvrez notre nouveau café ! Lien en bio.",
    "contentType": "Image",
    "hashtags": ["#cafe", "#nouveauté"]
  }'
\`\`\`
#### Réponse
\`\`\`json
{
  "performanceScore": 65,
  "feedback": [
    "La légende est un peu courte. Essayez de raconter une histoire.",
    "L''appel à l''action est faible. Une question ouverte pourrait générer plus de commentaires."
  ]
}
\`\`\`

### \`POST /v1/ai/analyze-grid\`
Analyse l'harmonie visuelle et stratégique de votre grille. (Plan Agency)
Cet endpoint analyse les 9 derniers posts planifiés et retourne un diagnostic sur l'équilibre des piliers et la cohérence visuelle.
\`\`\`bash
# Analyser la grille d'un workspace
curl -X POST https://api.aicontentplanner.com/v1/ai/analyze-grid \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{ "workspaceId": "WORKSPACE_ID" }'
\`\`\`

<a name="media"></a>
## Média
Gérez les images et vidéos de vos posts. Notre API inclut la génération d'images par IA.

### \`POST /v1/media/upload\`
Télécharge un média (image/vidéo) et retourne une URL sécurisée.

### \`POST /v1/media/generate-image\`
Génère une image à partir d'un prompt. Décrivez l'image que vous souhaitez, et l'IA la créera pour vous.
\`\`\`bash
# Générer une image pour un post
curl -X POST https://api.aicontentplanner.com/v1/media/generate-image \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Une photo réaliste d''une tasse de cappuccino fumant sur une table en bois rustique, lumière du matin.",
    "aspectRatio": "1:1"
  }'
\`\`\`
`;
