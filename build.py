import os
import re

html_file = 'index.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CSS
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    with open('style.css', 'w', encoding='utf-8') as f:
        f.write(style_match.group(1).strip())

# Extract JS
script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if script_match:
    with open('main.js', 'w', encoding='utf-8') as f:
        f.write(script_match.group(1).strip())

# Create base template
base_html = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="style.css">', content, flags=re.DOTALL)
base_html = re.sub(r'<script>.*?</script>', '<script src="main.js" defer></script>', base_html, flags=re.DOTALL)

# Now we have a clean base_html with linked css and js.
# Let's save it as index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(base_html)

print("Extracted CSS and JS.")
