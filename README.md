## Next.js Starter Kit by Sanchir Enkhbold
*Next.js version 14.1.4*

Visit to my portfolio for more: https://sanchir.dev

### What's included?
- With Tailwind CSS you can create an amazing looking website.
- Beautiful toaster by `sonner`.
- Third party auth: **Google Sign in** (soon will add more).
- Pre-made authorization pages that includes: Login, Register, Logout, Forgot Password, Reset Password, Verify Email.
- Customized 404 page.
- All dark mode. Looks stunning 🤩.

### Installation guide:
 1. Clone this repo to your folder: `git clone https://github.com/sanchir2011/nextjs-starter.git my-web`
 2. Go to the folder where you cloned: `cd my-web`
 3. Install all dependencies by running `npm install`
 4. Create `.env` file for development: `cp .env.example .env`
 5. Edit the created `.env` file:
 6. Replace `NEXTAUTH_SECRET` variable with random hex string. You can do this by running `openssl rand -hex 64`. It will generate you a secret then you can replace it.
 7. This starter kit comes with **Google Sign In** feature. So, you have to create a Google OAuth credentials by following [these steps](https://developers.google.com/workspace/guides/create-credentials). When you created your credentials just replace on `GOOGLE_ID` and `GOOGLE_SECRET`.
 8. Then replace your development url on `NEXT_URL` and backend url on `BACKEND_URL`. For example: if your next.js is running on port 3010 just change it to `http://localhost:3010`.
 9. Finally, If you are using any buckets (Google Storage Bucket, etc.), please provide your url on `NEXT_PUBLIC_BUCKET`.
 10. Now you are safe to run `npm run dev` to start your Next.js.

Congratulations 🎉 You just created your Next.js Project 😊
 
 If you liked it, please leave a star ⭐️. Thanks!