# AI Content Planner API Documentation v1.0

Bienvenue sur l'API de votre partenaire de contenu stratégique. Nos endpoints sont conçus non seulement pour planifier, mais pour penser, créer, et optimiser votre présence sur les réseaux sociaux. Oubliez la page blanche ; avec nous, vous commencez toujours avec une stratégie.

## Table des Matières
1.  [Philosophie de l'API](#philosophie)
2.  [Authentification](#authentication)
3.  [Plans & Limites IA](#plans)
4.  [Démarrage Rapide : Votre Premier Post Intelligent en 90 Secondes](#quick-start)
5.  [Workspaces : Le Cerveau de Votre Marque](#workspaces)
6.  [Voix de Marque : L'Âme de Votre IA](#brand-voice)
7.  [Posts : De l'Idée à la Publication](#posts)
8.  [Le Moteur IA : Votre Équipe Stratégique](#ai-engine)
9.  [Média : Vos Visuels, Réels ou Imaginés](#media)
10. [Comptes Sociaux : Connecter Vos Canaux](#social-accounts)
11. [Gestion des Erreurs](#errors)
12. [Limites de Taux (Rate Limits)](#rate-limits)


<a name="philosophie"></a>
## 1. Philosophie de l'API

Notre API est construite autour de trois concepts fondamentaux :

*   **Le Workspace** : Chaque marque ou projet a son propre "Workspace". Ce n'est pas un simple dossier, c'est un environnement d'apprentissage où l'IA mémorise votre Voix de Marque, vos Piliers de Contenu et analyse vos performances.
*   **La Génération Contextuelle** : Les requêtes à l'IA ne sont pas génériques. Elles sont toujours liées à un Workspace, garantissant des résultats qui sont "on-brand", pertinents et personnalisés.
*   **L'Action Stratégique** : Nos endpoints ne se contentent pas d'exécuter des tâches. Ils offrent des insights, des prédictions et des analyses pour transformer vos actions en résultats mesurables.

<a name="authentication"></a>
## 2. Authentification

Toutes les requêtes API nécessitent une clé API fournie dans l'en-tête `Authorization` en tant que `Bearer Token`.

```bash
# Incluez votre clé API dans l'en-tête Authorization
curl -H "Authorization: Bearer VOTRE_CLÉ_API" https://api.aicontentplanner.com/v1/workspaces
```

<a name="plans"></a>
## 3. Plans & Limites IA

Nos plans sont basés sur les crédits de génération IA, qui mesurent l'utilisation des fonctionnalités intelligentes les plus avancées.

*   **Solo (Gratuit)**: 10 Générations Complètes/mois, 2 Workspaces, Voix de Marque Basique.
*   **Creator ($19/mois)**: 150 Générations/mois, 10 Workspaces, Voix de Marque Avancée, Performance Predictor.
*   **Agency ($49/mois)**: Générations Illimitées, 50 Workspaces, Architecte de Campagnes, Analyse Visuelle de la Grille.

<a name="quick-start"></a>
## 4. Démarrage Rapide : Votre Premier Post Intelligent en 90 Secondes

### Étape 1 : Créer le Workspace (le Contexte)
Définissez le terrain de jeu pour l'IA en décrivant votre marque.

```bash
curl -X POST https://api.aicontentplanner.com/v1/workspaces \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aura Coffee Roasters",
    "niche": "Café de spécialité éco-responsable pour les citadins créatifs."
  }'
```

### Étape 2 : Entraîner la Voix de Marque (la Magie)
Dites à l'IA d'apprendre et de définir la personnalité de votre marque.

```bash
curl -X POST https://api.aicontentplanner.com/v1/ai/brand-voice/analyze \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -H "Content-Type: application/json" \
  -d '{ "workspaceId": "ws_xxxxxx" }'
```

### Étape 3 : Générer et Planifier le Post (le Résultat)
Donnez une simple idée à l'IA et laissez-la construire un post complet.

```bash
curl -X POST https://api.aicontentplanner.com/v1/posts \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "ws_xxxxxx",
    "position": 1,
    "ai_brief": {
        "topic": "Les bienfaits de la pause-café sur la créativité",
        "pillar": "Inspiration",
        "cta": "Demander aux utilisateurs de partager leur rituel café"
    }
  }'
```
**Résultat** : Un nouveau post est créé dans votre grille, pré-rempli avec une légende engageante, des hashtags pertinents et une suggestion de visuel, le tout dans la voix d'Aura Coffee.

<a name="workspaces"></a>
## 5. Workspaces : Le Cerveau de Votre Marque

Le Workspace est le conteneur pour une marque ou un client. Il détient la Voix de Marque, les Piliers de Contenu et tous les posts associés.

### `GET /v1/workspaces`
Retourne une liste de tous les workspaces de votre compte.

### `POST /v1/workspaces`
Crée un nouveau workspace. La `niche` est le champ le plus important pour guider l'IA.

<a name="brand-voice"></a>
## 6. Voix de Marque : L'Âme de Votre IA

Gérez la personnalité de votre marque pour garantir des générations de contenu cohérentes.

### `POST /v1/ai/brand-voice/analyze`
Déclenche une analyse IA pour définir une Voix de Marque initiale à partir de la `niche` du Workspace ou d'un compte social connecté.

### `GET /v1/workspaces/[workspaceId]/brand-voice`
Récupère le profil de Voix de Marque actuel, incluant les traits de personnalité, le ton, les emojis fréquents, etc.

### `PUT /v1/workspaces/[workspaceId]/brand-voice`
Met à jour manuellement la Voix de Marque. Permet d'affiner les suggestions de l'IA.

<a name="posts"></a>
## 7. Posts : De l'Idée à la Publication

Gérez le cycle de vie de votre contenu.

### `GET /v1/posts`
Récupère les posts. Filtrez par `workspaceId`, `status` (draft, scheduled, published), etc.

### `POST /v1/posts`
Crée un post. Utilisez `ai_brief` pour une création intelligente ou spécifiez manuellement `caption`, `mediaItems`, etc.

### `PUT /v1/posts/[postId]`
Met à jour un post. Vous pouvez modifier un post généré par l'IA avant sa publication.

### `DELETE /v1/posts/[postId]`
Supprime un post (uniquement les brouillons et les posts planifiés).

<a name="ai-engine"></a>
## 8. Le Moteur IA : Votre Équipe Stratégique

Interagissez directement avec le cerveau de la plateforme. Toutes les requêtes sont contextuelles au `workspaceId`.

### `POST /v1/ai/ideas`
Génère des idées de contenu. Basé sur la niche et les performances passées, cet endpoint retourne des sujets pertinents.
```bash
curl -X POST https://api.aicontentplanner.com/v1/ai/ideas \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -d '{ "workspaceId": "ws_xxxxxx", "count": 5 }'
```

### `POST /v1/ai/captions`
Génère des légendes. L'IA rédige plusieurs options en respectant scrupuleusement la **Voix de Marque** enregistrée.
```bash
curl -X POST https://api.aicontentplanner.com/v1/ai/captions \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -d '{
    "workspaceId": "ws_xxxxxx",
    "topic": "Notre nouveau packaging 100% compostable",
    "tone_override": "enthousiaste"
  }'
```

### `POST /v1/ai/predict-performance`
Prédit l'engagement potentiel. (Plan Creator+) Retourne un score de performance et des conseils d'amélioration exploitables.
```json
// Réponse
{
  "performanceScore": 72,
  "feedback": [
    "✅ Le sentiment est positif et aligné avec votre marque.",
    "💡 Astuce : Ajouter une question ouverte pourrait augmenter les commentaires de 25%.",
    "⚠️ Attention : La légende ne contient pas d'appel à l'action clair."
  ]
}
```

### `POST /v1/ai/campaign-architect`
Construit un squelette de campagne. (Plan Agency) Décrivez un objectif (ex: "Lancement de produit") et une date, et l'IA proposera une séquence de posts (Teasing, Révélation, Lancement, Preuve Sociale).

<a name="media"></a>
## 9. Média : Vos Visuels, Réels ou Imaginés

### `POST /v1/media/upload`
Télécharge une image ou une vidéo (jusqu'à 1GB) et retourne une URL à utiliser dans vos posts.

### `POST /v1/media/generate-image`
Génère une image à partir d'un prompt. Décrivez le visuel, l'IA le crée. Idéal pour illustrer des concepts ou créer des fonds de stories.
```bash
curl -X POST https://api.aicontentplanner.com/v1/media/generate-image \
  -H "Authorization: Bearer VOTRE_CLÉ_API" \
  -d '{
    "prompt": "Une photo flat lay minimaliste d''un carnet ouvert, d''une tasse de café et de lunettes, tons pastel.",
    "aspectRatio": "4:5"
  }'
```

<a name="social-accounts"></a>
## 10. Comptes Sociaux : Connecter Vos Canaux

Gérez les connexions à Instagram, Facebook, etc. La connexion d'un compte permet la publication directe et l'analyse des performances pour affiner la Voix de Marque.

### `GET /v1/accounts`
Liste les comptes sociaux connectés, filtrables par `workspaceId`.

### `GET /v1/connect/[platform]`
Initie le flux de connexion OAuth pour une plateforme (instagram, facebook, etc.). Requiert un `workspaceId` dans les paramètres de la requête.

<a name="errors"></a>
## 11. Gestion des Erreurs

Notre API utilise les codes de statut HTTP standards. Les erreurs retournent un corps JSON avec des détails.
```json
// Exemple : Limite du plan atteinte
{
  "error": "Crédits de génération IA épuisés.",
  "code": "ai_credits_limit_exceeded",
  "plan": "Creator",
  "limit": 150,
  "usage": 150,
  "resetsOn": "2025-12-14T00:00:00.000Z"
}
```

<a name="rate-limits"></a>
## 12. Limites de Taux (Rate Limits)

Pour assurer la stabilité de la plateforme, les requêtes API sont limitées. Les limites varient selon votre plan.

*   **Solo**: 60 requêtes/minute
*   **Creator**: 180 requêtes/minute
*   **Agency**: 600 requêtes/minute

Les en-têtes `X-RateLimit-Limit`, `X-RateLimit-Remaining`, et `X-RateLimit-Reset` sont inclus dans chaque réponse.
