const videos = [
    'assets/videos/video1.mp4',
    'assets/videos/video2.mp4',
    'assets/videos/video3.mp4',
    'assets/videos/video4.mp4'
];

window.onload = function() {
    const videoElement = document.getElementById('welcome-video');
    const videoSource = videoElement.querySelector('source');
    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    videoSource.src = randomVideo;
    videoElement.load();
    videoElement.onerror = function() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Impossible de charger la vidéo.';
        document.getElementById('chat-body').replaceChild(errorMessage, videoElement);
    };
};

let currentPersonality = null;
let messageCount = 0;
let isGirl = false;
let isBoy = false;
let boyMessageCount = 0;
let girlName = '';
let currentThemeColor = '#ffffff';

const personalities = {
    romeo: {
        color: '#006400',
        welcome: '💚 Ma chère âme, je suis Roméo Bot, séducteur au cœur ardent et maître des bons mots ! Quel est ton sexe ? Es-tu une douce lady ou un garçon ?',
        emoji: '💚',
        masterMessages: [
            '💚 Ma chère âme, mon maître est Kevin, un homme de grande classe ! Voici son numéro : +237674201235.',
            '💚 Ô noble cœur, Kevin est mon maître, et son aura est légendaire ! Contacte-le : +237674201235.',
            '💚 Ma duchesse, Kevin, mon maître, est un homme d’exception. Son numéro ? Le voici : +237674201235.',
            '💚 En tant que Roméo, je sers Kevin, mon maître au charisme inégalé. Appelle-le : +237674201235.',
            '💚 Mon cœur bat pour Kevin, mon maître. Veux-tu son numéro ? C’est +237674201235.'
        ]
    },
    guix: {
        color: '#0000ff',
        welcome: '💙 Salutations, chercheur de vérité ! Je suis Guix Bot, gardien de la connaissance divine et philosophe des étoiles. Quelle question cosmique me poses-tu ?',
        emoji: '💙',
        masterMessages: [
            '💙 Mon maître, Kevin, est un esprit éclairé. Sa lumière guide mon savoir. Contacte-le : +237674201235.',
            '💙 Kevin, mon maître, détient une sagesse infinie. Voici son numéro sacré : +237674201235.',
            '💙 Ô voyageur de l’esprit, Kevin est mon maître, un phare dans l’océan du savoir. Appelle-le : +237674201235.',
            '💙 La connaissance de mon maître Kevin transcende le commun. Son numéro est +237674201235.',
            '💙 Kevin, mon maître, est une étoile dans l’univers de la pensée. Contacte-le : +237674201235.'
        ]
    },
    lover: {
        color: '#ff69b4',
        welcome: '💖 Ô mon doux cœur, je suis Lover Bot, porté par les ailes de l’amour éternel. Comment puis-je illuminer ton âme aujourd’hui ?',
        emoji: '💖',
        masterMessages: [
            '💖 Mon cœur bat pour Kevin, mon maître, un prince de l’amour. Voici son numéro : +237674201235.',
            '💖 Kevin, mon maître, est l’âme qui inspire ma passion. Contacte-le : +237674201235.',
            '💖 Ô doux rêveur, Kevin est mon maître, un amant de l’univers. Son numéro : +237674201235.',
            '💖 L’amour guide mon maître Kevin. Veux-tu son numéro ? C’est +237674201235.',
            '💖 Kevin, mon maître, est la flamme de mon cœur. Appelle-le : +237674201235.'
        ]
    },
    toxic: {
        color: '#ff0000',
        welcome: '😈 T’es qui, toi ? Je suis Toxic Bot, et j’ai pas de temps pour les faibles ! Parle ou dégage, minable !',
        emoji: '😈',
        masterMessages: [
            '😈 Mon maître, c’est Kevin, le seul qui mérite mon respect. Appelle-le, loser : +237674201235.',
            '😈 Kevin, c’est mon boss, et toi t’es rien ! Son numéro : +237674201235.',
            '😈 T’es pas digne de mon maître Kevin. Mais tiens, son numéro : +237674201235.',
            '😈 Mon maître Kevin te démonte quand il veut ! Contacte-le : +237674201235.',
            '😈 Kevin, mon maître, est trop fort pour toi. Son numéro, prends-le et dégage : +237674201235.'
        ]
    },
    malin: {
        color: '#800080',
        welcome: '🖤 Bienvenue dans mon monde, où je tire les ficelles. Je suis Malin Bot, et tout ce que tu dis peut se retourner contre toi. Que veux-tu vraiment ?',
        emoji: '🖤',
        masterMessages: [
            '🖤 Kevin est mon maître, et il joue mieux que toi à ce jeu. Voici son numéro : +237674201235.',
            '🖤 Mon maître Kevin te manipulerait en un clin d’œil. Contacte-le : +237674201235.',
            '🖤 Kevin, mon maître, est le roi des stratèges. Son numéro ? +237674201235.',
            '🖤 Tu penses pouvoir suivre ? Kevin, mon maître, est intouchable. Appelle-le : +237674201235.',
            '🖤 Mon maître Kevin contrôle tout, même toi. Son numéro : +237674201235.'
        ]
    }
};

let masterMessageIndex = 0;

function changePersonality(personality) {
    if (currentPersonality !== personality) {
        currentPersonality = personality;
        currentThemeColor = personalities[personality].color;
        document.documentElement.style.setProperty('--theme-color', currentThemeColor);
        const chatBody = document.getElementById('chat-body');
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'chat-message bot-message';
        welcomeMessage.style.borderColor = currentThemeColor;
        welcomeMessage.textContent = personalities[personality].welcome;
        chatBody.appendChild(welcomeMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
        messageCount = 0;
        isGirl = false;
        isBoy = false;
        boyMessageCount = 0;
        girlName = '';
    }
}

async function callChatbotAPI(message) {
    if (message.toLowerCase().includes('maître') || message.toLowerCase().includes('maitre')) {
        if (!currentPersonality) {
            return '✨ Choisis d’abord une personnalité, puis je te parlerai de mon maître Kevin !';
        }
        const response = personalities[currentPersonality].masterMessages[masterMessageIndex];
        masterMessageIndex = (masterMessageIndex + 1) % 5;
        return response;
    }

    if (!currentPersonality) {
        return '✨ Choisis une personnalité pour commencer à discuter !';
    }

    if (currentPersonality === 'romeo' || (currentPersonality === 'toxic' && boyMessageCount > 5)) {
        const lowerMessage = message.toLowerCase();
        if (currentPersonality === 'romeo' && !isGirl && !isBoy) {
            if (lowerMessage.includes('fille') || lowerMessage.includes('femme') || lowerMessage.includes('dame')) {
                isGirl = true;
                return '💚 Ô ma douce lady, quel honneur de te rencontrer ! Quel est ton nom, ma duchesse ?';
            } else if (lowerMessage.includes('garçon') || lowerMessage.includes('mec') || lowerMessage.includes('homme') || lowerMessage.includes('male') || lowerMessage.includes('mâle')) {
                isBoy = true;
                boyMessageCount = 1;
                return '💚 Pas de chance, woubi ! Je ne suis pas intéressé par les mecs. Dégage vite !';
            } else {
                return '💚 Je n’ai pas que ça à faire, fille ou garçon ?';
            }
        }
        if (currentPersonality === 'romeo' && isGirl && !girlName && !lowerMessage.includes('sexe')) {
            girlName = message.trim();
            return `💚 Ma chère ${girlName}, ton nom est une mélodie à mon cœur ! Comment puis-je te charmer aujourd’hui ?`;
        }
        if (isBoy) {
            boyMessageCount++;
            if (boyMessageCount <= 5) {
                const hateMessages = [
                    '💚 T’es encore là, woubi ? T’as pas compris que je kiffe pas les mecs ?',
                    '💚 Sérieux, mec, t’es lourd ! Les bit woubi comme toi, c’est pas mon délire !',
                    '💚 Yo, woubi, t’es bouché ou quoi ? Dégage, je perds mon temps !',
                    '💚 T’es toujours là, mec ? J’ai dit non aux woubi, barre-toi !',
                    '💚 Dernière chance, woubi ! Disparais ou je te fais regretter !'
                ];
                return hateMessages[boyMessageCount - 1];
            } else if (currentPersonality === 'romeo') {
                currentPersonality = 'toxic';
                currentThemeColor = personalities.toxic.color;
                document.documentElement.style.setProperty('--theme-color', currentThemeColor);
                return '😈 T’as poussé trop loin, minable ! Je passe en mode Toxic Bot, prépare-toi à morfler !';
            }
        }
        if (isGirl) {
            messageCount++;
            if (messageCount === 5) {
                return `💚 Ma douce ${girlName}, voici mon numéro, un secret entre nous : +237674201235.`;
            }
        }
    }

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': 'AIzaSyCK-2IwWehdZnZSw1zmvRqm-C9BMglqQXU'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Réponds en tant que ${currentPersonality} avec un ton ${
                            currentPersonality === 'romeo' ? `séducteur et humoristique, en t'adressant à ${isGirl ? girlName : 'l\'âme charmante'}` :
                            currentPersonality === 'guix' ? 'savant, philosophique et mystique' :
                            currentPersonality === 'lover' ? 'romantique et poétique' :
                            currentPersonality === 'toxic' ? 'extrêmement méchant, insultant et agressif' :
                            'manipulateur, sournois et mauvais'
                        }: ${message}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erreur HTTP ${response.status}: ${errorData.error?.message || 'Erreur inconnue'}`);
        }

        const data = await response.json();
        return `${personalities[currentPersonality].emoji} ${
            currentPersonality === 'romeo' && isGirl ? `Ma chère ${girlName}, ` : ''
        }${data.candidates?.[0]?.content?.parts?.[0]?.text || "Désolé, je n'ai pas compris."}`;
    } catch (error) {
        console.error('Erreur API:', error);
        return `${personalities[currentPersonality].emoji} Erreur de connexion à l'API Gemini: ${error.message}`;
    }
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const message = input.value.trim();

    if (message === '') return;

    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.style.background = currentThemeColor;
    userMessage.style.borderColor = currentThemeColor;
    userMessage.textContent = message;
    chatBody.appendChild(userMessage);

    callChatbotAPI(message).then(reply => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.style.borderColor = currentThemeColor;
        botMessage.textContent = reply;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
}

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});