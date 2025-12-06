# Moodle LMS Integration Guide for Your Existing Website

## Overview
This guide will help you install and integrate Moodle LMS with your existing Coded Mind Technology Incubator website on your hosting provider.

---

## Table of Contents
1. [Pre-Installation Requirements](#pre-installation-requirements)
2. [Preparing Your Hosting](#preparing-your-hosting)
3. [Installing Moodle](#installing-moodle)
4. [Configuring Moodle](#configuring-moodle)
5. [Website Integration Methods](#website-integration-methods)
6. [Styling & Branding](#styling--branding)
7. [Single Sign-On (SSO) Setup](#single-sign-on-sso-setup)
8. [Security & Maintenance](#security--maintenance)

---

## 1. Pre-Installation Requirements

### Server Requirements
- **PHP Version**: 7.4 or higher (8.0+ recommended)
- **Database**: MySQL 5.7+ or MariaDB 10.2+ or PostgreSQL 12+
- **Web Server**: Apache 2.4+ or Nginx 1.14+
- **PHP Extensions Required**:
  - iconv, mbstring, curl, openssl, tokenizer, xmlrpc, soap
  - zip, gd, intl, xml, json, mysqli (or pgsql)
  - fileinfo, ctype, simplexml

### Hosting Requirements
- **Disk Space**: Minimum 200MB (recommended 5GB+)
- **RAM**: Minimum 512MB (recommended 2GB+)
- **Max Execution Time**: 300 seconds
- **Upload Size**: 100MB+

### Check Your Current PHP Version
```bash
php -v
```

### Verify PHP Extensions
```bash
php -m
```

---

## 2. Preparing Your Hosting

### Step 1: Access Your Hosting Control Panel (cPanel/Plesk)

#### Create a Database
1. Go to **MySQL Databases** or **phpMyAdmin**
2. Create a new database: `codedmind_moodle`
3. Create a database user: `moodle_user`
4. Set a strong password
5. Grant ALL privileges to the user for the database

#### Note Down These Details:
```
Database Name: codedmind_moodle
Database User: moodle_user
Database Password: [your-password]
Database Host: localhost (or your hosting provider's DB host)
```

### Step 2: Create Moodle Data Directory
1. Create a folder **outside** your public_html/www folder named `moodledata`
2. Set permissions to 755 (or as recommended by your host)
3. This folder stores user files and must not be web-accessible

**Directory Structure Should Look Like:**
```
/home/yourusername/
├── public_html/
│   ├── index.html (your main site)
│   ├── courses.html
│   ├── moodle/       ← Moodle files go here
│   └── ...
└── moodledata/       ← Moodle data folder (NOT in public_html)
```

---

## 3. Installing Moodle

### Method 1: Upload Existing Moodle Files (Recommended for You)

Since you already have Moodle files at `d:/codedvmind/moodle/`, follow these steps:

#### Step 1: Upload Files to Your Hosting
1. Connect to your hosting via FTP (FileZilla, WinSCP) or use cPanel File Manager
2. Navigate to your public_html directory
3. Upload the entire `moodle` folder contents to `public_html/moodle/`
4. This will take 10-30 minutes depending on your internet speed

#### Step 2: Set Proper Permissions
For cPanel/Linux hosting:
```bash
# Set directory permissions
find moodle -type d -exec chmod 755 {} \;

# Set file permissions
find moodle -type f -exec chmod 644 {} \;
```

### Method 2: Download Fresh Copy (Alternative)

If you want the latest version:
```bash
# via Git (if available on hosting)
cd public_html
git clone -b MOODLE_404_STABLE git://git.moodle.org/moodle.git moodle
```

Or download from: https://download.moodle.org/

---

## 4. Configuring Moodle

### Step 1: Run the Installation Wizard

1. Open your browser and go to: `https://yourdomain.com/moodle/`
2. Moodle will start the installation wizard
3. Select your language: **English** (or your preference)

### Step 2: Web Address Configuration
- **WWW root**: `https://yourdomain.com/moodle`
- **Moodle directory**: `/home/yourusername/public_html/moodle`
- **Data directory**: `/home/yourusername/moodledata`

### Step 3: Database Configuration
- **Database type**: Choose `MariaDB (native/mariadb)` or `MySQL (native/mysqli)`
- **Database host**: `localhost`
- **Database name**: `codedmind_moodle`
- **Database user**: `moodle_user`
- **Database password**: [your-password]
- **Table prefix**: `mdl_` (default is fine)

### Step 4: Complete Installation
1. Accept terms and conditions
2. Moodle will check server requirements
3. Fix any issues shown (usually PHP extensions)
4. Install database tables (this takes 5-10 minutes)
5. Create admin account:
   - Username: `admin`
   - Password: [Strong password]
   - Email: your-email@domain.com

### Step 5: Configuration File
After installation, Moodle creates `config.php`. Save a backup!

**Important Config Settings** (edit `moodle/config.php`):
```php
<?php
unset($CFG);
global $CFG;
$CFG = new stdClass();

$CFG->dbtype    = 'mariadb';     // or 'mysqli'
$CFG->dblibrary = 'native';
$CFG->dbhost    = 'localhost';
$CFG->dbname    = 'codedmind_moodle';
$CFG->dbuser    = 'moodle_user';
$CFG->dbpass    = 'your-password';
$CFG->prefix    = 'mdl_';

$CFG->wwwroot   = 'https://yourdomain.com/moodle';
$CFG->dataroot  = '/home/yourusername/moodledata';
$CFG->admin     = 'admin';

$CFG->directorypermissions = 02777;

require_once(__DIR__ . '/lib/setup.php');
// There is no php closing tag in this file
```

---

## 5. Website Integration Methods

### Method 1: Navigation Links (Simplest)
You already have this in your navigation:
```html
<li><a href="moodle/index.php">LMS</a></li>
```

**Better link:**
```html
<li><a href="moodle/">LMS Portal</a></li>
```

### Method 2: Create Dedicated LMS Landing Page

Create `lms.html` in your root directory:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LMS Portal - Coded Mind Technology Incubator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Your existing header -->
    
    <section class="lms-portal" style="padding: 100px 0;">
        <div class="container">
            <h1>Learning Management System</h1>
            <p>Access your courses, assignments, and learning resources</p>
            
            <div class="lms-buttons" style="margin-top: 30px; text-align: center;">
                <a href="moodle/" class="btn" style="margin: 10px;">
                    <i class="fas fa-sign-in-alt"></i> Access LMS Portal
                </a>
                <a href="moodle/login/signup.php" class="btn btn-outline" style="margin: 10px;">
                    <i class="fas fa-user-plus"></i> Create New Account
                </a>
            </div>
            
            <div class="lms-features" style="margin-top: 50px;">
                <h2>LMS Features</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px;">
                    <div class="crystal-card" style="padding: 20px;">
                        <i class="fas fa-book" style="font-size: 2rem; color: var(--primary);"></i>
                        <h3>Online Courses</h3>
                        <p>Access all your enrolled courses</p>
                    </div>
                    <div class="crystal-card" style="padding: 20px;">
                        <i class="fas fa-tasks" style="font-size: 2rem; color: var(--primary);"></i>
                        <h3>Assignments</h3>
                        <p>Submit and track your assignments</p>
                    </div>
                    <div class="crystal-card" style="padding: 20px;">
                        <i class="fas fa-certificate" style="font-size: 2rem; color: var(--primary);"></i>
                        <h3>Certificates</h3>
                        <p>Earn and download certificates</p>
                    </div>
                    <div class="crystal-card" style="padding: 20px;">
                        <i class="fas fa-comments" style="font-size: 2rem; color: var(--primary);"></i>
                        <h3>Discussion Forums</h3>
                        <p>Engage with instructors and peers</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Your existing footer -->
</body>
</html>
```

### Method 3: iFrame Embedding (Not Recommended)
For specific course pages, you can embed:
```html
<iframe src="https://yourdomain.com/moodle" 
        width="100%" 
        height="800px" 
        style="border: none;">
</iframe>
```

**Note**: iFrames have limitations with responsive design and SEO.

### Method 4: Deep Linking
Link directly to specific Moodle pages:
- Course catalog: `moodle/course/index.php`
- Login: `moodle/login/index.php`
- User dashboard: `moodle/my/`
- Calendar: `moodle/calendar/view.php`

---

## 6. Styling & Branding

### Customize Moodle Theme to Match Your Website

#### Step 1: Access Theme Settings
1. Log in to Moodle as admin
2. Go to **Site Administration** → **Appearance** → **Themes** → **Theme Settings**

#### Step 2: Select Theme
Choose **Boost** theme (most customizable)

#### Step 3: Upload Your Logo
1. Go to **Site Administration** → **Appearance** → **Logos**
2. Upload your `logo.png`

#### Step 4: Customize Colors
Go to **Site Administration** → **Appearance** → **Boost** → **Advanced Settings**

Add this CSS to match your website:
```css
/* Primary Colors to Match CMTI Website */
:root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --secondary: #7e22ce;
    --accent: #06b6d4;
}

/* Header Styling */
.navbar {
    background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;
}

/* Buttons */
.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;
    border: none !important;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Cards */
.card {
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Links */
a {
    color: var(--primary);
}

a:hover {
    color: var(--primary-dark);
}

/* Course Cards */
.coursebox {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.coursebox:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}
```

#### Step 5: Add Custom Header/Footer
To include your website's navigation in Moodle:

1. Go to **Site Administration** → **Appearance** → **Additional HTML**
2. Add this to **Before BODY is closed**:

```html
<script>
// Add your website navigation to Moodle
document.addEventListener('DOMContentLoaded', function() {
    // You can inject header/footer here
});
</script>
```

---

## 7. Single Sign-On (SSO) Setup

For seamless login between your website and Moodle:

### Option 1: Use External Database Authentication
If your main website has user database, sync with Moodle.

### Option 2: OAuth2 / SAML2
For enterprise-level integration.

### Option 3: Simple Solution - Shared Session
Create a simple login system that creates sessions for both sites.

### Basic Implementation:
1. Create a common user table in your database
2. When user logs in to your main site, also log them into Moodle
3. Use Moodle's Web Services API

**Example**: Create `login-integration.php`
```php
<?php
require_once('moodle/config.php');
require_once('moodle/lib/moodlelib.php');

// Your authentication logic
$username = $_POST['username'];
$password = $_POST['password'];

// Authenticate in Moodle
$user = authenticate_user_login($username, $password);

if ($user) {
    complete_user_login($user);
    // Redirect to Moodle dashboard
    redirect($CFG->wwwroot . '/my/');
}
?>
```

---

## 8. Security & Maintenance

### Security Best Practices

#### 1. SSL Certificate (HTTPS)
Ensure your entire site uses HTTPS:
```php
// In config.php, force HTTPS
$CFG->wwwroot = 'https://yourdomain.com/moodle';
```

#### 2. Update Moodle Regularly
```bash
cd moodle
git pull
php admin/cli/upgrade.php
```

#### 3. Secure config.php
```bash
chmod 400 config.php  # Read-only for owner
```

#### 4. Backup Strategy
**Database Backup** (Daily):
```bash
mysqldump -u moodle_user -p codedmind_moodle > backup_$(date +%Y%m%d).sql
```

**Files Backup** (Weekly):
```bash
tar -czf moodledata_backup_$(date +%Y%m%d).tar.gz moodledata/
```

#### 5. Configure Cron Jobs
Add to crontab:
```bash
*/5 * * * * /usr/bin/php /home/yourusername/public_html/moodle/admin/cli/cron.php
```

Or use Moodle's built-in cron via web:
```
https://yourdomain.com/moodle/admin/cron.php
```

### Performance Optimization

#### 1. Enable Caching
- Go to **Site Administration** → **Plugins** → **Caching**
- Enable **Application**, **Session**, and **Request** caching

#### 2. Optimize Database
```sql
OPTIMIZE TABLE mdl_user;
OPTIMIZE TABLE mdl_course;
OPTIMIZE TABLE mdl_log;
```

#### 3. CDN for Static Files
Configure CDN for JavaScript, CSS, and images.

---

## Quick Setup Checklist

- [ ] Verify server requirements (PHP 7.4+, MySQL 5.7+)
- [ ] Create database and user
- [ ] Create moodledata folder outside public_html
- [ ] Upload Moodle files to public_html/moodle
- [ ] Set proper file permissions
- [ ] Run installation wizard at yourdomain.com/moodle
- [ ] Configure database connection
- [ ] Create admin account
- [ ] Update navigation links in main website
- [ ] Create lms.html landing page
- [ ] Customize Moodle theme (logo, colors)
- [ ] Set up SSL/HTTPS
- [ ] Configure cron jobs
- [ ] Test registration and login
- [ ] Create first course
- [ ] Set up backup system

---

## Common Issues & Solutions

### Issue 1: "Database connection failed"
**Solution**: Verify database credentials in config.php

### Issue 2: "Moodle requires at least PHP version 7.4"
**Solution**: Contact your hosting provider to upgrade PHP

### Issue 3: "Permission denied" errors
**Solution**: Set correct permissions:
```bash
chmod -R 755 moodle
chmod -R 777 moodledata
```

### Issue 4: "Maximum execution time exceeded"
**Solution**: Increase in .htaccess or php.ini:
```
php_value max_execution_time 300
php_value upload_max_filesize 100M
php_value post_max_size 100M
```

### Issue 5: Blank page after installation
**Solution**: Enable debugging in config.php:
```php
$CFG->debug = 38911;
$CFG->debugdisplay = 1;
```

---

## Support Resources

- **Moodle Documentation**: https://docs.moodle.org/
- **Moodle Community Forums**: https://moodle.org/course/
- **Moodle YouTube Channel**: https://www.youtube.com/user/moodlehq
- **Hosting-Specific Guides**: Check your hosting provider's knowledge base

---

## Next Steps

1. **Create Courses**: Start building your course catalog
2. **Enroll Users**: Import students or enable self-registration
3. **Configure Plugins**: Add quiz, assignment, and communication plugins
4. **Mobile App**: Enable the Moodle mobile app for students
5. **Analytics**: Set up learning analytics and reporting

---

## Contact Information

For technical support with Moodle integration:
- Email: info@codedmind.com
- Phone: +92 348 8850059

---

**Document Version**: 1.0  
**Last Updated**: December 2025  
**Author**: Coded Mind Technology Incubator IT Team

---

## Additional Notes

This guide is specifically tailored for integrating Moodle with your Coded Mind Technology Incubator website. The Moodle installation should be accessed at `https://yourdomain.com/moodle/` and can be linked from your main navigation menu.

Good luck with your LMS integration! 🚀
