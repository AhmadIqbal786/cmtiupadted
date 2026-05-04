# 🚀 Deployment Guide - Static Site

This is a **pure static HTML/CSS/JS website** with **zero dependencies**.

## Quick Deploy (2 minutes)

### 1️⃣ Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
- **Time:** 2 minutes
- **Cost:** Free tier available
- **Setup:** Auto-detects static site

### 2️⃣ Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```
- **Time:** 2 minutes
- **Cost:** Free tier available
- **Setup:** Drag-and-drop or CLI

### 3️⃣ GitHub Pages
```bash
# Push to GitHub
git add .
git commit -m "Deploy to production"
git push origin main
```
- **Time:** Automatic
- **Cost:** Free
- **URL:** `username.github.io/cmti`

### 4️⃣ Traditional Hosting (cPanel)
1. FTP into server
2. Upload all files to `public_html`
3. Done!
- **Time:** 5 minutes
- **Cost:** $5-15/month
- **Benefits:** Full control

### 5️⃣ Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```
- **Time:** 5 minutes
- **Cost:** Free tier (5GB/month)
- **Benefits:** CDN included

### 6️⃣ AWS S3 + CloudFront
1. Create S3 bucket
2. Upload files
3. Create CloudFront distribution
4. Update Route 53 DNS
- **Time:** 20 minutes
- **Cost:** Pay-as-you-go
- **Benefits:** Highly scalable

### 7️⃣ Docker
```dockerfile
# Build
docker build -t cmti-website .
docker run -p 80:80 cmti-website

# Deploy
docker push your-registry/cmti-website
```
- **Time:** 10 minutes
- **Cost:** Varies
- **Benefits:** Easy scaling

## Pre-Deployment Checklist

- [ ] All HTML pages present
- [ ] All links working (test each page)
- [ ] Images displaying correctly
- [ ] Forms functional
- [ ] Mobile responsive (test on phone)
- [ ] 404 page works
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Security headers in place

## Environment Configuration

No environment variables needed! This is a pure static site.

Optional: Update these for your domain:
- Contact email in `index.html`
- Phone numbers in course pages
- Social media links
- Address in footer

## Performance Metrics

| Metric | Value |
|--------|-------|
| Dependencies | 0 |
| Build time | 0 (no build!) |
| Download size | ~430KB |
| Gzip size | ~50KB |
| Deploy time | < 5 min |
| Compatibility | All browsers |

## Security Checklist

✅ HTTPS available on all platforms  
✅ Security headers configured (.htaccess)  
✅ No sensitive data in code  
✅ XSS protection enabled  
✅ CSRF tokens ready (if needed)  
✅ Forms use JotForm (secure)  

## Domain Setup

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Point DNS to hosting provider
3. Wait 24-48 hours for propagation
4. HTTPS auto-enabled

## Post-Deployment

### Monitor
- Check error logs
- Monitor uptime
- Track page speed

### Maintain
- Update content as needed
- Fix broken links (if any)
- Respond to form submissions

### Optimize
- Use PageSpeed Insights
- Test on multiple browsers
- Get user feedback

## Troubleshooting

### 404 page not showing?
- Check .htaccess in root directory
- Verify ErrorDocument 404 line exists
- Restart web server

### HTTPS not working?
- Check hosting provider SSL settings
- Verify domain DNS
- Try clearing browser cache

### Images not loading?
- Check file paths (case-sensitive)
- Verify image files exist
- Check file permissions (644)

### Forms not submitting?
- Check JotForm embed code
- Verify Internet connection
- Check form validation

## Support

**Email:** info@codedmind.com  
**Phone:** +92 331 671 7195  
**Website:** https://cmti.pk

---

**Remember:** No build process, no npm install, no dependencies!  
Just upload and deploy. 🚀

**Total deployment time: 5-20 minutes depending on platform**
