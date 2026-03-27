const login = require("c3c-fbstate");

login({ appState: require("./appstate.json") }, (err, api) => {
    if (err) return console.error("Lỗi login:", err);

    console.log("🤖 Bot đã online!");

    api.setOptions({
        listenEvents: true
    });

    api.listenMqtt((err, event) => {
        if (err) return console.error(err);

        // chỉ xử lý tin nhắn
        if (event.type !== "message") return;

        const msg = event.body?.toLowerCase() || "";

        // ===== LỆNH =====

        // ping
        if (msg === "ping") {
            api.sendMessage("pong 🏓", event.threadID);
        }

        // chào
        else if (msg === "hi" || msg === "hello") {
            api.sendMessage("Chào bạn 👋", event.threadID);
        }

        // info
        else if (msg === "info") {
            api.sendMessage(
                `🤖 Bot đơn giản\n📌 Prefix: không có\n📌 Lệnh: ping | hi | info`,
                event.threadID
            );
        }

        // random số
        else if (msg === "random") {
            let number = Math.floor(Math.random() * 100);
            api.sendMessage(`🎲 Số random: ${number}`, event.threadID);
        }
    });
});