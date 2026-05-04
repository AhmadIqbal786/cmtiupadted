# 🚀 Deployment Guide - Coded Mind Institute

## Pre-Deployment Checklist

- [x] Build process working (`npm run build`)
- [x] Environment variables configured
- [x] Security headers enabled in `.htaccess`
- [x] 404 error page created
- [x] All dependencies installed
- [x] Production build optimized
- [x] Configuration files (vite.config.ts, tsconfig.json)

## Environment Setup

### Required Environment Variables
Create a `.env.local` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_APP_NAME=Coded Mind Institute
VITE_APP_VERSION=1.0.0
```

## Building for Production

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output directory: dist/
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Option 2: Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

### Option 3: Traditional Hosting (cPanel, etc.)
1. Build locally: `npm run build`
2. Upload `dist/` folder contents to server
3. Ensure `.htaccess` is in root directory
4. Set `.env.local` variables on server
5. Server should support HTTPS and gzip compression

### Option 4: Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
```

Build and run:
```bash
docker build -t cmti-website .
docker run -p 3000:3000 cmti-website
```

## Post-Deployment

### Verify Deployment
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] All course pages load
- [ ] Images load properly
- [ ] 404 page works for invalid URLs
- [ ] Forms are functional
- [ ] External links work
- [ ] HTTPS is enabled
- [ ] Security headers present

### Performance Optimization
- Gzip compression enabled ✓
- CSS/JS minified ✓
- Images optimized ✓
- Cache headers configured ✓

### Security Checklist
- HTTPS enabled ✓
- X-Content-Type-Options header ✓
- X-Frame-Options header ✓
- X-XSS-Protection header ✓
- Referrer-Policy configured ✓
- 404 page custom ✓

## Troubleshooting

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
npm run build -- --port 5174
```

### Environment Variables Not Loading
1. Check `.env.local` file exists
2. Verify variable names start with `VITE_`
3. Restart dev server after changes

## Performance Metrics

Expected metrics after deployment:
- Build time: < 1s
- Gzip size: < 15KB (HTML)
- Total assets: < 400KB
- Core Web Vitals: Good

## Maintenance

### Regular Updates
- Check for dependency updates: `npm outdated`
- Update packages: `npm update`
- Audit security: `npm audit`

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor performance (PageSpeed, Lighthouse)
- Track analytics (Google Analytics)

## Support

For deployment issues, check:
1. Build logs for errors
2. Console for JavaScript errors  
3. Network tab for failed requests
4. Server logs for backend errors

---

**Last Updated:** 2026-05-04
**Version:** 1.0.0
