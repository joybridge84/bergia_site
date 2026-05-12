import re

file_path = '/Users/hashijoy/Projects/bergia_site/src/app/page.tsx'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Replace the base64 logo with local path
new_content = re.sub(r'src="data:image/png;base64,[^"]+"', 'src="/logo.png"', content)

# 2. Replace the external enterprise image with local path
external_url = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB45FW-X90_ILxsaQcAa6hJOzsGa9Smp81sHo6Xgiva7VBrvm-qQArgBP9wS7V0PzyWmxTlRc4T75joYM3BRC_5zVWoxf7KvDG1rl3MzOdkyndsC2vsAdAGMVY60k1I_phUQDd1lDMElca7LOH1iG6ghHrq5NF3PpZdqlSmitkIUABFRGYq8HqMk7RUMPE3wDnVlpTt_6WtloVto_7T3mGBLL4B6phMfcT0k7DeQd78wtmrMGFbxNIPv7KXJ00BYh3qK6s8S7IA7uY'
new_content = new_content.replace(f'src="{external_url}"', 'src="/enterprise-hero.jpg"')

with open(file_path, 'w') as f:
    f.write(new_content)

print("Successfully updated src/app/page.tsx with local asset paths.")
