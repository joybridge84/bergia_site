import base64
import re
import os

file_path = '/Users/hashijoy/Projects/bergia_site/src/app/page.tsx'
output_path = '/Users/hashijoy/Projects/bergia_site/public/logo.png'

with open(file_path, 'r') as f:
    content = f.read()

# Look for the base64 string in the Image component
# src="data:image/png;base64,..."
match = re.search(r'src="data:image/png;base64,([^"]+)"', content)

if match:
    base64_str = match.group(1)
    # Remove whitespace/newlines if any
    base64_str = re.sub(r'\s+', '', base64_str)
    
    img_data = base64.b64decode(base64_str)
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'wb') as f:
        f.write(img_data)
    print(f"Successfully saved logo to {output_path}")
else:
    print("Base64 logo string not found in the file.")
