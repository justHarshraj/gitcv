# Assessment Questionnaire

**1. How to run**
Getting this project up and running is super straightforward since it’s a client-side Vite app.

Assuming you have Node.js installed on your machine, just open your terminal, navigate to the project folder, and run:

`npm install` (This grabs all the packages like React, Vite, Tailwind, Framer Motion, Recharts, and html2pdf).

`npm run dev`

That’s it! The terminal will spit out a local host link (usually `http://localhost:5173`). Click that, and you're good to go. No database setup or environment variables are strictly required to test it.

**2. Stack choice**
I went with React + Vite for the core framework, Tailwind CSS for styling, and Framer Motion for the physics/animations.

I picked this stack because I wanted the app to feel incredibly fast and look like a premium, modern dashboard. Vite makes development lightning-fast, and React's component model is perfect for building the different resume templates and the drag-and-drop editor. Tailwind was a lifesaver here—trying to manage the complex glassmorphism, glowing shadows, and three different CSS-variable themes using standard CSS files would have been an absolute nightmare to maintain.

What would have been a worse choice? Going with a heavy, full-stack framework like Next.js or Remix. Since this app doesn't have a database, user authentication (yet), or a need for intense Server-Side Rendering (SSR) for SEO, a full Node backend would have been massive overkill. It would have made deployment slower and the codebase needlessly complicated for what is essentially an API-consumption and data-visualization tool.

**3. One real edge case**
I’m actually really proud of how I handled the GitHub API Rate Limit exhaustion.

Unauthenticated users only get 60 API requests per hour. The problem? To build the LanguageChart, you have to hit a specific `/languages` endpoint for every single repository a user has. If a recruiter searched for a developer with 80 repos, the app would try to make 80 API calls instantly, nuke the rate limit, and crash with a `403 Forbidden` error.

**Where it is:** In `src/services/githubApi.js` (around lines 33-35).

**How I handled it:** Instead of fetching languages for everything, the code first sorts the user's repositories locally by star count. Then, it slices the array and only maps the `/languages` fetch promises to their top 5 most popular repositories.

Without this handling, the app would literally break after a single search for a prolific developer. By adding this slice, we get a highly accurate picture of their core tech stack while only using 6 API calls total (1 for profile, 1 for repos, 4-5 for languages).

**4. AI usage**
I definitely utilized an AI assistant (specifically an LLM) as a collaborative pair-programmer for this project.

**What I asked for:** I used it as an architectural sounding board. I asked it for the best way to structure a multi-theme engine using Tailwind without relying on bloated classes.

**What it gave me:** It provided the concept of mapping Tailwind utility classes (like `bg-surface`) to CSS variables (`var(--surface-color)`) and using a `data-theme` attribute on the HTML tag.

**What I asked for:** I also asked it for the exact syntax for `html2pdf.js` because its configuration object is notoriously picky.

**Where I had to change the AI's output:**
The AI originally suggested just attaching `html2pdf().from(element).save()` directly to my export button. However, it completely missed the fact that `html2pdf.js` cannot render 3D CSS transforms or SVG animations natively—it just prints blank boxes.

I had to manually step in and write an async orchestration function in `src/pages/Resume.jsx` that temporarily forces the app into a static "Light" print theme, waits 300 milliseconds for the DOM to repaint without animations, captures the PDF, and then flips the theme back to what the user had selected. The AI didn't catch that visual edge case, but testing it locally made it obvious!

**5. Honest gap**
Honestly, the biggest gap right now is the lack of OAuth 2.0 (Login with GitHub).

Because the app relies on unauthenticated API calls, we are entirely at the mercy of that 60-requests-per-hour limit. If three recruiters are testing my app at the same time, it’s going to hit a wall pretty fast. Furthermore, because it's unauthenticated, the "Green Square" heatmap and the proficiency scoring can only see public repositories. A lot of enterprise developers write 90% of their code in private company repos, meaning GitCV might make them look less experienced than they actually are.

**How I would fix it with another day:**
I would implement Firebase Auth or standard NextAuth. By having the user click "Sign in with GitHub," the API rate limit jumps from 60 to 5,000 per hour, and (if they grant permission) I could fetch their total private commit counts. It would make the generated resume exponentially more accurate and completely remove the risk of the app timing out during a demo.
