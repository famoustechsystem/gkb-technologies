(function () {
  const OWNER = {
    whatsapp: "https://wa.me/+233536820868",
    instagram: "https://www.instagram.com/gkb_technologies?igsh=MWVteWd2NHQyZmZ4cQ%3D%3D&utm_source=qr",
    x: "https://x.com/God_knows_best1",
    youtube: "https://www.youtube.com/channel/UCKrzZ0JlxHtkwMfboxbuSsw"
  };
  const API_PREFIX = "GKB-";

  const contactActions = [
    { label: "WhatsApp owner", href: OWNER.whatsapp },
    { label: "Instagram", href: OWNER.instagram },
    { label: "X profile", href: OWNER.x }
  ];

  const responses = [
    {
      keys: ["payment", "pay", "billing", "pricing", "price", "plan", "subscription", "renewal", "upgrade", "checkout", "invoice"],
      answer:
        "Payment help:\nPayments are handled by contacting the owner personally through the official socials. Message the owner on WhatsApp first, or use Instagram/X if WhatsApp is unavailable.\n\nSend:\n1. Your name or company name\n2. The service or plan you want\n3. Number of devices or users\n4. Your preferred payment option\n\nDo not send card details, passwords, or full secret keys in chat.",
      actions: contactActions
    },
    {
      keys: ["admin", "dashboard", "manage", "users", "fleet", "organization", "roles", "permissions"],
      answer:
        "Dashboard help:\nUse the GKB TECHNOLOGIES dashboard to review users, connected devices, telemetry, alerts, roles, permissions, and support requests. Keep admin accounts separate from normal user accounts and never share passwords or full API keys.",
      actions: [{ label: "Contact admin", href: OWNER.whatsapp }]
    },
    {
      keys: ["api", "key", "token", "endpoint", "integration", "webhook", "server", "secret"],
      answer:
        "API help:\nGKB TECHNOLOGIES API keys should begin with " +
        API_PREFIX +
        " followed by secure key characters, for example GKB-XXXXXXXXXXXXX.\n\nBest practice:\n1. Use keys on the server side when possible\n2. Rotate exposed keys immediately\n3. Give each key the smallest permissions needed\n4. Share only the key prefix with support"
    },
    {
      keys: ["connect", "device", "hardware", "sensor", "mqtt", "http", "wifi", "esp32", "arduino"],
      answer:
        "Device setup:\n1. Create or choose a device template\n2. Generate a credential or API key beginning with " +
        API_PREFIX +
        "\n3. Connect hardware using MQTT, HTTP, or webhooks\n4. Confirm live readings in the dashboard\n5. Add alerts for readings that need action"
    },
    {
      keys: ["login", "sign in", "password", "account", "reset", "locked"],
      answer:
        "Login help:\nUse the official dashboard login from this website. If you are locked out, message the owner with your account email, company name, and a short description of the issue. The chatbot will never ask for your password.",
      actions: [{ label: "Message owner", href: OWNER.whatsapp }]
    },
    {
      keys: ["app", "mobile", "control", "monitor", "readings", "telemetry", "chart", "alerts"],
      answer:
        "User help:\nThe dashboard helps users monitor device status, view live readings, control connected equipment, review charts, and receive alerts. Start with the device list, open a device, then check controls, charts, and recent activity."
    },
    {
      keys: ["troubleshoot", "offline", "not working", "error", "failed", "disconnect", "timeout", "data not showing"],
      answer:
        "Troubleshooting:\n1. Confirm the device has power and internet\n2. Restart the device and wait 60 seconds\n3. Check that the device credential still starts with " +
        API_PREFIX +
        "\n4. Confirm the device ID is assigned to the right project\n5. Send support the device ID, latest error, and what changed before the issue started"
    },
    {
      keys: ["security", "privacy", "safe", "password", "secret", "credential"],
      answer:
        "Security help:\nNever share full passwords, full API keys, payment card details, or private device credentials in any chat. For support, share your account name, device ID, and only the first few characters of a key."
    },
    {
      keys: ["support", "contact", "help", "email", "enquiry", "enquire", "whatsapp", "instagram", "social", "owner"],
      answer:
        "Support help:\nFor enquiries, setup, payment, or account support, contact the owner personally through the official socials. WhatsApp is the fastest option.",
      actions: contactActions
    }
  ];

  function createApiKeyExample() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let key = API_PREFIX;
    for (let i = 0; i < 13; i += 1) {
      key += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return key;
  }

  function normalize(text) {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function scoreIntent(normalized, item) {
    return item.keys.reduce(function (score, key) {
      return normalized.includes(key) ? score + key.split(" ").length : score;
    }, 0);
  }

  function findAnswer(text) {
    const normalized = normalize(text);

    if (normalized.includes("sample") || normalized.includes("example")) {
      return {
        answer:
          "Example GKB TECHNOLOGIES API key format:\n" +
          createApiKeyExample() +
          "\nUse this as a format example only, not as a real secret."
      };
    }

    const ranked = responses
      .map(function (item) {
        return { item: item, score: scoreIntent(normalized, item) };
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    if (ranked[0] && ranked[0].score > 0) {
      return ranked[0].item;
    }

    return {
      answer:
        "I can help with device setup, dashboards, API keys, login, troubleshooting, payments, and support. Try asking 'How do I connect a device?', 'How do I pay?', or 'My device is offline.'",
      actions: [{ label: "Ask owner", href: OWNER.whatsapp }]
    };
  }

  function addMessage(container, response, type) {
    const payload = typeof response === "string" ? { answer: response } : response;
    const message = document.createElement("div");
    message.className = "gkb-chatbot-message " + type;

    const text = document.createElement("div");
    text.textContent = payload.answer;
    message.appendChild(text);

    if (payload.actions && payload.actions.length) {
      const actions = document.createElement("div");
      actions.className = "gkb-chatbot-actions";
      payload.actions.forEach(function (action) {
        const link = document.createElement("a");
        link.className = "gkb-chatbot-action";
        link.href = action.href;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = action.label;
        actions.appendChild(link);
      });
      message.appendChild(actions);
    }

    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
  }

  function guardBranding() {
    const legacyBrand = ["b", "lynk"].join("");
    const legacyBrandCheck = new RegExp(legacyBrand + "\\s*iot|" + legacyBrand, "i");
    const legacyBrandPattern = new RegExp(legacyBrand + "\\s*iot|" + legacyBrand, "gi");
    document.querySelectorAll("body *").forEach(function (node) {
      if (node.childElementCount === 0 && legacyBrandCheck.test(node.textContent || "")) {
        node.textContent = node.textContent.replace(legacyBrandPattern, "GKB TECHNOLOGIES");
      }
    });
  }

  function initChatbot() {
    guardBranding();
    if (document.querySelector(".gkb-chatbot-root")) return;

    const root = document.createElement("section");
    root.className = "gkb-chatbot-root";
    root.setAttribute("aria-label", "GKB TECHNOLOGIES AI chatbot");
    root.innerHTML = [
      '<div class="gkb-chatbot-panel" role="dialog" aria-label="GKB TECHNOLOGIES AI chatbot">',
      '  <div class="gkb-chatbot-header">',
      '    <div>',
      '      <p class="gkb-chatbot-title">GKB AI Chatbot</p>',
      '      <p class="gkb-chatbot-subtitle">Devices, accounts, payments, and support</p>',
      '    </div>',
      '    <button class="gkb-chatbot-close" type="button" aria-label="Close chatbot">&times;</button>',
      '  </div>',
      '  <div class="gkb-chatbot-quick" aria-label="Quick questions">',
      '    <button class="gkb-chatbot-chip" type="button">How do I pay?</button>',
      '    <button class="gkb-chatbot-chip" type="button">Connect a device</button>',
      '    <button class="gkb-chatbot-chip" type="button">Device offline</button>',
      '    <button class="gkb-chatbot-chip" type="button">API key example</button>',
      '    <button class="gkb-chatbot-chip" type="button">Contact owner</button>',
      '  </div>',
      '  <div class="gkb-chatbot-messages" aria-live="polite"></div>',
      '  <form class="gkb-chatbot-form">',
      '    <input class="gkb-chatbot-input" type="text" placeholder="Ask about devices, payment, login, or support..." aria-label="Chat message" />',
      '    <button class="gkb-chatbot-send" type="submit">Send</button>',
      '  </form>',
      '</div>',
      '<button class="gkb-chatbot-toggle" type="button" aria-label="Open GKB AI chatbot">AI</button>'
    ].join("");

    document.body.appendChild(root);

    const messages = root.querySelector(".gkb-chatbot-messages");
    const input = root.querySelector(".gkb-chatbot-input");
    const form = root.querySelector(".gkb-chatbot-form");
    const toggle = root.querySelector(".gkb-chatbot-toggle");
    const close = root.querySelector(".gkb-chatbot-close");

    addMessage(
      messages,
      {
        answer:
          "Hi, I am the GKB TECHNOLOGIES assistant. I can help with devices, dashboards, API keys, troubleshooting, payments, and support. Payments are handled by messaging the owner through official socials.",
        actions: [{ label: "Message owner", href: OWNER.whatsapp }]
      },
      "bot"
    );

    toggle.addEventListener("click", function () {
      root.classList.toggle("is-open");
      if (root.classList.contains("is-open")) input.focus();
    });

    close.addEventListener("click", function () {
      root.classList.remove("is-open");
    });

    root.querySelectorAll(".gkb-chatbot-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        input.value = chip.textContent;
        form.requestSubmit();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addMessage(messages, text, "user");
      input.value = "";

      window.setTimeout(function () {
        addMessage(messages, findAnswer(text), "bot");
      }, 180);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
