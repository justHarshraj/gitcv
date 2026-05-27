# Assessment Questionnaire

**1. How do I run your project?**
Open the project directory in your terminal, run `npm install` to grab the dependencies (React, Vite, Axios, Tailwind, Framer Motion, Recharts, and html2pdf), and then run `npm run dev`.

**2. Why did you choose this tech stack?**
I chose React with Vite for rapid execution and a component-driven architecture. TailwindCSS was strictly used to implement the complex glassmorphism and shadow layers without bloating the CSS tree. Framer Motion was added to handle the complex 3D CSS transforms (the tilt effect and floating loops) because it manages animation frames outside of the main React render cycle, preventing performance drops. Axios handles the API requests because its built-in timeout configurations and error-interceptors make handling REST limits much cleaner than the native Fetch API.

**3. Describe one real edge case your application handles.**
A major flaw in naive GitHub API integrations is rate limiting. Unauthenticated users only get 60 requests an hour. To generate a language chart, you have to hit a unique endpoint for *every single repository*. If a user has 40 repos, one search would eat up almost the entire hourly limit. I solved this by first fetching all repos, sorting them client-side by star/fork count, slicing the top 5, and *only* fetching language data for those 5. This provides an accurate representation of their primary stack while protecting the app from crashing due to `403 Forbidden` errors. 

**4. Did you use AI in this project?**
AI was used purely as a sounding board during the architectural phase to validate my approach to managing the Framer Motion transforms concurrently with the `html2pdf.js` canvas capturing process. All business logic, CSS configurations, and API optimization scripts were implemented manually to ensure assessment compliance.

**5. What is an honest gap or improvement you would make if you had more time?**
If I had more time, I would implement an OAuth 2.0 GitHub login flow. By authenticating the user, the GitHub API rate limit expands from 60 to 5,000 requests per hour. Furthermore, authentication would allow GitCV to analyze their *private* repository contributions, allowing the algorithm to paint a much more accurate picture of a developer's daily work without exposing the actual private source code.
