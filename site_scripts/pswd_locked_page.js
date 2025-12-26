'use strict';

async function derivePbkdf2Key(password, salt) {
    // Convert password to UTF‑8 bytes
    const enc = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    // Derive the raw 32‑byte key (same as Python)
    const rawKey = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            hash: "SHA-256",
            salt: salt,          // Uint8Array
            iterations: 210000,
        },
        passwordKey,
        256                     // 32 bytes, same as Python output
    );

    // Import as AES‑GCM key
    const aesKey = await crypto.subtle.importKey(
        "raw",
        rawKey,
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    return aesKey
}

function set_failure_text_visible(visible) {
    const failText = document.getElementById("password-fail-text");
    failText.hidden = !visible;
}

// toplevel object to make html calls look more 'namespaced'
const pswd_locked_page = {
    unlock_page: async ()=>{
        set_failure_text_visible(false);
        const password = document.getElementById("password-field").value;

        const ciphertextBase64 = document.getElementById("ciphertext-b64").innerText;
        const ciphertext = Uint8Array.fromBase64(ciphertextBase64)

        const saltBase64 = document.getElementById("cipher-salt-b64").innerText;
        const salt = Uint8Array.fromBase64(saltBase64)

        const ivBase64 = document.getElementById("cipher-iv-b64").innerText
        const iv = Uint8Array.fromBase64(ivBase64)

        const cryptKey = await derivePbkdf2Key(password, salt);

        try {
            const plaintextBuffer = await window.crypto.subtle.decrypt( 
                { name: "AES-GCM", iv }, 
                cryptKey,
                ciphertext);

            const plaintext = new TextDecoder("utf-8").decode(plaintextBuffer);
            const post_content_div = document.getElementById("post-content");
            post_content_div.innerHTML = plaintext
        }
        catch (error) {
            set_failure_text_visible(true);
            console.error(`Failed to decode ciphertext: ${error}`)
        }
    }
}
