#!/usr/bin/env python3
import secrets
import base64

SALT_BYTE_COUNT = 16
salt = secrets.randbits(SALT_BYTE_COUNT * 8).to_bytes(SALT_BYTE_COUNT, "little")
salt_base64 = base64.b64encode(salt).decode("utf8")

IV_BYTE_COUNT = 12
iv = secrets.randbits(IV_BYTE_COUNT * 8).to_bytes(IV_BYTE_COUNT, "little")
iv_base64 = base64.b64encode(iv).decode("utf8")

print(f"""\
"pswd": {{
    "env_key": "<fill in>",
    "crypt_salt_b64": "{salt_base64}",
    "crypt_iv_b64": "{iv_base64}"
}}\
""")