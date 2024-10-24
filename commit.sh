#!/bin/bash

# Step 1: Start the SSH agent in the background
eval "$(ssh-agent -s)"

# Step 2: Add your personal SSH private key to the agent (update path if necessary)
ssh-add ~/.ssh/id_rsa_personal

# Step 3: Copy the contents of your public SSH key to clipboard (macOS specific)
pbcopy < ~/.ssh/id_rsa_personal.pub

# Step 4: Instructions for the user to manually add the SSH key to GitHub
echo "Your personal SSH key has been copied to the clipboard."
echo "Go to https://github.com/settings/keys for your personal account."
echo "Navigate to SSH and GPG keys, click on New SSH key, paste the key, and give it a title."
