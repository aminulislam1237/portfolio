const fs = require('fs');

let lines = fs.readFileSync('script.js', 'utf8').split('\n');

const top = lines.slice(0, 385); // up to and including '  },'
const bottom = lines.slice(389); // from 'function addMessage(text, type) {' to the end

const missingBlock = `  experience: {
    patterns: ['experience', 'year', 'long', 'background', 'history', 'how long'],
    response: \`👨‍💻 **Rasel's Experience:**

He's been deeply immersed in Flutter & mobile development for **3+ years**, with hands-on experience building:

• Production-ready E-commerce platforms
• Community service applications used by real users
• Productivity tools with clean, minimalist UIs
• Institutional management systems

His expertise spans the full mobile development lifecycle — from architecture design to deployment. Still early in his professional journey but with a strong portfolio and solid fundamentals! 💪\`
  },
  location: {
    patterns: ['live', 'location', 'from', 'town', 'city', 'address', 'where', 'dhaka', 'patuakhali', 'lives', 'home town'],
    response: \`📍 **Rasel's Location:**

He currently lives in **Dhaka**, Bangladesh 🏙️, but his hometown is **Patuakhali** ❤️.

He is available for remote work globally or local opportunities within Dhaka!\`
  },
  hobbies: {
    patterns: ['hobby', 'hobbies', 'game', 'play', 'fun', 'free time', 'spare time', 'like', 'vedio game', 'video game'],
    response: \`🎮 **Rasel's Hobbies:**

When he's not crafting seamless Flutter apps, Rasel loves playing **video games**! 🕹️ It's a great way for him to unwind and gather creative inspiration for building smooth, interactive UI experiences.\`
  },
  default: {
    response: \`🤔 Great question! Here are some things I can tell you about Rasel:

• 🚀 **Tech Stack** — Flutter, Dart, Firebase, REST APIs
• 📂 **Projects** — E-commerce, Community App, Task Manager, Student ID
• 🎓 **Education** — B.Sc. Software Engineering at DIU
• 💼 **Availability** — Open to work opportunities
• 👨‍💻 **Experience** — 3+ years in Flutter development
• 📍 **Location** — Dhaka & Patuakhali

Try asking me something more specific! 😊\`
  }
};

function getAIResponse(query) {
  const q = query.toLowerCase();
  for (const key of Object.keys(aiKnowledgeBase)) {
    if (key === 'default') continue;
    const kb = aiKnowledgeBase[key];
    if (kb.patterns && kb.patterns.some(p => q.includes(p))) {
      return kb.response;
    }
  }
  return aiKnowledgeBase.default.response;
}`;

const finalScript = top.join('\n') + '\n' + missingBlock + '\n' + bottom.join('\n');
fs.writeFileSync('script.js', finalScript);
console.log('Repaired script.js successfully');
