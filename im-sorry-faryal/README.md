# 🌸 "I'm Sorry, Faryal" — A Personal Apology Website

A beautiful, heartfelt single-page site built for Hamza to say sorry to Faryal.
Mobile-first, password-protected, and ready to deploy for free.

---

## 📁 Folder Structure

```
im-sorry-faryal/
├── index.html      ← All the HTML (page structure)
├── style.css       ← All the visual styling
├── script.js       ← All the animations, password logic, confetti
├── images/
│   ├── hero_bg.jpg       ← Background for the opening screen
│   ├── memory_meet.jpg   ← Illustration for the "how we met" card
│   ├── photo1.jpg        ← 🔲 Add your own photo here
│   └── photo2.jpg        ← 🔲 Add your own photo here
└── README.md
```

---

## ✏️ How to Personalise

### 1. Change the Password

Open `script.js`. At the very top, find the CONFIG block:

```js
const CONFIG = {
  password: "faryal",   // ← change this to any word you want
  ...
};
```

Tell Faryal this word before you share the link.

### 2. Edit the Text

Open `index.html`. Every piece of visible text is written in plain English.
Search (Ctrl+F) for the word you want to change, edit it, and save.

Key spots:
- **Section 2 (Hurt):** Search for "I hurt you with my words"
- **Section 3 (Memory):** Search for "We met at university"
- **Section 4 (Promises):** The four promise cards
- **Section 5 (Forgiveness):** The final message after she responds

### 3. Add Your Own Photos

Drop your photos into the `images/` folder, then in `index.html`:

Find this block (there are two like it):
```html
<div class="memory-card glass reveal photo-slot" aria-label="Photo placeholder 1">
  <div class="photo-placeholder">
    ...
  </div>
</div>
```

Replace the entire `<div class="photo-placeholder">` block with:
```html
<div class="memory-img-wrap">
  <img src="images/photo1.jpg" alt="A memory of us" class="memory-img" loading="lazy" />
</div>
<div class="memory-body">
  <span class="memory-label">Caption here</span>
  <p class="memory-text">Write your memory about this photo here.</p>
</div>
```

### 4. Add Background Music (optional)

1. Place an MP3 file in the project folder, e.g. `music/song.mp3`
2. In `index.html`, find the `<audio>` tag near the bottom:
   ```html
   <audio id="bg-music" loop preload="none">
     <!-- Add your MP3 path here -->
   </audio>
   ```
   Change it to:
   ```html
   <audio id="bg-music" loop preload="none">
     <source src="music/song.mp3" type="audio/mpeg" />
   </audio>
   ```
3. The music will only play when Faryal presses the ♪ button — never autoplays.

---

## 🚀 How to Deploy for Free

### Option A — Netlify (Recommended, easiest)

1. Go to https://netlify.com and sign in (free account)
2. Drag and drop the entire `im-sorry-faryal/` folder onto the Netlify dashboard
3. You will get a link like `https://random-name.netlify.app` in seconds
4. (Optional) Click "Domain settings" → rename it to something like `for-faryal.netlify.app`
5. Share only that link with Faryal — the password screen protects it

### Option B — GitHub Pages

1. Create a free GitHub account at https://github.com
2. Create a new repository (public or private)
3. Upload all files from `im-sorry-faryal/`
4. Go to Settings → Pages → Deploy from branch → main → / (root)
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Option C — Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Import your repository
3. Click Deploy — it is live immediately

---

## 🔒 Privacy Tip

The password screen keeps casual visitors out. For extra privacy:
- On Netlify, you can set password protection in "Site settings → Access control"
- Keep the URL private — only share it with Faryal

---

*Built with love, by Hamza — for Faryal. 🌹*
