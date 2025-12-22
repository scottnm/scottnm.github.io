import html2text
import sys

if len(sys.argv) < 2:
    print("Missing html input file")
    sys.exit(1)

if len(sys.argv) < 3:
    print("Missing gemtext output file")
    sys.exit(1)

with open(sys.argv[1], "r") as f:
    html_document = f.read()

# Create a converter instance
h = html2text.HTML2Text()
# Configure it to ignore images and links for pure plaintext
h.ignore_images = True
h.ignore_links = True # Set to True to ignore links completely

plaintext = h.handle(html_document)
print(plaintext)

# Output can then be saved to a .txt file
with open(sys.argv[2], "w") as f:
    f.write(plaintext)