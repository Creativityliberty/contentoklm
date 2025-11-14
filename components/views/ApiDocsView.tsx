import React from 'react';
import { BookOpenIcon } from '../icons';

// The content of API_DOCUMENTATION.md is placed here directly.
const markdownContent = `
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

Toutes les requêtes API nécessitent une clé API fournie dans l'en-tête \`Authorization\` en tant que \`Bearer Token\`.

\`\`\`bash
# Incluez votre clé API dans l'en-tête Authorization
curl -H "Authorization: Bearer VOTRE_CLÉ_API" https://api.aicontentplanner.com/v1/workspaces
\`\`\`

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

\`\`\`bash
curl -X POST https://api.aicontentplanner.com/v1/workspaces \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Aura Coffee Roasters",
    "niche": "Café de spécialité éco-responsable pour les citadins créatifs."
  }'
\`\`\`

### Étape 2 : Entraîner la Voix de Marque (la Magie)
Dites à l'IA d'apprendre et de définir la personnalité de votre marque.

\`\`\`bash
curl -X POST https://api.aicontentplanner.com/v1/ai/brand-voice/analyze \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{ "workspaceId": "ws_xxxxxx" }'
\`\`\`

### Étape 3 : Générer et Planifier le Post (le Résultat)
Donnez une simple idée à l'IA et laissez-la construire un post complet.

\`\`\`bash
curl -X POST https://api.aicontentplanner.com/v1/posts \\
  -H "Authorization: Bearer VOTRE_CLÉ_API" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workspaceId": "ws_xxxxxx",
    "position": 1,
    "ai_brief": {
        "topic": "Les bienfaits de la pause-café sur la créativité",
        "pillar": "Inspiration",
        "cta": "Demander aux utilisateurs de partager leur rituel café"
    }
  }'
\`\`\`
**Résultat** : Un nouveau post est créé dans votre grille, pré-rempli avec une légende engageante, des hashtags pertinents et une suggestion de visuel, le tout dans la voix d'Aura Coffee.
`;

const ApiDocsView = () => {
    // A simple renderer for the markdown content
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
            <BookOpenIcon className="w-8 h-8 text-slate-500" />
            <div>
                <h2 className="text-3xl font-bold text-slate-800">API Documentation</h2>
                <p className="text-slate-600">Endpoints, authentication, and examples.</p>
            </div>
        </div>

        <div className="prose prose-slate bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-none">
          {/* This is a very basic way to render markdown. A real app would use a library like 'marked' or 'react-markdown'. */}
          {markdownContent.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(3)}</h2>
            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(2)}</h1>
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.substring(4)}</h3>
            if (line.startsWith('```')) return <pre key={i} className="bg-slate-800 text-white p-4 rounded-md overflow-x-auto my-4 text-sm">{line.replace(/```(bash|json)?/g, '')}</pre>
            if (line.startsWith('*   ')) return <li key={i} className="ml-5 list-disc">{line.substring(4)}</li>
            return <p key={i} className="my-4">{line}</p>
          })}
        </div>
      </div>
    </div>
  );
};

export default ApiDocsView;
