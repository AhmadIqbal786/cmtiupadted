# 📋 Installation & Setup Guide

## Zero Dependencies Setup

This is a **pure static HTML/CSS/JavaScript website** that requires **NO installation**.

### Option 1: Run Locally (Testing)

#### Using Python
```bash
cd /d/cmti
python -m http.server 8000
# Open: http://localhost:8000
```

#### Using Node.js
```bash
cd /d/cmti
npx http-server
# Open: http://localhost:8080
```

#### Using PHP
```bash
cd /d/cmti
php -S localhost:8000
# Open: http://localhost:8000
```

#### Using Ruby
```bash
cd /d/cmti
ruby -run -ehttpd . -p8000
# Open: http://localhost:8000
```

#### Using Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

### Option 2: Deploy to Production (Recommended)

#### Vercel (Easiest - 2 minutes)
1. Go to https://vercel.com
2. Click "New Project"
3. Import GitHub repo (or upload folder)
4. Click "Deploy"
5. Done! Your site is live

```bash
# Or via CLI:
npm install -g vercel
vercel
```

#### Netlify (2 minutes)
1. Go to https://netlify.com
2. Drag & drop the folder
3. OR connect GitHub repo
4. Done! Your site is live

```bash
# Or via CLI:
npm install -g netlify-cli
netlify deploy --prod --dir .
```

#### GitHub Pages (Automatic)
1. Push to GitHub
2. Go to repo settings
3. Enable "Pages" from main branch
4. Site goes live at: `username.github.io/cmti`

#### Traditional Hosting (cPanel)
1. Download all files
2. FTP to `public_html` directory
3. Done!

#### Firebase (Free)
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

#### AWS S3
1. Create S3 bucket
2. Upload all files
3. Enable static website hosting
4. Use Route 53 for custom domain

#### DigitalOcean App Platform
1. Connect GitHub repo
2. Deploy with 1 click
3. Automatic HTTPS

#### Docker (Local or Server)
```bash
docker build -t cmti-website .
docker run -p 80:80 cmti-website
```

## File Checklist

Required files (ensure all present):
- ✅ index.html
- ✅ 404.html
- ✅ about.html
- ✅ contact.html
- ✅ courses.html
- ✅ course-*.html (all course pages)
- ✅ style.css
- ✅ style2.css
- ✅ style3.css
- ✅ courses.css
- ✅ main.js
- ✅ codedmind-enhancements.js
- ✅ .htaccess
- ✅ logo.png
- ✅ Gallery/ (images)

Optional files:
- Dockerfile
- nginx.conf
- netlify.toml
- vercel.json
- .env.local
- README.md
- DEPLOYMENT.md
- SETUP.md

## Configuration Files

### .htaccess (Apache)
Already configured with:
- Security headers
- Gzip compression
- Caching rules
- 404 routing
- HTTPS redirect

### nginx.conf (Nginx)
For Docker/server use:
- Already created
- Ready to use

### Docker
For containerized deployment:
```bash
docker build -t cmti-website .
docker run -p 80:80 cmti-website
```

## Testing Before Deploy

1. **Open in browser:**
   ```bash
   open index.html
   ```

2. **Test all pages:**
   - [ ] Homepage (index.html)
   - [ ] About page
   - [ ] Courses page
   - [ ] All course pages
   - [ ] Contact page
   - [ ] 404 page (visit fake URL)

3. **Test on mobile:**
   - Responsive design
   - Touch functionality
   - Form submission

4. **Check links:**
   - All internal links work
   - External links work
   - Forms submit

## Domain & DNS Setup

1. **Purchase domain:**
   - Namecheap, GoDaddy, Google Domains, etc.

2. **Update DNS:**
   - Point nameservers to hosting provider
   - Or update A/CNAME records

3. **Enable HTTPS:**
   - Automatic on Vercel, Netlify, Firebase
   - Manual on traditional hosting

## Troubleshooting

### Page not loading?
```bash
# Check if file exists
ls -la index.html

# Test with Python server
python -m http.server 8000
```

### 404 page not showing?
- Verify .htaccess exists
- Check ErrorDocument 404 line
- Restart web server

### Images not showing?
- Check Gallery folder exists
- Verify image paths in HTML
- Check file permissions (644)

### Forms not working?
- Check JotForm embed code
- Verify Internet connection
- Test in different browser

## Performance Check

```bash
# Check file sizes
du -sh *

# Test with curl
curl -I https://your-domain.com

# Check headers
curl -I -H "Accept-Encoding: gzip" https://your-domain.com
```

## Security Check

✅ No API keys in code  
✅ No database credentials  
✅ No hardcoded secrets  
✅ Security headers enabled  
✅ HTTPS ready  
✅ Forms use secure endpoints  

## Support

- Email: info@codedmind.com
- Phone: +92 331 671 7195
- Website: https://cmti.pk

---

**No npm install needed!**  
**No build process!**  
**Just upload and deploy!** 🚀
